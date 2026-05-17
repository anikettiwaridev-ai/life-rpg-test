import { loadData, saveData } from "./storage.js";

export const STATS = ["Discipline", "Intelligence", "Strength", "Communication", "Focus", "Creativity"];
export const DAILY_HABITS = [
  { id: "noPorn", name: "No Porn" },
  { id: "workout", name: "Workout" },
  { id: "coding", name: "Coding" },
  { id: "reading", name: "Reading (10 pages)" },
  { id: "college", name: "College Work" },
];
export const SKILL_LEVELS = [
  "Learning",
  "First attempt",
  "Consistent",
  "Clean form",
  "Mastery",
];

const titles = ["Novice", "Apprentice", "Warrior", "Champion", "Legend", "Mythic"];

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function uid(prefix) {
  return `${prefix}-${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Date.now().toString(36)}`;
}

function defaultAchievements() {
  return [
    { id: "streak-30", title: "30 Day Streak", description: "Log progress on 30 different days.", icon: "🔥", xp: 150, unlocked: false, date: null },
    { id: "streak-50", title: "50 Day Streak", description: "Keep the momentum alive for 50 active days.", icon: "🔥", xp: 220, unlocked: false, date: null },
    { id: "streak-100", title: "100 Day Streak", description: "Reach 100 active days without losing your count.", icon: "🔥", xp: 350, unlocked: false, date: null },
    { id: "hackathon", title: "First Hackathon", description: "Defeat a hackathon boss battle.", icon: "⚔", xp: 250, unlocked: false, date: null },
    { id: "debate", title: "Debate Competition", description: "Complete a communication milestone.", icon: "◈", xp: 180, unlocked: false, date: null },
    { id: "project", title: "First Coding Project", description: "Complete a project or major tech milestone.", icon: "⌘", xp: 220, unlocked: false, date: null },
    { id: "pushups-50", title: "First 50 Pushups", description: "Log 50 pushups as a personal best.", icon: "◆", xp: 200, unlocked: false, date: null },
  ];
}

function createDefaultWorkoutState() {
  return {
    metrics: {
      "Max pushups": [{ date: "2026-01-03", value: 42 }],
      "Max pull ups": [],
      "Plank time": [],
      "L sit hold time": [],
      Bodyweight: [],
    },
    plans: [],
    selectedPlanId: null,
    selectedDayId: null,
    sessions: [],
    selectedSessionId: null,
    calendarMonth: todayKey().slice(0, 7),
    browser: {
      query: "",
      category: "All",
      difficulty: "All",
      type: "All",
      progressionGroup: "All",
    },
    historyFilters: {
      planId: "all",
      exerciseId: "all",
    },
    builder: createDefaultWorkoutBuilder(),
  };
}

function createDefaultWorkoutBuilder(overrides = {}) {
  return {
    open: false,
    mode: "create",
    step: "type",
    trainingType: "",
    planId: null,
    dayId: null,
    category: "",
    subcategory: "",
    progressionGroup: "",
    expandedExerciseId: null,
    selectedExerciseId: null,
    query: "",
    difficulty: "All",
    type: "All",
    draft: {
      planName: "",
      planColor: "#4fd9ff",
      planNotes: "",
      dayName: "",
      dayColor: "#4fd9ff",
      dayNotes: "",
      sets: 3,
      reps: 10,
      holdSeconds: 20,
      weight: 0,
      restSeconds: 90,
      notes: "",
    },
    ...overrides,
  };
}

