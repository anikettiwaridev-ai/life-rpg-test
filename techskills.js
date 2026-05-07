import { SKILL_LEVELS } from "./state.js";
import { skillsTree } from "./skillsTree.js";

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

export function renderSkills(state) {
  return `
    <div class="panel">
      <div class="section-title">
        <div>
          <h3>Calisthenics Skill Tree</h3>
          <p class="muted">Each move progresses through five mastery stages.</p>
        </div>
        <span class="badge">Calisthenics</span>
      </div>
      <div class="skill-tree">
        ${state.calisthenics.map(renderCalisthenicsSkill).join("")}
      </div>
    </div>
  `;
}

function renderCalisthenicsSkill(skill) {
  return `
    <article class="skill-node">
      <div class="section-title">
        <h3>${esc(skill.name)}</h3>
        <span class="badge">${SKILL_LEVELS[skill.level]}</span>
      </div>
      <div class="skill-steps">
        ${SKILL_LEVELS.map((_, index) => `<span class="skill-step ${index <= skill.level ? "active" : ""}"></span>`).join("")}
      </div>
      <div class="row-actions">
        <button class="ghost-button" data-action="skill-down" data-id="${skill.id}" ${skill.level === 0 ? "disabled" : ""}>Back</button>
        <button class="primary-button" data-action="skill-up" data-id="${skill.id}" ${skill.level === SKILL_LEVELS.length - 1 ? "disabled" : ""}>Progress</button>
      </div>
    </article>
  `;
}

