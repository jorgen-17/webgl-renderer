// Karma configuration
// Generated on Mon Apr 11 2016 10:01:58 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],


    // list of files / patterns to load in the browser
    files: [
        { pattern: "node_modules/proxy-polyfill/proxy.min.js"},

        //software under test
        { pattern: "src/**/*.ts" },

        { pattern: "specHelpers/**/*.ts" },

        // tests
        { pattern: "spec/utils/vector.spec.ts" },
        { pattern: "spec/graphics/shapes2d/boundingRectangle.spec.ts" },
        { pattern: "spec/graphics/shapes2d/midpoint.spec.ts" },
        { pattern: "spec/graphics/shapes2d/triangle.spec.ts" },
        { pattern: "spec/graphics/shapes2d/rectangle.spec.ts" },
        { pattern: "spec/graphics/shapes2d/hexagon.spec.ts" },
        { pattern: "spec/graphics/shapes2d/octogon.spec.ts" },
        { pattern: "spec/graphics/shapes2d/ellipse.spec.ts" },
        { pattern: "spec/graphics/shapes2d/shapeFactory.spec.ts" },
        { pattern: "spec/graphics/webglRenderer.spec.ts" }
    ],


    preprocessors: {
        "**/*.ts": ["karma-typescript"]
    },

    karmaTypescriptConfig: {
        coverageOptions: {
            instrumentation: false // set to false if you need to debug though source ts
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