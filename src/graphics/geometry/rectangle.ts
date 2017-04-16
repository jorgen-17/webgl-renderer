import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { RGBColor } from "../rgbColor";

export class Rectangle extends Shape
{
    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        const boundingRect = new BoundingRectangle(point1, point2);
        this.verticies = new Float32Vector(new Float32Array([boundingRect.topLeft.x, boundingRect.topLeft.y,
        boundingRect.topRight.x, boundingRect.topRight.y,
        boundingRect.bottomLeft.x, boundingRect.bottomLeft.y,
        boundingRect.bottomRight.x, boundingRect.bottomRight.y]));
        this.numberOfVerticies = 4;
        this.glRenderMode = gl.TRIANGLE_STRIP;
    }
}