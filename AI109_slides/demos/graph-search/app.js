const fileInput = document.getElementById('fileInput');
const statusEl = document.getElementById('status');
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const dropZone = document.getElementById('dropZone');
const routeBtn = document.getElementById('routeBtn');
const NODE_RADIUS = 10;
let currentGraph = null;
let selectedNodeIds = [];
let routePath = [];
let routeEdgeKeys = new Set();

class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.items[this.tail] = value;
    this.tail += 1;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const value = this.items[this.head];
    this.items[this.head] = undefined;
    this.head += 1;
    if (this.head > 50 && this.head * 2 > this.tail) {
      this.items = this.items.slice(this.head, this.tail);
      this.tail -= this.head;
      this.head = 0;
    }
    return value;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

class Graph {
  constructor({ nodes, edges, img, width, height }) {
    this.nodes = nodes;
    this.edges = edges;
    this.img = img;
    this.width = width;
    this.height = height;
    this.nodeById = new Map(nodes.map(n => [n.id, n]));
    this.adj = new Map();
    nodes.forEach(node => this.adj.set(node.id, []));
    edges.forEach(edge => {
      if (!this.adj.has(edge.fromId)) this.adj.set(edge.fromId, []);
      if (!this.adj.has(edge.toId)) this.adj.set(edge.toId, []);
      this.adj.get(edge.fromId).push(edge.toId);
      this.adj.get(edge.toId).push(edge.fromId);
    });
  }

  neighbors(nodeOrId) {
    const id = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id;
    if (!id) return [];
    return this.adj.get(id) || [];
  }
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  readFile(file);
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.style.outline = '2px dashed var(--accent)';
  setStatus('Drop a JSON file to render.');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.outline = 'none';
  setStatus('Load a JSON file to render.');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.style.outline = 'none';
  const file = event.dataTransfer.files[0];
  if (!file) return;
  readFile(file);
});

canvas.addEventListener('click', (event) => {
  if (!currentGraph) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let hit = null;
  let bestDist = Infinity;
  currentGraph.nodes.forEach(node => {
    const dx = node.x - x;
    const dy = node.y - y;
    const d = Math.hypot(dx, dy);
    if (d <= NODE_RADIUS + 3 && d < bestDist) {
      hit = node;
      bestDist = d;
    }
  });

  if (hit) {
    toggleSelection(hit.id);
  } else {
    clearSelection();
  }
});

routeBtn.addEventListener('click', () => {
  if (!currentGraph || selectedNodeIds.length !== 2) return;
  const [startId, goalId] = selectedNodeIds;
  const path = findPath(currentGraph, startId, goalId);
  routePath = path;
  routeEdgeKeys = new Set();

  if (!path.length) {
    setStatus('No path found between the two selected nodes.');
  } else {
    for (let i = 0; i < path.length - 1; i += 1) {
      routeEdgeKeys.add(edgeKey(path[i], path[i + 1]));
      routeEdgeKeys.add(edgeKey(path[i + 1], path[i]));
    }
    setStatus(`Route found with ${path.length} nodes.`);
  }
  drawGraph();
});

function readFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      renderGraph(data);
    } catch (err) {
      setStatus(`Invalid JSON: ${err.message}`);
    }
  };
  reader.readAsText(file);
}

function setStatus(text) {
  statusEl.textContent = text;
}

function renderGraph(data) {
  if (!data || !data.image || !data.image.dataUrl) {
    setStatus('Missing image dataUrl in JSON.');
    return;
  }

  const nodes = Array.isArray(data.nodes) ? data.nodes : [];
  const edges = Array.isArray(data.edges) ? data.edges : [];

  const img = new Image();
  img.onload = () => {
    const width = Number(data.image.width) || img.naturalWidth;
    const height = Number(data.image.height) || img.naturalHeight;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    currentGraph = {
      nodes,
      edges,
      img,
      width,
      height,
    };
    currentGraph = new Graph(currentGraph);
    selectedNodeIds = [];
    routePath = [];
    routeEdgeKeys = new Set();
    updateRouteButton();
    drawGraph();
    setStatus(`Rendered ${nodes.length} nodes and ${edges.length} edges.`);
  };

  img.onerror = () => {
    setStatus('Failed to load image from dataUrl.');
  };

  img.src = data.image.dataUrl;
}

