// Monkey Mart Game Scene
var monkeyMart = {
    preload: function () {
        this.load.image('monkey', 'https://via.placeholder.com/32/FF5733/FFFFFF?text=Monkey');
        this.load.image('item', 'https://via.placeholder.com/16/FFD700/FFFFFF?text=Item');
        this.load.image('background', 'https://via.placeholder.com/800x600/87CEEB/FFFFFF?text=Background');
    },

    create: function () {
        this.add.image(400, 300, 'background'); // Add the background image

        // Create the player sprite (monkey)
        player = this.physics.add.sprite(400, 300, 'monkey');
        player.setCollideWorldBounds(true); // Prevent the player from moving outside the world

        // Create the item sprite to be collected
        item = this.physics.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), 'item');
        this.physics.add.overlap(player, item, collectItem, null, this); // Detect overlap between player and item

        // Set up keyboard input for movement
        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {
        // Handle player movement using arrow keys
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

// Function to collect the item in Monkey Mart game scene
function collectItem(player, item) {
    // Destroy the collected item
    item.setPosition(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550)); // Relocate item randomly
    score += 10; // Increase the score by 10
    scoreText.setText('Score: ' + score); // Update the score display
}
