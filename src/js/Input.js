function handleInput(game, state) {
    if (game.cursors.left.isDown || game.buttonLeft._active) {
        if (game.player.facing != 'left') {
            game.player.animations.play('running');
            game.player.facing = 'left';
            game.player.scale.x = -1;
        }
        if (game.player.body.velocity.x > -game.player.maxSpeed) {
            game.player.body.velocity.x -= game.player.speed;
        }
    } else if (game.cursors.right.isDown || game.buttonRight._active) {
        if (game.player.facing != 'right') {
            game.player.animations.play('running');
            game.player.facing = 'right';
            game.player.scale.x = 1;
        }
        if (game.player.body.velocity.x < game.player.maxSpeed) {
            game.player.body.velocity.x += game.player.speed;
        }
    } else {
        if (game.player.facing != 'idle') {
            game.player.facing = 'idle';
            game.player.animations.play('idle');
        }
        if (game.player.body.onFloor()) {
            if (game.player.body.velocity.x > 0) {
                game.player.body.velocity.x -= game.player.friction;
            } else if (game.player.body.velocity.x < 0) {
                game.player.body.velocity.x += game.player.friction;
            }
        }
    }
    if (game.cursors.up.isDown || game.buttonA._active) {
        if (game.player.body.onFloor()) {
            game.fx.play('jump');
            game.player.doubleJump = false;
            game.player.body.velocity.y = -400;
            game.player.jumpTimer = game.time.now + 150;
        } else if (game.player.doubleJump == false && game.time.now > game.player.jumpTimer){ 
            game.fx.play('jump');
            game.player.doubleJump = true;
            game.player.body.velocity.y = -400;
        }
    }
    // Pause Music for dev
    if (game.input.keyboard.isDown(Phaser.Keyboard.M)) {
        game.music.pause();
    }
    if (game.gameOver == true) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            state.quitGame();
        }
    }
    if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse) {
        game.buttonA._active = false;
        game.buttonLeft._active = false;
        game.buttonRight._active = false;
    }
}
