function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderBosses(state) {
  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Boss Battles</h3>
            <p class="muted">Turn exams, hackathons, and major projects into objective-based encounters.</p>
          </div>
        </div>
        <form class="form-grid" data-form="boss">
          <div class="field">
            <label for="boss-name">Boss name</label>
            <input id="boss-name" name="name" required placeholder="End Sem Exams" />
          </div>
          <div class="field">
            <label for="boss-objectives">Objectives</label>
            <input id="boss-objectives" name="objectives" required placeholder="Revise; Solve papers; Review notes" />
          </div>
          <div class="field">
            <label for="boss-xp">Reward XP</label>
            <input id="boss-xp" name="xp" type="number" min="100" max="500" value="300" required />
          </div>
          <button class="primary-button" type="submit">Add</button>
        </form>
      </div>

      <div class="grid two">
        ${state.bosses.map(renderBoss).join("")}
      </div>
    </div>
  `;
}

function renderBoss(boss) {
  const done = boss.objectives.filter((objective) => objective.done).length;
  const percent = Math.round((done / boss.objectives.length) * 100);
  return `
    <article class="panel boss-card">
      <div class="section-title">
        <div>
          <h3>${esc(boss.name)}</h3>
          <p class="muted">${boss.xp} XP reward</p>
        </div>
        <span class="badge">${boss.defeated ? "Defeated" : `${percent}%`}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="--value:${percent}%"></div></div>
      <div>
        ${boss.objectives.map((objective, index) => `
          <label class="objective">
            <input type="checkbox" data-action="toggle-boss-objective" data-id="${boss.id}" data-index="${index}" ${objective.done ? "checked" : ""} ${boss.defeated ? "disabled" : ""} />
            <span>${esc(objective.text)}</span>
          </label>
        `).join("")}
      </div>
      <div class="row-actions">
        ${
          boss.defeated
            ? `<span class="badge">Victory claimed</span>`
            : `<button class="primary-button" data-action="defeat-boss" data-id="${boss.id}" ${done === boss.objectives.length ? "" : "disabled"}>Defeat Boss</button>`
        }
        <button class="ghost-button" data-action="delete-boss" data-id="${boss.id}">Delete</button>
      </div>
    </article>
  `;
}
