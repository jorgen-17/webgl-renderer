/// <reference path="webglRenderer.ts" />
import { iWebglRenderer, WebglRenderer } from "./webglRenderer";

document.addEventListener("DOMContentLoaded", () => {
    //create renderer
    const renderer: iWebglRenderer = new WebglRenderer("mycanvas");

    //setup resize event to resize context from renderer
    var resizeCanvas = () => {
        renderer.canvas.width = window.innerWidth;
        renderer.canvas.height = window.innerHeight;;
        return null;
    };

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}, false);