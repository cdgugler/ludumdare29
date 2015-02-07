function initAudio(game) {
    var fx = game.add.audio('sfx');
    fx.addMarker('monsterRoar', 2, 1.2);
    fx.addMarker('playerEaten', 5, 0.5);
    fx.addMarker('playerInWater', 7, 0.5);
    fx.addMarker('jump', 0, 0.24);

    return fx;
}
