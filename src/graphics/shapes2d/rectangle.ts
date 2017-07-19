import { Vec3 } from "cuon-matrix-ts";

import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { RGBColor } from "../rgbColor";
import { Constants } from "../../constants";

export class Rectangle extends Shape2d
{
    private static readonly numberOfVerticies: number = 6;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }
    protected computeVerticies(): void
    {
        let array = new Float32Array(Rectangle.numberOfVerticies * Constants.floatsPerVertex);

        let insertionIndex = 0;

        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.topLeft,
            this.boundingRect.topRight, this.boundingRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft,
            this.boundingRect.topRight, this.boundingRect.bottomRight);

        this._verticies = new Float32Vector(array, array.length);
    }
}