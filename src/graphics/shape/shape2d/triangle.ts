import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { Midpoint } from "../midpoint";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";

export class Triangle extends Shape
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

        let array = new Float32Array(Triangle.numberOfVerticies * Constants.floatsPerVertex);

        let insertionIndex = 0;

        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft,
            topPoint, this.boundingRect.bottomRight);

        this._verticies = new Float32Vector(array, array.length);
    }
}