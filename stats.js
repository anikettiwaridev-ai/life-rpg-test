import {
  calculateHabitProgress,
  DAILY_HABITS,
  getCalendarDay,
  getCalendarTasksForDate,
  STATS,
  todayKey,
} from "./state.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function statIcon(stat) {
  return {
    Discipline: "DIS",
    Intelligence: "INT",
    Strength: "STR",
    Communication: "COM",
    Focus: "FOC",
    Creativity: "CRE",
  }[stat];
}

export function renderDashboard(state) {
  const player = state.player;
  const xpPercent = Math.round((player.currentXP / player.nextLevelXP) * 100);
  const unlocked = state.achievements.filter((achievement) => achievement.unlocked).slice(-4).reverse();

  return `
    <div class="dashboard-command">
      <section class="player-card player-card-compact">
        <div class="player-header">
          <div>
            <p class="eyebrow">Character</p>
            <h3 class="player-name">
              <span class="editable-name" contenteditable="true" spellcheck="false" data-field="player-name">${esc(player.name)}</span>
            </h3>
            <div class="pill-row">
              <span class="badge">${esc(player.title)}</span>
              <span class="badge">${player.streak} day streak</span>
            </div>
          </div>
          <div>
            <div class="level-number">${player.level}</div>
            <div class="muted">Level</div>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div class="progress-track"><div class="progress-fill" style="--value:${xpPercent}%"></div></div>
          <div class="progress-meta"><span>${player.currentXP}/1000 XP</span><span>${player.totalXP} lifetime XP</span></div>
        </div>
      </section>

      <section class="panel stat-tower-panel">
        <div class="section-title">
          <h3>Core Domains</h3>
        </div>
        ${renderVerticalStatCards(state)}
      </section>
    </div>

    <div class="grid" style="margin-top: 14px">
      <section class="panel">
        <div class="section-title">
          <div>
            <h3>Daily Habit Matrix</h3>
            <p class="muted">${monthLabel(new Date())}</p>
          </div>
          <span class="badge">${getMonthlyHabitPercent(state)}% month</span>
        </div>
        ${renderHabitMonthGrid(state)}
      </section>
    </div>

    <div class="grid two" style="margin-top: 14px">
      <section class="panel chart-box">
        <div class="section-title">
          <div>
            <h3>Habit Trend</h3>
            <p class="muted">Last 30 days</p>
          </div>
        </div>
        <canvas id="habit-trend-chart"></canvas>
      </section>
      <section class="panel">
        <div class="section-title"><h3>Recent Achievements</h3></div>
        <div class="item-list">
          ${
            unlocked.length
              ? unlocked.map((item) => `<article class="item-row"><div><h4>${item.icon} ${esc(item.title)}</h4><p class="muted">${esc(item.description)}</p></div><span class="badge">${item.xp} XP</span></article>`).join("")
              : `<div class="empty-state"><div><div class="empty-icon">◇</div><h3>No badges unlocked</h3><p>Your first unlock is waiting.</p></div></div>`
          }
        </div>
      </section>
    </div>
  `;
}

function renderHabitMonthGrid(state) {
  const dates = monthDates(new Date());
  const today = todayKey();
  return `
    ${renderHabitTrackerSummary(state, dates)}
    ${renderWeeklyOverview(state, dates)}
    <div class="habit-matrix" style="--days:${dates.length}">
      <div class="habit-matrix-row habit-matrix-head">
        <span>Habit</span>
        <span>Goal</span>
        <span>Done</span>
        <span>Left</span>
        ${dates.map((date) => `<span class="${date === today ? "today" : ""}">${Number(date.slice(-2))}</span>`).join("")}
        <span>%</span>
      </div>
      ${DAILY_HABITS.map((habit) => `
        <div class="habit-matrix-row">
          <span class="habit-name">${esc(habit.name)}</span>
          <span class="habit-count">${dates.length}</span>
          <span class="habit-count done-count">${getHabitMonthlyCompleted(state, habit.id)}</span>
          <span class="habit-count">${dates.length - getHabitMonthlyCompleted(state, habit.id)}</span>
          ${dates.map((date) => {
            const day = getCalendarDay(state, date);
            const complete = day.habits[habit.id];
            return `<button class="habit-dot ${complete ? "done" : ""} ${date === today ? "today" : ""}" data-action="toggle-calendar-habit" data-id="${habit.id}" data-date="${date}" title="${esc(habit.name)} ${date}"></button>`;
          }).join("")}
          <span class="habit-percent">${getHabitMonthlyPercent(state, habit.id)}%</span>
        </div>
      `).join("")}
      <div class="habit-matrix-row habit-matrix-foot">
        <span>Daily %</span>
        <span>${dates.length * DAILY_HABITS.length}</span>
        <span>${getMonthlyHabitCompleted(state, dates)}</span>
        <span>${dates.length * DAILY_HABITS.length - getMonthlyHabitCompleted(state, dates)}</span>
        ${dates.map((date) => `<span class="daily-cell-percent">${Math.round(calculateHabitProgress(state, date) * 100)}</span>`).join("")}
        <span>${getMonthlyHabitPercent(state)}%</span>
      </div>
    </div>
  `;
}

