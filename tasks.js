import { STATS } from "./state.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function formatDistribution(distribution) {
  return STATS
    .filter((stat) => distribution?.[stat] ?? distribution?.[stat.toLowerCase()])
    .map((stat) => `${stat} ${distribution[stat] ?? distribution[stat.toLowerCase()]}%`)
    .join(" · ");
}

function formatXPBreakdown(task) {
  const shortNames = {
    Discipline: "DIS",
    Intelligence: "INT",
    Strength: "STR",
    Communication: "COM",
    Focus: "FOC",
    Creativity: "CRE",
  };
  const contributions = STATS
    .map((stat) => ({
      stat,
      amount: Math.round(Number(task.xp || 0) * normalizeWeight(task.distribution?.[stat] ?? task.distribution?.[stat.toLowerCase()])),
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 2);

  if (!contributions.length) return `+${task.xp} XP`;
  return `+${task.xp} XP (${contributions.map((item) => `${shortNames[item.stat]} +${item.amount}`).join(" | ")})`;
}

function normalizeWeight(weight) {
  const value = Number(weight || 0);
  return value > 1 ? value / 100 : value;
}

export function renderTasks(state) {
  const tasks = state.tasks || [];
  const historyCount = Object.values(state.completedTasksByDate || {}).flat().length;
  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Add Quest Task</h3>
            <p class="muted">Small tasks fit 20-40 XP, medium tasks 50-80 XP, major wins 100-300 XP.</p>
          </div>
          <span class="badge">${tasks.length} active</span>
        </div>
        <form class="form-grid" data-form="task">
          <div class="field">
            <label for="task-name">Task name</label>
            <input id="task-name" name="name" required placeholder="Learn NumPy basics for 2 hours" />
          </div>
          <div class="field">
            <label for="task-due-date">Due date</label>
            <input id="task-due-date" name="dueDate" type="date" value="${new Date().toISOString().slice(0, 10)}" required />
          </div>
          <div class="field">
            <label for="task-xp">XP reward</label>
            <input id="task-xp" name="xp" type="number" min="20" max="300" value="60" required />
          </div>
          <button class="primary-button" type="submit">Add</button>
          <details class="task-advanced">
            <summary>Advanced XP split</summary>
            <label class="daily-habit-check" style="margin-top: 10px">
              <input type="checkbox" name="useSplit" value="yes" />
              <span>Use custom XP split for this task</span>
            </label>
            <div class="task-split-grid">
              <div class="field">
                <label for="task-stat-a">Primary stat</label>
                <select id="task-stat-a" name="statA">${statOptions("Intelligence")}</select>
              </div>
              <div class="field">
                <label for="task-weight-a">Primary %</label>
                <input id="task-weight-a" name="weightA" type="number" min="0" max="100" value="70" />
              </div>
              <div class="field">
                <label for="task-stat-b">Secondary stat</label>
                <select id="task-stat-b" name="statB">${statOptions("Discipline")}</select>
              </div>
              <div class="field">
                <label for="task-weight-b">Secondary %</label>
                <input id="task-weight-b" name="weightB" type="number" min="0" max="100" value="30" />
              </div>
            </div>
          </details>
        </form>
      </div>

      <div class="panel">
        <div class="section-title">
          <h3>Active Tasks</h3>
          <button class="ghost-button" data-action="toggle-task-history">View History (${historyCount})</button>
        </div>
        <div class="item-list">
          ${
            tasks.length
              ? tasks.map(renderTaskRow).join("")
              : `<div class="empty-state"><div><div class="empty-icon">◇</div><h3>No tasks yet</h3><p>Add a task to start earning XP.</p></div></div>`
          }
        </div>
      </div>
      ${state.taskHistoryVisible ? renderTaskHistory(state) : ""}
    </div>
  `;
}

function statOptions(selected) {
  return STATS.map((stat) => `<option value="${stat}" ${stat === selected ? "selected" : ""}>${stat}</option>`).join("");
}

function renderTaskRow(task) {
  return `
    <article class="item-row ${task.completed ? "completed" : ""}">
      <div>
        <h4>${esc(task.name)}</h4>
        <div class="row-meta">
          <span>Due ${esc(task.dueDate || task.createdAt || "")} · ${task.xp} XP</span>
          <span>${formatDistribution(task.distribution)}</span>
        </div>
        <p class="muted">${esc(formatXPBreakdown(task))}</p>
      </div>
      <div class="row-actions">
        <label class="objective">
          <input type="checkbox" data-action="complete-task" data-id="${task.id}" />
          <span>Done</span>
        </label>
        <button class="ghost-button" data-action="delete-task" data-id="${task.id}">Delete</button>
      </div>
    </article>
  `;
}

function renderTaskHistory(state) {
  const entries = Object.entries(state.completedTasksByDate || {}).sort(([a], [b]) => b.localeCompare(a));
  return `
    <div class="panel">
      <div class="section-title">
        <h3>Completed Task History</h3>
        <button class="ghost-button" data-action="toggle-task-history">Hide History</button>
      </div>
      <div class="item-list">
        ${
          entries.length
            ? entries.map(([date, tasks]) => `
                <article class="card">
                  <div class="section-title"><h3>${esc(date)}</h3><span class="badge">${tasks.length}</span></div>
                  ${tasks.map((task) => `<div class="card-meta"><span>${esc(task.name)}</span><span>${task.xp} XP</span></div>`).join("")}
                </article>
              `).join("")
            : `<p class="muted">No completed tasks archived yet.</p>`
        }
      </div>
    </div>
  `;
}
