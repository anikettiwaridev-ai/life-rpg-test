const baseTags = ["calisthenics"];

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeExercise({
  name,
  category,
  subcategory,
  difficulty,
  type = "reps",
  progressionGroup,
  progressionLevel,
  previousExercise = "",
  nextExercise = "",
  tags = [],
  notes = "",
}) {
  return {
    id: slug(`${progressionGroup}-${name}`),
    name,
    category,
    subcategory,
    difficulty,
    type,
    progressionGroup,
    progressionLevel,
    previousExercise,
    nextExercise,
    tags: [...new Set([...baseTags, ...tags])],
    notes,
  };
}

function chain({ category, subcategory, group, names, difficulties, type = "reps", tags = [], notes = "" }) {
  const ids = names.map((name) => slug(`${group}-${name}`));
  return names.map((name, index) =>
    makeExercise({
      name,
      category,
      subcategory,
      difficulty: difficulties[index] || difficulties[difficulties.length - 1],
      type,
      progressionGroup: group,
      progressionLevel: index + 1,
      previousExercise: ids[index - 1] || "",
      nextExercise: ids[index + 1] || "",
      tags,
      notes,
    })
  );
}

export const workoutCategoryFilters = ["All", "Push", "Pull", "Legs", "Core", "Mobility", "Skill", "Accessory"];
export const workoutDifficulties = ["All", "Beginner", "Beginner+", "Intermediate", "Intermediate+", "Advanced"];
export const workoutExerciseTypes = ["All", "reps", "hold", "weighted"];

