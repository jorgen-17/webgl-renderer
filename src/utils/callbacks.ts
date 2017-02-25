import { IWebGLRenderer } from "../graphics/webglRenderer";
import * as React from "react"

export class Callbacks 
{
    static resizeCanvas (window: Window, renderer: IWebGLRenderer, canvas: HTMLCanvasElement): void
    {
        renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    static changeRenderMode (event: React.MouseEvent<HTMLDivElement>, renderer: IWebGLRenderer)
    {
        const elem = event.currentTarget;
        if(elem === null) return;
        renderer.setRenderMode(elem.attributes["data-mode"].nodeValue)
    }

    static changeShape (event: React.MouseEvent<HTMLDivElement>, renderer: IWebGLRenderer)
    {
        const elem = event.currentTarget;
        if(elem === null) return;
        renderer.setShape(elem.attributes["data-mode"].nodeValue);
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