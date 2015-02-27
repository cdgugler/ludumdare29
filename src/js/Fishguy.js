CrashLanding.Sprite.Fishguy = function Fishguy(game, x, y) {
    x = x || 0;
    y = y || 0;
    Phaser.Sprite.call(this, game, x, y, 'sprites', 'fishguy');

    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(32, 10, 0, 0);
    this.body.collideWorldBounds = true;
    this.anchor.setTo(.5,.5); // so we can flip it
    this.friction = 3;
    this.kill();
};

CrashLanding.Sprite.Fishguy.prototype = Object.create(Phaser.Sprite.prototype);
CrashLanding.Sprite.Fishguy.prototype.constructor = CrashLanding.Sprite.Player;

CrashLanding.Sprite.Fishguy.prototype.collect = function() {
    this.kill();
    this.game.scoreNum += 15;
};


CrashLanding.Sprite.Fishguy.prototype.touchGround = function() {
    this.body.angularVelocity = 0;
};

CrashLanding.Sprite.Fishguy.prototype.update = function() {
    this.game.physics.arcade.collide(this, this.game.layer1, this.touchGround, null, this);
    this.game.physics.arcade.overlap(this.game.player, this, this.collect, null, this);
    if (this.y > 1100) { this.kill(); }
};

