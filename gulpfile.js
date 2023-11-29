const { src, dest, watch, parallel, series }  = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const webp          = require('gulp-webp');
const webpHtml      = require('gulp-webp-html');
const webpCss       = require('gulp-webp-css');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/img/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/img'))
    .pipe(webp())
    .pipe(dest('app/img'))
    .pipe(dest('dist/img'))
}

function scripts() {
  return src([
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function html() {
  return src('app/**/*.html')
    // .pipe(webpHtml())
    .pipe(dest('dist/'))
}

function styles() {
  // return src('app/scss/**/*.scss')//только из папки scss, а внизу по всему проекту
  return src('app/**/*.scss')
      .pipe(scss({outputStyle: 'expanded'}))
      // .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      // .pipe(webpCss())
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function stylesWebp() {
  return src('app/things/**/*.scss')
      .pipe(webpCss())
      .pipe(dest('app/css'))
      .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    // 'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching() {
  // watch(['app/scss/**/*.scss'], styles);
  // watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);//ылудит только за стилями и скриптами в соответствующих папках, а внизу за всеми стилями и скриптами в проекте
  watch(['app/**/*.scss'], styles);
  watch(['app/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.html = html;
exports.stylesWebp = stylesWebp


exports.build = series(cleanDist, html, images, build);
exports.default = parallel(images, styles, stylesWebp ,scripts ,browsersync, watching);


