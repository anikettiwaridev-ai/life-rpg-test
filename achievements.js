function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderAchievements(state) {
  const unlocked = state.achievements.filter((achievement) => achievement.unlocked).length;
  return `
    <div class="panel">
      <div class="section-title">
        <div>
          <h3>Achievement Badges</h3>
          <p class="muted">Major real-world milestones unlock XP and visible trophies.</p>
        </div>
        <span class="badge">${unlocked}/${state.achievements.length} unlocked</span>
      </div>
      <div class="achievement-grid">
        ${state.achievements.map(renderAchievement).join("")}
      </div>
    </div>
  `;
}

function renderAchievement(achievement) {
  return `
    <article class="card achievement ${achievement.unlocked ? "" : "locked"}">
      <div class="achievement-icon">${achievement.icon}</div>
      <h4>${esc(achievement.title)}</h4>
      <p class="muted">${esc(achievement.description)}</p>
      <div class="card-meta">
        <span>${achievement.xp} XP</span>
        <span>${achievement.unlocked ? esc(achievement.date) : "Locked"}</span>
      </div>
      ${
        achievement.canClaim && !achievement.unlocked
          ? `<div class="row-actions" style="margin-top: 12px"><button class="primary-button" data-action="claim-achievement" data-id="${esc(achievement.id)}">Claim</button></div>`
          : ""
      }
    </article>
  `;
}
