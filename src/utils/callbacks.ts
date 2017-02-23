import { IWebGLRenderer } from "../graphics/webglRenderer";

export class Callbacks 
{
    static resizeCanvas (window: Window, renderer: IWebGLRenderer, canvas: HTMLCanvasElement): void
    {
        renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    static changeRenderMode (event: MouseEvent, renderer: IWebGLRenderer)
    {
        const elem = event.srcElement;
        if(elem === null) return;
        renderer.setRenderMode(elem.attributes["mode"].nodeValue)
    }

    static changeShape (event: MouseEvent, renderer: IWebGLRenderer)
    {
        const elem = event.srcElement;
        if(elem === null) return;
        renderer.setShape(elem.attributes["shape"].nodeValue);
    }

    static clicksToPoints (event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void 
    {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        x = ((x - rect.left) - canvasWidth/2) / (canvasWidth/2);
        y = (canvasHeight/2 - (y - rect.top))/(canvasHeight/2);

        renderer.addXYPointToScene(x, y);
    }

    static renderLoop (renderer: IWebGLRenderer, window: Window): void
    {
        renderer.draw();
        window.requestAnimationFrame(() => { Callbacks.renderLoop(renderer, window) });
    };
}