function createDefaultState() {
  return {
    player: {
      name: "Player One",
      totalXP: 0,
      lifetimeXP: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      activeDays: [],
    },
    uiTheme: "aether",
    stats: {
      Discipline: 0,
      Intelligence: 0,
      Strength: 0,
      Communication: 0,
      Focus: 0,
      Creativity: 0,
      discipline: 0,
      intelligence: 0,
      strength: 0,
      communication: 0,
      focus: 0,
      creativity: 0,
    },
    tasks: [
      {
        id: uid("task"),
        name: "Learn NumPy basics for 2 hours",
        category: "Intelligence",
        xp: 80,
        dueDate: todayKey(),
        distribution: { Intelligence: 80, Discipline: 20 },
        completed: false,
        createdAt: todayKey(),
        completedAt: null,
        completedDate: null,
      },
      {
        id: uid("task"),
        name: "Finish assignment before deadline",
        category: "Discipline",
        xp: 70,
        dueDate: todayKey(),
        distribution: { Discipline: 80, Intelligence: 20 },
        completed: false,
        createdAt: todayKey(),
        completedAt: null,
        completedDate: null,
      },
    ],
    completedTasksByDate: {},
    taskHistoryVisible: false,
    calendarData: {},
    habits: [
      { id: uid("habit"), name: "Wake up before 6", xp: 35, distribution: { Discipline: 100 }, completions: [] },
      { id: uid("habit"), name: "Workout", xp: 50, distribution: { Strength: 100 }, completions: [] },
      { id: uid("habit"), name: "Read 10 pages", xp: 40, distribution: { Intelligence: 50, Communication: 50 }, completions: [] },
      { id: uid("habit"), name: "Practice coding", xp: 50, distribution: { Intelligence: 80, Discipline: 20 }, completions: [] },
    ],
    calisthenics: ["Handstand", "Front Lever", "Back Lever", "Planche", "Elbow Lever", "L Sit", "Kip Up"].map((name) => ({
      id: uid("skill"),
      name,
      level: 0,
    })),
    workout: createDefaultWorkoutState(),
    techSkillCompletions: {},
    techSkillSearch: {
      query: "",
      focusId: null,
    },
    techSkillNav: {
      path: [],
    },
    books: ["Atomic Habits", "48 Laws of Power", "Art of Seduction", "Ikigai"].map((title) => ({
      id: uid("book"),
      title,
      pagesRead: 0,
      sessions: [],
    })),
    achievements: defaultAchievements(),
    bosses: [
      {
        id: uid("boss"),
        name: "Mid Sem Exams",
        xp: 300,
        defeated: false,
        objectives: [
          { text: "Complete revision", done: false },
          { text: "Solve past papers", done: false },
          { text: "Finish assignments", done: false },
          { text: "Review notes", done: false },
        ],
      },
      {
        id: uid("boss"),
        name: "Hackathon",
        xp: 300,
        defeated: false,
        objectives: [
          { text: "Ship working prototype", done: false },
          { text: "Prepare pitch", done: false },
          { text: "Submit project", done: false },
        ],
      },
      {
        id: uid("boss"),
        name: "Major Project",
        xp: 280,
        defeated: false,
        objectives: [
          { text: "Define scope", done: false },
          { text: "Build core feature", done: false },
          { text: "Test and polish", done: false },
        ],
      },
    ],
    xpHistory: [],
    activityLog: [],
  };
}

function mergeDefaults(saved, defaults) {
  if (!saved) return defaults;
  const merged = { ...defaults, ...saved };
  merged.player = { ...defaults.player, ...saved.player };
  merged.uiTheme = saved.uiTheme || defaults.uiTheme;
  merged.stats = { ...defaults.stats, ...saved.stats };
  ensureStats(merged);
  merged.tasks = (merged.tasks || []).map((task) => ({
    dueDate: task.createdAt || todayKey(),
    completedDate: task.completedAt || null,
    ...task,
  }));
  merged.completedTasksByDate = { ...defaults.completedTasksByDate, ...(saved.completedTasksByDate || {}) };
  merged.taskHistoryVisible = Boolean(saved.taskHistoryVisible || defaults.taskHistoryVisible);
  merged.calendarData = { ...defaults.calendarData, ...(saved.calendarData || {}) };
  merged.workout = normalizeWorkoutState(saved.workout, defaults.workout);
  merged.techSkillCompletions = { ...defaults.techSkillCompletions, ...(saved.techSkillCompletions || {}) };
  merged.techSkillSearch = { ...defaults.techSkillSearch, ...(saved.techSkillSearch || {}) };
  merged.techSkillNav = { ...defaults.techSkillNav, ...(saved.techSkillNav || {}) };
  merged.achievements = defaults.achievements.map((achievement) => {
    const existing = saved.achievements?.find((item) => item.id === achievement.id);
    return existing ? { ...achievement, ...existing } : achievement;
  });
  return merged;
}

