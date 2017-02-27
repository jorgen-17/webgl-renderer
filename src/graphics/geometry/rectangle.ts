import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";

export class Rectangle implements Shape
{
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    glRenderMode: number;
    shapeMode: ShapeMode;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        const boundingRect = new BoundingRectangle(point1, point2);
        this.verticies = new Float32Vector(new Float32Array([boundingRect.topLeft.x, boundingRect.topLeft.y,
        boundingRect.topRight.x, boundingRect.topRight.y,
        boundingRect.bottomLeft.x, boundingRect.bottomLeft.y,
        boundingRect.bottomRight.x, boundingRect.bottomRight.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 4;
        this.glRenderMode = gl.TRIANGLE_STRIP;
        this.shapeMode = ShapeMode.Rectangles;
    }
}