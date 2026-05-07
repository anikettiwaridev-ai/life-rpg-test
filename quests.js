import { formatDistribution } from "./tasks.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderQuests(state) {
  const quests = state.dailyQuests.quests || [];
  const complete = quests.filter((quest) => quest.completed).length;
  const percent = quests.length ? Math.round((complete / quests.length) * 100) : 0;
  return `
    <div class="grid">
      <div class="panel">
        <div class="section-title">
          <div>
            <h3>Daily Random Quests</h3>
            <p class="muted">A fresh set appears each day. Rewards stay small and momentum-friendly.</p>
          </div>
          <button class="ghost-button" data-action="reroll-quests">Reroll</button>
        </div>
        <div class="quest-progress">
          <div class="progress-track"><div class="progress-fill" style="--value:${percent}%"></div></div>
          <div class="progress-meta"><span>${complete}/${quests.length} quests cleared</span><span>${percent}%</span></div>
        </div>
      </div>
      <div class="item-list">
        ${quests.map(renderQuestRow).join("")}
      </div>
    </div>
  `;
}

function renderQuestRow(quest) {
  return `
    <article class="item-row ${quest.completed ? "completed" : ""}">
      <div>
        <h4>${esc(quest.name)}</h4>
        <div class="row-meta">
          <span>${quest.xp} XP</span>
          <span>${formatDistribution(quest.distribution)}</span>
        </div>
      </div>
      <div class="row-actions">
        ${
          quest.completed
            ? `<span class="badge">Cleared</span>`
            : `<button class="primary-button" data-action="complete-quest" data-id="${quest.id}">Claim</button>`
        }
      </div>
    </article>
  `;
}