function normalizeWorkoutState(savedWorkout = {}, defaultWorkout = createDefaultWorkoutState()) {
  savedWorkout ||= {};
  const workout = {
    ...defaultWorkout,
    ...savedWorkout,
    metrics: { ...defaultWorkout.metrics, ...(savedWorkout.metrics || {}) },
    plans: (savedWorkout.plans || defaultWorkout.plans || []).map(normalizeWorkoutPlan),
    sessions: (savedWorkout.sessions || defaultWorkout.sessions || []).map(normalizeWorkoutSession),
    browser: { ...defaultWorkout.browser, ...(savedWorkout.browser || {}) },
    historyFilters: { ...defaultWorkout.historyFilters, ...(savedWorkout.historyFilters || {}) },
    builder: normalizeWorkoutBuilder(savedWorkout.builder, defaultWorkout.builder),
  };
  if (!workout.plans.some((plan) => plan.id === workout.selectedPlanId)) {
    workout.selectedPlanId = workout.plans[0]?.id || null;
  }
  const selectedPlan = workout.plans.find((plan) => plan.id === workout.selectedPlanId);
  if (!selectedPlan?.days.some((day) => day.id === workout.selectedDayId)) {
    workout.selectedDayId = selectedPlan?.days[0]?.id || null;
  }
  if (!workout.sessions.some((session) => session.id === workout.selectedSessionId)) {
    workout.selectedSessionId = workout.sessions[0]?.id || null;
  }
  workout.calendarMonth ||= todayKey().slice(0, 7);
  return workout;
}

function normalizeWorkoutBuilder(savedBuilder = {}, defaultBuilder = createDefaultWorkoutBuilder()) {
  savedBuilder ||= {};
  return {
    ...defaultBuilder,
    ...savedBuilder,
    draft: {
      ...defaultBuilder.draft,
      ...(savedBuilder.draft || {}),
    },
  };
}

function normalizeWorkoutPlan(plan) {
  return {
    id: plan.id || uid("workout-plan"),
    name: plan.name || "Untitled Plan",
    color: plan.color || "#4fd9ff",
    notes: plan.notes || "",
    days: (plan.days || []).map(normalizeWorkoutDay),
    createdAt: plan.createdAt || todayKey(),
  };
}

function normalizeWorkoutDay(day) {
  return {
    id: day.id || uid("workout-day"),
    name: day.name || "Workout Day",
    color: day.color || "#4fd9ff",
    notes: day.notes || "",
    exercises: (day.exercises || []).map(normalizeWorkoutExercise),
  };
}

function normalizeWorkoutExercise(exercise) {
  return {
    id: exercise.id || uid("workout-exercise"),
    exerciseId: exercise.exerciseId || "",
    name: exercise.name || "Exercise",
    category: exercise.category || "",
    type: exercise.type || "reps",
    sets: Number(exercise.sets || 3),
    reps: Number(exercise.reps || 10),
    holdSeconds: Number(exercise.holdSeconds || 20),
    weight: Number(exercise.weight || 0),
    restSeconds: Number(exercise.restSeconds || 90),
    notes: exercise.notes || "",
  };
}

function normalizeWorkoutSession(session) {
  return {
    id: session.id || uid("workout-session"),
    date: session.date || todayKey(),
    planId: session.planId || "",
    planName: session.planName || "Workout Plan",
    dayId: session.dayId || "",
    dayName: session.dayName || "Workout Day",
    color: session.color || "#4fd9ff",
    notes: session.notes || "",
    exercises: (session.exercises || []).map(normalizeWorkoutExercise),
    createdAt: session.createdAt || todayKey(),
  };
}

export function loadGameState() {
  const state = mergeDefaults(loadData(), createDefaultState());
  recalcPlayer(state);
  syncCalendarTasks(state);
  saveData(state);
  return state;
}

export function persist(state) {
  saveData(state);
}

export function recalcPlayer(state) {
  ensureStats(state);
  state.player.totalXP = Math.max(0, Number(state.player.totalXP || 0));
  state.player.lifetimeXP = Math.max(state.player.totalXP, Number(state.player.lifetimeXP || state.player.totalXP));
  state.player.level = Math.floor(state.player.totalXP / 1000) + 1;
  state.player.title = titleForLevel(state.player.level);
  state.player.currentXP = state.player.totalXP % 1000;
  state.player.nextLevelXP = 1000;
  state.player.streak = new Set(state.player.activeDays || []).size;
}

export function titleForLevel(level) {
  if (level >= 30) return titles[5];
  if (level >= 20) return titles[4];
  if (level >= 12) return titles[3];
  if (level >= 6) return titles[2];
  if (level >= 3) return titles[1];
  return titles[0];
}

export function touchActivity(state) {
  const today = todayKey();
  if (!state.player.activeDays.includes(today)) {
    state.player.activeDays.push(today);
  }
  state.player.lastActiveDate = today;
  recalcPlayer(state);
}

export function addXP(state, amount, config = {}, source = "XP") {
  return awardXP(state, amount, config, source);
}

