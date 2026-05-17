import {
  addXP,
  addBuilderExerciseToWorkoutDay,
  addExerciseToWorkoutDay,
  addTask,
  archiveCompletedTask,
  awardXP,
  claimAchievement,
  checkAchievements,
  closeWorkoutBuilder,
  createWorkoutDay,
  createWorkoutPlan,
  deleteWorkoutDay,
  deleteWorkoutPlan,
  distributionFromCategory,
  duplicateWorkoutDay,
  duplicateWorkoutExercise,
  duplicateWorkoutPlan,
  loadGameState,
  logWorkoutSession,
  moveWorkoutExercise,
  moveWorkoutExerciseToIndex,
  openWorkoutBuilder,
  persist,
  removeCalendarTask,
  removeWorkoutExercise,
  replaceState,
  selectWorkoutDay,
  selectWorkoutPlan,
  selectWorkoutSession,
  saveWorkoutBuilderDay,
  saveWorkoutBuilderPlan,
  setWorkoutBuilderStep,
  setWorkoutBuilderValue,
  setWorkoutBrowserFilter,
  setWorkoutHistoryFilter,
  shiftWorkoutCalendarMonth,
  SKILL_LEVELS,
  todayKey,
  toggleHabit,
  updateWorkoutDay,
  updateWorkoutExercise,
  updateWorkoutPlan,
} from "./state.js";
import { clearSave, exportSave, importSave } from "./storage.js";
import { renderTasks } from "./tasks.js";
import { renderCalendar, renderDashboard, renderStatistics } from "./stats.js";
import { renderAchievements } from "./achievements.js";
import { renderBosses } from "./boss.js";
import { renderWorkout } from "./workout.js";
import {
  decodeTechPath,
  findTechSkillMatch,
  getTechSkillById,
  renderReading,
  renderSkills,
  renderTechSkills,
} from "./techskills.js";
import { drawHabitTrendChart, drawStatisticsCharts, drawWorkoutChart } from "./charts.js";
import { exerciseById } from "./workoutData.js";
import { initLiquidSystem } from "./liquid.js";

const state = loadGameState();
let activeTab = "dashboard";
let draggedWorkoutExerciseId = null;

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "⌂", render: renderDashboard },
  { id: "tasks", label: "Tasks", icon: "☑", render: renderTasks },
  { id: "calendar", label: "Calendar", icon: "◷", render: renderCalendar },
  { id: "skills", label: "Skills", icon: "✦", render: renderSkills },
  { id: "workout", label: "Workout", icon: "▲", render: renderWorkout },
  { id: "tech", label: "Tech Skills", icon: "⌘", render: renderTechSkills },
  { id: "reading", label: "Reading", icon: "▤", render: renderReading },
  { id: "achievements", label: "Achievements", icon: "◆", render: renderAchievements },
  { id: "boss", label: "Boss Battles", icon: "⚔", render: renderBosses },
  { id: "statistics", label: "Statistics", icon: "◷", render: renderStatistics },
];

const nav = document.getElementById("nav");
const view = document.getElementById("view");
const title = document.getElementById("page-title");
const themeSelect = document.getElementById("theme-select");

applyTheme(state.uiTheme || "aether");
if (themeSelect) themeSelect.value = state.uiTheme || "aether";

function uid(prefix) {
  return `${prefix}-${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Date.now().toString(36)}`;
}

function renderNav() {
  nav.innerHTML = tabs
    .map((tab) => `
      <button class="nav-button ${activeTab === tab.id ? "active" : ""}" data-tab="${tab.id}">
        <span>${tab.icon}</span>
        <span>${tab.label}</span>
      </button>
    `)
    .join("");
}

