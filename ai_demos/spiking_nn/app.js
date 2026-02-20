const neurons = [
  { id: "input", name: "Input neuron" },
  { id: "hiddenA", name: "Hidden neuron A" },
  { id: "hiddenB", name: "Hidden neuron B" },
  { id: "output", name: "Output neuron" }
];

const controlConfig = [
  { key: "inputCurrent", label: "Input neuron current", unit: "mV", min: 0, max: 45, step: 0.5, value: 24 },
  { key: "th_input", label: "Threshold: Input", unit: "mV", min: -70, max: -35, step: 1, value: -52 },
  { key: "th_hiddenA", label: "Threshold: Hidden A", unit: "mV", min: -70, max: -35, step: 1, value: -54 },
  { key: "th_hiddenB", label: "Threshold: Hidden B", unit: "mV", min: -70, max: -35, step: 1, value: -54 },
  { key: "th_output", label: "Threshold: Output", unit: "mV", min: -70, max: -35, step: 1, value: -51 }
];

const fixedParams = {
  tauM: 16,
  tauSyn: 14,
  vRest: -65,
  vReset: -72,
  refrac: 5.0,
  noise: 0.65,
  dt: 0.5,
  simSpeed: 0.35,
  windowMs: 1400
};

const connections = [
  { pre: "input", post: "hiddenA", weight: 17 },
  { pre: "input", post: "hiddenB", weight: 14 },
  { pre: "hiddenA", post: "output", weight: 12 },
  { pre: "hiddenB", post: "output", weight: 12 }
];

const controlsRoot = document.getElementById("controls");
const panelRoot = document.getElementById("neuronGrid");
const graphRoot = document.getElementById("networkGraph");

const state = {
  ...fixedParams,
  ...Object.fromEntries(controlConfig.map((c) => [c.key, c.value]))
};

const runtime = {
  times: [],
  simTime: 0,
  accumulator: 0,
  lastFrameTs: null,
  animationId: null,
  neurons: {},
  blinkUntil: {}
};

const neuronViews = {};
const graphNodes = new Map();
const sliders = new Map();
const labels = new Map();

init();

function init() {
  buildControls();
  buildNeuronPanels();
  bindGraphNodes();
  bindButtons();
  resetSimulation();
  startAnimation();
}

function buildControls() {
  for (const item of controlConfig) {
    const row = document.createElement("div");
    row.className = "control-row";

    const top = document.createElement("div");
    top.className = "control-top";

    const label = document.createElement("label");
    label.textContent = item.label;
    label.htmlFor = `control-${item.key}`;

    const value = document.createElement("span");
    value.className = "control-value";
    value.textContent = formatValue(item, item.value);

    const input = document.createElement("input");
    input.id = `control-${item.key}`;
    input.type = "range";
    input.min = String(item.min);
    input.max = String(item.max);
    input.step = String(item.step);
    input.value = String(item.value);
    input.addEventListener("input", () => {
      state[item.key] = Number(input.value);
      value.textContent = formatValue(item, state[item.key]);
      render();
    });

    top.append(label, value);
    row.append(top, input);
    controlsRoot.append(row);

    sliders.set(item.key, input);
    labels.set(item.key, value);
  }
}

function buildNeuronPanels() {
  for (const neuron of neurons) {
    const card = document.createElement("article");
    card.className = "neuron-card";

    const head = document.createElement("div");
    head.className = "neuron-head";

    const title = document.createElement("h2");
    title.className = "neuron-title";
    title.textContent = neuron.name;

    const meta = document.createElement("p");
    meta.className = "neuron-meta";
    meta.textContent = "Spikes: 0 | Rate: 0.0 Hz";

    head.append(title, meta);

    const vLabel = document.createElement("p");
    vLabel.className = "plot-label";
    vLabel.textContent = "Membrane potential";

    const voltageCanvas = document.createElement("canvas");
    voltageCanvas.width = 420;
    voltageCanvas.height = 150;

    const sLabel = document.createElement("p");
    sLabel.className = "plot-label";
    sLabel.textContent = "Spike train";

    const spikeCanvas = document.createElement("canvas");
    spikeCanvas.width = 420;
    spikeCanvas.height = 92;

    card.append(head, vLabel, voltageCanvas, sLabel, spikeCanvas);
    panelRoot.append(card);

    neuronViews[neuron.id] = {
      meta,
      voltageCanvas,
      spikeCanvas,
      vCtx: voltageCanvas.getContext("2d"),
      sCtx: spikeCanvas.getContext("2d")
    };
  }
}

