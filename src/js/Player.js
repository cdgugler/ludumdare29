/*
 * Player Class
 *
 */

CrashLanding.Sprite.Player = function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'sprites', 'standing');

    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.setSize(32, 64, 0, 0);
    this.facing = 'right';
    this.anchor.setTo(.5,.5); // so we can flip it
    this.animations.add('running', ['0000', '0006', '0012', '0018', '0024', '0030', '0036', '0042'], 10, true);
    this.animations.add('idle', ['standing'], false, false);
    this.maxSpeed = 500;
    this.speed = 10;
    this.friction = 3;
    this.jumping = false;
    this.jumpTimer = 0;
    this.doubleJump = false;
};

CrashLanding.Sprite.Player.prototype = Object.create(Phaser.Sprite.prototype);
CrashLanding.Sprite.Player.prototype.constructor = CrashLanding.Sprite.Player;

CrashLanding.Sprite.Player.prototype.die = function (state, message, audioFx) {
    var centerX = state.game.camera.x + state.game.width / 2;
    var centerY = state.game.camera.y + state.game.height / 2;
    var fontSizeType = '48px Arial';
    var fontColor = '#fff';

    state.game.player.kill(); 
    state.game.fx.play(audioFx, .4);
    state.game.stateText = state.game.add.text(centerX, centerY - 100, ' ', { font: fontSizeType, fill: fontColor });
    state.game.exitButton = state.add.button(centerX - 256, centerY - 50, 'sprites', state.quitGame, state, 'button02up', 'button02down');
    state.game.stateText.anchor.setTo(0.5, 0.5);
    state.game.stateText.text = message;
    state.game.stateText.visible = true;
    state.game.gameOver = true;
    state.game.timer.stop();
}

CrashLanding.Sprite.Player.prototype.waterDeath = function() {
    this.die(this.game.state.getCurrentState(), 'THE WATER IS COLD', 'playerInWater');
}

CrashLanding.Sprite.Player.prototype.monsterDeath = function() {
    this.die(this.game.state.getCurrentState(), 'THEY\'RE STILL HUNGRY', 'playerEaten');
}

CrashLanding.Sprite.Player.prototype.jump = function() {
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

CrashLanding.Sprite.Player.prototype.update = function() {
    this.game.physics.arcade.collide(this.game.player, this.game.layer1, null, null, this);
    this.game.physics.arcade.overlap(this.game.water, this.game.player, this.waterDeath, null, this);
    this.game.physics.arcade.overlap(this.game.monsters, this.game.player, this.monsterDeath, null, this);

    handleInput(this.game, this.game.state.getCurrentState());
}

