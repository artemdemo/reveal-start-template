import gulp from 'gulp';
import gutil from 'gulp-util';
import less from 'gulp-less';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import handlebars from 'gulp-compile-handlebars';

/**
 * Compile handlebar files to html
 *
 * @link https://www.npmjs.com/package/gulp-compile-handlebars
 */
gulp.task('slides', () => {
    let templateData = {
        mainTitle: 'Presentation template'
    };
    let options = {
        partials : {},
        batch : [
            './source/slides'
        ],
        helpers : {}
    };

    return gulp.src('source/index.hbs')
        .pipe(handlebars(templateData, options))
        .on('error', function(err) {
            gutil.log(gutil.colors.red.bold('[Handlebars error]'));
            gutil.log(gutil.colors.bgRed('Message:') +' '+ err.message);
            this.emit('end');
        })
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('js', () => {
    return gulp.src([
        'bower_components/headjs/dist/1.0.0/head.min.js',
        'bower_components/reveal.js/js/reveal.js',
        'source/js/presentation.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('less', () => {
    return gulp.src('./source/less/styles.less')
        .pipe(less())
        .on('error', function(err) {
            // Handle less errors, but do not stop watch task
            gutil.log(gutil.colors.red.bold('[Less error]'));
            gutil.log(gutil.colors.bgRed('filename:') +' '+ err.filename);
            gutil.log(gutil.colors.bgRed('lineNumber:') +' '+ err.lineNumber);
            gutil.log(gutil.colors.bgRed('extract:') +' '+ err.extract.join(' '));
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy', function () {
    return gulp
        .src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('build', ['js', 'copy', 'less', 'slides']);

gulp.task('watch', () => {
    gulp.watch('./source/**/*.js', ['js']);
    gulp.watch('./source/**/*.hbs', ['slides']);
    gulp.watch('./less/**/*.less', ['less']);
});
