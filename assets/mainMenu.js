// Wait until the DOM is fully loaded before setting up the game
window.onload = function() {
    // Game configuration using Phaser.js
    var gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    // Create the Phaser game instance
    var game = new Phaser.Game(gameConfig);

    function preload() {
        // Load the basic game assets (this is just a placeholder for now)
        this.load.image('background', 'https://via.placeholder.com/800x600/87CEEB/FFFFFF?text=Background');
    }

    function create() {
        // Add event listeners for the buttons when DOM is ready
        document.getElementById("monkey-mart-btn").addEventListener("click", function() {
            game.scene.start("monkeyMart"); // Start the Monkey Mart scene immediately
            document.getElementById("game-container").style.display = 'none'; // Hide the main menu instantly
        });

        document.getElementById("block-blast-btn").addEventListener("click", function() {
            game.scene.start("blockBlast"); // Start the Block Blast scene immediately
            document.getElementById("game-container").style.display = 'none'; // Hide the main menu instantly
        });
    }

    function update() {
        // Nothing here for now
    }
};
