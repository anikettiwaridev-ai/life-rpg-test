/**
 * LIQUID REACTIVE UI SYSTEM
 * Modular, theme-aware, performance-adaptive animation engine.
 * Integrates non-destructively into Life RPG.
 */

// ─── VISUAL MODE MANAGER ────────────────────────────────────────────────────

const MODES = { METALLIC: 'metallic', LIQUID: 'liquid', REDUCED: 'reduced' };

const VisualModeManager = (() => {
  const STORAGE_KEY = 'life-rpg-visual-mode';
  let currentMode = localStorage.getItem(STORAGE_KEY) || MODES.LIQUID;
  const listeners = [];

  function get() { return currentMode; }

  function set(mode) {
    if (!Object.values(MODES).includes(mode)) return;
    currentMode = mode;
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.visualMode = mode;
    listeners.forEach(fn => fn(mode));
    applyMode(mode);
  }

  function onModeChange(fn) { listeners.push(fn); }

  function applyMode(mode) {
    const root = document.documentElement;
    root.dataset.visualMode = mode;
    // Notify subsystems
    ParticleEngine.setEnabled(mode === MODES.LIQUID);
    CursorSystem.setEnabled(mode === MODES.LIQUID);
    LiquidHover.setEnabled(mode !== MODES.METALLIC);
    RippleSystem.setEnabled(mode !== MODES.METALLIC);
    SpecularEngine.setEnabled(mode === MODES.LIQUID);
    BorderTracer.setEnabled(mode === MODES.LIQUID);
    DepthBreathing.setEnabled(mode === MODES.LIQUID);
    BackgroundEngine.setMode(mode);
  }

  function init() {
    document.documentElement.dataset.visualMode = currentMode;
    // Inject mode toggle UI into topbar
    setTimeout(() => injectModeToggle(), 100);
  }

  function injectModeToggle() {
    const topActions = document.querySelector('.top-actions');
    if (!topActions || document.getElementById('visual-mode-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'visual-mode-btn';
    btn.className = 'icon-button visual-mode-toggle';
    btn.title = 'Visual Mode';
    btn.innerHTML = getModeIcon(currentMode);
    btn.addEventListener('click', () => cycleMode());

    // Insert before the export button
    topActions.insertBefore(btn, topActions.firstChild);
  }

  function getModeIcon(mode) {
    return { metallic: '◈', liquid: '◉', reduced: '◌' }[mode] || '◉';
  }

  function cycleMode() {
    const order = [MODES.LIQUID, MODES.REDUCED, MODES.METALLIC];
    const next = order[(order.indexOf(currentMode) + 1) % order.length];
    // Fire the page-wide burst/dissolve transition before switching
    ModeTransition.fire(currentMode, next);
    setTimeout(() => {
      set(next);
      const btn = document.getElementById('visual-mode-btn');
      if (btn) btn.innerHTML = getModeIcon(next);
    }, next === MODES.METALLIC ? 800 : 200);
  }

  return { get, set, onModeChange, init, MODES };
})();


// ─── PERFORMANCE MONITOR ────────────────────────────────────────────────────

const PerfMonitor = (() => {
  let fps = 60;
  let frames = 0;
  let lastTime = performance.now();
  let quality = 1.0; // 0.0 → 1.0

  function tick(now) {
    frames++;
    if (now - lastTime >= 1000) {
      fps = frames;
      frames = 0;
      lastTime = now;
      // Adaptive quality
      if (fps < 30) quality = Math.max(0.2, quality - 0.1);
      else if (fps >= 55) quality = Math.min(1.0, quality + 0.05);
    }
  }

  function getQuality() { return quality; }
  function getFPS() { return fps; }

  return { tick, getQuality, getFPS };
})();


// ─── THEME COLOR RESOLVER ────────────────────────────────────────────────────

const ThemeColors = (() => {
  function get(varName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
  }

  function getPrimary() { return get('--cyan') || '#4fd9ff'; }
  function getSecondary() { return get('--green') || '#55f2a4'; }
  function getGlowA() { return get('--glow-a') || 'rgba(79,217,255,0.14)'; }
  function getGlowB() { return get('--glow-b') || 'rgba(85,242,164,0.08)'; }

  function getParticleColor() {
    const theme = document.documentElement.dataset.theme || 'aether';
    const map = {
      aether:   ['rgba(45,212,255,',  'rgba(61,255,160,'],
      crimson:  ['rgba(255,59,36,',   'rgba(255,201,90,'],
      void:     ['rgba(157,108,255,', 'rgba(213,92,255,'],
      emerald:  ['rgba(0,232,122,',   'rgba(0,255,153,'],
      obsidian: ['rgba(218,165,32,',  'rgba(245,200,66,'],
      silver:   ['rgba(210,220,230,', 'rgba(255,255,255,'],
      cobalt:   ['rgba(26,111,255,',  'rgba(74,159,255,'],
    };
    return map[theme] || map.aether;
  }

  return { get, getPrimary, getSecondary, getGlowA, getGlowB, getParticleColor };
})();


// ─── BACKGROUND ENGINE ──────────────────────────────────────────────────────

const BackgroundEngine = (() => {
  let canvas, ctx, W, H, raf, mode = MODES.LIQUID;
  let orbs = [];
  let driftOffset = 0;

  function createOrb() {
    const [c1, c2] = ThemeColors.getParticleColor();
    const isSecondary = Math.random() > 0.5;
    const base = isSecondary ? c2 : c1;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 80 + Math.random() * 180,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.14,
      opacity: 0.03 + Math.random() * 0.055,
      color: base,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0004 + Math.random() * 0.0006,
    };
  }

  function init() {
    canvas = document.getElementById('liquid-bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'liquid-bg-canvas';
      canvas.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        pointer-events:none;z-index:0;opacity:1;
      `;
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    resize();
    window.addEventListener('resize', resize);
    orbs = Array.from({ length: 8 }, () => createOrb());
    loop();
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function setMode(m) {
    mode = m;
    if (m === MODES.METALLIC) {
      if (ctx) ctx.clearRect(0, 0, W, H);
    }
  }

  function loop(now = 0) {
    raf = requestAnimationFrame(loop);
    PerfMonitor.tick(now);

    if (mode === MODES.METALLIC) return;

    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    const q = PerfMonitor.getQuality();
    driftOffset += 0.0008;

    const count = mode === MODES.REDUCED ? Math.floor(orbs.length * 0.4) : Math.floor(orbs.length * q);

    for (let i = 0; i < count; i++) {
      const o = orbs[i];
      o.phase += o.speed;
      o.x += o.vx + Math.sin(o.phase) * 0.12;
      o.y += o.vy + Math.cos(o.phase * 0.7) * 0.09;

      // Wrap
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;

      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      const alpha = o.opacity * (mode === MODES.REDUCED ? 0.5 : 1);
      grad.addColorStop(0, `${o.color}${alpha})`);
      grad.addColorStop(1, `${o.color}0)`);

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Slow horizontal drift gradient
    if (mode === MODES.LIQUID && q > 0.5) {
      const gx = ctx.createLinearGradient(
        W * 0.5 + Math.sin(driftOffset) * W * 0.25, 0,
        W * 0.5 + Math.cos(driftOffset * 0.7) * W * 0.25, H
      );
      const [c1] = ThemeColors.getParticleColor();
      gx.addColorStop(0, `${c1}0)`);
      gx.addColorStop(0.5, `${c1}0.018)`);
      gx.addColorStop(1, `${c1}0)`);
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, W, H);
    }
  }

  return { init, setMode };
})();


// ─── PARTICLE ENGINE ────────────────────────────────────────────────────────

const ParticleEngine = (() => {
  let canvas, ctx, W, H, raf;
  let particles = [];
  let enabled = true;

  function createParticle(x, y) {
    const [c1, c2] = ThemeColors.getParticleColor();
    const c = Math.random() > 0.5 ? c1 : c2;
    return {
      x: x ?? Math.random() * W,
      y: y ?? Math.random() * H,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.3,
      life: 1.0,
      decay: 0.003 + Math.random() * 0.004,
      color: c,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
    };
  }

  function spawnAmbient() {
    if (!enabled) return;
    const q = PerfMonitor.getQuality();
    const max = Math.floor(65 * q);
    if (particles.length < max) {
      const batch = 2 + Math.floor(Math.random() * 3); // 2–4 at a time, random
      for (let i = 0; i < batch; i++) {
        particles.push(createParticle(
          Math.random() * W,
          H * 0.2 + Math.random() * H * 0.8
        ));
      }
    }
  }

  function spawnBurst(x, y, count = 8) {
    if (!enabled) return;
    for (let i = 0; i < count; i++) {
      const p = createParticle(x, y);
      const angle = (i / count) * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.8;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed - 1;
      p.decay = 0.018 + Math.random() * 0.02;
      p.r = 1.2 + Math.random() * 2.8;
      particles.push(p);
    }
  }

  function init() {
    canvas = document.getElementById('liquid-particles-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'liquid-particles-canvas';
      canvas.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        pointer-events:none;z-index:1;
      `;
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    resize();
    window.addEventListener('resize', resize);
    loop();
    setInterval(spawnAmbient, 180);
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function setEnabled(v) {
    enabled = v;
    if (!v && ctx) {
      ctx.clearRect(0, 0, W, H);
      particles = [];
    }
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!enabled || !canvas) return;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.004; // float up gently
      p.life -= p.decay;
      p.twinkle += p.twinkleSpeed;

      if (p.life <= 0) { particles.splice(i, 1); continue; }

      const alpha = p.life * 0.55 * (0.7 + 0.3 * Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
    }
  }

  return { init, setEnabled, spawnBurst };
})();


