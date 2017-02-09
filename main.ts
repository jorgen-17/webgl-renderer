import { IWebGLRenderer, WebGLRenderer } from "./WebGLRenderer";
import { ContextWrangler } from "./ContextWrangler"

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    let gl = ContextWrangler.getContext(canvas);
    const renderer: IWebGLRenderer = new WebGLRenderer(canvas.width, canvas.height, gl);

    var resizeCanvas = () => {
        renderer.canvasWidth = window.innerWidth;
        renderer.canvasHeight = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    renderer.addSquareToScene();

    renderer.draw();
}, false);