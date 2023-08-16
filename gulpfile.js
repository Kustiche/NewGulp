const {src, dest, watch, series} = require('gulp');
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const ghPages = require('gulp-gh-pages');
const svgSprite = require('gulp-svg-sprite');
const gulpZip = require('gulp-zip');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

function clean() {
  return del(['build/*']);
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'build/',
    },
  });
  watch(['./src/**/*.js'], scripts);
  watch(['./src/**/*.scss'], styles);
  watch(['./src/**/*.html'], html);
  watch(['./src/img/**/*'], img);
  watch(['./src/resources/favicons/*'], favicons);
  watch(['./src/img/svg/*.svg'], svgSprites);
}

function html() {
  return src('./src/html/*.html')
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(dest('./build'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('./src/scss/style.+(sass|scss)', { sourcemaps: true })
    .pipe(scss())
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      })
    )
    .pipe(dest('./build/css', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

function stylesBuild() {
  return src('./src/scss/style.+(sass|scss)')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      })
    )
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('./src/js/scripts.js')
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(concat('scripts.min.js'))
    .pipe(dest('./build/js'))
    .pipe(browserSync.stream());
}

function scriptsBuild() {
  return src('./src/js/scripts.js')
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(dest('./build/js'))
    .pipe(browserSync.stream());
}

function img() {
  return src('./src/img/**/*')
    .pipe(dest('./build/img'));
}

function imgBuild() {
  return src('./src/img/**/*')
    .pipe(newer('./build/img'))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        }),
      ])
    )
    .pipe(dest('./build/img'));
}

function svgSprites() {
  return src('./src/img/svg/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('./build/img'));
}

function favicons() {
  return src('./src/resources/favicons/*')
    .pipe(dest('./build/favicons'))
}

function deploy() {
  return src('./build/**/*')
    .pipe(ghPages());
}

function zip() {
  del(['./build.zip']);
  return src('./build/**/*.*')
    .pipe(gulpZip('build.zip'))
    .pipe(dest('./'));
}

function fonts() {
  return src('./src/resources/fonts/*.*')
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(src('./build/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('./build/fonts'))
}

exports.default = series(clean, html, styles, img, svgSprites, scripts, fonts, favicons, watching);
exports.build = series(clean, html, stylesBuild, imgBuild, svgSprites, scriptsBuild, fonts, favicons);
exports.gh = deploy;
exports.zip = zip;