// ─── CURSOR INTERACTION SYSTEM ──────────────────────────────────────────────

const CursorSystem = (() => {
  let canvas, ctx, W, H;
  let mx = -999, my = -999;
  let enabled = true;
  let trail = [];
  const TRAIL_LEN = 12;

  function init() {
    canvas = document.getElementById('liquid-cursor-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'liquid-cursor-canvas';
      canvas.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        pointer-events:none;z-index:9999;
      `;
      document.body.appendChild(canvas);
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    loop();
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    trail.push({ x: mx, y: my, age: 0 });
    if (trail.length > TRAIL_LEN) trail.shift();
  }

  function setEnabled(v) {
    enabled = v;
    if (!v && ctx) ctx.clearRect(0, 0, W, H);
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!enabled || !canvas) return;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    if (mx < 0) return;

    const [c1] = ThemeColors.getParticleColor();

    // Detect if cursor is over an interactable — dim glow slightly
    const hovered = document.elementFromPoint(mx, my);
    const overInteractable = hovered && hovered.closest('button, a, input, select, label, .card, .panel, .nav-button, .item-row, .player-card, .skill-node, .achievement, .boss-card, .stat-tower, .week-card, .calendar-day, .workout-plan-card, .workout-day-card');
    const dimFactor = overInteractable ? 0.55 : 1.0;

    // Draw glow trail
    for (let i = 0; i < trail.length; i++) {
      trail[i].age++;
      const t = trail[i];
      const frac = i / trail.length;
      const alpha = frac * 0.18 * dimFactor * (1 - t.age / 40);
      if (alpha <= 0) continue;
      const r = 4 + frac * 18;
      const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r);
      grad.addColorStop(0, `${c1}${alpha})`);
      grad.addColorStop(1, `${c1}0)`);
      ctx.beginPath();
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Soft cursor glow
    const glowAlpha1 = 0.09 * dimFactor;
    const glowAlpha2 = 0.04 * dimFactor;
    const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 28);
    cg.addColorStop(0, `${c1}${glowAlpha1})`);
    cg.addColorStop(0.5, `${c1}${glowAlpha2})`);
    cg.addColorStop(1, `${c1}0)`);
    ctx.beginPath();
    ctx.arc(mx, my, 28, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();
  }

  return { init, setEnabled };
})();


// ─── RIPPLE SYSTEM ──────────────────────────────────────────────────────────

const RippleSystem = (() => {
  let enabled = true;

  function setEnabled(v) { enabled = v; }

  function createRipple(e) {
    if (!enabled) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'liquid-ripple';
    ripple.style.cssText = `
      left:${x}px;top:${y}px;
    `;
    target.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });

    // Also spawn a particle burst at click position
    ParticleEngine.spawnBurst(e.clientX, e.clientY, 6);
  }

  function attach(selector = 'button, .card, .nav-button, .item-row, .panel') {
    document.addEventListener('click', (e) => {
      const target = e.target.closest(selector);
      if (!target) return;
      // Ensure position:relative
      const pos = getComputedStyle(target).position;
      if (pos === 'static') target.style.position = 'relative';
      target.style.overflow = 'hidden';
      createRipple({ currentTarget: target, clientX: e.clientX, clientY: e.clientY });
    });
  }

  function init() {
    attach();
  }

  return { init, setEnabled };
})();


// ─── LIQUID HOVER ENGINE ────────────────────────────────────────────────────

const LiquidHover = (() => {
  let enabled = true;

  function setEnabled(v) { enabled = v; }

  function applyHover(el) {
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    el.classList.add('liquid-hover-target');
  }

  function onMove(e) {
    if (!enabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    el.classList.add('liquid-hover-active');
  }

  function onLeave(e) {
    const el = e.currentTarget;
    el.classList.remove('liquid-hover-active');
    // Smoothly remove
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }

  function attachAll() {
    const selector = '.panel, .card, .form-panel, .player-card, .skill-node, .achievement, .boss-card, .stat-tower, .item-row, .nav-button, .primary-button, .ghost-button, .week-card, .calendar-day, .workout-plan-card, .workout-day-card, .tech-domain-card, .tech-skill-section, .compact-exercise-row';
    document.querySelectorAll(selector).forEach(applyHover);
  }

  // Re-attach after render since the DOM gets replaced
  function init() {
    // Watch for DOM mutations (re-renders)
    const observer = new MutationObserver(() => {
      attachAll();
    });
    observer.observe(document.getElementById('view') || document.body, {
      childList: true,
      subtree: false,
    });
    attachAll();
  }

  return { init, setEnabled, attachAll };
})();


// ─── PANEL SHIMMER SYSTEM ───────────────────────────────────────────────────

const PanelShimmer = (() => {
  let raf;
  let panels = [];
  let t = 0;

  function update() {
    raf = requestAnimationFrame(update);
    if (VisualModeManager.get() === MODES.METALLIC) return;
    t += 0.004;

    // Only animate a few panels at a time for performance
    const q = PerfMonitor.getQuality();
    const count = Math.floor(panels.length * Math.min(1, q));

    for (let i = 0; i < count; i++) {
      const p = panels[i];
      if (!document.contains(p)) { panels.splice(i, 1); i--; continue; }
      const phase = t + i * 0.4;
      const gx = 50 + 30 * Math.sin(phase);
      const gy = 50 + 20 * Math.cos(phase * 0.7);
      p.style.setProperty('--shimmer-x', `${gx}%`);
      p.style.setProperty('--shimmer-y', `${gy}%`);
    }
  }

  function attachAll() {
    panels = Array.from(document.querySelectorAll(
      '.panel, .card, .form-panel, .player-card, .stat-tower'
    ));
  }

  function init() {
    const observer = new MutationObserver(attachAll);
    observer.observe(document.getElementById('view') || document.body, {
      childList: true, subtree: false,
    });
    attachAll();
    update();
  }

  return { init };
})();



// ─── SPECULAR HIGHLIGHT ENGINE ───────────────────────────────────────────────
// Renders moving edge gleams and directional light streaks on panel surfaces

const SpecularEngine = (() => {
  let enabled = true;
  let mouseX = 0, mouseY = 0;

  function setEnabled(v) { enabled = v; }

  function updateMouse(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!enabled) return;
    updatePanelSpeculars();
  }

  function updatePanelSpeculars() {
    const panels = document.querySelectorAll(
      '.panel, .card, .form-panel, .player-card, .stat-tower'
    );
    panels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (mouseX - cx) / window.innerWidth;
      const dy = (mouseY - cy) / window.innerHeight;
      // Subtle tilt — max 1.5deg
      const rotX = -dy * 1.5;
      const rotY = dx * 1.5;
      panel.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      // Light position for specular — moves subtly with cursor
      const lx = 50 + dx * 18;
      const ly = 50 + dy * 18;
      panel.style.setProperty('--spec-x', `${lx}%`);
      panel.style.setProperty('--spec-y', `${ly}%`);
    });
  }

  function resetPanel(panel) {
    panel.style.transform = '';
  }

  function init() {
    window.addEventListener('mousemove', updateMouse, { passive: true });

    // Reset tilt on mouse leave from each panel
    document.addEventListener('mouseleave', () => {
      document.querySelectorAll('.panel, .card, .form-panel, .player-card, .stat-tower')
        .forEach(p => {
          p.style.transform = '';
        });
    });

    // Re-apply on render
    const viewEl = document.getElementById('view');
    if (viewEl) {
      new MutationObserver(() => {
        // Reset transforms on new panels
        document.querySelectorAll('.panel, .card, .form-panel, .player-card')
          .forEach(p => { p.style.transform = ''; });
      }).observe(viewEl, { childList: true });
    }
  }

  return { init, setEnabled };
})();

// ─── MODE TRANSITION BURST ──────────────────────────────────────────────────
// When toggling visual mode, particles erupt from all card borders then dissolve

const ModeTransition = (() => {
  let canvas, ctx, W, H;
  let active = false;
  let bursts = []; // {x, y, particles[]}

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'liquid-transition-canvas';
    canvas.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:8888;
    `;
    document.body.appendChild(canvas);
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    loop();
  }

  function spawnBorderParticles() {
    const [c1, c2] = ThemeColors.getParticleColor();
    const els = document.querySelectorAll(
      '.panel, .card, .player-card, .form-panel, .stat-tower, .week-card, .workout-plan-card, .nav-button'
    );
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      // Spawn particles around the perimeter
      const perimeter = 2 * (r.width + r.height);
      const count = Math.min(40, Math.floor(perimeter / 14));
      for (let i = 0; i < count; i++) {
        // Pick a random point on the border
        const t = Math.random() * perimeter;
        let bx, by;
        if (t < r.width) { bx = r.left + t; by = r.top; }
        else if (t < r.width + r.height) { bx = r.right; by = r.top + (t - r.width); }
        else if (t < 2 * r.width + r.height) { bx = r.right - (t - r.width - r.height); by = r.bottom; }
        else { bx = r.left; by = r.bottom - (t - 2 * r.width - r.height); }

        const c = Math.random() > 0.5 ? c1 : c2;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.4;
        bursts.push({
          x: bx, y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          r: 1 + Math.random() * 2.2,
          life: 1.0,
          decay: 0.012 + Math.random() * 0.018,
          color: c,
        });
      }
    });
  }

  function fire(fromMode, toMode) {
    active = true;
    bursts = [];
    spawnBorderParticles();
    // Stagger a second wave
    setTimeout(() => spawnBorderParticles(), 120);
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    if (!active || bursts.length === 0) { active = false; return; }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const p = bursts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.025;
      p.life -= p.decay;
      if (p.life <= 0) { bursts.splice(i, 1); continue; }
      const alpha = p.life * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
    }
    if (bursts.length === 0) active = false;
  }

  return { init, fire };
})();