function bindGraphNodes() {
  if (!graphRoot) {
    return;
  }
  for (const neuron of neurons) {
    const node = graphRoot.querySelector(`[data-node="${neuron.id}"]`);
    if (node) {
      graphNodes.set(neuron.id, node);
    }
  }
}

function bindButtons() {
  const resetBtn = document.getElementById("resetDefaults");
  resetBtn.addEventListener("click", () => {
    for (const item of controlConfig) {
      setControl(item.key, item.value);
    }
    resetSimulation();
  });
}

function setControl(key, value) {
  const slider = sliders.get(key);
  const item = controlConfig.find((c) => c.key === key);
  if (!slider || !item) {
    return;
  }
  slider.value = String(value);
  state[key] = Number(value);
  labels.get(key).textContent = formatValue(item, Number(value));
}

function formatValue(item, value) {
  const decimals = item.step < 1 ? 1 : 0;
  return `${value.toFixed(decimals)} ${item.unit}`;
}

function thresholdForNeuron(neuronId) {
  if (neuronId === "input") return state.th_input;
  if (neuronId === "hiddenA") return state.th_hiddenA;
  if (neuronId === "hiddenB") return state.th_hiddenB;
  return state.th_output;
}

function externalCurrentForNeuron(neuronId) {
  if (neuronId === "input") {
    return state.inputCurrent;
  }
  return 0;
}

function startAnimation() {
  if (runtime.animationId !== null) {
    cancelAnimationFrame(runtime.animationId);
  }

  const tick = (timestamp) => {
    if (runtime.lastFrameTs === null) {
      runtime.lastFrameTs = timestamp;
    }

    const elapsed = Math.min(80, timestamp - runtime.lastFrameTs);
    runtime.lastFrameTs = timestamp;
    runtime.accumulator += elapsed * state.simSpeed;

    let stepped = false;
    while (runtime.accumulator >= state.dt) {
      simulateStep(state.dt);
      runtime.accumulator -= state.dt;
      stepped = true;
    }

    if (stepped) {
      render();
    }

    runtime.animationId = requestAnimationFrame(tick);
  };

  runtime.animationId = requestAnimationFrame(tick);
}

function resetSimulation() {
  runtime.times.length = 0;
  runtime.simTime = 0;
  runtime.accumulator = 0;
  runtime.lastFrameTs = null;

  for (const neuron of neurons) {
    runtime.neurons[neuron.id] = {
      v: state.vRest,
      synCurrent: 0,
      refractoryRemaining: 0,
      voltages: [state.vRest],
      spikes: []
    };
    runtime.blinkUntil[neuron.id] = 0;
  }

  runtime.times.push(0);
  render();
}

function simulateStep(dt) {
  const spikedIds = [];
  const decay = Math.exp(-dt / Math.max(0.1, state.tauSyn));

  for (const neuron of neurons) {
    const nState = runtime.neurons[neuron.id];
    nState.synCurrent *= decay;

    if (nState.refractoryRemaining > 0) {
      nState.refractoryRemaining -= dt;
      nState.v = state.vReset;
    } else {
      const inputCurrent = externalCurrentForNeuron(neuron.id) + nState.synCurrent;
      const leak = (-(nState.v - state.vRest) + inputCurrent) / Math.max(0.1, state.tauM);
      const dv = leak * dt + state.noise * Math.sqrt(dt) * gaussianNoise();
      nState.v += dv;

      if (nState.v >= thresholdForNeuron(neuron.id)) {
        nState.v = state.vReset;
        nState.refractoryRemaining = state.refrac;
        spikedIds.push(neuron.id);
        runtime.blinkUntil[neuron.id] = performance.now() + 130;
      }
    }
  }

  const spikedSet = new Set(spikedIds);
  for (const edge of connections) {
    if (spikedSet.has(edge.pre)) {
      runtime.neurons[edge.post].synCurrent += edge.weight;
    }
  }

  runtime.simTime += dt;
  runtime.times.push(runtime.simTime);

  for (const neuron of neurons) {
    const nState = runtime.neurons[neuron.id];
    nState.voltages.push(nState.v);
    if (spikedSet.has(neuron.id)) {
      nState.spikes.push(runtime.simTime);
    }
  }

  trimWindow(runtime.simTime - state.windowMs);
}

