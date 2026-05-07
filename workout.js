import { getPersonalBest } from "./state.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderWorkout(state) {
  const metrics = Object.keys(state.workout.metrics);
  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Workout Performance</h3>
            <p class="muted">Track records, personal bests, and movement progress. No calories, no clutter.</p>
          </div>
        </div>
        <form class="form-grid" data-form="workout">
          <div class="field">
            <label for="workout-metric">Metric</label>
            <select id="workout-metric" name="metric">
              ${metrics.map((metric) => `<option>${metric}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="workout-value">Value</label>
            <input id="workout-value" name="value" type="number" min="1" step="1" required placeholder="50" />
          </div>
          <div class="field">
            <label for="workout-date">Date</label>
            <input id="workout-date" name="date" type="date" required value="${new Date().toISOString().slice(0, 10)}" />
          </div>
          <button class="primary-button" type="submit">Log PR</button>
        </form>
      </div>

      <div class="grid four">
        ${metrics.map((metric) => `
          <article class="card">
            <div class="card-meta"><span>${esc(metric)}</span><span>PB</span></div>
            <div class="stat-value">${getPersonalBest(state, metric)}</div>
            <p class="muted">${state.workout.metrics[metric].length} logs</p>
          </article>
        `).join("")}
      </div>

      <div class="grid two">
        <section class="panel chart-box">
          <div class="section-title"><h3>Pushup Improvement</h3></div>
          <canvas id="workout-detail-chart"></canvas>
        </section>
        <section class="panel">
          <div class="section-title"><h3>Record Log</h3></div>
          <div class="item-list">
            ${renderWorkoutLog(state, metrics)}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderWorkoutLog(state, metrics) {
  const entries = metrics.flatMap((metric) =>
    state.workout.metrics[metric].map((entry) => ({ ...entry, metric }))
  ).sort((a, b) => b.date.localeCompare(a.date));

  if (!entries.length) {
    return `<p class="muted">Log a record to start the performance timeline.</p>`;
  }

  return entries.slice(0, 10).map((entry) => `
    <article class="item-row">
      <div>
        <h4>${esc(entry.metric)}</h4>
        <div class="row-meta"><span>${esc(entry.date)}</span><span>${entry.value}</span></div>
      </div>
    </article>
  `).join("");
}