export function awardXP(state, amount, distributionOrConfig, source = "XP") {
  const xp = Math.max(0, Number(amount || 0));
  if (!xp) return;
  const config = normalizeXPConfig(distributionOrConfig);

  if (config.global !== false) {
    state.player.totalXP += xp;
    state.player.lifetimeXP = Number(state.player.lifetimeXP || 0) + xp;
  }

  if (config.statOnly) {
    addStatXP(state, config.statOnly, xp);
  } else if (config.distribution) {
    for (const [stat, weight] of Object.entries(config.distribution)) {
      addStatXP(state, stat, Math.round(xp * normalizeDistributionWeight(weight)));
    }
  }
  state.xpHistory.push({ date: todayKey(), xp, source });
  state.activityLog.unshift({ date: todayKey(), xp, source });
  state.activityLog = state.activityLog.slice(0, 12);
  touchActivity(state);
  if (config.checkAchievements !== false) {
    checkAchievements(state);
  }
}

function normalizeXPConfig(config) {
  if (!config) return { global: true };
  if ("global" in config || "distribution" in config || "statOnly" in config) {
    return {
      global: config.global !== false,
      distribution: config.distribution,
      statOnly: config.statOnly,
      checkAchievements: config.checkAchievements,
    };
  }
  return {
    global: true,
    distribution: config,
  };
}

function normalizeDistributionWeight(weight) {
  const value = Number(weight || 0);
  return value > 1 ? value / 100 : value;
}

function normalizeStatName(stat) {
  const normalized = String(stat || "").toLowerCase();
  return STATS.find((item) => item.toLowerCase() === normalized) || stat;
}

function addStatXP(state, stat, xp) {
  const statName = normalizeStatName(stat);
  if (!STATS.includes(statName)) return;
  state.stats[statName] = Number(state.stats[statName] || 0) + xp;
  state.stats[statName.toLowerCase()] = state.stats[statName];
}

function ensureStats(state) {
  for (const stat of STATS) {
    const lower = stat.toLowerCase();
    const value = Number(state.stats?.[stat] ?? state.stats?.[lower] ?? 0);
    state.stats[stat] = value;
    state.stats[lower] = value;
  }
  state.stats.focus ??= 0;
  state.stats.creativity ??= 0;
}

function grantAchievement(state, id) {
  const achievement = state.achievements.find((item) => item.id === id);
  if (!achievement || achievement.unlocked) return;
  achievement.unlocked = true;
  achievement.date = todayKey();
  achievement.canClaim = false;
  addXP(
    state,
    Math.round(achievement.xp * 0.5),
    { global: true, distribution: { discipline: 0.5, focus: 0.5 }, checkAchievements: false },
    `Achievement: ${achievement.title}`
  );
}

export function checkAchievements(state) {
  recalcPlayer(state);
  if (state.player.streak >= 30) grantAchievement(state, "streak-30");
  if (state.player.streak >= 50) grantAchievement(state, "streak-50");
  if (state.player.streak >= 100) grantAchievement(state, "streak-100");
  const pushupBest = getPersonalBest(state, "Max pushups");
  if (pushupBest >= 50) grantAchievement(state, "pushups-50");
  if (state.stats.Communication >= 250) grantAchievement(state, "debate");
  if (state.bosses.some((boss) => boss.name.toLowerCase().includes("hackathon") && boss.defeated)) {
    markAchievementClaimable(state, "hackathon");
  }
  if (Object.values(state.techSkillCompletions || {}).filter((skill) => skill.completed).length >= 8) {
    markAchievementClaimable(state, "project");
  }
}

export function claimAchievement(state, id) {
  const achievement = state.achievements.find((item) => item.id === id);
  if (!achievement || achievement.unlocked || !achievement.canClaim) return;
  grantAchievement(state, id);
}

function markAchievementClaimable(state, id) {
  const achievement = state.achievements.find((item) => item.id === id);
  if (!achievement || achievement.unlocked) return;
  achievement.canClaim = true;
}

export function getPersonalBest(state, metric) {
  const entries = state.workout.metrics[metric] || [];
  return entries.reduce((best, entry) => Math.max(best, Number(entry.value || 0)), 0);
}

export function getSelectedWorkoutPlan(state) {
  return state.workout.plans.find((plan) => plan.id === state.workout.selectedPlanId) || null;
}

export function getSelectedWorkoutDay(state) {
  const plan = getSelectedWorkoutPlan(state);
  return plan?.days.find((day) => day.id === state.workout.selectedDayId) || null;
}

