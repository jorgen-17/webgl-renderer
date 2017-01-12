"use strict";
/// <reference path="webglRenderer.ts" />
var webglRenderer_1 = require("./webglRenderer");
document.addEventListener("DOMContentLoaded", function () {
    //create renderer
    var renderer = new webglRenderer_1.WebglRenderer("mycanvas");
    //setup resize event to resize context from renderer
    var resizeCanvas = function () {
        renderer.canvas.width = window.innerWidth;
        renderer.canvas.height = window.innerHeight;
        ;
        return null;
    };
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}, false);
//# sourceMappingURL=main.js.map