import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";

export class Triangle implements Shape
{
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    primitiveType: number;
    shapeMode: ShapeMode;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        
        this.verticies = new Float32Vector(new Float32Array([point1.x, point1.y,
        point2.x, point2.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 3;
        this.primitiveType = gl.TRIANGLES;
        this.shapeMode = ShapeMode.Triangles;
    }
}