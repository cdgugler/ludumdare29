
CrashLanding.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

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

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

CrashLanding.Game.prototype = {

	create: function () {
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.level1map = this.game.add.tilemap('level1');
        this.level1map.addTilesetImage('tileset', 'tiles');
        this.level1map.setCollisionByExclusion([]);
        this.layer1 = this.level1map.createLayer('Tile Layer 1');
        this.game.stage.backgroundColor = '#003e7b';
        // this.layer1.debug = true;
        this.layer1.resizeWorld();
        this.game.physics.arcade.gravity.y = 1200;
        this.game.player = this.game.add.sprite(10, 1022, 'sprites', 'standing.png');
        this.game.physics.enable(this.game.player, Phaser.Physics.ARCADE);
        this.game.player.body.collideWorldBounds = true;
        this.game.player.body.setSize(32, 64, 0, 0);
        this.game.player.facing = 'right';
        this.game.player.anchor.setTo(.5,.5); // so we can flip it
        this.game.player.animations.add('running', ['0000.png', '0006.png', '0012.png', '0018.png', '0024.png', '0030.png', '0036.png', '0042.png'], 10, true);
        this.game.player.animations.add('idle', ['standing.png'], false, false);
        this.game.player.maxSpeed = 500;
        this.game.player.speed = 10;
        this.game.player.friction = 3;
        this.game.player.jumping = false;
        this.game.player.jumpTimer = 0;
        this.game.player.doubleJump = false;

        this.game.camera.follow(this.game.player);
        this.game.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.gameOver = false;

        this.game.timer = this.game.time.create(false);

        this.game.water = this.game.add.group();
        this.game.water.enableBody = true;
        this.game.water.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.monsters = this.game.add.group();
        this.game.monsters.enableBody = true;
        // this.game.monster.body.setSize(62, 128, 0, 0);
        this.game.monsters.physicsBodyType = Phaser.Physics.ARCADE;

        // set up the audio
        this.game.fx = this.game.add.audio('sfx');
        this.game.fx.addMarker('monsterRoar', 2, 1.2);
        this.game.fx.addMarker('playerEaten', 5, 0.5);
        this.game.fx.addMarker('playerInWater', 7, 0.5);
        this.game.fx.addMarker('jump', 0, 0.24);

        // add mobile gamepad
        // Should check for desktop and only display if not?
        this.game.buttonA = this.game.add.button(this.game.width - 70, this.game.height - 68, 'buttonA', null, this, 0, 0, 0, 0);
        this.game.buttonA.fixedToCamera = true;
        this.game.buttonA.events.onInputOver.add(function() {this.game.buttonA._active = true; }.bind(this));
        this.game.buttonA.events.onInputDown.add(function() {this.game.buttonA._active = true; }.bind(this));
        this.game.buttonA.events.onInputOut.add(function() {this.game.buttonA._active = false; }.bind(this));
        this.game.buttonA.events.onInputUp.add(function() {this.game.buttonA._active = false; }.bind(this));

        this.game.explodeTile = function() {
            var rNum = this.rnd.integerInRange(0, 13);
            var rNum2 = this.rnd.integerInRange(0, 3);
            var oldTile, removeX;
            if (rNum < 10) {
                if (rNum2 == 3) {
                    rNum = -rNum;
                }
                if (this.game.player) {
                    if (this.game.player.alive == true) {
                        removeX = this.game.player.body.x + 64 * rNum;
                    }
                } else {
                    removeX = 10;
                }
                oldTile = this.level1map.removeTileWorldXY(removeX, 1140, 64, 64);
                if (typeof oldTile != 'undefined') {
                    var newTile = this.game.water.create(oldTile.worldX, oldTile.worldY, 'sprites', 'watertile.png');
                    newTile.body.allowGravity = false;
                    newTile.body.setSize(64, 20, 0, 44);
                    if (rNum2 > 1 && this.game.player.body.x > 5000) {
                        var newMonster = this.game.monsters.create(newTile.body.x, newTile.body.y + 50, 'sprites', 'alchemymonster.png');
                        newMonster.body.allowGravity = false;
                        var top = newTile.body.y - 2500;
                        var height = this.rnd.integerInRange(800, 1000);
                        this.game.fx.play('monsterRoar');
                        this.game.add.tween(newMonster)
                            .to({ y: height }, 500, Phaser.Easing.Exponential.In)
                            .to({ y: 1200 }, 700, Phaser.Easing.Linear.None)
                            .start();
                    }
                }
            }
        };
        this.game.timer.loop(500, this.game.explodeTile, this);
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

        handleInput.call(this);

        function handleInput() {
            if (this.game.cursors.left.isDown) {
                if (this.game.player.facing != 'left') {
                    this.game.player.animations.play('running');
                    this.game.player.facing = 'left';
                    this.game.player.scale.x = -1;
                }
                if (this.game.player.body.velocity.x > -this.game.player.maxSpeed) {
                    this.game.player.body.velocity.x -= this.game.player.speed;
                }
            } else if (this.game.cursors.right.isDown) {
                if (this.game.player.facing != 'right') {
                    this.game.player.animations.play('running');
                    this.game.player.facing = 'right';
                    this.game.player.scale.x = 1;
                }
                if (this.game.player.body.velocity.x < this.game.player.maxSpeed) {
                    this.game.player.body.velocity.x += this.game.player.speed;
                }
            } else {
                if (this.game.player.facing != 'idle') {
                    this.game.player.facing = 'idle';
                    this.game.player.animations.play('idle');
                }
                if (this.game.player.body.onFloor()) {
                    if (this.game.player.body.velocity.x > 0) {
                        this.game.player.body.velocity.x -= this.game.player.friction;
                    } else if (this.game.player.body.velocity.x < 0) {
                        this.game.player.body.velocity.x += this.game.player.friction;
                    }
                }
            }
            if (this.game.cursors.up.isDown || this.game.buttonA._active) {
                if (this.game.player.body.onFloor()) {
                    this.game.fx.play('jump');
                    this.game.player.doubleJump = false;
                    this.game.player.body.velocity.y = -400;
                    this.game.player.jumpTimer = this.game.time.now + 150;
                } else if (this.game.player.doubleJump == false && this.game.time.now > this.game.player.jumpTimer){ 
                    this.game.fx.play('jump');
                    this.game.player.doubleJump = true;
                    this.game.player.body.velocity.y = -400;
                }
            }
            // Pause Music for dev
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)) {
                this.game.music.pause();
            }
            if (this.game.gameOver == true) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.quitGame();
                }
            }
        }

        if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse) {
            this.game.buttonA._active = false;
        }

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.game.player = null;
        this.game.water = null;
        this.game.camera.x = 0;
        this.game.camera.y = 0;


		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
    render: function () {
        // this.game.debug.body(this.game.player);
        // this.game.water.forEach(function() {
        //     this.game.debug.body(this.game.water.children[0]);
        // }, this)

    }

};
