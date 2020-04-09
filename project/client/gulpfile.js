let gulp = require("gulp");
let rollup = require("rollup");
let typescript = require("rollup-plugin-typescript2");
const glsl = require('rollup-plugin-glsl');

var workSpaceDir = __dirname + "/";
//copy 文件到bin目录
gulp.task("copyFile", function () {
    let baseCopyFilter = `${workSpaceDir}/laya/assets/res/**/*.*`;
    var stream = gulp.src([baseCopyFilter]);
    return stream.pipe(gulp.dest(`${workSpaceDir}/bin/res/`));
});

function rollupBuild() {
    return rollup.rollup({
        input: workSpaceDir + '/src/Main.ts',
        onwarn: (waring, warn) => {
            if (waring.code == "CIRCULAR_DEPENDENCY") {
                console.log("warnning Circular dependency:");
                console.log(waring);
            }
        },
        treeshake: false, //建议忽略
        plugins: [
            typescript({
                tsconfig: workSpaceDir + "/tsconfig.json",
                check: true, //Set to false to avoid doing any diagnostic checks on the code
                tsconfigOverride: { compilerOptions: { removeComments: true } },
                include: /.*.ts/,
            }),
            glsl({
                // By default, everything gets included
                include: /.*(.glsl|.vs|.fs)$/,
                sourceMap: false,
                compress: false
            }),
			/*terser({
				output: {
				},
				numWorkers:1,//Amount of workers to spawn. Defaults to the number of CPUs minus 1
				sourcemap: false
			})*/
        ]
    }).then(bundle => {
        return bundle.write({
            file: workSpaceDir + '/bin/js/bundle.js',
            format: 'iife',
            name: 'laya',
            sourcemap: true
        });
    }).catch(err => {
        console.log(err);

    })
}

gulp.task("buildnores", function () {
    return rollupBuild();
});

gulp.task("default", gulp.series(["copyFile"], function () {
    return rollupBuild();
}));