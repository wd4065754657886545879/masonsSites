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

var player;
var item;
var blocks;
var score = 0;
var scoreText;
var cursors;

function preload() {
    // Load images for both games (replace with your image paths)
    this.load.image('monkey', 'assets/images/monkey.png');
    this.load.image('item', 'assets/images/item.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('block', 'assets/images/block.png');
}

function create() {
    // Adding event listeners for the buttons
    document.getElementById("monkey-mart-btn").addEventListener("click", function() {
        game.scene.start("monkeyMart");
    });

    document.getElementById("block-blast-btn").addEventListener("click", function() {
        game.scene.start("blockBlast");
    });
    
    // You can remove the buttons after starting the game
    document.getElementById("game-container").style.display = 'none';
}

// Monkey Mart Game Scene
var monkeyMart = {
    preload: function () {
        this.load.image('monkey', 'assets/images/monkey.png');
        this.load.image('item', 'assets/images/item.png');
        this.load.image('background', 'assets/images/background.png');
    },

    create: function () {
        this.add.image(400, 300, 'background');

        player = this.physics.add.sprite(400, 300, 'monkey');
        player.setCollideWorldBounds(true);

        item = this.physics.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), 'item');
        this.physics.add.overlap(player, item, collectItem, null, this);

        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        } else {
            player.setVelocityY(0);
        }
    }
};

// Block Blast Game Scene
var blockBlast = {
    preload: function () {
        this.load.image('block', 'assets/images/block.png');
    },

    create: function () {
        blocks = this.physics.add.group({
            key: 'block',
            repeat: 10,
            setXY: { x: 100, y: 100, stepX: 70, stepY: 0 }
        });

        blocks.children.iterate(function(block) {
            block.setInteractive();
            block.on('pointerdown', destroyBlock, this);
        });

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    },

    update: function () {}

};

// Collect item function for Monkey Mart
function collectItem(player, item) {
    score += 1;
    item.setPosition(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550));
    console.log("Item collected! Total: " + score);
}

// Destroy block function for Block Blast
function destroyBlock(block) {
    block.setAlpha(0); // Make the block disappear
    score += 1;
    scoreText.setText('Score: ' + score);
}

// Add scenes to game
game.scene.add('monkeyMart', monkeyMart);
game.scene.add('blockBlast', blockBlast);
