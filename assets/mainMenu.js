window.onload = function() {
    // Game configuration using Phaser.js
    var gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [mainMenuScene, monkeyMart, blockBlast] // Add all the scenes here
    };

    // Create the Phaser game instance
    var game = new Phaser.Game(gameConfig);
};

// Main Menu Scene (Here we initialize buttons and load the initial screen)
var mainMenuScene = {
    preload: function() {
        // Load background for the menu screen
        this.load.image('background', 'https://via.placeholder.com/800x600/87CEEB/FFFFFF?text=Background');
    },

    create: function() {
        // Add the background image for the main menu
        this.add.image(400, 300, 'background');

        // Create buttons for Monkey Mart and Block Blast
        var monkeyMartBtn = this.add.text(300, 250, 'Monkey Mart', { fontSize: '32px', fill: '#fff' });
        var blockBlastBtn = this.add.text(300, 350, 'Block Blast', { fontSize: '32px', fill: '#fff' });

        // Make buttons interactive
        monkeyMartBtn.setInteractive();
        blockBlastBtn.setInteractive();

        // Set up button events
        monkeyMartBtn.on('pointerdown', function() {
            this.scene.start('monkeyMart');
        }, this);

        blockBlastBtn.on('pointerdown', function() {
            this.scene.start('blockBlast');
        }, this);
    },

    update: function() {
        // Nothing to update for the main menu scene
    }
};
