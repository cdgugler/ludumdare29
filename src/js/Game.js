CrashLanding.Game = function (game) {
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
};

CrashLanding.Game.prototype = {

	create: function () {
        var gravityY = 1200;
        var playerStartX = 10;
        var playerStartY = 1022;
        var bgColor = '#003e7b';


        /** making tiles explode **/
        var icetile01 = this.game.add.sprite(64, 1030, 'sprites', 'icetile01.png');
        var bmd = this.game.add.bitmapData(64, 64);
        bmd.draw(icetile01, 0, 0, 64, 64);
        bmd.update();
        this.game.cache.addBitmapData('icetilebmd', bmd);
        var icetile02 = this.game.add.sprite(150, 1030, this.game.cache.getBitmapData('icetilebmd'));
        var tempImage = new Image();
        tempImage.src = this.game.cache.getBitmapData('icetilebmd').canvas.toDataURL();
        var iceShatter = new Shatter(tempImage, 8);
        var tempSprites = this.game.add.group();

        iceShatter.images.forEach(function(el, ind, arr) {
            var key = 'ice' + ind;
            this.game.cache.addImage(key, null, el.image);
            var sprite = tempSprites.create(el.x + 180, el.y + 960, key);
            this.game.physics.arcade.enable(sprite);
            sprite.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
            sprite.body.velocity.y = this.game.rnd.integerInRange(-1000, -500);
        }.bind(this));
        /** making tiles explode **/

        this.game.level1map = this.game.add.tilemap('level1');
        this.game.level1map.addTilesetImage('tileset', 'tiles');
        this.game.level1map.setCollisionByExclusion([]);
        this.layer1 = this.game.level1map.createLayer('Tile Layer 1');
        this.layer1.resizeWorld();
        this.game.stage.backgroundColor = bgColor;
        this.game.physics.arcade.gravity.y = gravityY;

        this.game.player = new Player(this.game, playerStartX, playerStartY);

        this.game.camera.follow(this.game.player);
        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.gameOver = false;

        this.game.timer = this.game.time.create(false);

        // TODO Water tiles should have a class?
        this.game.water = this.game.add.group();
        this.game.water.enableBody = true;
        this.game.water.physicsBodyType = Phaser.Physics.ARCADE;

        // TODO Move monsters to own class
        this.game.monsters = this.game.add.group();
        this.game.monsters.enableBody = true;
        // this.game.monster.body.setSize(62, 128, 0, 0);
        this.game.monsters.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.fx = initAudio(this.game);

        // Set up to avoid errors on desktop
        this.game.buttonA = {};
        this.game.buttonLeft = {};
        this.game.buttonRight = {};

        // TODO Move this to it's own class
        // add mobile gamepad
        // Should check for desktop and only display if not?
        if (!this.game.device.desktop) { 
            this.game.buttonA = this.game.add.button(this.game.width - 70, this.game.height - 68, 'buttonA', null, this, 0, 0, 0, 0);
            this.game.buttonA.fixedToCamera = true;
            this.game.buttonA.events.onInputOver.add(function() {this.game.buttonA._active = true; }.bind(this));
            this.game.buttonA.events.onInputDown.add(function() {this.game.buttonA._active = true; }.bind(this));
            this.game.buttonA.events.onInputOut.add(function() {this.game.buttonA._active = false; }.bind(this));
            this.game.buttonA.events.onInputUp.add(function() {this.game.buttonA._active = false; }.bind(this));

            this.game.buttonLeft = this.game.add.button(12, this.game.height - 68, 'buttonLeft', null, this, 0, 0, 0, 0);
            this.game.buttonLeft.fixedToCamera = true;
            this.game.buttonLeft.events.onInputOver.add(function() {this.game.buttonLeft._active = true; }.bind(this));
            this.game.buttonLeft.events.onInputDown.add(function() {this.game.buttonLeft._active = true; }.bind(this));
            this.game.buttonLeft.events.onInputOut.add(function() {this.game.buttonLeft._active = false; }.bind(this));
            this.game.buttonLeft.events.onInputUp.add(function() {this.game.buttonLeft._active = false; }.bind(this));

            this.game.buttonRight = this.game.add.button(88, this.game.height - 68, 'buttonRight', null, this, 0, 0, 0, 0);
            this.game.buttonRight.fixedToCamera = true;
            this.game.buttonRight.events.onInputOver.add(function() {this.game.buttonRight._active = true; }.bind(this));
            this.game.buttonRight.events.onInputDown.add(function() {this.game.buttonRight._active = true; }.bind(this));
            this.game.buttonRight.events.onInputOut.add(function() {this.game.buttonRight._active = false; }.bind(this));
            this.game.buttonRight.events.onInputUp.add(function() {this.game.buttonRight._active = false; }.bind(this));
        }

        // TODO fix this - moved to own file, but not ideal
        this.game.explodeGround = explodeGround;

        this.game.timer.loop(500, this.game.explodeGround, this);
        this.game.timer.start();

        this.game.playerInWater = function() {
            this.game.player.kill(); 
            this.game.fx.play('playerInWater');
            this.game.stateText = this.game.add.text(this.game.camera.x + this.game.width / 2, this.game.camera.y + this.game.height / 2 - 100,' ', { font: '48px Arial', fill: '#fff' });
		    this.game.exitButton = this.add.button(this.game.camera.x + this.game.width / 2 - 256, this.game.camera.y + this.game.height / 2 - 50, 'sprites', this.quitGame, this, 'button02up.png', 'button02down.png');
            this.game.stateText.anchor.setTo(0.5, 0.5);
            this.game.stateText.text = "THE WATER IS COLD";
            this.game.stateText.visible = true;
            this.game.gameOver = true;
        };
        this.game.playerInMonster = function() {
            this.game.player.kill(); 
            this.game.fx.play('playerEaten');
            this.game.stateText = this.game.add.text(this.game.camera.x + this.game.width / 2, this.game.camera.y + this.game.height / 2 - 100,' ', { font: '48px Arial', fill: '#fff' });
		    this.game.exitButton = this.add.button(this.game.camera.x + this.game.width / 2 - 256, this.game.camera.y + this.game.height / 2 - 50, 'sprites', this.quitGame, this, 'button02up.png', 'button02down.png');
            this.game.stateText.anchor.setTo(0.5, 0.5);
            this.game.stateText.text = "THEY'RE STILL HUNGRY";
            this.game.stateText.visible = true;
            this.game.gameOver = true;
        };

	},

	update: function () {
        this.game.physics.arcade.collide(this.game.player, this.layer1);
        this.game.physics.arcade.overlap(this.game.water, this.game.player, this.game.playerInWater, null, this);
        this.game.physics.arcade.overlap(this.game.monsters, this.game.player, this.game.playerInMonster, null, this);

        handleInput(this.game, this);
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.game.player = null;
        this.game.water = null;
        this.game.camera.x = 0;
        this.game.camera.y = 0;

		this.state.start('MainMenu');
	},
    render: function () {
        // this.game.debug.body(this.game.player);
        // this.game.water.forEach(function() {
        //     this.game.debug.body(this.game.water.children[0]);
        // }, this)
    }

};
