import { IMouseHandler } from "./mouseHandler";
import { Point2d } from "../graphics/geometry/point2d";
import { IWebGLRenderer } from "../graphics/webglRenderer";
import { DrawingMode } from "../graphics/drawingMode";
import { Shape } from "../graphics/geometry/shape";
import { ShapeFactory } from "../graphics/geometry/shapeFactory";

export class CanvasMouseHandler implements IMouseHandler
{
    mouseIsDown: boolean;
    canvas: HTMLCanvasElement;
    renderer: IWebGLRenderer;
    beginningPoint: Point2d | null;
    endPoint: Point2d | null;
    mouseDownHandler: (event: MouseEvent) => void;
    mouseMoveHandler: (event: MouseEvent) => void;
    mouseUpHandler: (event: MouseEvent) => void;

    constructor(canvas: HTMLCanvasElement, renderer: IWebGLRenderer)
    {
        this.mouseIsDown = false;
        this.canvas = canvas;
        this.renderer = renderer;
        this.beginningPoint = null;

        this.mouseDownHandler = (event: MouseEvent) : void =>
        {
            this.mouseIsDown = true;
            let point = this.clicksToPoints(event, canvas);
            if(this.renderer.drawingMode == DrawingMode.Verticies)
            {
                renderer.addXYPointToScene(point.x, point.y);
            }
            else if(this.renderer.drawingMode == DrawingMode.Shapes)
            {
                this.beginningPoint = { x: point.x, y: point.y };
            }
        }

        this.mouseMoveHandler = (event: MouseEvent): void =>
        {
            if(this.renderer.drawingMode == DrawingMode.Verticies)
            {
                if(this.mouseIsDown)
                {
                    let point = this.clicksToPoints(event, canvas);
                    renderer.addXYPointToScene(point.x, point.y);
                }
            }
            //for now do nothing for shape
        }

        this.mouseUpHandler = (event: MouseEvent): void => 
        {
            this.mouseIsDown = false;
            let point = this.clicksToPoints(event, canvas);

            if(this.renderer.drawingMode == DrawingMode.Verticies)
            {
                renderer.addXYPointToScene(point.x, point.y);
            }
            else if(this.renderer.drawingMode == DrawingMode.Shapes)
            {
                if(this.beginningPoint !== null)
                {
                    this.endPoint = { x: point.x, y: point.y };
                    this.addShapeToRenderer(this.beginningPoint, this.endPoint, this.renderer);
                }
            }
            
        }
    }

    private clicksToPoints (event: MouseEvent, canvas: HTMLCanvasElement): Point2d
    {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        x = ((x - rect.left) - canvasWidth/2) / (canvasWidth/2);
        y = (canvasHeight/2 - (y - rect.top))/(canvasHeight/2);

        return {x: x, y: y};
    }

    private addShapeToRenderer(point1: Point2d, point2: Point2d, renderer: IWebGLRenderer)
    {
        let shape: Shape = ShapeFactory.createShape(point1, point2, renderer.shapeMode, renderer.gl);
        renderer.addShapeToScene(shape);
    }
}