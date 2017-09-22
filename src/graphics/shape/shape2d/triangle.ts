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
        const topPoint = Midpoint.between(this._boundingRect.topLeft, this._boundingRect.topRight);

        let array = new Float32Array(Triangle.numberOfVerticies * Constants.floatsPerPoint);

        let insertionIndex = 0;

        this.addTriangleToPositions(insertionIndex, this._boundingRect.bottomLeft,
            topPoint, this._boundingRect.bottomRight);

        this._positions = new Float32Vector(array, array.length);
    }
}