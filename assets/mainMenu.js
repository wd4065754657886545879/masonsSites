// Wait for the DOM to load
window.onload = function() {
    // Get buttons
    var monkeyMartBtn = document.getElementById('monkey-mart-btn');
    var blockBlastBtn = document.getElementById('block-blast-btn');

    // Game containers
    var monkeyMartGame = document.getElementById('monkey-mart-game');
    var blockBlastGame = document.getElementById('block-blast-game');
    var mainMenu = document.getElementById('game-container');

    // Event listeners for button clicks
    monkeyMartBtn.addEventListener('click', function() {
        mainMenu.style.display = 'none';
        monkeyMartGame.style.display = 'block';
        startMonkeyMartGame();
    });

    blockBlastBtn.addEventListener('click', function() {
        mainMenu.style.display = 'none';
        blockBlastGame.style.display = 'block';
        startBlockBlastGame();
    });
};

// Monkey Mart game function
function startMonkeyMartGame() {
    var gameCanvas = document.getElementById('gameCanvasMonkeyMart');

    // Add game logic for Monkey Mart here
    gameCanvas.innerHTML = '<p>Monkey Mart is starting...</p>';

    // Example of simple game interaction, you can build this with JavaScript logic.
    var score = 0;
    var player = document.createElement('div');
    player.style.width = '50px';
    player.style.height = '50px';
    player.style.backgroundColor = '#FF5733';
    player.style.position = 'absolute';
    player.style.top = '250px';
    player.style.left = '375px';

    gameCanvas.appendChild(player);

    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            player.style.left = parseInt(player.style.left) - 10 + 'px';
        } else if (event.key === 'ArrowRight') {
            player.style.left = parseInt(player.style.left) + 10 + 'px';
        } else if (event.key === 'ArrowUp') {
            player.style.top = parseInt(player.style.top) - 10 + 'px';
        } else if (event.key === 'ArrowDown') {
            player.style.top = parseInt(player.style.top) + 10 + 'px';
        }
    });
}

// Block Blast game function
function startBlockBlastGame() {
    var gameCanvas = document.getElementById('gameCanvasBlockBlast');

    // Add game logic for Block Blast here
    gameCanvas.innerHTML = '<p>Block Blast is starting...</p>';

    // Simple block-blast example logic
    var block = document.createElement('div');
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.backgroundColor = '#32C8C8';
    block.style.position = 'absolute';
    block.style.top = '100px';
    block.style.left = '375px';

    gameCanvas.appendChild(block);

    block.addEventListener('click', function() {
        block.style.backgroundColor = '#ff0000'; // Change color when clicked
        block.innerHTML = 'Destroyed';
    });
}
