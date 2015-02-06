/*
 * Player Class
 *
 */

function Player(game, x, y) {
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

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
