import { calculateHabitProgress, STATS, todayKey } from "./state.js";

const colors = ["#4fd9ff", "#55f2a4", "#ffd166", "#b48cff", "#ff6978"];

function prepareCanvas(canvas) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.floor(rect.width * dpr));
  canvas.height = Math.max(220, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { ctx, width: rect.width, height: rect.height };
}

function lastDays(count) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - 1 - index));
    return todayKey(date);
  });
}

function drawAxes(ctx, width, height) {
  ctx.strokeStyle = "rgba(234, 244, 255, 0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(34, 18);
  ctx.lineTo(34, height - 32);
  ctx.lineTo(width - 12, height - 32);
  ctx.stroke();
}

function drawLineChart(canvas, labels, values, color = colors[0]) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { ctx, width, height } = prepared;
  drawAxes(ctx, width, height);
  const max = Math.max(10, ...values);
  const plotWidth = width - 56;
  const plotHeight = height - 58;
  const points = values.map((value, index) => ({
    x: 34 + (plotWidth * index) / Math.max(1, values.length - 1),
    y: 18 + plotHeight - (value / max) * plotHeight,
  }));

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  ctx.fillStyle = color;
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(234, 244, 255, 0.68)";
  ctx.font = "12px system-ui";
  labels.forEach((label, index) => {
    const x = 34 + (plotWidth * index) / Math.max(1, labels.length - 1);
    ctx.fillText(label.slice(5), x - 16, height - 10);
  });
}

function drawBarChart(canvas, labels, values) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { ctx, width, height } = prepared;
  drawAxes(ctx, width, height);
  const max = Math.max(1, ...values);
  const barWidth = Math.max(18, (width - 70) / labels.length - 8);
  values.forEach((value, index) => {
    const x = 44 + index * (barWidth + 8);
    const h = ((height - 62) * value) / max;
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(x, height - 32 - h, barWidth, h);
    ctx.fillStyle = "rgba(234, 244, 255, 0.68)";
    ctx.font = "12px system-ui";
    ctx.fillText(labels[index].slice(5), x - 2, height - 10);
  });
}

function drawPieChart(canvas, labels, values) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return;
  const { ctx, width, height } = prepared;
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  let start = -Math.PI / 2;
  const radius = Math.min(width, height) * 0.28;
  const cx = width * 0.34;
  const cy = height * 0.48;

  values.forEach((value, index) => {
    const angle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    start += angle;
  });

  ctx.font = "13px system-ui";
  labels.forEach((label, index) => {
    const y = 34 + index * 26;
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(width * 0.62, y - 10, 12, 12);
    ctx.fillStyle = "rgba(234, 244, 255, 0.78)";
    ctx.fillText(`${label}: ${values[index]}`, width * 0.62 + 20, y);
  });
}

export function drawStatisticsCharts(state) {
  const days = lastDays(7);
  const xpValues = days.map((day) =>
    state.xpHistory.filter((entry) => entry.date === day).reduce((sum, entry) => sum + entry.xp, 0)
  );
  drawLineChart(document.getElementById("weekly-xp-chart"), days, xpValues, colors[0]);
  drawPieChart(
    document.getElementById("stat-pie-chart"),
    STATS,
    STATS.map((stat) => state.stats[stat])
  );
  const habitValues = days.map((day) =>
    Math.round(calculateHabitProgress(state, day) * 100)
  );
  drawBarChart(document.getElementById("habit-chart"), days, habitValues);
  drawWorkoutChart(document.getElementById("workout-chart"), state, "Max pushups");
}

export function drawHabitTrendChart(state) {
  const days = lastDays(30);
  drawLineChart(
    document.getElementById("habit-trend-chart"),
    days,
    days.map((day) => Math.round(calculateHabitProgress(state, day) * 100)),
    colors[1]
  );
}

export function drawWorkoutChart(canvas, state, metric = "Max pushups") {
  const entries = [...(state.workout.metrics[metric] || [])].sort((a, b) => a.date.localeCompare(b.date));
  const labels = entries.map((entry) => entry.date);
  const values = entries.map((entry) => Number(entry.value || 0));
  drawLineChart(canvas, labels.length ? labels : lastDays(2), values.length ? values : [0, 0], colors[2]);
}
