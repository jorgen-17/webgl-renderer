import { IMouseHandler } from "./iMouseHandler";
import { IWebGLRenderer } from "../graphics/webglRenderer";
import { MouseHelper } from "./mouseHelper";

export class RenderModeMouseHandler implements IMouseHandler
{
    public mouseDownHandler(event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void
    {
        let point = MouseHelper.clicksToPoints(event, canvas);
        renderer.addXYPointToScene(point.x, point.y);
    }

    public mouseMoveHandler(mouseIsDown: boolean, event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void
    {
        if (mouseIsDown)
        {
            let point = MouseHelper.clicksToPoints(event, canvas);
            renderer.addXYPointToScene(point.x, point.y);
        }
    }

    public mouseUpHandler(event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void
    {
        let point = MouseHelper.clicksToPoints(event, canvas);
        renderer.addXYPointToScene(point.x, point.y);
    }
}