function render() {
  const tab = tabs.find((item) => item.id === activeTab) || tabs[0];
  title.textContent = tab.label;
  renderNav();
  view.innerHTML = tab.render(state);
  persist(state);

  if (activeTab === "statistics") {
    requestAnimationFrame(() => drawStatisticsCharts(state));
  }
  if (activeTab === "dashboard") {
    requestAnimationFrame(() => drawHabitTrendChart(state));
  }
  if (activeTab === "tech" && state.techSkillSearch?.focusId) {
    requestAnimationFrame(() => {
      const target = document.querySelector(`[data-skill-anchor="${state.techSkillSearch.focusId}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

function applyTheme(theme) {
  const allowed = new Set(["aether", "crimson", "void", "emerald", "obsidian", "silver", "cobalt"]);
  document.documentElement.dataset.theme = allowed.has(theme) ? theme : "aether";
}

function completeTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || task.completed) return;
  task.completed = true;
  task.completedAt = todayKey();
  task.completedDate = todayKey();
  addXP(state, task.xp, { global: true, distribution: task.distribution }, task.name);
  archiveCompletedTask(state, task);
}

function logWorkout(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const metric = data.metric;
  const value = Number(data.value);
  const entries = state.workout.metrics[metric] || [];
  const oldBest = entries.reduce((best, entry) => Math.max(best, Number(entry.value || 0)), 0);
  entries.push({ date: data.date, value });
  state.workout.metrics[metric] = entries.sort((a, b) => a.date.localeCompare(b.date));
  const isPersonalBest = value > oldBest;
  awardXP(
    state,
    isPersonalBest ? 150 : 50,
    metric === "Bodyweight" ? { Discipline: 70, Strength: 30 } : { Strength: 100 },
    isPersonalBest ? `Workout PR: ${metric}` : `Workout log: ${metric}`
  );
}

function logReading(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const book = state.books.find((item) => item.id === data.id);
  if (!book) return;
  const pages = Number(data.pages);
  const xp = Math.min(120, Math.max(20, pages * 3));
  book.pagesRead += pages;
  book.sessions.push({ date: data.date, pages, xp });
  awardXP(state, xp, { Intelligence: 50, Communication: 50 }, `Reading: ${book.title}`);
}

function searchTechSkill(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const query = (data.query || "").trim();
  const match = findTechSkillMatch(query);
  state.techSkillSearch = {
    query,
    focusId: match?.id || null,
  };
  if (match?.path) {
    state.techSkillNav = {
      path: match.path.slice(0, 4),
    };
  }
}

function toggleTechSkill(id, completed) {
  const skill = getTechSkillById(id);
  if (!skill) return;
  const record = state.techSkillCompletions[id] || {
    completed: false,
    completedAt: null,
    xp: skill.xp,
    name: skill.name,
    awarded: false,
  };

  record.completed = completed;
  record.completedAt = completed ? todayKey() : null;
  record.xp = skill.xp;
  record.name = skill.name;

  if (completed && !record.awarded) {
    record.awarded = true;
    awardXP(state, skill.xp, { Intelligence: 80, Discipline: 20 }, `Tech skill: ${skill.name}`);
  }

  state.techSkillCompletions[id] = record;
}

function addBoss(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const objectives = data.objectives
    .split(";")
    .map((objective) => objective.trim())
    .filter(Boolean)
    .map((text) => ({ text, done: false }));
  state.bosses.unshift({
    id: uid("boss"),
    name: data.name.trim(),
    xp: Number(data.xp),
    defeated: false,
    objectives,
  });
}

function defeatBoss(id) {
  const boss = state.bosses.find((item) => item.id === id);
  if (!boss || boss.defeated) return;
  if (!boss.objectives.every((objective) => objective.done)) return;
  boss.defeated = true;
  awardXP(state, boss.xp, { Discipline: 40, Intelligence: 40, Communication: 20 }, `Boss defeated: ${boss.name}`);
}

function progressSkill(id, direction) {
  const skill = state.calisthenics.find((item) => item.id === id);
  if (!skill) return;
  const next = Math.max(0, Math.min(SKILL_LEVELS.length - 1, skill.level + direction));
  if (next === skill.level) return;
  skill.level = next;
  if (direction > 0) {
    awardXP(state, 60, { Strength: 80, Discipline: 20 }, `Calisthenics: ${skill.name}`);
  }
}

function handleForm(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const type = form.dataset.form;
  const data = Object.fromEntries(new FormData(form).entries());

  if (type === "task") {
    addTask(state, {
      name: data.name.trim(),
      xp: Number(data.xp),
      dueDate: data.dueDate,
      distribution: taskDistributionFromForm(data),
    });
  }
  if (type === "workout") logWorkout(form);
  if (type === "workout-plan") {
    createWorkoutPlan(state, {
      name: data.name,
      color: data.color,
      notes: data.notes,
    });
  }
  if (type === "workout-day") {
    createWorkoutDay(state, {
      name: data.name,
      color: data.color,
      notes: data.notes,
    });
  }
  if (type === "workout-session") {
    logWorkoutSession(state, {
      date: data.date,
      planId: data.planId,
      dayId: data.dayId,
    });
  }
  if (type === "workout-builder-plan") {
    saveWorkoutBuilderPlan(state, {
      name: data.name,
      color: data.color,
      notes: data.notes,
    });
  }
  if (type === "workout-builder-day") {
    saveWorkoutBuilderDay(state, {
      name: data.name,
      color: data.color,
      notes: data.notes,
    });
  }
  if (type === "workout-builder-exercise") {
    addBuilderExerciseToWorkoutDay(state, exerciseById.get(data.exerciseId), {
      sets: Number(data.sets || 3),
      reps: Number(data.reps || 0),
      holdSeconds: Number(data.holdSeconds || 0),
      weight: Number(data.weight || 0),
      restSeconds: Number(data.restSeconds || 90),
      notes: data.notes || "",
    });
  }
  if (type === "tech-search") searchTechSkill(form);
  if (type === "reading") logReading(form);
  if (type === "boss") addBoss(form);

  checkAchievements(state);
  render();
}

function taskDistributionFromForm(data) {
  const weightA = Number(data.weightA || 0);
  const weightB = Number(data.weightB || 0);
  if (data.useSplit !== "yes" || !data.statA || !data.statB || weightA + weightB <= 0) {
    return distributionFromCategory("Discipline");
  }
  if (data.statA === data.statB) {
    return { [data.statA]: weightA + weightB };
  }
  return {
    [data.statA]: weightA,
    [data.statB]: weightB,
  };
}

function handleAction(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  if (event.type === "click" && actionTarget.matches('input[type="checkbox"]')) return;
  if (
    event.type === "click" &&
    actionTarget.matches('input[data-action^="workout-"], select[data-action^="workout-"], textarea[data-action^="workout-"]')
  ) {
    return;
  }
  const { action, id, index } = actionTarget.dataset;

  if (action === "complete-task") completeTask(id);
  if (action === "delete-task") {
    const task = state.tasks.find((item) => item.id === id);
    removeCalendarTask(state, task);
    state.tasks = state.tasks.filter((item) => item.id !== id);
  }
  if (action === "toggle-task-history") state.taskHistoryVisible = !state.taskHistoryVisible;
  if (action === "toggle-calendar-habit") toggleHabit(state, actionTarget.dataset.date, id);
  if (action === "go-to-tasks") activeTab = "tasks";
  if (action === "skill-up") progressSkill(id, 1);
  if (action === "skill-down") progressSkill(id, -1);
  if (action === "defeat-boss") defeatBoss(id);
  if (action === "delete-boss") state.bosses = state.bosses.filter((boss) => boss.id !== id);
  if (action === "claim-achievement") claimAchievement(state, id);
  if (action === "workout-open-builder") {
    openWorkoutBuilder(state, actionTarget.dataset.mode || "create", {
      planId: id,
      dayId: actionTarget.dataset.dayId,
      step: actionTarget.dataset.step,
    });
  }
  if (action === "workout-close-builder") closeWorkoutBuilder(state);
  if (action === "workout-builder-step") setWorkoutBuilderStep(state, actionTarget.dataset.step);
  if (action === "workout-builder-type") {
    setWorkoutBuilderValue(state, "trainingType", actionTarget.dataset.value);
    setWorkoutBuilderStep(state, "plan");
  }
  if (action === "workout-builder-use-day") {
    const day = state.workout.plans
      .find((plan) => plan.id === state.workout.builder.planId)
      ?.days.find((item) => item.id === id);
    setWorkoutBuilderValue(state, "dayId", id);
    setWorkoutBuilderValue(state, "dayName", day?.name || "");
    state.workout.builder.draft.dayName = day?.name || "";
    state.workout.builder.draft.dayColor = day?.color || state.workout.builder.draft.dayColor;
    state.workout.builder.draft.dayNotes = day?.notes || "";
    setWorkoutBuilderStep(state, "category");
  }
  if (action === "workout-builder-category") {
    setWorkoutBuilderValue(state, "category", actionTarget.dataset.value);
    setWorkoutBuilderStep(state, "subcategory");
  }
  if (action === "workout-builder-subcategory") {
    setWorkoutBuilderValue(state, "subcategory", actionTarget.dataset.value);
    setWorkoutBuilderStep(state, "progression");
  }
  if (action === "workout-builder-progression") setWorkoutBuilderValue(state, "progressionGroup", actionTarget.dataset.value);
  if (action === "workout-builder-expand-exercise") {
    setWorkoutBuilderValue(
      state,
      "expandedExerciseId",
      state.workout.builder.expandedExerciseId === id ? null : id
    );
  }
  if (action === "workout-builder-configure-exercise") {
    setWorkoutBuilderValue(state, "selectedExerciseId", id);
    setWorkoutBuilderStep(state, "configure");
  }
  if (action === "workout-builder-filter") setWorkoutBuilderValue(state, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-log-day") {
    selectWorkoutPlan(state, actionTarget.dataset.planId);
    selectWorkoutDay(state, actionTarget.dataset.dayId);
    logWorkoutSession(state, {
      date: todayKey(),
      planId: actionTarget.dataset.planId,
      dayId: actionTarget.dataset.dayId,
    });
  }
  if (action === "workout-select-plan") selectWorkoutPlan(state, id);
  if (action === "workout-quick-plan") selectWorkoutPlan(state, actionTarget.value);
  if (action === "workout-update-plan") updateWorkoutPlan(state, id, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-duplicate-plan") duplicateWorkoutPlan(state, id);
  if (action === "workout-delete-plan") deleteWorkoutPlan(state, id);
  if (action === "workout-select-day") selectWorkoutDay(state, id || actionTarget.value);
  if (action === "workout-update-day") updateWorkoutDay(state, id, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-duplicate-day") duplicateWorkoutDay(state, id);
  if (action === "workout-delete-day") deleteWorkoutDay(state, id);
  if (action === "workout-add-exercise") addExerciseToWorkoutDay(state, exerciseById.get(id));
  if (action === "workout-update-exercise") updateWorkoutExercise(state, id, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-move-exercise") moveWorkoutExercise(state, id, actionTarget.dataset.direction);
  if (action === "workout-duplicate-exercise") duplicateWorkoutExercise(state, id);
  if (action === "workout-remove-exercise") removeWorkoutExercise(state, id);
  if (action === "workout-filter-tab") setWorkoutBrowserFilter(state, actionTarget.dataset.fieldName, actionTarget.dataset.value);
  if (action === "workout-filter-select") setWorkoutBrowserFilter(state, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-history-filter") setWorkoutHistoryFilter(state, actionTarget.dataset.fieldName, actionTarget.value);
  if (action === "workout-calendar-month") shiftWorkoutCalendarMonth(state, actionTarget.dataset.direction);
  if (action === "workout-select-session") selectWorkoutSession(state, id);
  if (action === "tech-nav-next" || action === "tech-breadcrumb") {
    state.techSkillNav = {
      path: decodeTechPath(actionTarget.dataset.path),
    };
    state.techSkillSearch = {
      ...state.techSkillSearch,
      focusId: null,
    };
  }
  if (action === "tech-search-jump") {
    const skill = getTechSkillById(id);
    state.techSkillSearch = {
      query: skill?.name || state.techSkillSearch?.query || "",
      focusId: id,
    };
    state.techSkillNav = {
      path: decodeTechPath(actionTarget.dataset.path),
    };
  }
  if (action === "toggle-tech-skill") toggleTechSkill(id, actionTarget.checked);
  if (action === "toggle-boss-objective") {
    const boss = state.bosses.find((item) => item.id === id);
    if (boss && boss.objectives[index]) {
      boss.objectives[index].done = actionTarget.checked;
    }
  }

  checkAchievements(state);
  render();
}

nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  activeTab = button.dataset.tab;
  render();
});

view.addEventListener("submit", handleForm);
view.addEventListener("click", handleAction);
view.addEventListener("change", (event) => {
  if (event.target.matches('[data-action="toggle-boss-objective"], [data-action="toggle-tech-skill"], [data-action="complete-task"], [data-action^="workout-"]')) handleAction(event);
});
view.addEventListener("input", (event) => {
  const builderSearch = event.target.closest('[data-action="workout-builder-search"]');
  if (builderSearch) {
    const cursor = builderSearch.selectionStart;
    setWorkoutBuilderValue(state, "query", builderSearch.value);
    render();
    requestAnimationFrame(() => {
      const search = document.querySelector('[data-action="workout-builder-search"]');
      search?.focus();
      search?.setSelectionRange(cursor, cursor);
    });
    return;
  }
  const target = event.target.closest('[data-action="workout-search"]');
  if (!target) return;
  const cursor = target.selectionStart;
  setWorkoutBrowserFilter(state, "query", target.value);
  render();
  requestAnimationFrame(() => {
    const search = document.querySelector('[data-action="workout-search"]');
    search?.focus();
    search?.setSelectionRange(cursor, cursor);
  });
});
view.addEventListener("dragstart", (event) => {
  const row = event.target.closest("[data-workout-drag-id]");
  if (!row) return;
  draggedWorkoutExerciseId = row.dataset.workoutDragId;
  event.dataTransfer.effectAllowed = "move";
});
view.addEventListener("dragover", (event) => {
  if (!draggedWorkoutExerciseId || !event.target.closest("[data-workout-index]")) return;
  event.preventDefault();
});
view.addEventListener("drop", (event) => {
  const row = event.target.closest("[data-workout-index]");
  if (!draggedWorkoutExerciseId || !row) return;
  event.preventDefault();
  moveWorkoutExerciseToIndex(state, draggedWorkoutExerciseId, row.dataset.workoutIndex);
  draggedWorkoutExerciseId = null;
  render();
});
view.addEventListener("focusout", (event) => {
  if (!event.target.matches('[data-field="player-name"]')) return;
  const nextName = event.target.textContent.trim();
  state.player.name = nextName || "Player One";
  persist(state);
  render();
});

document.getElementById("export-data").addEventListener("click", () => exportSave(state));
themeSelect?.addEventListener("change", (event) => {
  state.uiTheme = event.target.value;
  applyTheme(state.uiTheme);
  persist(state);
  render();
});
document.getElementById("import-data").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = await importSave(file);
    replaceState(state, imported);
    applyTheme(state.uiTheme || "aether");
    if (themeSelect) themeSelect.value = state.uiTheme || "aether";
    render();
  } catch (error) {
    alert("That save file could not be imported.");
    console.error(error);
  } finally {
    event.target.value = "";
  }
});
document.getElementById("reset-data").addEventListener("click", () => {
  if (!confirm("Reset all Life RPG data on this browser?")) return;
  clearSave();
  replaceState(state, loadGameState());
  activeTab = "dashboard";
  render();
});

initLiquidSystem();
render();
