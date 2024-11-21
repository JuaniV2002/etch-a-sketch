// script.js

const container = document.querySelector('.container');
const resetButton = document.getElementById('reset');

function createGrid(size) {
  container.innerHTML = ''; // Clear existing grid
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.style.width = `${squareSize}px`;
    div.style.height = `${squareSize}px`;

    div.addEventListener('mouseenter', () => {
      div.style.backgroundColor = 'black';
    });

    container.appendChild(div);
  }
}

resetButton.addEventListener('click', () => {
  let newSize = parseInt(prompt('Enter new grid size (maximum 100):'));
  if (newSize && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert('Please enter a number between 1 and 100.');
  }
});

createGrid(16); // Initial grid