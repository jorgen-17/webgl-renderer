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
    
    const clicksToPoints = (event: MouseEvent): void =>
    {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        x = ((x - rect.left) - canvasWidth/2) / (canvasWidth/2);
        y = (canvasHeight/2 - (y - rect.top))/(canvasHeight/2);

        renderer.addPointToScene(ShapeFactory.createPoint(x, y, 0.0, 5.0));
    }

    canvas.addEventListener("click", clicksToPoints, false);

    const renderLoop = () =>
    {
        renderer.draw();
        window.requestAnimationFrame(renderLoop);
    };

    renderLoop();
}, false);