export const exerciseDatabase = [
  ...chain({
    category: "Push",
    subcategory: "Horizontal Push",
    group: "Pushup Progression Chain",
    names: [
      "Incline Knee Pushup",
      "Knee Pushup",
      "Incline Pushup",
      "Standard Pushup",
      "Explosive Pushup",
      "Diamond Pushup",
      "Archer Pushup",
      "Pseudo Planche Pushup",
      "Decline Pushup Variants",
    ],
    difficulties: ["Beginner", "Beginner", "Beginner+", "Beginner+", "Intermediate", "Intermediate", "Intermediate+", "Advanced", "Intermediate+"],
    tags: ["horizontal-push", "progression", "chest", "triceps"],
    notes: "Primary horizontal pushing path for bodyweight strength.",
  }),
  ...chain({
    category: "Push",
    subcategory: "Vertical Push (Overhead)",
    group: "Pike Progression Chain",
    names: ["Pike Pushup", "Decline Pike Pushup", "Decline Pike Pushup with Elevated Hands / Parallettes"],
    difficulties: ["Intermediate", "Intermediate+", "Advanced"],
    tags: ["vertical-push", "shoulders", "overhead", "progression"],
    notes: "Overhead pressing progression toward harder handstand-style pushing.",
  }),
  ...chain({
    category: "Push",
    subcategory: "Vertical Push (Downward)",
    group: "Dip Progression Chain",
    names: ["Dip Negatives", "Band-Assisted Dips", "Standard Dips"],
    difficulties: ["Beginner+", "Beginner+", "Intermediate"],
    tags: ["vertical-push", "dips", "triceps", "progression"],
    notes: "Downward vertical pushing strength path.",
  }),
  ...chain({
    category: "Push",
    subcategory: "Push Accessory Work",
    group: "Push Scapula Accessory Chain",
    names: ["Scapula Protraction Holds", "Scapula Protraction Pushups", "Pike Scapula Elevation Holds", "Pike Scapula Elevation Pushups", "Archer Pushups"],
    difficulties: ["Beginner", "Beginner+", "Intermediate", "Intermediate+", "Intermediate+"],
    type: "hold",
    tags: ["accessory", "mobility", "scapula", "stability"],
    notes: "Support work for stronger pushing positions and shoulder control.",
  }),
  ...chain({
    category: "Pull",
    subcategory: "Vertical Pull",
    group: "Pullup Progression Chain",
    names: ["Pullup Negative", "Band-Assisted Pullup", "Pullup", "Chinup", "Neutral Grip Pullup", "Explosive Pullup", "Explosive Chinup", "Explosive Neutral Pullup"],
    difficulties: ["Beginner", "Beginner+", "Intermediate", "Intermediate", "Intermediate", "Intermediate+", "Intermediate+", "Advanced"],
    tags: ["vertical-pull", "back", "biceps", "progression"],
    notes: "Primary vertical pulling strength chain.",
  }),
  ...chain({
    category: "Pull",
    subcategory: "Horizontal Pull",
    group: "Row Progression Chain",
    names: ["Inverted Row (Bent Legs)", "Inverted Row (Straight Legs)", "Inverted Row (Elevated Legs)"],
    difficulties: ["Beginner", "Beginner+", "Intermediate"],
    tags: ["horizontal-pull", "rows", "posture", "progression"],
    notes: "Horizontal pulling path for back strength and scapular control.",
  }),
  ...chain({
    category: "Pull",
    subcategory: "Pull Accessory Work",
    group: "Pull Scapula Accessory Chain",
    names: [
      "Isometric Holds in Hardest ROM",
      "Vertical Scapula Retraction Holds",
      "Vertical Scapula Retraction Pulls",
      "Horizontal Scapula Retraction Holds",
      "Horizontal Scapula Retraction Pulls",
      "Scapula Depression Holds",
      "Scapula Depression Pulls",
    ],
    difficulties: ["Beginner", "Beginner", "Beginner+", "Beginner", "Beginner+", "Intermediate", "Intermediate+"],
    type: "hold",
    tags: ["accessory", "scapula", "posture", "control"],
    notes: "Scapular control and positional strength for pulling.",
  }),
  ...chain({
    category: "Core",
    subcategory: "Leg Raises",
    group: "Leg Raise Progression Chain",
    names: ["Knee Raises", "Knee Raises (One Leg Extended)", "Knee Raises (Both Legs Extended at Top)", "Standard Leg Raises"],
    difficulties: ["Beginner", "Beginner+", "Intermediate", "Intermediate+"],
    tags: ["compression", "hip-flexors", "progression"],
    notes: "Leg raise progression for lower core and compression.",
  }),
  ...chain({
    category: "Core",
    subcategory: "Hollow Body Holds",
    group: "Hollow Body Progression Chain",
    names: ["Hollow Hold (Hands on Side)", "Hollow Hold (Hands Overhead)", "Hollow Hold with Arm Circles"],
    difficulties: ["Beginner", "Beginner+", "Intermediate"],
    type: "hold",
    tags: ["hollow-body", "bracing", "progression"],
    notes: "Core tension progression for clean calisthenics positions.",
  }),
  ...chain({
    category: "Core",
    subcategory: "Seated Pike Lifts",
    group: "Pike Lift Progression Chain",
    names: ["Pike Lift with Backward Lean + One Leg", "Pike Lift with One Leg", "Pike Lift with Both Legs"],
    difficulties: ["Beginner+", "Intermediate", "Intermediate+"],
    type: "hold",
    tags: ["compression", "hip-flexors", "progression"],
    notes: "Pike compression strength for L-sit, lifts, and skill work.",
  }),
  ...chain({
    category: "Core",
    subcategory: "Core Accessory Work",
    group: "Core Accessory Chain",
    names: ["Knee Raise Holds", "Leg Raise Holds", "Pike Lift Holds", "Hamstring Stretches"],
    difficulties: ["Beginner", "Intermediate", "Intermediate+", "Beginner"],
    type: "hold",
    tags: ["mobility", "flexibility", "compression", "accessory"],
    notes: "Accessory work for stronger compression and cleaner core positions.",
  }),
  ...chain({
    category: "Legs",
    subcategory: "Pistol Squat Progression",
    group: "Pistol Squat Progression Chain",
    names: ["Single Leg Box Step", "Assisted Pistol Squat", "Pistol Squat (Opposite Leg Not Locked)", "Elevated Pistol Squat", "Standard Pistol Squat"],
    difficulties: ["Beginner", "Beginner+", "Intermediate", "Intermediate+", "Advanced"],
    tags: ["single-leg", "squat", "progression"],
    notes: "Single-leg squat path for balance, strength, and control.",
  }),
  ...chain({
    category: "Legs",
    subcategory: "Nordic Curl Progression",
    group: "Nordic Curl Progression Chain",
    names: ["Nordic Negative (Posterior Tilt)", "Nordic Negative + Pushup Assist", "Nordic Curl + Pushup Assist", "Standard Nordic Curl"],
    difficulties: ["Beginner+", "Intermediate", "Intermediate+", "Advanced"],
    tags: ["hamstrings", "posterior-chain", "progression"],
    notes: "Hamstring strength progression with posterior pelvic tilt focus.",
  }),
  ...chain({
    category: "Legs",
    subcategory: "Sliding Hamstring Curl Progression",
    group: "Sliding Hamstring Curl Progression Chain",
    names: ["Sliding Curl (Posterior Tilt)", "Standard Sliding Curl", "Single Leg Sliding Curl"],
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    tags: ["hamstrings", "posterior-chain", "progression"],
    notes: "Sliding curl path for hamstring control and posterior chain strength.",
  }),
  ...chain({
    category: "Legs",
    subcategory: "Calf Raise Progression",
    group: "Calf Raise Progression Chain",
    names: ["Double Leg Calf Raise", "Elevated Double Leg Calf Raise", "Single Leg Calf Raise", "Elevated Single Leg Calf Raise"],
    difficulties: ["Beginner", "Beginner+", "Intermediate", "Intermediate+"],
    tags: ["calves", "ankles", "progression"],
    notes: "Calf and ankle strength progression.",
  }),
];

export const exerciseById = new Map(exerciseDatabase.map((exercise) => [exercise.id, exercise]));
