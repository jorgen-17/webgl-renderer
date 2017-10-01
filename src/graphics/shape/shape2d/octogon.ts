import { Vec3 } from "cuon-matrix-ts";

import { DynamicShape } from "../dynamicShape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { ThirdPoints } from "../midpoint";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Octogon extends DynamicShape
{
    private static readonly numberOfVerticies = 18;
    public shapeMode: ShapeMode = "octogons";
    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Octogon.numberOfVerticies, rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        const topThirds = ThirdPoints.between(this._boundingRect.topLeft, this._boundingRect.topRight);
        const rightThirds = ThirdPoints.between(this._boundingRect.topRight, this._boundingRect.bottomRight);
        const bottomThirds = ThirdPoints.between(this._boundingRect.bottomLeft, this._boundingRect.bottomRight);
        const leftThirds = ThirdPoints.between(this._boundingRect.topLeft, this._boundingRect.bottomLeft);

        const topLeftThird = topThirds.first;
        const topRightThird = topThirds.second;
        const rightTopThird = rightThirds.second;
        const rightBottomThird = rightThirds.first;
        const bottomLeftThird = bottomThirds.first;
        const bottomRightThird = bottomThirds.second;
        const leftTopThird = leftThirds.second;
        const leftBottomThird = leftThirds.first;

        let insertionIndex = 0;

        this.addTriangleToVerticies(insertionIndex, leftTopThird,
            topLeftThird, leftBottomThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, leftBottomThird,
            topLeftThird, bottomLeftThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, bottomLeftThird,
            topLeftThird, bottomRightThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topLeftThird,
            bottomRightThird, topRightThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topRightThird,
            bottomRightThird, rightBottomThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topRightThird,
            rightBottomThird, rightTopThird);
    }
}