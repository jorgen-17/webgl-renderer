import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "./midpoint";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Triangle extends Shape2d
{
    private static readonly numberOfVerticies: number = 3;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        const topPoint = Midpoint.between(this.boundingRect.topLeft, this.boundingRect.topRight);

        let array = new Float32Array(Triangle.numberOfVerticies * Settings.floatsPerVertex);

        let insertionIndex = 0;

        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft,
            topPoint, this.boundingRect.bottomRight);

        this._verticies = new Float32Vector(array, array.length);
    }
}