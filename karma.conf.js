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

        // test helpers
        { pattern: "specHelpers/**/*.ts" },
        { pattern: "node_modules/custom-event-polyfill/custom-event-polyfill.js", included: true },

        // tests
        // { pattern: "spec/graphics/shape/shape2d/point.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/line.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/triangle.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/rectangle.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/hexagon.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/octogon.spec.ts" },
        // { pattern: "spec/graphics/shape/shape2d/ellipse.spec.ts" },
        // { pattern: "spec/graphics/shape/shape3d/box.spec.ts" },
        { pattern: "spec/graphics/shape/midpoint.spec.ts" },
        { pattern: "spec/graphics/shape/boundingRectangle.spec.ts" },
        // { pattern: "spec/graphics/shape/shapeFactory.spec.ts" },
        // { pattern: "spec/graphics/webglRenderer.spec.ts" },
        // { pattern: "spec/graphics/vertexBuffer.spec.ts" },
        { pattern: "spec/graphics/colorMapper.spec.ts" },
        { pattern: "spec/graphics/renderModeMapper.spec.ts" },
        // { pattern: "spec/graphics/camera.spec.ts" },
        { pattern: "spec/utils/vector.spec.ts" },
        { pattern: "spec/utils/mouseHelper.spec.ts" }
    ],


    preprocessors: {
        "**/*.ts": ["karma-typescript"]
    },


    karmaTypescriptConfig: {
        coverageOptions: {
            instrumentation: true, // set to false if you need to debug though source ts
            exclude: [
                /\.(d|spec|test|mock|snapshots)\.ts/i,
                /specHelpers\//i,
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