function trimWindow(cutoff) {
  while (runtime.times.length > 1 && runtime.times[0] < cutoff) {
    runtime.times.shift();
    for (const neuron of neurons) {
      runtime.neurons[neuron.id].voltages.shift();
    }
  }

  for (const neuron of neurons) {
    const spikes = runtime.neurons[neuron.id].spikes;
    while (spikes.length > 0 && spikes[0] < cutoff) {
      spikes.shift();
    }
  }
}

function render() {
  for (const neuron of neurons) {
    renderNeuron(neuron.id);
  }
  renderGraph();
}

function renderNeuron(neuronId) {
  const view = neuronViews[neuronId];
  const nState = runtime.neurons[neuronId];
  const tMax = runtime.simTime;
  const tMin = Math.max(0, tMax - state.windowMs);

  drawVoltage(view.vCtx, view.voltageCanvas, runtime.times, nState.voltages, thresholdForNeuron(neuronId), tMin, tMax);
  drawSpikes(view.sCtx, view.spikeCanvas, nState.spikes, tMin, tMax);

  const spikeCount = nState.spikes.length;
  const rate = spikeCount / (state.windowMs / 1000);
  view.meta.textContent = `Spikes: ${spikeCount} | Rate: ${rate.toFixed(1)} Hz`;
}

function renderGraph() {
  const now = performance.now();
  for (const neuron of neurons) {
    const node = graphNodes.get(neuron.id);
    if (!node) {
      continue;
    }
    const isSpiking = runtime.blinkUntil[neuron.id] > now;
    node.classList.toggle("spiking", isSpiking);
  }
}

function drawVoltage(ctx, canvas, times, voltages, threshold, tMin, tMax) {
  const { width, height } = canvas;
  const pad = { left: 34, right: 10, top: 10, bottom: 20 };

  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad, 6, 4);

  const vMin = Math.min(-92, state.vReset - 10, Math.min(...voltages) - 2);
  const vMax = Math.max(-32, threshold + 8, Math.max(...voltages) + 2);

  const toX = (t) => scale(t, tMin, tMax, pad.left, width - pad.right);
  const toY = (v) => scale(v, vMin, vMax, height - pad.bottom, pad.top);

  ctx.strokeStyle = "#d24d57";
  ctx.lineWidth = 1.1;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(pad.left, toY(threshold));
  ctx.lineTo(width - pad.right, toY(threshold));
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#0f7b6c";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  for (let i = 0; i < times.length; i += 1) {
    const x = toX(times[i]);
    const y = toY(voltages[i]);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function drawSpikes(ctx, canvas, spikes, tMin, tMax) {
  const { width, height } = canvas;
  const pad = { left: 34, right: 10, top: 8, bottom: 16 };

  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad, 6, 2);

  const toX = (t) => scale(t, tMin, tMax, pad.left, width - pad.right);
  const y0 = height - pad.bottom - 3;
  const y1 = pad.top + 3;

  ctx.strokeStyle = "#e56b2c";
  ctx.lineWidth = 1.9;
  for (const spikeTime of spikes) {
    const x = toX(spikeTime);
    ctx.beginPath();
    ctx.moveTo(x, y0);
    ctx.lineTo(x, y1);
    ctx.stroke();
  }
}

function drawGrid(ctx, width, height, pad, xDiv, yDiv) {
  ctx.strokeStyle = "#e5edf8";
  ctx.lineWidth = 1;

  for (let i = 0; i <= xDiv; i += 1) {
    const x = pad.left + (i * (width - pad.left - pad.right)) / xDiv;
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, height - pad.bottom);
    ctx.stroke();
  }

  for (let i = 0; i <= yDiv; i += 1) {
    const y = pad.top + (i * (height - pad.top - pad.bottom)) / yDiv;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#91a6c4";
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, height - pad.bottom);
  ctx.lineTo(width - pad.right, height - pad.bottom);
  ctx.stroke();
}

function scale(value, srcMin, srcMax, outMin, outMax) {
  if (srcMax === srcMin) {
    return outMin;
  }
  const alpha = (value - srcMin) / (srcMax - srcMin);
  return outMin + alpha * (outMax - outMin);
}

function gaussianNoise() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