export function selectWorkoutPlan(state, id) {
  const plan = state.workout.plans.find((item) => item.id === id);
  if (!plan) return;
  state.workout.selectedPlanId = plan.id;
  state.workout.selectedDayId = plan.days[0]?.id || null;
}

export function selectWorkoutDay(state, id) {
  const plan = getSelectedWorkoutPlan(state);
  if (!plan?.days.some((day) => day.id === id)) return;
  state.workout.selectedDayId = id;
}

export function openWorkoutBuilder(state, mode = "create", options = {}) {
  const plan = options.planId ? state.workout.plans.find((item) => item.id === options.planId) : getSelectedWorkoutPlan(state);
  const day = options.dayId ? plan?.days.find((item) => item.id === options.dayId) : plan?.days.find((item) => item.id === state.workout.selectedDayId);
  state.workout.builder = createDefaultWorkoutBuilder({
    open: true,
    mode,
    step: options.step || (mode === "create" ? "type" : "day"),
    trainingType: options.trainingType || "Calisthenics",
    planId: plan?.id || null,
    dayId: day?.id || null,
    category: "",
    subcategory: "",
    progressionGroup: "",
    draft: {
      ...createDefaultWorkoutBuilder().draft,
      planName: plan?.name || "",
      planColor: plan?.color || "#4fd9ff",
      planNotes: plan?.notes || "",
      dayName: day?.name || "",
      dayColor: day?.color || plan?.color || "#4fd9ff",
      dayNotes: day?.notes || "",
    },
  });
}

export function closeWorkoutBuilder(state) {
  state.workout.builder = createDefaultWorkoutBuilder();
}

export function setWorkoutBuilderStep(state, step) {
  state.workout.builder.step = step;
}

export function setWorkoutBuilderValue(state, field, value) {
  const builder = state.workout.builder;
  if (field in builder) {
    builder[field] = value;
    if (field === "category") {
      builder.subcategory = "";
      builder.progressionGroup = "";
      builder.expandedExerciseId = null;
      builder.selectedExerciseId = null;
    }
    if (field === "subcategory") {
      builder.progressionGroup = "";
      builder.expandedExerciseId = null;
      builder.selectedExerciseId = null;
    }
    if (field === "progressionGroup") {
      builder.expandedExerciseId = null;
      builder.selectedExerciseId = null;
    }
    return;
  }
  if (field in builder.draft) {
    builder.draft[field] = value;
  }
}

export function saveWorkoutBuilderPlan(state, data) {
  const builder = state.workout.builder;
  if (builder.planId) {
    updateWorkoutPlan(state, builder.planId, "name", data.name);
    updateWorkoutPlan(state, builder.planId, "color", data.color);
    updateWorkoutPlan(state, builder.planId, "notes", data.notes);
  } else {
    const plan = createWorkoutPlan(state, data);
    builder.planId = plan.id;
  }
  builder.draft.planName = data.name;
  builder.draft.planColor = data.color;
  builder.draft.planNotes = data.notes;
  builder.step = "day";
}

export function saveWorkoutBuilderDay(state, data) {
  const builder = state.workout.builder;
  if (builder.planId) selectWorkoutPlan(state, builder.planId);
  if (builder.dayId) {
    updateWorkoutDay(state, builder.dayId, "name", data.name);
    updateWorkoutDay(state, builder.dayId, "color", data.color);
    updateWorkoutDay(state, builder.dayId, "notes", data.notes);
  } else {
    const day = createWorkoutDay(state, data);
    builder.dayId = day?.id || null;
  }
  builder.draft.dayName = data.name;
  builder.draft.dayColor = data.color;
  builder.draft.dayNotes = data.notes;
  builder.step = "category";
}

export function createWorkoutPlan(state, data) {
  const plan = normalizeWorkoutPlan({
    id: uid("workout-plan"),
    name: data.name?.trim(),
    color: data.color,
    notes: data.notes?.trim(),
    days: [],
    createdAt: todayKey(),
  });
  state.workout.plans.unshift(plan);
  state.workout.selectedPlanId = plan.id;
  state.workout.selectedDayId = null;
  return plan;
}

export function updateWorkoutPlan(state, id, field, value) {
  const plan = state.workout.plans.find((item) => item.id === id);
  if (!plan || !["name", "color", "notes"].includes(field)) return;
  plan[field] = field === "name" ? value.trim() || "Untitled Plan" : value;
}

