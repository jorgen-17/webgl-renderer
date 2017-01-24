import { IWebGLRenderer, WebGLRenderer } from "./WebGLRenderer";

document.addEventListener("DOMContentLoaded", () => {
    //create renderer
    const renderer: IWebGLRenderer = new WebGLRenderer("mycanvas");

    //setup resize event to resize context from renderer
    var resizeCanvas = () => {
        renderer.canvas.width = window.innerWidth;
        renderer.canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    renderer.addSquareToScene();

    renderer.draw();
}, false);