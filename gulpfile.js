var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var htmlcss2js=require('./utils/html2js');
// var tsProject2 = ts.createProject("tsconfig.1.json");


const PATHS={
    entry:'src/ts/**/*.ts',
    output:'src/js',

    html:'src/html/**/*.html',
    outputhtml:'src/ts/html'
}

function webcomponents(){
    gulp.watch(PATHS.html).on('all', function(stats, path) {
        gulp.src(path,{base:'src/html'})
         .pipe(htmlcss2js())
         .pipe(gulp.dest(PATHS.outputhtml));
      })  
}

function tscompile(){
    gulp.watch(PATHS.entry).on('all', function(stats, path) {
        gulp.src(path,{base:'src/ts'})
         .pipe(tsProject())
         .pipe(gulp.dest(PATHS.output));
         console.log(`${path} completed`)
      })  
}
exports.default=gulp.parallel(webcomponents,tscompile)
// gulp.task('htmlcss2js',function(){
//     return gulp.watch(PATHS.html, function(event) {
//         gulp.src(event.path)
//          .pipe(htmlcss2js())
//          .pipe(gulp.dest(PATHS.outputhtml));
//       });

// })
// gulp.task('ts',function(){
//     return gulp.watch(PATHS.entry, function(event) {
//         gulp.src(event.path,{base:'src/ts'})
//          .pipe(tsProject())
//          .pipe(gulp.dest(PATHS.output));
//       });
    
//   })
  


  
// gulp.task("default", gulp.parallel('ts','htmlcss2js'));