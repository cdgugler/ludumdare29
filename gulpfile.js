var gulp = require('gulp');
var connect = require('gulp-connect');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var texturepacker = require('spritesmith-texturepacker');

gulp.task('sprites', function() {
    var spriteData = gulp.src('src/images/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: 'sprites.json',
            algorithm: 'binary-tree',
            cssTemplate: texturepacker
    }));
    spriteData.img.pipe(imagemin()).pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('build/images'));
});

gulp.task('tiles', function() {
    var spriteData = gulp.src('src/images/tiles/*.png')
        .pipe(spritesmith({
            imgName: 'tiles.png',
            cssName: 'tiles.json',
            algorithm: 'binary-tree',
            cssTemplate: texturepacker
    }));
    spriteData.img.pipe(imagemin()).pipe(gulp.dest('build/images'));
    spriteData.css.pipe(gulp.dest('build/images'));
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        open: true
    });
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js').pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);
