//引入使用的模块
const gulp = require("gulp"),
      minifyCss = require("gulp-clean-css"),//压缩css
      htmlmin = require("gulp-htmlmin"),//压缩HTML
      babel = require("gulp-babel"),//将es6转为es5
      uglify = require("gulp-uglify"),//压缩js
      connect = require("gulp-connect"),//连接服务器
      scss = require("gulp-sass");//编译sass
      
      
      //默认任务
//		gulp.task("default", function(){
//			console.log("gulp default");
//		});
      //定制任务：压缩css
      gulp.task("css",function(){
      	gulp.src("src/css/*.css")
      	.pipe(minifyCss())
      	.pipe(gulp.dest("dist/css"))
      	.pipe(connect.reload());
      });
      //定制任务：压缩HTML
      gulp.task("html",function(){
      	gulp.src("src/**/*.html")
      	.pipe(htmlmin({collapseWhitespace:true}))//collapseWhitespace:true删除空格
      	.pipe(gulp.dest("dist"))
      	.pipe(connect.reload());
      });
     //定制任务：压缩js
     gulp.task("js",()=>{
     	gulp.src("src/js/**/*.js")
     	.pipe(babel({
     		presets:['env']
     	}))
     	.pipe(uglify())
     	.pipe(gulp.dest('dist/js'))
     	.pipe(connect.reload());
     })
     //启动webserver服务器
     gulp.task("conn",function(){
     	connect.server({
     		root:"dist",
        port:8080,
     		livereload:true
     	});
     });
     //复制
     gulp.task("images",function(){
     	gulp.src("src/images/**/*.*")
     	.pipe(gulp.dest("dist/images"));
     })
     //复制移动第三方js
		gulp.task("lib", function(){
			gulp.src("src/lib/**/*.*")
			.pipe(gulp.dest("dist/lib"))
				.pipe(connect.reload());
		})
        //编译sass
     gulp.task("scss",function(){
     	gulp.src("src/scss/**/*.scss")
     	.pipe(scss({outputStyle:"expanded"}))
     	.pipe(gulp.dest("dist/css"))
     	.pipe(connect.reload());
     });
     //监视文件的修改
     gulp.task("watch",function(){
     	gulp.watch("src/js/**/*.js",["js"]);    //  ""---文件名    []----文件类型
			gulp.watch("src/css/**/*.css",["css"]);
			gulp.watch("src/**/*.html",["html"]);
			gulp.watch("src/scss/**/*.scss",["scss"]);
     });
   

    gulp.task("default",["conn","html","js","css","watch","images","scss","lib"]);