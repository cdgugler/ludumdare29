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



        this.game.iceShatter01 = ShatterSprite(this.game, 'sprites', 'icetile01.png');
        this.game.iceShatter02 = ShatterSprite(this.game, 'sprites', 'icetile02.png');
        this.game.iceShatter03 = ShatterSprite(this.game, 'sprites', 'icetile03.png');
        this.game.shatteredIce = [this.game.iceShatter01, this.game.iceShatter02, this.game.iceShatter03];

        this.game.waterExplode = this.game.add.audio('waterExplode');

        this.game.level1map = this.game.add.tilemap('level1');
        this.game.level1map.addTilesetImage('tileset', 'tiles');
        this.game.level1map.setCollisionByExclusion([]);
        this.game.layer1 = this.game.level1map.createLayer('Tile Layer 1');
        this.game.layer1.resizeWorld();
        this.game.stage.backgroundColor = bgColor;
        this.game.physics.arcade.gravity.y = gravityY;

        this.game.player = new CrashLanding.Util.Player(this.game, playerStartX, playerStartY);

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

        mobileGamePad(this.game, this);

        // TODO fix this - moved to own file, but not ideal
        this.game.explodeGround = function() {
            this.counter = this.counter || 0;
            explodeGround(this.game, this.game.shatteredIce[this.counter % 3]);
            this.counter++;
        };

        this.game.timer.loop(500, this.game.explodeGround, this);
        this.game.timer.start();

        this.game.score = this.game.add.text(10, 10, "Score: ", {
            font: '14px monospace',
            fill: '#ffffff'
        });
        this.game.score.fixedToCamera = true;
        this.game.scoreNum = 0;
        this.game.scoreMultiplier = 1;
        this.game.gameTime = this.game.time.create(this.game);
        this.game.gameTimerEvent = this.game.gameTime.add(250, function() {
            this.game.scoreMultiplier += 1;
            if (this.game.player && this.game.player.alive) {
                this.game.scoreNum += this.game.scoreMultiplier * Math.abs(this.game.player.body.velocity.x) / 400;
            }
            this.game.score.text = 'Score: ' + Math.floor(this.game.scoreNum);
        }, this);
        this.game.gameTimerEvent.loop = true;
        this.game.gameTime.start();
	},

	update: function () {
        this.game.physics.arcade.collide(this.game.iceShatter01, this.game.layer1, null, null, this);
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