function renderHabitTrackerSummary(state, dates) {
  const goal = dates.length * DAILY_HABITS.length;
  const completed = getMonthlyHabitCompleted(state, dates);
  const left = goal - completed;
  return `
    <div class="habit-summary-strip">
      <div><span>Global Progress</span><strong>${completed}/${goal}</strong></div>
      <div><span>Completed</span><strong>${completed}</strong></div>
      <div><span>Goal</span><strong>${goal}</strong></div>
      <div><span>Left</span><strong>${left}</strong></div>
      <div><span>Monthly Rate</span><strong>${getMonthlyHabitPercent(state)}%</strong></div>
    </div>
  `;
}

function renderWeeklyOverview(state, dates) {
  const weeks = chunkWeeks(dates);
  return `
    <div class="weekly-overview">
      ${weeks.map((week, index) => {
        const goal = week.length * DAILY_HABITS.length;
        const completed = getMonthlyHabitCompleted(state, week);
        const percent = goal ? Math.round((completed / goal) * 100) : 0;
        return `
          <article class="week-card">
            <div class="card-meta"><span>Week ${index + 1}</span><span>${completed}/${goal}</span></div>
            <div class="week-bars">
              ${week.map((date) => `<span style="height:${Math.max(8, Math.round(calculateHabitProgress(state, date) * 100))}%"></span>`).join("")}
            </div>
            <div class="progress-track"><div class="progress-fill" style="--value:${percent}%"></div></div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function chunkWeeks(dates) {
  const chunks = [];
  for (let index = 0; index < dates.length; index += 7) {
    chunks.push(dates.slice(index, index + 7));
  }
  return chunks;
}

function getHabitMonthlyCompleted(state, habitId) {
  return monthDates(new Date()).filter((date) => getCalendarDay(state, date).habits[habitId]).length;
}

function getMonthlyHabitCompleted(state, dates = monthDates(new Date())) {
  return dates.reduce((sum, date) => {
    const day = getCalendarDay(state, date);
    return sum + DAILY_HABITS.filter((habit) => day.habits[habit.id]).length;
  }, 0);
}

function getHabitMonthlyPercent(state, habitId) {
  const dates = monthDates(new Date());
  const completed = dates.filter((date) => getCalendarDay(state, date).habits[habitId]).length;
  return dates.length ? Math.round((completed / dates.length) * 100) : 0;
}

function getMonthlyHabitPercent(state) {
  const dates = monthDates(new Date());
  const total = dates.length * DAILY_HABITS.length;
  const completed = dates.reduce((sum, date) => {
    const day = getCalendarDay(state, date);
    return sum + DAILY_HABITS.filter((habit) => day.habits[habit.id]).length;
  }, 0);
  return total ? Math.round((completed / total) * 100) : 0;
}

function monthDates(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const count = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: count }, (_, index) => todayKey(new Date(year, month, index + 1)));
}

