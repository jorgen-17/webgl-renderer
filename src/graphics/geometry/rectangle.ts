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
        let array = new Float32Array(20);
        this.addXYAndColorToFloat32Array(array, 0, boundingRect.topLeft.x, boundingRect.topLeft.y);
        this.addXYAndColorToFloat32Array(array, 5, boundingRect.topRight.x, boundingRect.topRight.y);
        this.addXYAndColorToFloat32Array(array, 10, boundingRect.bottomLeft.x, boundingRect.bottomLeft.y);
        this.addXYAndColorToFloat32Array(array, 15, boundingRect.bottomRight.x, boundingRect.bottomRight.y);
        this.verticies = new Float32Vector(array);
        this.numberOfVerticies = 4;
        this.glRenderMode = gl.TRIANGLE_STRIP;
    }
}