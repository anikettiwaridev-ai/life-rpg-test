import { getSelectedWorkoutPlan, todayKey } from "./state.js";
import {
  exerciseById,
  exerciseDatabase,
  workoutCategoryFilters,
  workoutDifficulties,
  workoutExerciseTypes,
} from "./workoutData.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function attr(value) {
  return esc(value).replace(/`/g, "&#096;");
}

function categoryList() {
  return workoutCategoryFilters.filter((category) => category !== "All");
}

function monthDates(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const first = new Date(year, month - 1, 1);
  const total = new Date(year, month, 0).getDate();
  return {
    label: first.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    blanks: first.getDay(),
    days: Array.from({ length: total }, (_, index) => `${monthKey}-${String(index + 1).padStart(2, "0")}`),
  };
}

function workoutNotation(exercise) {
  if (exercise.type === "hold") return `${exercise.sets} x ${exercise.holdSeconds}s`;
  if (exercise.type === "weighted") return `${exercise.sets} x ${exercise.reps} @ ${exercise.weight || 0}`;
  return `${exercise.sets} x ${exercise.reps}`;
}

function planExerciseCount(plan) {
  return plan.days.reduce((sum, day) => sum + day.exercises.length, 0);
}

function chainFor(group) {
  return exerciseDatabase
    .filter((exercise) => exercise.progressionGroup === group)
    .sort((a, b) => a.progressionLevel - b.progressionLevel);
}

function subcategoriesFor(category) {
  return [...new Set(exerciseDatabase.filter((exercise) => exercise.category === category).map((exercise) => exercise.subcategory))];
}

function progressionGroupsFor(category, subcategory) {
  return [...new Set(
    exerciseDatabase
      .filter((exercise) => exercise.category === category && exercise.subcategory === subcategory)
      .map((exercise) => exercise.progressionGroup)
  )];
}

function selectedBuilderPlan(state) {
  return state.workout.plans.find((plan) => plan.id === state.workout.builder.planId) || getSelectedWorkoutPlan(state);
}

function selectedBuilderDay(state) {
  const plan = selectedBuilderPlan(state);
  return plan?.days.find((day) => day.id === state.workout.builder.dayId) || null;
}

function filteredBuilderExercises(builder) {
  const query = (builder.query || "").trim().toLowerCase();
  return chainFor(builder.progressionGroup).filter((exercise) => {
    const haystack = [exercise.name, exercise.difficulty, exercise.type, ...exercise.tags].join(" ").toLowerCase();
    return (
      (!query || haystack.includes(query)) &&
      (!builder.difficulty || builder.difficulty === "All" || exercise.difficulty === builder.difficulty) &&
      (!builder.type || builder.type === "All" || exercise.type === builder.type)
    );
  });
}

export function renderWorkout(state) {
  const plans = state.workout.plans;
  const selectedPlan = getSelectedWorkoutPlan(state);
  return `
    <div class="workout-focus-shell ${plans.length ? "" : "is-empty"}">
      ${plans.length ? renderPlanWorkspace(state, selectedPlan) : renderCleanEntry()}
      ${plans.length ? renderTrainingHistory(state) : ""}
      ${state.workout.builder.open ? renderBuilderOverlay(state) : ""}
    </div>
  `;
}

function renderCleanEntry() {
  return `
    <section class="workout-entry">
      <div class="workout-entry-glow"></div>
      <div class="workout-entry-card">
        <p class="eyebrow">Training OS</p>
        <h3>Create Workout Plan</h3>
        <p class="muted">Build a guided plan, add training days, then choose exercises one layer at a time.</p>
        <button class="primary-button" type="button" data-action="workout-open-builder" data-mode="create">Create Plan</button>
      </div>
    </section>
  `;
}

function renderPlanWorkspace(state, selectedPlan) {
  return `
    <section class="workout-command">
      <div class="workout-command-head">
        <div>
          <p class="eyebrow">Training Plans</p>
          <h3>Workout Operating System</h3>
        </div>
        <button class="primary-button" type="button" data-action="workout-open-builder" data-mode="create">Create Plan</button>
      </div>
      <div class="workout-plan-dashboard">
        <aside class="workout-plan-strip">
          <h4>Existing Plans</h4>
          <div class="workout-plan-stack">
            ${state.workout.plans.map((plan) => renderCompactPlanCard(plan, selectedPlan?.id === plan.id)).join("")}
          </div>
        </aside>
        <div class="workout-plan-detail">
          ${selectedPlan ? renderSelectedPlan(state, selectedPlan) : `<div class="empty-state"><div><h3>Select a plan</h3><p>Your training days will appear here.</p></div></div>`}
        </div>
      </div>
    </section>
  `;
}

function renderCompactPlanCard(plan, active) {
  return `
    <article class="workout-plan-card compact ${active ? "active" : ""}" style="--workout-color:${attr(plan.color)}">
      <button type="button" data-action="workout-select-plan" data-id="${attr(plan.id)}">
        <span class="workout-color-dot"></span>
        <span>
          <strong>${esc(plan.name)}</strong>
          <small>${plan.days.length} training days - ${planExerciseCount(plan)} exercises</small>
        </span>
      </button>
      <div class="workout-card-actions">
        <button class="ghost-button" type="button" data-action="workout-open-builder" data-mode="edit" data-id="${attr(plan.id)}" data-step="plan">Edit</button>
        <button class="ghost-button" type="button" data-action="workout-duplicate-plan" data-id="${attr(plan.id)}">Duplicate</button>
      </div>
    </article>
  `;
}

function renderSelectedPlan(state, plan) {
  return `
    <div class="workout-selected-plan" style="--workout-color:${attr(plan.color)}">
      <div class="workout-selected-head">
        <div>
          <span class="workout-color-dot large"></span>
          <h3>${esc(plan.name)}</h3>
          <p class="muted">${esc(plan.notes || "No plan notes yet.")}</p>
        </div>
        <div class="workout-card-actions">
          <button class="ghost-button" type="button" data-action="workout-open-builder" data-mode="day" data-id="${attr(plan.id)}" data-step="day">Add Training Day</button>
          <button class="ghost-button danger-text" type="button" data-action="workout-delete-plan" data-id="${attr(plan.id)}">Delete Plan</button>
        </div>
      </div>
      <div class="training-day-grid">
        ${plan.days.length ? plan.days.map((day) => renderTrainingDayCard(plan, day)).join("") : `
          <div class="empty-state">
            <div>
              <h3>No training days</h3>
              <p>Add a training day, then choose exercises from the guided planner.</p>
            </div>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderTrainingDayCard(plan, day) {
  return `
    <article class="training-day-card" style="--workout-color:${attr(day.color)}">
      <div class="training-day-head">
        <div>
          <span class="workout-color-dot"></span>
          <h4>${esc(day.name)}</h4>
          <p>${esc(day.notes || "Custom training block")}</p>
        </div>
        <span>${day.exercises.length}</span>
      </div>
      <div class="training-day-exercises">
        ${day.exercises.length ? day.exercises.slice(0, 6).map((exercise) => `
          <div>
            <strong>${esc(exercise.name)}</strong>
            <span>${esc(workoutNotation(exercise))}</span>
          </div>
        `).join("") : `<p class="muted">No exercises yet.</p>`}
      </div>
      <div class="workout-card-actions">
        <button class="primary-button" type="button" data-action="workout-log-day" data-plan-id="${attr(plan.id)}" data-day-id="${attr(day.id)}" ${day.exercises.length ? "" : "disabled"}>Start Workout</button>
        <button class="ghost-button" type="button" data-action="workout-open-builder" data-mode="exercise" data-id="${attr(plan.id)}" data-day-id="${attr(day.id)}" data-step="category">Add Exercise</button>
        <button class="ghost-button" type="button" data-action="workout-open-builder" data-mode="day" data-id="${attr(plan.id)}" data-day-id="${attr(day.id)}" data-step="day">Edit</button>
      </div>
    </article>
  `;
}

function renderTrainingHistory(state) {
  const month = monthDates(state.workout.calendarMonth || todayKey().slice(0, 7));
  const selectedSession = state.workout.sessions.find((session) => session.id === state.workout.selectedSessionId) || state.workout.sessions[0];
  return `
    <section class="workout-history-surface">
      <div class="panel workout-calendar-panel">
        <div class="section-title">
          <div>
            <h3>Training Calendar</h3>
            <p class="muted">${esc(month.label)} history</p>
          </div>
          <div class="workout-card-actions">
            <button class="ghost-button" type="button" data-action="workout-calendar-month" data-direction="-1">Prev</button>
            <button class="ghost-button" type="button" data-action="workout-calendar-month" data-direction="1">Next</button>
          </div>
        </div>
        <div class="workout-weekdays">
          ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}
        </div>
        <div class="workout-calendar-grid compact">
          ${Array.from({ length: month.blanks }, () => `<div class="workout-calendar-empty"></div>`).join("")}
          ${month.days.map((date) => renderWorkoutCalendarDay(state, date)).join("")}
        </div>
      </div>
      <div class="panel workout-session-details compact">
        ${renderSessionDetails(selectedSession)}
      </div>
      <div class="panel workout-history-panel">
        <div class="section-title">
          <div>
            <h3>Recent Workouts</h3>
            <p class="muted">Open previous sessions without leaving the page.</p>
          </div>
        </div>
        <div class="item-list">
          ${state.workout.sessions.length ? state.workout.sessions.slice(0, 8).map(renderHistoryItem).join("") : `<p class="muted">No sessions logged yet.</p>`}
        </div>
      </div>
    </section>
  `;
}

function renderWorkoutCalendarDay(state, date) {
  const day = Number(date.slice(-2));
  const sessions = state.workout.sessions.filter((session) => session.date === date);
  const latest = sessions[0];
  const content = `
    <div class="workout-calendar-date">
      <span>${day}</span>
      ${sessions.length ? `<strong>${sessions.length}</strong>` : ""}
    </div>
    <div class="workout-calendar-markers">
      ${sessions.slice(0, 4).map((session) => `<span style="--workout-color:${attr(session.color)}" title="${attr(session.dayName)}"></span>`).join("")}
    </div>
    ${latest ? `<small>${esc(latest.dayName)}</small>` : ""}
  `;
  if (!latest) return `<div class="workout-calendar-day">${content}</div>`;
  return `<button class="workout-calendar-day logged" type="button" style="--workout-color:${attr(latest.color)}" data-action="workout-select-session" data-id="${attr(latest.id)}">${content}</button>`;
}

function renderSessionDetails(session) {
  if (!session) {
    return `
      <div class="empty-state compact">
        <div>
          <h3>No workout selected</h3>
          <p>Log a workout or select a calendar day.</p>
        </div>
      </div>
    `;
  }
  return `
    <div class="section-title">
      <div>
        <h3>${esc(session.dayName)}</h3>
        <p class="muted">${esc(session.date)} - ${esc(session.planName)}</p>
      </div>
      <span class="workout-color-dot large" style="--workout-color:${attr(session.color)}"></span>
    </div>
    <div class="workout-session-exercises">
      ${session.exercises.map((exercise) => `
        <article>
          <strong>${esc(exercise.name)}</strong>
          <span>${esc(workoutNotation(exercise))} - ${exercise.restSeconds}s rest</span>
          ${exercise.notes ? `<p>${esc(exercise.notes)}</p>` : ""}
        </article>
      `).join("")}
    </div>
  `;
}

function renderHistoryItem(session) {
  return `
    <button class="workout-history-item" type="button" data-action="workout-select-session" data-id="${attr(session.id)}">
      <span class="workout-color-dot" style="--workout-color:${attr(session.color)}"></span>
      <span>
        <strong>${esc(session.dayName)}</strong>
        <small>${esc(session.date)} - ${esc(session.planName)} - ${session.exercises.length} exercises</small>
      </span>
    </button>
  `;
}

function renderBuilderOverlay(state) {
  const builder = state.workout.builder;
  return `
    <div class="workout-builder-backdrop">
      <section class="workout-builder-modal">
        <div class="workout-builder-top">
          <div>
            <p class="eyebrow">Guided Planner</p>
            <h3>${builder.mode === "create" ? "Create Workout Plan" : "Build Training Day"}</h3>
          </div>
          <button class="icon-button" type="button" data-action="workout-close-builder">x</button>
        </div>
        ${renderBuilderProgress(builder)}
        <div class="workout-builder-body">
          ${renderBuilderStep(state)}
        </div>
      </section>
    </div>
  `;
}

function renderBuilderProgress(builder) {
  const steps = [
    ["type", "Type"],
    ["plan", "Plan"],
    ["day", "Training Day"],
    ["category", "Category"],
    ["subcategory", "Focus"],
    ["progression", "Progression"],
    ["configure", "Configure"],
  ];
  const activeIndex = steps.findIndex(([step]) => step === builder.step);
  return `
    <div class="workout-stepper">
      ${steps.map(([step, label], index) => `
        <button type="button" class="${index <= activeIndex ? "active" : ""}" data-action="workout-builder-step" data-step="${attr(step)}" ${index <= activeIndex ? "" : "disabled"}>
          <span>${index + 1}</span>${esc(label)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderBuilderStep(state) {
  const builder = state.workout.builder;
  if (builder.step === "type") return renderTypeStep(builder);
  if (builder.step === "plan") return renderPlanStep(builder);
  if (builder.step === "day") return renderDayStep(state);
  if (builder.step === "category") return renderCategoryStep();
  if (builder.step === "subcategory") return renderSubcategoryStep(builder);
  if (builder.step === "progression") return renderProgressionStep(builder);
  if (builder.step === "configure") return renderConfigureStep(builder);
  return renderTypeStep(builder);
}

function renderTypeStep(builder) {
  return `
    <div class="builder-choice-grid">
      ${["Calisthenics", "Gym"].map((type) => `
        <button class="builder-choice-card ${builder.trainingType === type ? "active" : ""}" type="button" data-action="workout-builder-type" data-value="${type}">
          <strong>${type}</strong>
          <span>${type === "Calisthenics" ? "Bodyweight progressions, holds, skills, and control." : "Prepared for future weighted and machine training."}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderPlanStep(builder) {
  return `
    <form class="builder-form" data-form="workout-builder-plan">
      <div class="field">
        <label>Plan Name</label>
        <input name="name" required value="${attr(builder.draft.planName)}" placeholder="Beginner Strength" />
      </div>
      <div class="field">
        <label>Plan Color</label>
        <input name="color" type="color" value="${attr(builder.draft.planColor)}" />
      </div>
      <div class="field full">
        <label>Plan Notes</label>
        <textarea name="notes" rows="3" placeholder="Purpose, equipment, focus">${esc(builder.draft.planNotes)}</textarea>
      </div>
      <button class="primary-button" type="submit">Continue</button>
    </form>
  `;
}

function renderDayStep(state) {
  const builder = state.workout.builder;
  const plan = selectedBuilderPlan(state);
  return `
    <div class="builder-split">
      <form class="builder-form" data-form="workout-builder-day">
        <div class="field">
          <label>Training Day</label>
          <input name="name" required value="${attr(builder.draft.dayName)}" placeholder="Push, Pull, Skill Day..." />
        </div>
        <div class="field">
          <label>Color</label>
          <input name="color" type="color" value="${attr(builder.draft.dayColor)}" />
        </div>
        <div class="field full">
          <label>Description</label>
          <textarea name="notes" rows="3" placeholder="Intent, skill focus, constraints">${esc(builder.draft.dayNotes)}</textarea>
        </div>
        <button class="primary-button" type="submit">${builder.dayId ? "Continue" : "Add Training Day"}</button>
      </form>
      <div class="builder-existing-days">
        <h4>Saved Days</h4>
        ${plan?.days.length ? plan.days.map((day) => `
          <button type="button" class="${builder.dayId === day.id ? "active" : ""}" data-action="workout-builder-use-day" data-id="${attr(day.id)}">
            <span class="workout-color-dot" style="--workout-color:${attr(day.color)}"></span>
            <span><strong>${esc(day.name)}</strong><small>${day.exercises.length} exercises</small></span>
          </button>
        `).join("") : `<p class="muted">Add your first training day to continue.</p>`}
      </div>
    </div>
  `;
}

function renderCategoryStep() {
  return `
    <div>
      <div class="builder-section-heading">
        <h4>Choose Category</h4>
        <p class="muted">Pick one focus first. The library stays hidden until it matters.</p>
      </div>
      <div class="builder-choice-grid compact">
        ${categoryList().map((category) => `
          <button class="builder-choice-card" type="button" data-action="workout-builder-category" data-value="${attr(category)}">
            <strong>${esc(category)}</strong>
            <span>${exerciseDatabase.filter((exercise) => exercise.category === category || exercise.tags.includes(category.toLowerCase())).length} movements</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderSubcategoryStep(builder) {
  const subcategories = subcategoriesFor(builder.category);
  return `
    <div>
      <div class="builder-section-heading">
        <button class="ghost-button" type="button" data-action="workout-builder-step" data-step="category">Back</button>
        <div>
          <h4>${esc(builder.category)}</h4>
          <p class="muted">Choose the movement family.</p>
        </div>
      </div>
      <div class="builder-choice-grid compact">
        ${subcategories.map((subcategory) => `
          <button class="builder-choice-card" type="button" data-action="workout-builder-subcategory" data-value="${attr(subcategory)}">
            <strong>${esc(subcategory)}</strong>
            <span>${progressionGroupsFor(builder.category, subcategory).length} progressions</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderProgressionStep(builder) {
  const groups = progressionGroupsFor(builder.category, builder.subcategory);
  const activeChain = builder.progressionGroup ? filteredBuilderExercises(builder) : [];
  return `
    <div>
      <div class="builder-section-heading">
        <button class="ghost-button" type="button" data-action="workout-builder-step" data-step="subcategory">Back</button>
        <div>
          <h4>${esc(builder.subcategory || builder.category)}</h4>
          <p class="muted">Progressions are grouped. Expand only the chain you need.</p>
        </div>
      </div>
      <div class="progression-group-list">
        ${groups.map((group) => renderProgressionGroup(group, builder.progressionGroup === group)).join("")}
      </div>
      ${builder.progressionGroup ? `
        <div class="builder-library-tools">
          <input data-action="workout-builder-search" value="${attr(builder.query)}" placeholder="Search this progression..." />
          <select data-action="workout-builder-filter" data-field-name="difficulty">
            ${workoutDifficulties.map((difficulty) => `<option value="${attr(difficulty)}" ${builder.difficulty === difficulty ? "selected" : ""}>${esc(difficulty)}</option>`).join("")}
          </select>
          <select data-action="workout-builder-filter" data-field-name="type">
            ${workoutExerciseTypes.map((type) => `<option value="${attr(type)}" ${builder.type === type ? "selected" : ""}>${esc(type)}</option>`).join("")}
          </select>
        </div>
        <div class="compact-exercise-list">
          ${activeChain.map((exercise) => renderCompactExerciseRow(exercise, builder)).join("") || `<p class="muted">No exercise matches this filter.</p>`}
        </div>
      ` : ""}
    </div>
  `;
}

function renderProgressionGroup(group, active) {
  const chain = chainFor(group);
  const first = chain[0];
  const last = chain[chain.length - 1];
  return `
    <button class="progression-group-card ${active ? "active" : ""}" type="button" data-action="workout-builder-progression" data-value="${attr(group)}">
      <span>
        <strong>${esc(group.replace(" Chain", ""))}</strong>
        <small>${esc(first.name)} to ${esc(last.name)}</small>
      </span>
      <span>${chain.length}</span>
    </button>
  `;
}

function renderCompactExerciseRow(exercise, builder) {
  const chain = chainFor(exercise.progressionGroup);
  const next = exerciseById.get(exercise.nextExercise);
  const expanded = builder.expandedExerciseId === exercise.id;
  return `
    <article class="compact-exercise-row ${expanded ? "expanded" : ""}">
      <button type="button" class="compact-exercise-main" data-action="workout-builder-expand-exercise" data-id="${attr(exercise.id)}">
        <span>
          <strong>${esc(exercise.name)}</strong>
          <small>${esc(exercise.difficulty)} - Next: ${next ? esc(next.name) : "Mastery"}</small>
        </span>
        <span class="progression-dots">
          ${chain.map((item) => `<i class="${item.id === exercise.id ? "active" : ""}"></i>`).join("")}
        </span>
      </button>
      <button class="primary-button" type="button" data-action="workout-builder-configure-exercise" data-id="${attr(exercise.id)}">Add</button>
      ${expanded ? `
        <div class="compact-exercise-details">
          <p>${esc(exercise.notes)}</p>
          <div class="tag-row">${exercise.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        </div>
      ` : ""}
    </article>
  `;
}

function renderConfigureStep(builder) {
  const exercise = exerciseById.get(builder.selectedExerciseId);
  if (!exercise) {
    return `<div class="empty-state"><div><h3>No exercise selected</h3><p>Choose an exercise to configure.</p></div></div>`;
  }
  return `
    <form class="builder-form" data-form="workout-builder-exercise">
      <div class="builder-config-heading">
        <div>
          <h4>${esc(exercise.name)}</h4>
          <p class="muted">${esc(exercise.category)} - ${esc(exercise.subcategory)} - ${esc(exercise.difficulty)}</p>
        </div>
        <button class="ghost-button" type="button" data-action="workout-builder-step" data-step="progression">Back</button>
      </div>
      <input type="hidden" name="exerciseId" value="${attr(exercise.id)}" />
      <div class="field">
        <label>Sets</label>
        <input name="sets" type="number" min="1" value="${attr(builder.draft.sets)}" />
      </div>
      ${exercise.type === "hold" ? `
        <div class="field">
          <label>Hold Seconds</label>
          <input name="holdSeconds" type="number" min="0" value="${attr(builder.draft.holdSeconds)}" />
        </div>
      ` : `
        <div class="field">
          <label>Reps</label>
          <input name="reps" type="number" min="0" value="${attr(builder.draft.reps)}" />
        </div>
      `}
      ${exercise.type === "weighted" ? `
        <div class="field">
          <label>Weight</label>
          <input name="weight" type="number" min="0" value="${attr(builder.draft.weight)}" />
        </div>
      ` : ""}
      <div class="field">
        <label>Rest Seconds</label>
        <input name="restSeconds" type="number" min="0" value="${attr(builder.draft.restSeconds)}" />
      </div>
      <div class="field full">
        <label>Notes</label>
        <textarea name="notes" rows="3" placeholder="Tempo, cues, range, assistance">${esc(builder.draft.notes)}</textarea>
      </div>
      <button class="primary-button" type="submit">Save Exercise</button>
    </form>
  `;
}
