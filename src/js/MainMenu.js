
CrashLanding.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

CrashLanding.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

		// this.add.sprite(0, 0, 'preloaderBackground');
        this.game.stage.backgroundColor = '#003e7b';

		this.playButton = this.add.button(this.game.camera.x + gameWidth / 2 - 128, this.game.camera.y + gameHeight / 2 - 128, 'sprites', this.startGame, this, 'runbuttonup.png', 'runbuttondown.png');

        if (!this.game.device.desktop){ this.game.input.onDown.add(function() { this.game.scale.startFullScreen(false); }.bind(this), this); }

        this.game.input.onDown.add(function() { this.game.scale.startFullScreen(false); }.bind(this), this);
	},

	update: function () {


        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
