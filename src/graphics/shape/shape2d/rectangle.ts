import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";

export class Rectangle extends Shape
{
    private static readonly numberOfVerticies: number = 6;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
        this.shapeMode = "rectangles";
    }
    protected computeVerticies(): void
    {
        let array = new Float32Array(Rectangle.numberOfVerticies * Constants.floatsPerPoint);

        let insertionIndex = 0;

        this.addTriangleToPositions(insertionIndex, this._boundingRect.topLeft,
            this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToPositions(insertionIndex, this._boundingRect.bottomLeft,
            this._boundingRect.topRight, this._boundingRect.bottomRight);

        this._positions = new Float32Vector(array, array.length);
    }
}