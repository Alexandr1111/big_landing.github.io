var gulp=require('gulp');
var rename=require('gulp-rename');
var less=require('gulp-less');
var cssmin=require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browser_sync=require('browser-sync').create();


function min_css_from_less(done){
gulp.src('./less_styles/**/block-3.less')	//Что берем(все папки и файлы в папке less_styles)
	.pipe(less({
		errorLogToConsole: true
	}))
	.pipe(cssmin())
	.on('error', console.error.bind(console))
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8', 'ie 7'],
					{ cascade: true }))
	.pipe(rename({suffix: '.min'}))		//Добавляем суффикс
	.pipe(gulp.dest('./css_styles/'))	//Куда помещаем
	.pipe(browser_sync.stream())		    
done();
}

function sync(done){
browser_sync.init({     //фигурные скобки т.к. объект в функции
	server:{
		baseDir:'./'
	},
	port: 3000	//порт
});
done();	
}

function browser_reload(done){  //Для автоматической перезагрузки браузера
browser_sync.reload();
done();	
}

function watch_files(done){
gulp.watch("./less_styles/**/*", min_css_from_less); //Взять все папки и все файлы
gulp.watch("./**/*.html", browser_reload);
//gulp.watch("./**/*.js", browser_reload);
done();	
}

gulp.task('default', gulp.parallel(min_css_from_less, sync, watch_files));