export function duplicateWorkoutPlan(state, id) {
  const plan = state.workout.plans.find((item) => item.id === id);
  if (!plan) return;
  const copy = normalizeWorkoutPlan({
    ...plan,
    id: uid("workout-plan"),
    name: `${plan.name} Copy`,
    days: plan.days.map((day) => ({
      ...day,
      id: uid("workout-day"),
      exercises: day.exercises.map((exercise) => ({ ...exercise, id: uid("workout-exercise") })),
    })),
    createdAt: todayKey(),
  });
  state.workout.plans.unshift(copy);
  state.workout.selectedPlanId = copy.id;
  state.workout.selectedDayId = copy.days[0]?.id || null;
}

export function deleteWorkoutPlan(state, id) {
  state.workout.plans = state.workout.plans.filter((plan) => plan.id !== id);
  if (state.workout.selectedPlanId === id) {
    state.workout.selectedPlanId = state.workout.plans[0]?.id || null;
    state.workout.selectedDayId = state.workout.plans[0]?.days[0]?.id || null;
  }
}

export function createWorkoutDay(state, data) {
  const plan = getSelectedWorkoutPlan(state);
  if (!plan) return null;
  const day = normalizeWorkoutDay({
    id: uid("workout-day"),
    name: data.name?.trim(),
    color: data.color || plan.color,
    notes: data.notes?.trim(),
    exercises: [],
  });
  plan.days.push(day);
  state.workout.selectedDayId = day.id;
  return day;
}

export function updateWorkoutDay(state, id, field, value) {
  const plan = getSelectedWorkoutPlan(state);
  const day = plan?.days.find((item) => item.id === id);
  if (!day || !["name", "color", "notes"].includes(field)) return;
  day[field] = field === "name" ? value.trim() || "Workout Day" : value;
}

export function duplicateWorkoutDay(state, id) {
  const plan = getSelectedWorkoutPlan(state);
  const day = plan?.days.find((item) => item.id === id);
  if (!plan || !day) return;
  const copy = normalizeWorkoutDay({
    ...day,
    id: uid("workout-day"),
    name: `${day.name} Copy`,
    exercises: day.exercises.map((exercise) => ({ ...exercise, id: uid("workout-exercise") })),
  });
  plan.days.splice(plan.days.indexOf(day) + 1, 0, copy);
  state.workout.selectedDayId = copy.id;
}

export function deleteWorkoutDay(state, id) {
  const plan = getSelectedWorkoutPlan(state);
  if (!plan) return;
  plan.days = plan.days.filter((day) => day.id !== id);
  if (state.workout.selectedDayId === id) {
    state.workout.selectedDayId = plan.days[0]?.id || null;
  }
}

export function addExerciseToWorkoutDay(state, exercise, config = {}) {
  const day = getSelectedWorkoutDay(state);
  if (!day || !exercise) return;
  day.exercises.push(normalizeWorkoutExercise({
    id: uid("workout-exercise"),
    exerciseId: exercise.id,
    name: exercise.name,
    category: exercise.category,
    type: exercise.type,
    sets: config.sets ?? 3,
    reps: exercise.type === "hold" ? 0 : config.reps ?? 10,
    holdSeconds: exercise.type === "hold" ? config.holdSeconds ?? 20 : 0,
    weight: exercise.type === "weighted" ? config.weight ?? 0 : 0,
    restSeconds: config.restSeconds ?? 90,
    notes: config.notes || "",
  }));
}

export function addBuilderExerciseToWorkoutDay(state, exercise, config = {}) {
  const builder = state.workout.builder;
  if (builder.planId) selectWorkoutPlan(state, builder.planId);
  if (builder.dayId) selectWorkoutDay(state, builder.dayId);
  addExerciseToWorkoutDay(state, exercise, config);
  builder.selectedExerciseId = null;
  builder.expandedExerciseId = null;
  builder.step = "progression";
  builder.draft = {
    ...builder.draft,
    sets: 3,
    reps: 10,
    holdSeconds: 20,
    weight: 0,
    restSeconds: 90,
    notes: "",
  };
}

export function updateWorkoutExercise(state, id, field, value) {
  const exercise = getSelectedWorkoutDay(state)?.exercises.find((item) => item.id === id);
  if (!exercise || !["sets", "reps", "holdSeconds", "weight", "restSeconds", "notes"].includes(field)) return;
  exercise[field] = field === "notes" ? value : Math.max(0, Number(value || 0));
}

