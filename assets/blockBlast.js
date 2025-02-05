// Block Blast Game Scene
var blockBlast = {
    preload: function () {
        this.load.image('block', 'https://via.placeholder.com/32/32C8C8/FFFFFF?text=Block');
    },

    create: function () {
        // Create a group of blocks
        blocks = this.physics.add.group({
            key: 'block',
            repeat: 10,
            setXY: { x: 100, y: 100, stepX: 70, stepY: 0 }
        });

        // Add interactivity to blocks
        blocks.children.iterate(function(block) {
            block.setInteractive();
            block.on('pointerdown', destroyBlock, this);
        });

        // Create score text
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // Create player sprite (monkey)
        player = this.physics.add.sprite(400, 500, 'monkey');
        player.setCollideWorldBounds(true);

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

// Function to destroy the block in Block Blast game scene
function destroyBlock(pointer, block) {
    block.destroy(); // Remove the block
    score += 10; // Increase the score by 10
    scoreText.setText('Score: ' + score); // Update the score display
}
