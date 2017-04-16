import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "./midpoint";
import { RGBColor } from "../rgbColor";

export class Triangle extends Shape
{
    public verticies: Float32Vector;
    public rgbColor: RGBColor;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        super();

        const boundingRect = new BoundingRectangle(point1, point2);
        let topPoint = Midpoint.between(boundingRect.topLeft, boundingRect.topRight);
        this.verticies = new Float32Vector(new Float32Array([boundingRect.bottomLeft.x, boundingRect.bottomLeft.y,
            topPoint.x, topPoint.y,
            boundingRect.bottomRight.x, boundingRect.bottomRight.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 3;
        this.glRenderMode = gl.TRIANGLES;
    }
}