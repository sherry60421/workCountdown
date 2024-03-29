// 引入欲使用的套件模組
import gulp from 'gulp';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import browserify from 'browserify';
import babelify from 'babelify';
// 轉成 gulp 讀取的 vinyl（黑膠）流
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import imagemin from 'gulp-imagemin';


const dirs = {
    src: './src',
    dest: './dist'
};

const pagesPaths = {
    src: `${dirs.src}/*`,
    dest: `${dirs.dest}`
};

const stylesPaths = {
    src: `${dirs.src}/styles/*.scss`,
    dest: `${dirs.dest}/css`
};

const scriptsPaths = {
    src: `${dirs.src}/javascripts/*.js`,
    dest: `${dirs.dest}/js`
};

const imagesPaths = {
    src: `${dirs.src}/images/*`,
    dest: `${dirs.dest}/img`
};

// 編譯 Scss 任務，完成後送到 dist/css/main.css
gulp.task('styles', () => {
    gulp.src(stylesPaths.src)
        .pipe(sass()) // 編譯 Scss
        .pipe(gulp.dest(stylesPaths.dest))
        .pipe(connect.reload());
});

// 編譯 JavaScript 轉譯、合併、壓縮任務，完成後送到 dist/js/bundle.js
gulp.task('javascripts', function() {
    var mainJs =  browserify({
            entries: ['./src/javascripts/main.js']
        })
        .transform(babelify) // 轉譯
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer()) // 從 streaming 轉回 buffered vinyl 檔案
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // 由於我們壓縮了檔案，要用 sourcemaps 來對應原始文件方便除錯
        .pipe(uglify()) // 壓縮檔案
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(scriptsPaths.dest));
    var countDownJs = browserify({
            entries: ['./src/javascripts/countdown.js']
        })
        .transform(babelify) // 轉譯
        .bundle()
        .pipe(source('bundle1.js'))
        .pipe(buffer()) // 從 streaming 轉回 buffered vinyl 檔案
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // 由於我們壓縮了檔案，要用 sourcemaps 來對應原始文件方便除錯
        .pipe(uglify()) // 壓縮檔案
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(scriptsPaths.dest));
    return mainJs && countDownJs;
});

// 複製 images 任務，完成後送到 dist/images
gulp.task('images', function() {
    gulp.src(imagesPaths.src)
        .pipe(imagemin())
        .pipe(gulp.dest(imagesPaths.dest));
});


gulp.task('html', function() {
    gulp.src(pagesPaths.src)
        .pipe(gulp.dest(pagesPaths.dest))
        .pipe(connect.reload());
});

// 啟動測試用 server，root 為 index.html 放置位置
gulp.task('server', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 7788
    });
});

// 監聽是否有檔案更新
gulp.task('watch', function() {
    gulp.watch(stylesPaths.src, ['styles']);
    gulp.watch(scriptsPaths.src, ['javascripts']);
    gulp.watch(imagesPaths.src, ['images']);
    gulp.watch(pagesPaths.src, ['html']);
});

// 兩種任務類型，第一種會啟動 server
gulp.task('default', ['javascripts', 'styles', 'images', 'html', 'server', 'watch']);
gulp.task('build', ['javascripts', 'styles', 'images', 'html']);