function monthLabel(date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function renderStatCards(state) {
  const max = Math.max(100, ...STATS.map((stat) => Number(state.stats[stat] || 0)));
  return STATS.map((stat) => {
    const value = Number(state.stats[stat] || 0);
    const percent = Math.min(100, Math.round((value / max) * 100));
    return `
      <article class="card stat-card ${stat.toLowerCase()}">
        <div class="card-meta"><span>${statIcon(stat)} ${stat}</span><span>${percent}%</span></div>
        <div class="stat-value">${value}</div>
        <div class="progress-track"><div class="progress-fill" style="--value:${percent}%"></div></div>
      </article>
    `;
  }).join("");
}

function renderVerticalStatCards(state) {
  const max = Math.max(100, ...STATS.map((stat) => Number(state.stats[stat] || 0)));
  return `
    <div class="stat-tower-grid">
      ${STATS.map((stat) => {
        const value = Number(state.stats[stat] || 0);
        const percent = Math.min(100, Math.round((value / max) * 100));
        return `
          <article class="stat-tower ${stat.toLowerCase()}">
            <div class="stat-tower-meta">
              <span>${statIcon(stat)}</span>
              <strong>${value}</strong>
            </div>
            <div class="vertical-progress"><span style="height:${percent}%"></span></div>
            <small>${esc(stat)}</small>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

export function renderCalendar(state) {
  const now = new Date();
  const dates = monthDates(now);
  const firstDayOffset = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  return `
    <div class="panel calendar-panel">
      <div class="section-title">
        <div>
          <h3>Calendar</h3>
          <p class="muted">${monthLabel(now)} progress and task indicators</p>
        </div>
      </div>
      <div class="calendar-weekdays">
        ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="calendar-month-grid">
        ${Array.from({ length: firstDayOffset }, () => `<div class="calendar-empty"></div>`).join("")}
        ${dates.map((date) => renderCalendarDay(state, date)).join("")}
      </div>
    </div>
  `;
}

function renderCalendarDay(state, date) {
  const day = getCalendarDay(state, date);
  const tasks = getCalendarTasksForDate(state, date);
  const percent = Math.round(day.progress * 100);
  const today = todayKey();
  const due = tasks.filter((task) => !task.completed && task.dueDate >= today).length;
  const missed = tasks.filter((task) => !task.completed && task.dueDate < today).length;
  const completed = tasks.filter((task) => task.completed).length;
  const dueNames = tasks.filter((task) => !task.completed && task.dueDate >= today).map((task) => task.name).join("\n");
  const completedNames = tasks.filter((task) => task.completed).map((task) => task.name).join("\n");
  const missedNames = tasks.filter((task) => !task.completed && task.dueDate < today).map((task) => task.name).join("\n");
  return `
    <article class="calendar-day ${percent === 100 ? "perfect" : ""}">
      <div class="calendar-date"><span>${Number(date.slice(-2))}</span><strong>${percent}%</strong></div>
      <div class="calendar-day-bar"><span style="width:${percent}%; background:${calendarProgressColor(percent)}"></span></div>
      <div class="calendar-markers">
        ${due ? `<button class="task-dot due" data-action="go-to-tasks" title="${esc(dueNames)}"></button>` : ""}
        ${completed ? `<button class="task-dot complete" data-action="go-to-tasks" title="${esc(completedNames)}"></button>` : ""}
        ${missed ? `<button class="task-dot missed" data-action="go-to-tasks" title="${esc(missedNames)}"></button>` : ""}
      </div>
    </article>
  `;
}

function calendarProgressColor(percent) {
  if (percent === 100) return "var(--green)";
  if (percent >= 70) return "var(--cyan)";
  if (percent >= 30) return "var(--gold)";
  return "rgba(234, 244, 255, 0.22)";
}

export function renderStatistics() {
  return `
    <div class="grid two">
      <section class="panel chart-box">
        <div class="section-title"><h3>Weekly XP</h3></div>
        <canvas id="weekly-xp-chart"></canvas>
      </section>
      <section class="panel chart-box">
        <div class="section-title"><h3>Stat Distribution</h3></div>
        <canvas id="stat-pie-chart"></canvas>
      </section>
      <section class="panel chart-box">
        <div class="section-title"><h3>Habit Completion</h3></div>
        <canvas id="habit-chart"></canvas>
      </section>
      <section class="panel chart-box">
        <div class="section-title"><h3>Workout Improvement</h3></div>
        <canvas id="workout-chart"></canvas>
      </section>
    </div>
  `;
}
