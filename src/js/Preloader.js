
CrashLanding.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

CrashLanding.Preloader.prototype = {

	preload: function () {

		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.game.centerX, this.game.centerY, 'preloaderBar');
        this.load.image('mountainsbg', 'images/mountains-mirrored.png');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		this.load.atlasJSONHash('sprites', 'build/images/sprites.png', 'build/images/sprites.json');
        this.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'images/tiles.png');
        this.load.spritesheet('buttonLeft', 'src/images/sprites/left.png', 64, 64);
        this.load.spritesheet('buttonRight', 'src/images/sprites/right.png', 64, 64);
        this.load.spritesheet('buttonA', 'images/sprites/a-button.png', 64, 64);
        this.load.audio('sfx', ['sounds/soundfx.mp3', 'sounds/soundfx.ogg']);

        // TODO - add this sfx to the sfx mp3
        this.load.audio('waterExplode', ['sounds/waterExplodeProcessed.wav']);

        this.load.audio('music', ['sounds/music.mp3', 'sounds/music.ogg']);

	},

	create: function () {
        this.game.music = this.game.add.audio('music', 1, true);
        this.game.music.play('',0,1,true);
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');

	},

	// update: function () {

	// 	//	You don't actually need to do this, but I find it gives a much smoother game experience.
	// 	//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
	// 	//	You can jump right into the menu if you want and still play the music, but you'll have a few
	// 	//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
	// 	//	it's best to wait for it to decode here first, then carry on.
	// 	
	// 	//	If you don't have any music in your game then put the game.state.start line into the create function and delete
	// 	//	the update function completely.
	// 	
	// 	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
	// 	{
	// 		this.ready = true;
	// 		this.state.start('MainMenu');
	// 	}

	// }

};
