CrashLanding.Util.handleInput = function (game, state) {
    if (game.cursors.left.isDown || game.buttonLeft._active || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        game.player.moveLeft();
    } else if (game.cursors.right.isDown || game.buttonRight._active || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        game.player.moveRight();
    } else {
        game.player.standStill();
    }
    if (game.cursors.up.isDown || game.buttonA._active || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        game.player.jump();
    }
    // Pause Music for dev
    if (game.input.keyboard.isDown(Phaser.Keyboard.M)) {
        game.sound.mute = true;
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
