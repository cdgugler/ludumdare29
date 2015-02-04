var CrashLanding = {};

CrashLanding.Boot = function (game) {

};

CrashLanding.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'images/preloader_background.png');
        this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {

        this.input.maxPointers = 3;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.minWidth = 320;
            this.scale.minHeight = 180;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }
        if (!this.game.device.desktop){ this.game.input.onDown.add(function() { this.game.scale.startFullScreen(false); }.bind(this), this); }

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