export function moveWorkoutExercise(state, id, direction) {
  const exercises = getSelectedWorkoutDay(state)?.exercises;
  if (!exercises) return;
  const index = exercises.findIndex((exercise) => exercise.id === id);
  const nextIndex = index + Number(direction || 0);
  if (index < 0 || nextIndex < 0 || nextIndex >= exercises.length) return;
  const [exercise] = exercises.splice(index, 1);
  exercises.splice(nextIndex, 0, exercise);
}

export function moveWorkoutExerciseToIndex(state, id, targetIndex) {
  const exercises = getSelectedWorkoutDay(state)?.exercises;
  if (!exercises) return;
  const index = exercises.findIndex((exercise) => exercise.id === id);
  const nextIndex = Math.max(0, Math.min(exercises.length - 1, Number(targetIndex)));
  if (index < 0 || index === nextIndex) return;
  const [exercise] = exercises.splice(index, 1);
  exercises.splice(nextIndex, 0, exercise);
}

export function duplicateWorkoutExercise(state, id) {
  const exercises = getSelectedWorkoutDay(state)?.exercises;
  if (!exercises) return;
  const index = exercises.findIndex((exercise) => exercise.id === id);
  if (index < 0) return;
  exercises.splice(index + 1, 0, normalizeWorkoutExercise({ ...exercises[index], id: uid("workout-exercise") }));
}

export function removeWorkoutExercise(state, id) {
  const day = getSelectedWorkoutDay(state);
  if (!day) return;
  day.exercises = day.exercises.filter((exercise) => exercise.id !== id);
}

export function setWorkoutBrowserFilter(state, field, value) {
  if (!["query", "category", "difficulty", "type", "progressionGroup"].includes(field)) return;
  state.workout.browser[field] = value;
}

export function setWorkoutHistoryFilter(state, field, value) {
  if (!["planId", "exerciseId"].includes(field)) return;
  state.workout.historyFilters[field] = value;
}

export function shiftWorkoutCalendarMonth(state, direction) {
  const [year, month] = String(state.workout.calendarMonth || todayKey().slice(0, 7)).split("-").map(Number);
  const date = new Date(year, month - 1 + Number(direction || 0), 1);
  state.workout.calendarMonth = todayKey(date).slice(0, 7);
}

export function selectWorkoutSession(state, id) {
  if (!state.workout.sessions.some((session) => session.id === id)) return;
  state.workout.selectedSessionId = id;
}

export function logWorkoutSession(state, data) {
  const plan = state.workout.plans.find((item) => item.id === data.planId);
  const day = plan?.days.find((item) => item.id === data.dayId);
  if (!plan || !day || !day.exercises.length) return null;
  const session = normalizeWorkoutSession({
    id: uid("workout-session"),
    date: data.date || todayKey(),
    planId: plan.id,
    planName: plan.name,
    dayId: day.id,
    dayName: day.name,
    color: day.color || plan.color,
    notes: day.notes,
    exercises: day.exercises.map((exercise) => ({ ...exercise, id: uid("workout-session-exercise") })),
    createdAt: todayKey(),
  });
  state.workout.sessions.unshift(session);
  state.workout.selectedSessionId = session.id;
  state.workout.calendarMonth = session.date.slice(0, 7);
  awardXP(state, 80, { global: true, distribution: { Strength: 0.75, Discipline: 0.25 } }, `Workout: ${day.name}`);
  return session;
}

export function distributionFromCategory(category) {
  const templates = {
    Discipline: { Discipline: 100 },
    Intelligence: { Intelligence: 80, Discipline: 20 },
    Strength: { Strength: 100 },
    Communication: { Communication: 70, Intelligence: 30 },
    Focus: { Focus: 70, Discipline: 30 },
    Creativity: { Creativity: 70, Intelligence: 30 },
    Reading: { Intelligence: 50, Communication: 50 },
    Coding: { Intelligence: 80, Discipline: 20 },
    Assignment: { Discipline: 80, Intelligence: 20 },
    Debate: { Communication: 70, Intelligence: 30 },
  };
  return templates[category] || { Discipline: 100 };
}

export function addTask(state, task) {
  const nextTask = {
    id: uid("task"),
    name: task.name,
    category: task.category || "Discipline",
    xp: Number(task.xp),
    dueDate: task.dueDate || todayKey(),
    distribution: task.distribution || distributionFromCategory(task.category || "Discipline"),
    completed: false,
    createdAt: todayKey(),
    completedAt: null,
    completedDate: null,
  };
  state.tasks.unshift(nextTask);
  addCalendarTask(state, nextTask);
  return nextTask;
}

