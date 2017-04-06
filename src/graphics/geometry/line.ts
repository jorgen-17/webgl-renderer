import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";

export class Line implements Shape
{
    public verticies: Float32Vector;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    constructor(point: Point2d, gl: WebGLRenderingContext)
    {
        this.verticies = new Float32Vector(new Float32Array([point.x, point.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 1;
        this.glRenderMode = gl.LINE_STRIP;
    }

    public addVertex(vertex: Point2d): void
    {
        this.verticies.addArray([vertex.x, vertex.y]);
        this.numberOfVerticies++;
    }
}