/*
 * Player Class
 *
 */

CrashLanding.Util.Player = function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'sprites', 'standing.png');

    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.setSize(32, 64, 0, 0);
    this.facing = 'right';
    this.anchor.setTo(.5,.5); // so we can flip it
    this.animations.add('running', ['0000.png', '0006.png', '0012.png', '0018.png', '0024.png', '0030.png', '0036.png', '0042.png'], 10, true);
    this.animations.add('idle', ['standing.png'], false, false);
    this.maxSpeed = 500;
    this.speed = 10;
    this.friction = 3;
    this.jumping = false;
    this.jumpTimer = 0;
    this.doubleJump = false;
};

CrashLanding.Util.Player.prototype = Object.create(Phaser.Sprite.prototype);
CrashLanding.Util.Player.prototype.constructor = CrashLanding.Util.Player;

CrashLanding.Util.Player.prototype.die = function (state, message, audioFx) {
    var centerX = state.game.camera.x + state.game.width / 2;
    var centerY = state.game.camera.y + state.game.height / 2;
    var fontSizeType = '48px Arial';
    var fontColor = '#fff';

    state.game.player.kill(); 
    state.game.fx.play(audioFx, .4);
    state.game.stateText = state.game.add.text(centerX, centerY - 100, ' ', { font: fontSizeType, fill: fontColor });
    state.game.exitButton = state.add.button(centerX - 256, centerY - 50, 'sprites', state.quitGame, state, 'button02up.png', 'button02down.png');
    state.game.stateText.anchor.setTo(0.5, 0.5);
    state.game.stateText.text = message;
    state.game.stateText.visible = true;
    state.game.gameOver = true;
    state.game.timer.stop();
}

CrashLanding.Util.Player.prototype.waterDeath = function() {
    this.die(this.game.state.getCurrentState(), 'THE WATER IS COLD', 'playerInWater');
}

CrashLanding.Util.Player.prototype.monsterDeath = function() {
    this.die(this.game.state.getCurrentState(), 'THEY\'RE STILL HUNGRY', 'playerEaten');
}

CrashLanding.Util.Player.prototype.jump = function() {
    if (this.body.onFloor() || this.body.touching.down) {
        this.game.fx.play('jump');
        this.doubleJump = false;
        this.body.velocity.y = -400;
        this.jumpTimer = this.game.time.now + 150;
    } else if (this.doubleJump == false && this.game.time.now > this.jumpTimer){ 
        this.game.fx.play('jump');
        this.doubleJump = true;
        this.body.velocity.y = -400;
    }
}

CrashLanding.Util.Player.prototype.update = function() {
    this.game.physics.arcade.collide(this.game.player, this.game.layer1, null, null, this);
    this.game.physics.arcade.overlap(this.game.water, this.game.player, this.waterDeath, null, this);
    this.game.physics.arcade.overlap(this.game.monsters, this.game.player, this.monsterDeath, null, this);

    handleInput(this.game, this.game.state.getCurrentState());
}

