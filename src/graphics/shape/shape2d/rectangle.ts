import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Rectangle extends Shape
{
    private static readonly numberOfVerticies = 6;
    public shapeMode: ShapeMode = "rectangles";
    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Rectangle.numberOfVerticies, rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }
    protected computeVerticies(): void
    {
        let insertionIndex = 0;

        this.addTriangleToVerticies(insertionIndex, this._boundingRect.topLeft,
            this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += Constants.verticiesPerTriangle;

        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft,
            this._boundingRect.topRight, this._boundingRect.bottomRight);
    }
}