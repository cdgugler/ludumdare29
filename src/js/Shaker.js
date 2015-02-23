CrashLanding.Sprite.Shaker = function Shaker(game, x, y) {
    Phaser.Sprite.call(this, game, x, y);
    // Phaser.Sprite.call(this, game, x, y, 'sprites', 'a-button'); // debug
    game.add.existing(this);

    this.anchor.setTo(.5,.5);
    this.shaking = 0;
    this.magnitude = 5;
    this.bgX = this.game.backgroundMountains.tilePosition.x;
    this.bgY = this.game.backgroundMountains.tilePosition.y;
    this.wasShaking = false;
};

CrashLanding.Sprite.Shaker.prototype = Object.create(Phaser.Sprite.prototype);
CrashLanding.Sprite.Shaker.prototype.constructor = CrashLanding.Sprite.Shaker;

CrashLanding.Sprite.Shaker.prototype.update = function () {
    if (this.shaking > 0) {
        var randomX = this.game.rnd.between(-this.magnitude, this.magnitude);
        var randomY = this.game.rnd.between(-this.magnitude, this.magnitude);
        this.x = this.game.player.x + randomX;
        this.y = this.game.player.y + randomY;
        this.game.backgroundMountains.tilePosition.x += randomX;
        this.game.backgroundMountains.tilePosition.y += this.game.rnd.between(0, this.magnitude);

        this.wasShaking = true;
        this.shaking--;
        if (this.shaking < 1 && this.wasShaking) {
            this.game.camera.follow(this.game.player);
            this.game.backgroundMountains.tilePosition.y = this.bgY;
            this.game.backgroundMountains.tilePosition.x = this.bgX;
            this.wasShaking = false;
        }
    }
};

CrashLanding.Sprite.Shaker.prototype.shake = function (shakeTime, magnitude) {
    this.bgX = this.game.backgroundMountains.tilePosition.x;
    this.bgY = this.game.backgroundMountains.tilePosition.y;
    this.shaking = shakeTime;
    this.magnitude = magnitude;
    this.game.camera.follow(this);
    this.bgDiff = this.game.player.x;
};