// ─── BORDER TRACER ──────────────────────────────────────────────────────────
// A glowing hotspot that continuously travels around card borders

const BorderTracer = (() => {
  let canvas, ctx, W, H;
  let enabled = true;
  let tracers = []; // one per tracked element
  let attachedEls = new Set();
  let t = 0;

  function setEnabled(v) {
    enabled = v;
    if (!v && ctx) ctx.clearRect(0, 0, W, H);
  }

  function attachAll() {
    const selector = '.panel, .card, .player-card, .stat-tower, .week-card, .workout-plan-card, .form-panel';
    const els = document.querySelectorAll(selector);
    // Remove stale
    tracers = tracers.filter(tr => document.contains(tr.el));
    attachedEls = new Set(tracers.map(tr => tr.el));
    els.forEach(el => {
      if (attachedEls.has(el)) return;
      attachedEls.add(el);
      tracers.push({
        el,
        progress: Math.random(), // start at random point on path
        speed: 0.0006 + Math.random() * 0.0004, // different speeds
      });
    });
  }

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'liquid-tracer-canvas';
    canvas.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:3;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    const observer = new MutationObserver(attachAll);
    observer.observe(document.getElementById('view') || document.body, {
      childList: true, subtree: false,
    });
    attachAll();
    loop();
  }

  function getPosOnRect(r, progress) {
    const perim = 2 * (r.width + r.height);
    const dist = progress * perim;
    const br = 8; // approximate border-radius offset
    if (dist < r.width) return { x: r.left + dist, y: r.top };
    if (dist < r.width + r.height) return { x: r.right, y: r.top + (dist - r.width) };
    if (dist < 2 * r.width + r.height) return { x: r.right - (dist - r.width - r.height), y: r.bottom };
    return { x: r.left, y: r.bottom - (dist - 2 * r.width - r.height) };
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    if (!enabled || VisualModeManager.get() !== MODES.LIQUID) return;

    const [c1] = ThemeColors.getParticleColor();
    const q = PerfMonitor.getQuality();
    // Limit count for performance
    const max = Math.floor(tracers.length * q);

    for (let i = 0; i < Math.min(max, tracers.length); i++) {
      const tr = tracers[i];
      if (!document.contains(tr.el)) continue;
      tr.progress = (tr.progress + tr.speed) % 1;

      const r = tr.el.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) continue;

      const pos = getPosOnRect(r, tr.progress);

      // Main bright hotspot
      const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 22);
      glow.addColorStop(0, `${c1}0.70)`);
      glow.addColorStop(0.3, `${c1}0.28)`);
      glow.addColorStop(1, `${c1}0)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Trailing fade — draw a few steps behind
      for (let step = 1; step <= 5; step++) {
        const trailProg = ((tr.progress - step * 0.004) + 1) % 1;
        const tp = getPosOnRect(r, trailProg);
        const alpha = (0.22 - step * 0.04);
        if (alpha <= 0) continue;
        const tg = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 12);
        tg.addColorStop(0, `${c1}${alpha})`);
        tg.addColorStop(1, `${c1}0)`);
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = tg;
        ctx.fill();
      }
    }
  }

  return { init, setEnabled, attachAll };
})();


// ─── DEPTH BREATHING ────────────────────────────────────────────────────────
// Panels gently pulse their glow opacity on slow staggered sine cycles

const DepthBreathing = (() => {
  let panels = [];
  let t = 0;
  let enabled = true;

  function setEnabled(v) {
    enabled = v;
    if (!v) panels.forEach(p => { if (document.contains(p.el)) p.el.style.removeProperty('--breath'); });
  }

  function attachAll() {
    const els = document.querySelectorAll('.panel, .card, .player-card, .stat-tower');
    panels = Array.from(els).map((el, i) => ({ el, phase: i * 0.6 }));
  }

  function update() {
    requestAnimationFrame(update);
    if (!enabled || VisualModeManager.get() !== MODES.LIQUID) return;
    t += 0.006;
    panels.forEach(p => {
      if (!document.contains(p.el)) return;
      // 0.85 → 1.0 gentle breathe
      const breath = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(t + p.phase));
      p.el.style.setProperty('--breath', breath.toFixed(3));
    });
  }

  function init() {
    const observer = new MutationObserver(attachAll);
    observer.observe(document.getElementById('view') || document.body, {
      childList: true, subtree: false,
    });
    attachAll();
    update();
  }

  return { init, setEnabled, attachAll };
})();


// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
// Panels fade + drift up when entering the viewport (one-shot per element)

const ScrollReveal = (() => {
  let observer;

  function init() {
    // Only run in liquid/reduced mode
    if (VisualModeManager.get() === MODES.METALLIC) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('reveal-enter');
        el.addEventListener('animationend', () => {
          el.classList.remove('reveal-enter');
          el.style.opacity = '';
          el.style.transform = '';
        }, { once: true });
        observer.unobserve(el);
      });
    }, { threshold: 0.08 });

    attachAll();

    // Re-attach after renders
    const viewEl = document.getElementById('view');
    if (viewEl) {
      new MutationObserver(attachAll).observe(viewEl, { childList: true });
    }
  }

  function attachAll() {
    if (!observer || VisualModeManager.get() === MODES.METALLIC) return;
    document.querySelectorAll(
      '.panel:not(.reveal-seen), .card:not(.reveal-seen), .player-card:not(.reveal-seen), .stat-tower:not(.reveal-seen)'
    ).forEach(el => {
      el.classList.add('reveal-seen');
      observer.observe(el);
    });
  }

  return { init };
})();


// ─── MAIN INIT ───────────────────────────────────────────────────────────────

export function initLiquidSystem() {
  // Only run in browser
  if (typeof document === 'undefined') return;

  // Wait for DOM
  const boot = () => {
    BackgroundEngine.init();
    ParticleEngine.init();
    CursorSystem.init();
    SpecularEngine.init();
    RippleSystem.init();
    LiquidHover.init();
    PanelShimmer.init();
    ModeTransition.init();
    BorderTracer.init();
    DepthBreathing.init();
    ScrollReveal.init();
    VisualModeManager.init();

    // Apply initial mode
    const mode = VisualModeManager.get();
    document.documentElement.dataset.visualMode = mode;
    ParticleEngine.setEnabled(mode === MODES.LIQUID);
    CursorSystem.setEnabled(mode === MODES.LIQUID);
    LiquidHover.setEnabled(mode !== MODES.METALLIC);
    RippleSystem.setEnabled(mode !== MODES.METALLIC);
    SpecularEngine.setEnabled(mode === MODES.LIQUID);
    BorderTracer.setEnabled(mode === MODES.LIQUID);
    DepthBreathing.setEnabled(mode === MODES.LIQUID);
    BackgroundEngine.setMode(mode);

    // Re-attach hover + tracer + breathing on every render cycle
    const viewEl = document.getElementById('view');
    if (viewEl) {
      const mo = new MutationObserver(() => {
        LiquidHover.attachAll();
        BorderTracer.attachAll();
        DepthBreathing.attachAll();
      });
      mo.observe(viewEl, { childList: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

export { VisualModeManager, MODES };
