import {
  addXP,
  addTask,
  archiveCompletedTask,
  awardXP,
  claimAchievement,
  checkAchievements,
  distributionFromCategory,
  loadGameState,
  persist,
  removeCalendarTask,
  replaceState,
  SKILL_LEVELS,
  todayKey,
  toggleHabit,
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

const state = loadGameState();
let activeTab = "dashboard";

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
  if (activeTab === "workout") {
    requestAnimationFrame(() => drawWorkoutChart(document.getElementById("workout-detail-chart"), state, "Max pushups"));
  }
  if (activeTab === "tech" && state.techSkillSearch?.focusId) {
    requestAnimationFrame(() => {
      const target = document.querySelector(`[data-skill-anchor="${state.techSkillSearch.focusId}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
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
  if (event.target.matches('[data-action="toggle-boss-objective"], [data-action="toggle-tech-skill"], [data-action="complete-task"]')) handleAction(event);
});
view.addEventListener("focusout", (event) => {
  if (!event.target.matches('[data-field="player-name"]')) return;
  const nextName = event.target.textContent.trim();
  state.player.name = nextName || "Player One";
  persist(state);
  render();
});

document.getElementById("export-data").addEventListener("click", () => exportSave(state));
document.getElementById("import-data").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = await importSave(file);
    replaceState(state, imported);
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

render();
