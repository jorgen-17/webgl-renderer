// Karma configuration
// Generated on Mon Apr 11 2016 10:01:58 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],


    // list of files / patterns to load in the browser
    files: [
        // software under test
        { pattern: "src/**/*.ts" },

        // snapshots
        { pattern: "spec/snapshots/**/*.ts" },

        // test helpers
        { pattern: "spec/helpers/**/*.ts" },
        { pattern: "node_modules/custom-event-polyfill/custom-event-polyfill.js", included: true },

        // tests
        { pattern: "spec/tests/graphics/shape/shape2d/point.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/line.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/triangle.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/rectangle.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/hexagon.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/octogon.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape2d/ellipse.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shape3d/box.spec.ts" },
        { pattern: "spec/tests/graphics/shape/midpoint.spec.ts" },
        { pattern: "spec/tests/graphics/shape/boundingRectangle.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shapeBuffer.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shapeFactory2d.spec.ts" },
        { pattern: "spec/tests/graphics/shape/shapeFactory3d.spec.ts" },
        { pattern: "spec/tests/graphics/webglRenderer.spec.ts" },
        { pattern: "spec/tests/graphics/webgl2dRenderer.spec.ts" },
        { pattern: "spec/tests/graphics/webgl3dRenderer.spec.ts" },
        { pattern: "spec/tests/graphics/colorMapper.spec.ts" },
        { pattern: "spec/tests/graphics/renderModeMapper.spec.ts" },
        { pattern: "spec/tests/graphics/camera.spec.ts" },
        { pattern: "spec/tests/utils/float32ArrayUtils.spec.ts" },
        { pattern: "spec/tests/utils/vector.spec.ts" },
        { pattern: "spec/tests/utils/mouseHelper.spec.ts" }
    ],


    preprocessors: {
        "**/*.ts": ["karma-typescript"]
    },


    karmaTypescriptConfig: {
        coverageOptions: {
            instrumentation: true, // set to false if you need to debug though source ts
            exclude: [
                /\.(d|spec|test|tests|mock|snapshot)\.ts/i,
                /spec\/helpers\//i,
                /utils\/browserHelper\.ts/i
            ]
        },
        reports: {
            "html": {
                "directory": "coverage",
                "subdirectory":"html",
            },
            json: {
                "directory": "coverage",
                "subdirectory":"json",
                "filename": "cover.json"
            }
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["dots", "karma-typescript"],


    // enable / disable colors in the its
    colors: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        "Chrome",
        "Firefox",
        "IE",
        "Edge"
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
}