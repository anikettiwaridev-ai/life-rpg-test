import { formatDistribution } from "./tasks.js";
import { habitStreak, todayKey } from "./state.js";

const habitCategories = ["Discipline", "Intelligence", "Strength", "Communication", "Reading", "Coding"];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderHabits(state) {
  const today = todayKey();
  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Daily Habits</h3>
            <p class="muted">Repeatable actions build streaks and stat progress.</p>
          </div>
          <span class="badge">🔥 ${state.player.streak} day streak</span>
        </div>
        <form class="form-grid" data-form="habit">
          <div class="field">
            <label for="habit-name">Habit name</label>
            <input id="habit-name" name="name" required placeholder="Practice coding" />
          </div>
          <div class="field">
            <label for="habit-category">Category</label>
            <select id="habit-category" name="category">
              ${habitCategories.map((category) => `<option>${category}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="habit-xp">Daily XP</label>
            <input id="habit-xp" name="xp" type="number" min="20" max="120" value="40" required />
          </div>
          <button class="primary-button" type="submit">Add</button>
        </form>
      </div>

      <div class="panel">
        <div class="section-title">
          <h3>Today</h3>
          <span class="badge">${state.habits.filter((habit) => habit.completions.includes(today)).length}/${state.habits.length} done</span>
        </div>
        <div class="item-list">
          ${state.habits.map((habit) => renderHabitRow(habit, today)).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderHabitRow(habit, today) {
  const doneToday = habit.completions.includes(today);
  return `
    <article class="item-row ${doneToday ? "completed" : ""}">
      <div>
        <h4>${esc(habit.name)}</h4>
        <div class="row-meta">
          <span>${habit.xp} XP · ${formatDistribution(habit.distribution)}</span>
          <span>🔥 ${habitStreak(habit)} habit streak</span>
        </div>
      </div>
      <div class="row-actions">
        ${
          doneToday
            ? `<span class="badge">Done today</span>`
            : `<button class="primary-button" data-action="complete-habit" data-id="${habit.id}">Complete</button>`
        }
        <button class="ghost-button" data-action="delete-habit" data-id="${habit.id}">Delete</button>
      </div>
    </article>
  `;
}
