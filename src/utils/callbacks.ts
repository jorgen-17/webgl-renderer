import { IWebGLRenderer } from "../graphics/webglRenderer";
import * as React from "react";

export class Callbacks
{
    public static resizeCanvas (window: Window, renderer: IWebGLRenderer, canvas: HTMLCanvasElement): void
    {
        renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public static changeRenderMode (event: React.MouseEvent<HTMLDivElement>, renderer: IWebGLRenderer)
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setRenderMode(elem.attributes["data-mode"].nodeValue);

    }

    public static changeShape (event: React.MouseEvent<HTMLDivElement>, renderer: IWebGLRenderer)
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setShape(elem.attributes["data-mode"].nodeValue);

    }

    public static renderLoop (renderer: IWebGLRenderer, window: Window): void
    {
        renderer.draw();
        window.requestAnimationFrame(() => { Callbacks.renderLoop(renderer, window); });
    };
}