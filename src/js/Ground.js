function explodeGround(game, exploder) {
    var tileWidth = 64;
    var tileHeight = 64;
    var groundLevel = 1140;
    var oldTile, removeX;
    var xVelocityMin = -50;
    var xVelocityMax = 50;
    var yVelocityMin = -1000;
    var yVelocityMax = -500;
    var monstersSpawnPosition = 5000;

    if (randomPercent(game, 71)) {
        if (game.player) {
            if (game.player.alive == true) {
                removeX = game.player.body.x + tileWidth * game.rnd.integerInRange(-3, 13);
            }
        } else {
            removeX = 10;
        }
        oldTile = game.level1map.removeTileWorldXY(removeX, groundLevel, tileWidth, tileHeight);

        if (typeof oldTile != 'undefined') {
            exploder.x = oldTile.worldX;
            exploder.y = oldTile.worldY;
            exploder.children.forEach(function(sprite) {
                sprite.x = sprite.originX;
                sprite.y = sprite.originY;
                sprite.body.velocity.x = game.rnd.integerInRange(xVelocityMin, xVelocityMax);
                sprite.body.velocity.y = game.rnd.integerInRange(yVelocityMin, yVelocityMax);
            });
            game.waterExplode.play('', 0, .3);

            var newTile = game.water.create(oldTile.worldX, oldTile.worldY, 'sprites', 'watertile');
            newTile.body.allowGravity = false;
            newTile.body.setSize(tileWidth, 20, 0, 44);
            if (randomPercent(game, 50) && game.player.body.x > monstersSpawnPosition) {
                var newMonster = game.monsters.create(newTile.body.x, newTile.body.y + 50, 'sprites', 'alchemymonster');
                newMonster.body.allowGravity = false;
                var top = newTile.body.y - 2500;
                var height = game.rnd.integerInRange(800, 1000);
                game.fx.play('monsterRoar');
                game.add.tween(newMonster)
                    .to({ y: height }, 500, Phaser.Easing.Exponential.In)
                    .to({ y: 1200 }, 700, Phaser.Easing.Linear.None)
                    .start();
            }
        }
    }
};

function randomPercent(game, percent) {
    return game.rnd.integerInRange(1, 100) < percent;
}