function drawGraph() {
  if (!currentGraph) return;
  const { nodes, edges, img, width, height, nodeById } = currentGraph;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(247, 37, 133, 0.85)';
  edges.forEach(edge => {
    const from = nodeById.get(edge.fromId);
    const to = nodeById.get(edge.toId);
    if (!from || !to) return;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  });

  if (routeEdgeKeys.size > 0) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255, 214, 102, 0.95)';
    edges.forEach(edge => {
      if (!routeEdgeKeys.has(edgeKey(edge.fromId, edge.toId))) return;
      const from = nodeById.get(edge.fromId);
      const to = nodeById.get(edge.toId);
      if (!from || !to) return;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });
  }

  nodes.forEach(node => {
    const isSelected = selectedNodeIds.includes(node.id);
    const isOnRoute = routePath.includes(node.id);
    const r = isSelected ? NODE_RADIUS + 3 : NODE_RADIUS;
    ctx.beginPath();
    ctx.fillStyle = isSelected ? 'rgba(247, 37, 133, 0.95)' : 'rgba(76, 201, 240, 0.9)';
    ctx.strokeStyle = isSelected ? '#ffffff' : isOnRoute ? '#ffd666' : '#0b0e14';
    ctx.lineWidth = isSelected ? 3 : isOnRoute ? 3 : 2;
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (node.label != null) {
      ctx.fillStyle = isSelected ? '#ffffff' : '#0b0e14';
      ctx.font = 'bold 12px "IBM Plex Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(node.label), node.x, node.y);
    }
  });
}

function toggleSelection(nodeId) {
  const idx = selectedNodeIds.indexOf(nodeId);
  if (idx !== -1) {
    selectedNodeIds.splice(idx, 1);
  } else if (selectedNodeIds.length < 2) {
    selectedNodeIds.push(nodeId);
  } else {
    selectedNodeIds = [nodeId];
  }

  routePath = [];
  routeEdgeKeys = new Set();
  updateRouteButton();
  drawGraph();

  if (selectedNodeIds.length === 0) {
    setStatus(`Rendered ${currentGraph.nodes.length} nodes and ${currentGraph.edges.length} edges.`);
  } else if (selectedNodeIds.length === 1) {
    setStatus(`Selected 1 node. Select 1 more to route.`);
  } else {
    setStatus('Selected 2 nodes. Click Route to find a path.');
  }
}

function clearSelection() {
  selectedNodeIds = [];
  routePath = [];
  routeEdgeKeys = new Set();
  updateRouteButton();
  drawGraph();
  if (currentGraph) {
    setStatus(`Rendered ${currentGraph.nodes.length} nodes and ${currentGraph.edges.length} edges.`);
  }
}

function updateRouteButton() {
  routeBtn.disabled = !currentGraph || selectedNodeIds.length !== 2;
}

function edgeKey(a, b) {
  return `${a}::${b}`;
}

function findPath(graph, startId, goalId) {
  if (startId === goalId) return [startId];
  const queue = new Queue();
  queue.enqueue(startId);
  const visited = new Set([startId]);
  const prev = new Map();

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const neighbors = graph.neighbors(current);
    for (const next of neighbors) {
      if (visited.has(next)) continue;
      visited.add(next);
      prev.set(next, current);
      if (next === goalId) {
        return buildPath(prev, startId, goalId);
      }
      queue.enqueue(next);
    }
  }
  return [];
}

function buildPath(prev, startId, goalId) {
  const path = [goalId];
  let cur = goalId;
  while (cur !== startId) {
    cur = prev.get(cur);
    if (!cur) return [];
    path.push(cur);
  }
  path.reverse();
  return path;
}
