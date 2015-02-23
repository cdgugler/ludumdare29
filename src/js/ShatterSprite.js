CrashLanding.Util.ShatterSprite = function ShatterSprite(game, key, frame) {
    var numberOfSprites = 12;
    var offCanvas = -1000;

    function getImageFromSprite(game, key, frame) {
        var sprite = game.add.sprite(offCanvas, offCanvas, key, frame);
        var bmd = game.add.bitmapData(sprite.width, sprite.height);
        var image = new Image();

        bmd.draw(sprite, 0, 0, sprite.width, sprite.height);
        bmd.update();
        sprite.destroy();
        image.src = bmd.canvas.toDataURL();
        return image;
    }

    function createShatteredGroup(game, shatteredImage) {
        var shatteredGroup = game.add.group();

        shatteredImage.images.forEach(function(image, ind, arr) {
            var key = frame + ind;
            game.cache.addImage(key, null, image.image);
            var sprite = shatteredGroup.create(offCanvas, offCanvas, key);
            sprite.originX = image.x;
            sprite.originY = image.y;
            game.physics.arcade.enable(sprite);
            sprite.body.checkCollision.left = false;
            sprite.body.checkCollision.right = false;
            sprite.body.checkCollision.up = false;
        });
        return shatteredGroup;
    }

    return createShatteredGroup(game, 
        new Shatter(getImageFromSprite(game, key, frame), numberOfSprites));
}
