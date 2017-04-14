import { Point2d } from "../graphics/geometry/point2d";
import { IMouseHandler } from "./iMouseHandler";
import { IWebGLRenderer } from "../graphics/webglRenderer";
import { Shape } from "../graphics/geometry/shape";
import { ShapeFactory } from "../graphics/geometry/shapeFactory";
import { MouseHelper } from "./mouseHelper";

export class BasicShapeModeMouseHandler implements IMouseHandler
{
    private beginningPoint: Point2d | null;
    private endPoint: Point2d | null;

    public mouseDownHandler(event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void
    {
        let point = MouseHelper.clicksToPoints(event, canvas);
        this.beginningPoint = { x: point.x, y: point.y };
    }

    public mouseMoveHandler(mouseIsDown: boolean, event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void { /* do nothing */ }

    public mouseUpHandler(event: MouseEvent, canvas: HTMLCanvasElement, renderer: IWebGLRenderer): void
    {
        if (this.beginningPoint !== null)
        {
            let point = MouseHelper.clicksToPoints(event, canvas);
            this.endPoint = { x: point.x, y: point.y };
            let shape: Shape = ShapeFactory.createShape(this.beginningPoint, this.endPoint, renderer.shape, renderer.gl);
            renderer.addShapeToScene(shape);
            this.beginningPoint = null;
        }
    }
}