import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "./midpoint";
import { RGBColor } from "../rgbColor";

export class Triangle extends Shape
{
    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        const boundingRect = new BoundingRectangle(point1, point2);
        let topPoint = Midpoint.between(boundingRect.topLeft, boundingRect.topRight);
        let array = new Float32Array(15);
        this.addXYAndColorToFloat32Array(array, 0, boundingRect.bottomLeft.x, boundingRect.bottomLeft.y);
        this.addXYAndColorToFloat32Array(array, 5, topPoint.x, topPoint.y);
        this.addXYAndColorToFloat32Array(array, 10, boundingRect.bottomRight.x, boundingRect.bottomRight.y);
        this.verticies = new Float32Vector(array);
        this.numberOfVerticies = 3;
        this.glRenderMode = gl.TRIANGLES;
    }
}