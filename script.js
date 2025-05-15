const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('reset');
const clearBtn = document.getElementById('clear');
const toggleGridBtn = document.getElementById('toggleGrid');
const colorPicker = document.getElementById('colorPicker');
const colorModeSelect = document.getElementById('colorMode');
const saveBtn = document.getElementById('save');

let isDrawing = false;
let colorMode = 'black';
let showGrid = true;
let size = 32;

canvas.width = 600;
canvas.height = 600;
const cellSize = canvas.width / size;

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showGrid) {
    ctx.strokeStyle = '#e0e0e0';
    for (let i = 0; i <= size; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }
  }
}

drawGrid();

function getColor(x, y) {
  switch (colorMode) {
    case 'random':
      return `hsl(${Math.random() * 360}, 100%, 50%)`;
    case 'grayscale':
      const level = Math.floor(Math.random() * 256);
      return `rgb(${level}, ${level}, ${level})`;
    case 'color':
      return colorPicker.value;
    case 'eraser':
      return '#ffffff';
    default:
      return '#000000';
  }
}

function drawCell(x, y) {
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);
  ctx.fillStyle = getColor(x, y);
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  if (showGrid) {
    ctx.strokeStyle = '#e0e0e0';
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  drawCell(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    drawCell(e.offsetX, e.offsetY);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});

resetBtn.addEventListener('click', () => {
  let newSize = parseInt(prompt('Enter new grid size (maximum 100):'));
  if (newSize > 0 && newSize <= 100) {
    size = newSize;
    canvas.width = canvas.height = 600;
    drawGrid();
  } else {
    alert('Please enter a number between 1 and 100.');
  }
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
});

toggleGridBtn.addEventListener('click', () => {
  showGrid = !showGrid;
  drawGrid();
});

colorModeSelect.addEventListener('change', (e) => {
  colorMode = e.target.value;
});

saveBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'etch-a-sketch.png';
  link.href = canvas.toDataURL();
  link.click();
});
