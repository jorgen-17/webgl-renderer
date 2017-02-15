import { IWebGLRenderer, WebGLRenderer } from "./WebGLRenderer";
import { ContextWrangler } from "./ContextWrangler";
import { ShapeFactory } from "./ShapeFactory";

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    let gl = ContextWrangler.getContext(canvas);
    const renderer: IWebGLRenderer = new WebGLRenderer(canvas.width, canvas.height, gl);

    const resizeCanvas = () =>
    {
        renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    renderer.addPointToScene(ShapeFactory.createPoint(0.2, 0.2, 0.0));
    renderer.addPointToScene(ShapeFactory.createPoint(0.4, 0.4, 0.0));
    renderer.addPointToScene(ShapeFactory.createPoint(0.8, 0.8, 0.0));

    const renderLoop = () =>
    {
        renderer.draw();
        window.requestAnimationFrame(renderLoop);
    } 

    renderLoop();
}, false);