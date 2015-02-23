CrashLanding.Util.ShatterArray = function ShatterArray(game, key, frames) {
    var arrayOfShatteredGroups = [];

    frames.forEach(function(frame) {
        game.shattered[frame] = CrashLanding.Util.ShatterSprite(game, key, frame);
        arrayOfShatteredGroups.push(game.shattered[frame]);
    });

    return arrayOfShatteredGroups;
}
