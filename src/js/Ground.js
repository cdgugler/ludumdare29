function explodeGround(game) {
    var tileWidth = 64;
    var tileHeight = 64;

    var rNum = this.game.rnd.integerInRange(0, 13);
    var rNum2 = this.game.rnd.integerInRange(0, 3);
    var oldTile, removeX;
    if (rNum < 10) {
        if (rNum2 == 3) {
            rNum = -rNum;
        }
        if (this.game.player) {
            if (this.game.player.alive == true) {
                removeX = this.game.player.body.x + tileWidth * rNum;
            }
        } else {
            removeX = 10;
        }
        oldTile = this.game.level1map.removeTileWorldXY(removeX, 1140, tileWidth, tileHeight);
        if (typeof oldTile != 'undefined') {
            var newTile = this.game.water.create(oldTile.worldX, oldTile.worldY, 'sprites', 'watertile.png');
            newTile.body.allowGravity = false;
            newTile.body.setSize(tileWidth, 20, 0, 44);
            if (rNum2 > 1 && this.game.player.body.x > 5000) {
                var newMonster = this.game.monsters.create(newTile.body.x, newTile.body.y + 50, 'sprites', 'alchemymonster.png');
                newMonster.body.allowGravity = false;
                var top = newTile.body.y - 2500;
                var height = this.game.rnd.integerInRange(800, 1000);
                this.game.fx.play('monsterRoar');
                this.game.add.tween(newMonster)
                    .to({ y: height }, 500, Phaser.Easing.Exponential.In)
                    .to({ y: 1200 }, 700, Phaser.Easing.Linear.None)
                    .start();
            }
        }
    }
};
