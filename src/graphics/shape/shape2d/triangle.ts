import { Vec3 } from "cuon-matrix-ts";

import { DynamicShape } from "../dynamicShape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { Midpoint } from "../midpoint";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Triangle extends DynamicShape
{
    public static readonly numberOfVerticies = 3;
    public shapeMode: ShapeMode = "triangles";

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Triangle.numberOfVerticies, rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        const topPoint = Midpoint.between(this._boundingRect.topLeft, this._boundingRect.topRight);

        let insertionIndex = 0;

        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft,
            topPoint, this._boundingRect.bottomRight);
    }
}