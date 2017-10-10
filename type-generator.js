require("dts-generator").default({
    name: "webgl-renderer",
    project: ".",
    out: "lib/webgl-renderer.d.ts",
    exclude: [
        "node_modules/**/*.d.ts",
        "spec/**/*.ts"
    ],
    externs:[
        "cuon-matrix-ts"
    ]
});

const fs = require("fs")

// super lame i ended up using just setTimeout, but this is a build utility so ¯\_(ツ)_/¯
setTimeout(function() {
    fs.readFile("./lib/webgl-renderer.d.ts", "utf8", function (err,data) {
        if (err) {
            return console.log(err);
        }
        let result = data.replace(/\/\/\/ <reference path="cuon-matrix-ts" \/>/g,
            '/// <reference path="../node_modules/cuon-matrix-ts/index.d.ts" />');
        result = result.replace(/webgl-renderer\/src\//g, "");
        result = result.replace(/\/index\'/g, "\'");

        fs.writeFile("./lib/webgl-renderer.d.ts", result, "utf8", function (err) {
            if (err) return console.log(err);
        });
    });
}, 500);

