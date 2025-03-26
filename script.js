const gridSide = 600; // Size of the grid container
let squaresPerSide = 16; // rows = 16, columns = 16

const gridArea = document.querySelector('#gridArea');
const newGridBtn = document.querySelector('#newGridBtn');
const sliderContainer = document.querySelector('#sliderContainer');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue');
const resetBtn = document.querySelector('#resetBtn');

// Display initial slider value
sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
gridArea.style.width = `${gridSide}px`;
gridArea.style.height = `${gridSide}px`;

// Function to darken the square progressively by 10%
function changeBackgroundColor() {
    // Get the current darkness level from data attribute
    let currentDarkness = parseFloat(this.getAttribute('dataDarkness')) || 0;
    currentDarkness += 0.1; // Increase darkness by 0.1 (10%)
    // Cap the darkness at 1 (fully black)
    if(currentDarkness > 1) {
        currentDarkness = 1;
    }
    // Update the square's background color with new darkness
    this.style.backgroundColor = `rgba(0, 0, 0, ${currentDarkness})`;
    // Store the new darkness level in the data attribute
    this.setAttribute('dataDarkness', currentDarkness);
}

// Dynamic Grid Creation
function createGridCell(squaresPerSide) {
    for(let i = 0; i < (squaresPerSide * squaresPerSide); i++) {
        const cellArea = document.createElement('div');
        cellArea.style.width = `${(gridSide / squaresPerSide) - 2}px`; // Dynamically calculate width
        cellArea.style.height = `${(gridSide / squaresPerSide) - 2}px`; // Dynamically calculate height
        cellArea.classList.add('cell');
        
        // Append cell to the grid container
        gridArea.appendChild(cellArea);
        // Initialize data-darkness to 0
        cellArea.setAttribute('dataDarkness', '0');
        // Attach the hover event listener to each cell
        cellArea.addEventListener('mouseover', changeBackgroundColor);
    }
}

function clearGridCell() {
    while (gridArea.firstChild) {
        gridArea.removeChild(gridArea.firstChild);
    }
}

// Slider Input Integration
slider.oninput = function() {
    let text = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.textContent = text;

    clearGridCell();
    createGridCell(this.value);
}

// Event listener for "New Grid" button
newGridBtn.addEventListener("click", () => {
    const squaresPerSide = parseInt(prompt('Enter the number of squares per side for the new grid (1-100) (e.g., 16):'), 10);

    // Validate input
    if (!isNaN(squaresPerSide) && squaresPerSide > 0 && squaresPerSide <= 100) {
        slider.value = squaresPerSide; // Synchronize slider with the user prompt value
        sliderValue.textContent = `${squaresPerSide} x ${squaresPerSide} (Resolution)`;
        clearGridCell(); // Clear the existing grid
        createGridCell(squaresPerSide); // Generate the new grid
    } else {
        alert('Please enter a valid number (1-100)!');
    }
});

// Event listener for "Reset" button
resetBtn.addEventListener("click", () => {
    // Reset all grid cells to their original background color
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = ''; // Clear background color
    })
});

// Function to generate a random RGB color
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to change the background color to a random color
function changeBackgroundColor() {
    this.style.backgroundColor = getRandomRGB(); // Set a random RGB color
}

// Generate default grid on page load
createGridCell(16); // Call the function to create the grid