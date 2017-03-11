import { IWebGLRenderer } from "../graphics/webglRenderer";
import { IMouseHandler } from "./iMouseHandler";

export class CanvasMouseHandler
{
    public mouseHandler: IMouseHandler;

    private mouseIsDown: boolean;
    private canvas: HTMLCanvasElement;
    private renderer: IWebGLRenderer;

    constructor(canvas: HTMLCanvasElement, renderer: IWebGLRenderer, mouseHandler: IMouseHandler)
    {
        this.mouseIsDown = false;
        this.canvas = canvas;
        this.renderer = renderer;
        this.mouseHandler = mouseHandler;
    }

    public mouseDown (event: MouseEvent): void
    {
        this.mouseIsDown = true;
        this.mouseHandler.mouseDownHandler(event, this.canvas, this.renderer);
    }

    public mouseMove (event: MouseEvent): void
    {
        this.mouseHandler.mouseMoveHandler(this.mouseIsDown, event, this.canvas, this.renderer);
    }

    public mouseUp (event: MouseEvent): void
    {
        this.mouseIsDown = false;
        this.mouseHandler.mouseUpHandler(event, this.canvas, this.renderer);
    }
}