export function addHabit(state, habit) {
  state.habits.unshift({
    id: uid("habit"),
    name: habit.name,
    xp: Number(habit.xp),
    distribution: habit.distribution || distributionFromCategory(habit.category),
    completions: [],
  });
}

export function habitStreak(habit) {
  return new Set(habit.completions || []).size;
}

export function replaceState(target, next) {
  for (const key of Object.keys(target)) delete target[key];
  Object.assign(target, mergeDefaults(next, createDefaultState()));
  recalcPlayer(target);
  syncCalendarTasks(target);
}

export function getCalendarDay(state, date) {
  state.calendarData[date] ??= {
    habits: Object.fromEntries(DAILY_HABITS.map((habit) => [habit.id, false])),
    tasks: [],
    progress: 0,
  };
  state.calendarData[date].habits ??= Object.fromEntries(DAILY_HABITS.map((habit) => [habit.id, false]));
  state.calendarData[date].tasks ??= [];
  for (const habit of DAILY_HABITS) {
    state.calendarData[date].habits[habit.id] ??= false;
  }
  state.calendarData[date].progress = calculateDayProgress(state, date);
  return state.calendarData[date];
}

export function toggleHabit(state, date, habitId) {
  const day = getCalendarDay(state, date);
  if (!(habitId in day.habits)) return;
  day.habits[habitId] = !day.habits[habitId];
  day.progress = calculateDayProgress(state, date);
  touchActivity(state);
}

export function calculateHabitProgress(state, date) {
  const day = getCalendarDay(state, date);
  const completed = DAILY_HABITS.filter((habit) => day.habits[habit.id]).length;
  return completed / DAILY_HABITS.length;
}

export function calculateDayProgress(state, date) {
  const day = state.calendarData?.[date] || {};
  const habits = day.habits || {};
  const habitCompletion = DAILY_HABITS.filter((habit) => habits[habit.id]).length / DAILY_HABITS.length;
  const tasks = getCalendarTasksForDate(state, date);
  const taskCompletion = tasks.length ? tasks.filter((task) => task.completed).length / tasks.length : habitCompletion;
  return Math.round(((habitCompletion + taskCompletion) / 2) * 100) / 100;
}

export function getCalendarTasksForDate(state, date) {
  const active = (state.tasks || []).filter((task) => task.dueDate === date);
  const archived = Object.values(state.completedTasksByDate || {})
    .flat()
    .filter((task) => task.dueDate === date || task.completedDate === date);
  const byId = new Map([...active, ...archived].map((task) => [task.id, task]));
  return [...byId.values()];
}

export function addCalendarTask(state, task) {
  const day = getCalendarDay(state, task.dueDate);
  if (!day.tasks.some((item) => item.id === task.id)) {
    day.tasks.push(calendarTaskSnapshot(task));
  }
  day.progress = calculateDayProgress(state, task.dueDate);
}

export function removeCalendarTask(state, task) {
  if (!task?.dueDate || !state.calendarData?.[task.dueDate]) return;
  state.calendarData[task.dueDate].tasks = state.calendarData[task.dueDate].tasks.filter((item) => item.id !== task.id);
  state.calendarData[task.dueDate].progress = calculateDayProgress(state, task.dueDate);
}

export function archiveCompletedTask(state, task) {
  const completedDate = task.completedDate || todayKey();
  state.completedTasksByDate[completedDate] ??= [];
  state.completedTasksByDate[completedDate].unshift({ ...task, completed: true, completedDate });
  state.tasks = state.tasks.filter((item) => item.id !== task.id);
  updateCalendarTask(state, { ...task, completed: true, completedDate });
  getCalendarDay(state, completedDate);
}

export function updateCalendarTask(state, task) {
  for (const date of [task.dueDate, task.completedDate].filter(Boolean)) {
    const day = getCalendarDay(state, date);
    const existing = day.tasks.find((item) => item.id === task.id);
    const snapshot = calendarTaskSnapshot(task);
    if (existing) Object.assign(existing, snapshot);
    else day.tasks.push(snapshot);
    day.progress = calculateDayProgress(state, date);
  }
}

export function syncCalendarTasks(state) {
  for (const task of state.tasks || []) {
    addCalendarTask(state, task);
  }
  for (const tasks of Object.values(state.completedTasksByDate || {})) {
    tasks.forEach((task) => updateCalendarTask(state, task));
  }
}

function calendarTaskSnapshot(task) {
  return {
    id: task.id,
    name: task.name,
    dueDate: task.dueDate,
    completed: Boolean(task.completed),
    completedDate: task.completedDate || task.completedAt || null,
  };
}
