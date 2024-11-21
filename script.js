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
      let h, s, l;

      if (!div.dataset.hue) {
        // First interaction: assign random color
        h = Math.floor(Math.random() * 360); // Random hue
        s = 100; // Full saturation
        l = 100; // Start with lightness at 100%
        div.dataset.hue = h;
        div.dataset.saturation = s;
        div.dataset.lightness = l;
        div.dataset.darkenCount = 0;
      } else {
        // Subsequent interactions: darken color
        h = parseInt(div.dataset.hue);
        s = parseInt(div.dataset.saturation);
        let darkenCount = parseInt(div.dataset.darkenCount);

        if (darkenCount < 10) {
          darkenCount += 1;
          l = 100 - darkenCount * 10; // Decrease lightness by 10%
          div.dataset.lightness = l;
          div.dataset.darkenCount = darkenCount;
        } else {
          l = 0; // Fully darkened
        }
      }

      div.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
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