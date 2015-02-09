function explodeGround(game, exploder) {
    var tileWidth = 64;
    var tileHeight = 64;

    var rNum = game.rnd.integerInRange(0, 13);
    var rNum2 = game.rnd.integerInRange(0, 3);
    var oldTile, removeX;
    if (rNum < 10) {
        if (rNum2 == 3) {
            rNum = -rNum;
        }
        if (game.player) {
            if (game.player.alive == true) {
                removeX = game.player.body.x + tileWidth * rNum;
            }
        } else {
            removeX = 10;
        }
        oldTile = game.level1map.removeTileWorldXY(removeX, 1140, tileWidth, tileHeight);

        if (typeof oldTile != 'undefined') {
            exploder.x = oldTile.worldX;
            exploder.y = oldTile.worldY;
            exploder.children.forEach(function(sprite) {
                sprite.x = sprite.originX;
                sprite.y = sprite.originY;
                sprite.body.velocity.x = game.rnd.integerInRange(-50, 50);
                sprite.body.velocity.y = game.rnd.integerInRange(-1000, -500);
            });

            var newTile = game.water.create(oldTile.worldX, oldTile.worldY, 'sprites', 'watertile.png');
            newTile.body.allowGravity = false;
            newTile.body.setSize(tileWidth, 20, 0, 44);
            if (rNum2 > 1 && game.player.body.x > 5000) {
                var newMonster = game.monsters.create(newTile.body.x, newTile.body.y + 50, 'sprites', 'alchemymonster.png');
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