export function renderTechSkills(state) {
  const registry = createSkillRegistry();
  const query = state.techSkillSearch?.query || "";
  const results = query ? searchTechSkills(query, registry).slice(0, 6) : [];
  const path = normalizeNavPath(state.techSkillNav?.path || []);
  const view = getTechView(path);

  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Tech Skill Tree</h3>
            <p class="muted">Search, navigate, and complete globally shared technical skills.</p>
          </div>
        </div>
        <form class="form-grid" data-form="tech-search">
          <div class="field">
            <label for="tech-search">Search skills</label>
            <input id="tech-search" name="query" list="tech-skill-options" value="${esc(query)}" placeholder="Type Loops, Python Basics, Dockerfiles..." />
            <datalist id="tech-skill-options">
              ${registry.skills.map((skill) => `<option value="${esc(skill.name)}"></option>`).join("")}
            </datalist>
          </div>
          <button class="primary-button" type="submit">Search</button>
        </form>
        ${
          query
            ? `<div class="item-list" style="margin-top: 14px">
                ${
                  results.length
                    ? results.map((result) => renderSearchResult(result, state)).join("")
                    : `<p class="muted">No matching skill found.</p>`
                }
              </div>`
            : ""
        }
      </div>

      <div class="grid">
        ${renderBreadcrumb(path)}
        ${renderCurrentTechView(view, state, registry)}
      </div>
    </div>
  `;
}

function renderSearchResult(result, state) {
  const completed = isSkillComplete(state, result.id);
  return `
    <article class="item-row">
      <div>
        <h4>${esc(result.name)}</h4>
        <div class="row-meta">
          <span>${esc(result.path.join(" -> "))}</span>
          <span>${completed ? "Completed" : `${result.xp} XP`}</span>
        </div>
      </div>
      <div class="row-actions">
        <button class="primary-button" data-action="tech-search-jump" data-id="${esc(result.id)}" data-path="${esc(encodePath(result.path.slice(0, 4)))}">Go</button>
      </div>
    </article>
  `;
}

function renderBreadcrumb(path) {
  const crumbs = ["Tech Skills", ...path];
  return `
    <div class="panel">
      <div class="pill-row">
        ${crumbs.map((crumb, index) => `
          <button class="ghost-button" data-action="tech-breadcrumb" data-path="${esc(encodePath(path.slice(0, index)))}">${esc(crumb)}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCurrentTechView(view, state, registry) {
  if (!view.valid) {
    return renderCurrentTechView(getTechView([]), state, registry);
  }
  if (view.type === "skills") {
    return renderSkillsLevel(view, state, registry);
  }
  return `
    <div class="grid ${view.type === "domains" ? "two" : ""}">
      ${view.items.map((item) => renderDrillItem(item, state)).join("")}
    </div>
  `;
}

function renderDrillItem(item, state) {
  const progress = calculateProgress(item.ids, state);
  return `
    <article class="${item.type === "domain" ? "panel" : "skill-node"}" data-action="tech-nav-next" data-path="${esc(encodePath(item.path))}">
      <div class="section-title">
        <div>
          <h3>${esc(item.title)}</h3>
          <p class="muted">${esc(labelForNode(item.type, progress))}</p>
        </div>
        <span class="badge">${progress.completed}/${progress.total}</span>
      </div>
      ${renderProgressBar(progress)}
      <div class="row-actions" style="margin-top: 12px">
        <button class="primary-button" data-action="tech-nav-next" data-path="${esc(encodePath(item.path))}">Open</button>
      </div>
    </article>
  `;
}

function renderSkillsLevel(view, state, registry) {
  const progress = calculateProgress(new Set(view.skills.map((skill) => skill.id)), state);
  return `
    <article class="panel">
      <div class="section-title">
        <div>
          <h3>${esc(view.title)}</h3>
          <p class="muted">${esc(labelForNode("section", progress))}</p>
        </div>
        <span class="badge">${progress.completed}/${progress.total}</span>
      </div>
      ${renderProgressBar(progress)}
      <div class="item-list" style="margin-top: 12px">
        ${view.skills.map((skill) => renderSkillLeaf(skill, state, registry, view.path)).join("")}
      </div>
    </article>
  `;
}

function renderSkillLeaf(skill, state, registry, path) {
  const registered = registry.byId[skill.id] || { ...skill, locations: [] };
  const completed = isSkillComplete(state, skill.id);
  const focused = state.techSkillSearch?.focusId === skill.id;

  return `
    <label class="objective" data-skill-anchor="${esc(skill.id)}">
      <input type="checkbox" data-action="toggle-tech-skill" data-id="${esc(skill.id)}" ${completed ? "checked" : ""} />
      <span>${esc(registered.name)}</span>
      <span class="badge">${registered.xp} XP</span>
      ${registered.course === "sigma" ? `<span class="badge">Covered in Sigma Course</span>` : ""}
      ${focused ? `<span class="badge">${esc(path.join(" -> "))}</span>` : ""}
    </label>
  `;
}

function renderProgressBar(progress) {
  return `<div class="progress-track"><div class="progress-fill" style="--value:${progress.percent}%"></div></div>`;
}

function labelForNode(type, progress) {
  const label = {
    domain: "Domain progress",
    technology: "Technology progress",
    level: "Level progress",
    section: "Section progress",
  }[type];
  return `${label} - ${progress.percent}% complete`;
}

function getTechView(path) {
  if (path.length === 0) {
    return {
      type: "domains",
      valid: true,
      items: Object.entries(skillsTree).map(([domainName, domain]) => ({
        type: "domain",
        title: domainName,
        path: [domainName],
        ids: collectSkillIds(domain),
      })),
    };
  }

  const domain = skillsTree[path[0]];
  if (!domain) return { valid: false };

  if (path.length === 1) {
    return {
      type: "technologies",
      valid: true,
      items: Object.entries(domain.technologies || {}).map(([technologyName, technology]) => ({
        type: "technology",
        title: technologyName,
        path: [path[0], technologyName],
        ids: collectSkillIds(technology),
      })),
    };
  }

  const technology = domain.technologies?.[path[1]];
  if (!technology) return { valid: false };

  if (path.length === 2) {
    return {
      type: "levels",
      valid: true,
      items: Object.entries(technology.levels || {}).map(([levelName, level]) => ({
        type: "level",
        title: levelName,
        path: [path[0], path[1], levelName],
        ids: collectSkillIds(level),
      })),
    };
  }

  const level = technology.levels?.[path[2]];
  if (!level) return { valid: false };

  if (path.length === 3) {
    return {
      type: "sections",
      valid: true,
      items: Object.entries(level.sections || {}).map(([sectionName, skills]) => ({
        type: "section",
        title: sectionName,
        path: [path[0], path[1], path[2], sectionName],
        ids: new Set(skills.map((skill) => skill.id)),
      })),
    };
  }

  const skills = level.sections?.[path[3]];
  if (!skills) return { valid: false };

  return {
    type: "skills",
    valid: true,
    title: path[3],
    path,
    skills,
  };
}

function collectSkillIds(node) {
  const ids = new Set();
  if (Array.isArray(node)) {
    node.forEach((skill) => ids.add(skill.id));
    return ids;
  }
  if (node.sections) {
    Object.values(node.sections).forEach((skills) => collectSkillIds(skills).forEach((id) => ids.add(id)));
  }
  if (node.levels) {
    Object.values(node.levels).forEach((level) => collectSkillIds(level).forEach((id) => ids.add(id)));
  }
  if (node.technologies) {
    Object.values(node.technologies).forEach((technology) => collectSkillIds(technology).forEach((id) => ids.add(id)));
  }
  return ids;
}

function calculateProgress(ids, state) {
  const total = ids.size;
  const completed = [...ids].filter((id) => isSkillComplete(state, id)).length;
  return {
    total,
    completed,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function createSkillRegistry(tree = skillsTree) {
  const byId = {};
  const skills = [];

  function registerSkill(skill, path) {
    if (!byId[skill.id]) {
      byId[skill.id] = {
        ...skill,
        locations: [],
      };
      skills.push(byId[skill.id]);
    }
    byId[skill.id].locations.push(path);
  }

  function walkDomain(domainName, domain) {
    Object.entries(domain.technologies || {}).forEach(([technologyName, technology]) => {
      Object.entries(technology.levels || {}).forEach(([levelName, level]) => {
        Object.entries(level.sections || {}).forEach(([sectionName, sectionSkills]) => {
          sectionSkills.forEach((skill) => {
            registerSkill(skill, [domainName, technologyName, levelName, sectionName, skill.name]);
          });
        });
      });
    });
  }

  Object.entries(tree).forEach(([domainName, domain]) => walkDomain(domainName, domain));
  return { byId, skills };
}

export function getTechSkillById(id) {
  return createSkillRegistry().byId[id] || null;
}

export function findTechSkillMatch(query) {
  return searchTechSkills(query, createSkillRegistry())[0] || null;
}

function searchTechSkills(query, registry) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return registry.skills
    .flatMap((skill) =>
      skill.locations.map((location) => ({
        ...skill,
        path: location,
        score: scoreSkillSearch(normalized, skill.name, location),
      }))
    )
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

function scoreSkillSearch(query, name, path) {
  const skillName = name.toLowerCase();
  const fullPath = path.join(" ").toLowerCase();
  if (skillName === query) return 4;
  if (skillName.startsWith(query)) return 3;
  if (skillName.includes(query)) return 2;
  if (fullPath.includes(query)) return 1;
  return 0;
}

function isSkillComplete(state, id) {
  return Boolean(state.techSkillCompletions?.[id]?.completed);
}

export function decodeTechPath(value) {
  try {
    const decoded = JSON.parse(decodeURIComponent(value || "%5B%5D"));
    return normalizeNavPath(Array.isArray(decoded) ? decoded : []);
  } catch {
    return [];
  }
}

function encodePath(path) {
  return encodeURIComponent(JSON.stringify(path));
}

function normalizeNavPath(path) {
  return path.filter((part) => typeof part === "string").slice(0, 4);
}

export function renderReading(state) {
  return `
    <div class="grid">
      <div class="form-panel">
        <div class="section-title">
          <div>
            <h3>Reading Tracker</h3>
            <p class="muted">Reading grants Intelligence and Communication progress.</p>
          </div>
        </div>
        <form class="form-grid" data-form="reading">
          <div class="field">
            <label for="book-id">Book</label>
            <select id="book-id" name="id">
              ${state.books.map((book) => `<option value="${book.id}">${esc(book.title)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="book-pages">Pages read</label>
            <input id="book-pages" name="pages" type="number" min="1" value="10" required />
          </div>
          <div class="field">
            <label for="book-date">Date</label>
            <input id="book-date" name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required />
          </div>
          <button class="primary-button" type="submit">Log</button>
        </form>
      </div>

      <div class="grid two">
        ${state.books.map(renderBook).join("")}
      </div>
    </div>
  `;
}

function renderBook(book) {
  return `
    <article class="card">
      <div class="section-title">
        <h3>${esc(book.title)}</h3>
        <span class="badge">${book.pagesRead} pages</span>
      </div>
      <div class="item-list">
        ${
          book.sessions.length
            ? book.sessions.slice(-4).reverse().map((session) => `<div class="card-meta"><span>${esc(session.date)}</span><span>${session.pages} pages</span></div>`).join("")
            : `<p class="muted">No reading sessions logged.</p>`
        }
      </div>
    </article>
  `;
}
