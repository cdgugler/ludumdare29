CrashLanding.Util.mobileGamePad = function mobileGamePad(game, state) {
    // Set up to avoid errors on desktop
    game.buttonA = {};
    game.buttonLeft = {};
    game.buttonRight = {};

    if (!game.device.desktop) { 
        game.buttonA = game.add.button(game.width - 70, game.height - 68, 'buttonA', null, state, 0, 0, 0, 0);
        game.buttonA.fixedToCamera = true;
        game.buttonA.events.onInputOver.add(function() {game.buttonA._active = true; }.bind(state));
        game.buttonA.events.onInputDown.add(function() {game.buttonA._active = true; }.bind(state));
        game.buttonA.events.onInputOut.add(function() {game.buttonA._active = false; }.bind(state));
        game.buttonA.events.onInputUp.add(function() {game.buttonA._active = false; }.bind(state));

        game.buttonLeft = game.add.button(12, game.height - 68, 'buttonLeft', null, state, 0, 0, 0, 0);
        game.buttonLeft.fixedToCamera = true;
        game.buttonLeft.events.onInputOver.add(function() {game.buttonLeft._active = true; }.bind(state));
        game.buttonLeft.events.onInputDown.add(function() {game.buttonLeft._active = true; }.bind(state));
        game.buttonLeft.events.onInputOut.add(function() {game.buttonLeft._active = false; }.bind(state));
        game.buttonLeft.events.onInputUp.add(function() {game.buttonLeft._active = false; }.bind(state));

        game.buttonRight = game.add.button(88, game.height - 68, 'buttonRight', null, state, 0, 0, 0, 0);
        game.buttonRight.fixedToCamera = true;
        game.buttonRight.events.onInputOver.add(function() {game.buttonRight._active = true; }.bind(state));
        game.buttonRight.events.onInputDown.add(function() {game.buttonRight._active = true; }.bind(state));
        game.buttonRight.events.onInputOut.add(function() {game.buttonRight._active = false; }.bind(state));
        game.buttonRight.events.onInputUp.add(function() {game.buttonRight._active = false; }.bind(state));
    }
}
