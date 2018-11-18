var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var htmlcss2js=require('./utils/html2js');
// var tsProject2 = ts.createProject("tsconfig.1.json");


const PATHS={
    entry:'src/ts/**/*.ts',
    output:'src/js',

    html:'src/html/**/*.html',
    outputhtml:'src/js/html'
}
gulp.task('watch', function(){
    return gulp.watch(PATHS.entry, function(event) {
        gulp.src(event.path,{base:'src/ts'})
         .pipe(tsProject())
         .pipe(gulp.dest(PATHS.output));
      });
    //   gulp.watch(PATHS.html, function(event) {
    //     gulp.src(event.path)
    //      .pipe(htmlcss2js())
    //      .pipe(gulp.dest(PATHS.outputhtml));
    //   });
  })
  


  
gulp.task("default", function () {
    return gulp.src(PATHS.entry)
        .pipe(tsProject())
        .pipe(gulp.dest(PATHS.output));
    // gulp.src(PATHS.entry1)
    //     .pipe(tsProject2())
    //     .pipe(gulp.dest(PATHS.output));
});