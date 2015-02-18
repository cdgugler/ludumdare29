CrashLanding.Util.ShatterSprite = function ShatterSprite(game, key, frame) {
    var sprite = game.add.sprite(-1000, -1000, key, frame);
    var bmd = game.add.bitmapData(sprite.width, sprite.height);
    bmd.draw(sprite, 0, 0, sprite.width, sprite.height);
    bmd.update();
    sprite = null;
    var tempImage = new Image();
    tempImage.src = bmd.canvas.toDataURL();
    var iceShatter = new Shatter(tempImage, 12);
    var shatteredGroup = game.add.group();

    iceShatter.images.forEach(function(el, ind, arr) {
        var key = frame + ind;
        game.cache.addImage(key, null, el.image);
        var sprite = shatteredGroup.create(el.x, el.y, key);
        sprite.originX = el.x;
        sprite.originY = el.y;
        game.physics.arcade.enable(sprite);
        sprite.body.velocity.x = game.rnd.integerInRange(-50, 50);
        sprite.body.velocity.y = game.rnd.integerInRange(-1000, -500);
        sprite.body.checkCollision.left = false;
        sprite.body.checkCollision.right = false;
        sprite.body.checkCollision.up = false;
    });

    return shatteredGroup;
}
