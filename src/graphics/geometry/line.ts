import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";

export class Line extends Shape
{
    public verticies: Float32Vector;
    public rgbColor: RGBColor;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    constructor(point: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super();

        this.rgbColor = rgbColor;
        let array = new Float32Array(5);
        this.addXYAndColorToFloat32Array(array, 0, point.x, point.y);
        this.verticies = new Float32Vector(array);
        this.vertexSize = 2;
        this.numberOfVerticies = 1;
        this.glRenderMode = gl.LINE_STRIP;
    }

    public addVertex(vertex: Point2d): void
    {
        let array = new Float32Array(5);
        this.addXYAndColorToFloat32Array(array, 0, vertex.x, vertex.y);
        this.verticies.addArray(array);
        this.numberOfVerticies++;
    }
}