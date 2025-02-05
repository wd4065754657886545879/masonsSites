// Block Blast Game
document.getElementById("startBtn").addEventListener('click', startGame);

// The game grid
const gridSize = 10; // 10x10 grid
const grid = [];
let gameInterval;

// Start the game
function startGame() {
    resetGame();
    generateRandomShapes();
    gameInterval = setInterval(updateGame, 500);
}

// Reset the game grid
function resetGame() {
    grid.length = 0; // Clear the grid
    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            grid[row][col] = null;
        }
    }

    const canvas = document.getElementById("gameCanvasBlockBlast");
    canvas.innerHTML = ''; // Clear previous grid
    document.getElementById("game-container").style.border = ''; // Reset border color
}

// Generate random shapes at random positions
function generateRandomShapes() {
    // Check for game over before placing new shapes
    if (grid[0].some(cell => cell !== null)) {
        gameOver(); // Game over if top row is filled
        return;
    }

    const canvas = document.getElementById("gameCanvasBlockBlast");

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (Math.random() < 0.2) { // 20% chance to add a shape
                const shape = getRandomShape();
                grid[row][col] = shape;

                const shapeDiv = document.createElement("div");
                shapeDiv.classList.add("shape", shape);
                shapeDiv.style.gridRowStart = row + 1;
                shapeDiv.style.gridColumnStart = col + 1;
                shapeDiv.dataset.row = row;
                shapeDiv.dataset.col = col;

                shapeDiv.addEventListener("click", () => onShapeClick(row, col));

                canvas.appendChild(shapeDiv);
            }
        }
    }
}

// Get a random shape
function getRandomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Handle a click on a shape
function onShapeClick(row, col) {
    const shape = grid[row][col];

    if (shape) {
        // Remove the shape and update the grid
        grid[row][col] = null;
        removeShapeFromGrid(row, col);
        checkForMatches();
    }
}

// Remove shape from the grid (UI)
function removeShapeFromGrid(row, col) {
    const canvas = document.getElementById("gameCanvasBlockBlast");
    const shapeDiv = canvas.querySelector(`div[data-row='${row}'][data-col='${col}']`);
    if (shapeDiv) {
        shapeDiv.remove();
    }
}

// Check for any completed lines (rows or columns)
function checkForMatches() {
    for (let row = 0; row < gridSize; row++) {
        if (checkRow(row)) {
            clearRow(row);
        }
    }

    for (let col = 0; col < gridSize; col++) {
        if (checkColumn(col)) {
            clearColumn(col);
        }
    }

    // Apply gravity after clearing lines
    applyGravity();
}

// Check if a row is filled with the same shape
function checkRow(row) {
    const firstShape = grid[row][0];
    if (!firstShape) return false;

    for (let col = 1; col < gridSize; col++) {
        if (grid[row][col] !== firstShape) {
            return false;
        }
    }
    return true;
}

// Clear a filled row and update the grid
function clearRow(row) {
    for (let col = 0; col < gridSize; col++) {
        grid[row][col] = null;
        removeShapeFromGrid(row, col);
    }
}

// Check if a column is filled with the same shape
function checkColumn(col) {
    const firstShape = grid[0][col];
    if (!firstShape) return false;

    for (let row = 1; row < gridSize; row++) {
        if (grid[row][col] !== firstShape) {
            return false;
        }
    }
    return true;
}

// Clear a filled column and update the grid
function clearColumn(col) {
    for (let row = 0; row < gridSize; row++) {
        grid[row][col] = null;
        removeShapeFromGrid(row, col);
    }
}

// Apply gravity (shapes fall down)
function applyGravity() {
    for (let col = 0; col < gridSize; col++) {
        let emptySpaces = 0;
        for (let row = gridSize - 1; row >= 0; row--) {
            if (grid[row][col] === null) {
                emptySpaces++;
            } else if (emptySpaces > 0) {
                grid[row + emptySpaces][col] = grid[row][col];
                grid[row][col] = null;

                // Move the shape down in the UI
                const shapeDiv = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
                if (shapeDiv) {
                    shapeDiv.style.gridRowStart = row + emptySpaces + 1;
                }
            }
        }
    }
}

// Game Over function: Display Game Over and make border gray
function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    document.getElementById("game-container").style.border = '5px solid gray'; // Gray border
    alert("Game Over! No space for new blocks.");
}

// Update game every 500ms
function updateGame() {
    // Future game logic for adding new blocks or special events can go here.
}
