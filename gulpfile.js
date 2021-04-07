const { src, dest, task, series, watch, parallel } = require("gulp");

const sass = require("gulp-sass");
const concat = require("gulp-concat");
const sassGlob = require("gulp-sass-glob");
const rm = require("gulp-rm");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require("./gulp.config");

sass.compiler = require("node-sass");

task("clean", () => {
	return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => {
	return src("src/*.html")
		.pipe(dest("dist"))
		.pipe(reload({ stream: true }));
});

task("copy:video", () => {
	return src("src/video/*.mp4")
		.pipe(dest("dist/video"))
		.pipe(reload({ stream: true }));
});
task("copy:images", () => {
	return src(["src/img/*", "src/img/**/*"])
		.pipe(dest("dist/img"))
		.pipe(reload({ stream: true }));
});

const styles = [
	"node_modules/normalize.css/normalize.css",
	"src/css/main.scss",
];

const libs = [
	"node_modules/jquery/dist/jquery.js",
	"node_modules/mobile-detect/mobile-detect.js",
	"node_modules/jquery-touchswipe/jquery.touchSwipe.js",
	"src/js/*.js",
];

task("styles", () => {
	return (
		src(styles)
			.pipe(gulpif(env === "dev", sourcemaps.init()))
			.pipe(concat("main.scss"))
			.pipe(sassGlob())
			.pipe(sass().on("error", sass.logError))
			// .pipe(
			//   px2rem(
			//     {
			//       dpr: 2, // base device pixel ratio (default: 2)
			//       rem: 18, // root element (html) font-size (default: 16)
			//       one: false,
			//     } // whether convert 1px to rem (default: false)
			//   )
			// )
			.pipe(
				gulpif(
					env === "prod",
					autoprefixer({
						cascade: false,
					})
				)
			)
			.pipe(gulpif(env === "prod", gcmq()))
			.pipe(gulpif(env === "prod", cleanCSS()))
			.pipe(gulpif(env === "dev", sourcemaps.write()))
			.pipe(dest("dist/css/"))
			.pipe(reload({ stream: true }))
	);
});

task("server", () => {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
		open: false,
	});
});

task("scripts", () => {
	return src(libs)
		.pipe(gulpif(env === "dev", sourcemaps.init()))
		.pipe(concat("main.min.js", { newLine: ";" }))
		.pipe(
			gulpif(
				env === "prod",
				babel({
					presets: ["@babel/env"],
				})
			)
		)
		.pipe(gulpif(env === "prod", uglify()))
		.pipe(gulpif(env === "dev", sourcemaps.write()))
		.pipe(dest("dist"))
		.pipe(reload({ stream: true }));
});

task("icons", () => {
	return src("src/img/svg/*.svg")
		.pipe(
			svgo({
				plugins: [
					{
						removeAttrs: {
							attrs: "(fill|stroke|style|width|height|data.*)",
						},
					},
				],
			})
		)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg",
					},
				},
			})
		)
		.pipe(dest("dist/images/svg"));
});

task("watch", () => {
	watch("./src/css/**/*.scss", series("styles"));
	watch("./src/*.html", series("copy:html"));
	watch("./src/*.js", series("scripts"));
	watch("./src/img/svg/*.svg", series("icons"));
});

task(
	"default",
	series(
		"clean",
		parallel(
			"copy:html",
			"copy:images",
			"copy:video",
			"styles",
			"scripts",
			"icons"
		),
		parallel("watch", "server")
	)
);
task(
	"build",
	series(
		"clean",
		parallel(
			"copy:html",
			"copy:images",
			"copy:video",
			"styles",
			"scripts",
			"icons"
		)
	)
);
