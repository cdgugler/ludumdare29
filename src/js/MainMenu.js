CrashLanding.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
};

CrashLanding.MainMenu.prototype = {

	create: function () {
        this.game.stage.backgroundColor = '#003e7b';
		this.playButton = this.add.button(this.game.camera.x + gameWidth / 2 - 128, this.game.camera.y + gameHeight / 2 - 128, 'sprites', this.startGame, this, 'runbuttonup', 'runbuttondown');
        if (!this.game.device.desktop) { 
            this.game.input.onDown.add(function() { this.game.scale.startFullScreen(false); }.bind(this), this); 
        }
	},

	update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
	},

	startGame: function (pointer) {
		this.state.start('Game');
	}

};
