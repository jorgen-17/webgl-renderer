import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";

export class Rectangle implements Shape
{
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    primitiveType: number;
    shapeMode: ShapeMode;

    constructor(point: Point2d, gl: WebGLRenderingContext)
    {
        this.verticies = new Float32Vector(new Float32Array([point.x, point.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 1;
        this.primitiveType = gl.TRIANGLE_STRIP;
        this.shapeMode = ShapeMode.Lines;
    }

    public addVertex(vertex: Point2d): void
    {
        this.verticies.addArray([vertex.x, vertex.y]);
        this.numberOfVerticies++;
    }
}