import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { Midpoint, ThirdPoints } from "../midpoint";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Hexagon extends Shape
{
    private static readonly numberOfVerticies = 12;
    public shapeMode: ShapeMode = "hexagons";
    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Hexagon.numberOfVerticies, rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        const topThirds = ThirdPoints.between(this._boundingRect.topLeft,
            this._boundingRect.topRight);
        const topFirstThird = topThirds.first;
        const topSecondThird = topThirds.second;
        const bottomThirds = ThirdPoints.between(this._boundingRect.bottomRight,
            this._boundingRect.bottomLeft);
        const bottomFirstThird = bottomThirds.first;
        const bottomSecondThird = bottomThirds.second;
        const midLeft = Midpoint.between(this._boundingRect.bottomLeft, this._boundingRect.topLeft);
        const midRight = Midpoint.between(this._boundingRect.topRight, this._boundingRect.bottomRight);

        let insertionIndex = 0;

        this.addTriangleToVerticies(insertionIndex, topFirstThird,
            bottomFirstThird, midLeft);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topFirstThird,
            bottomFirstThird, bottomSecondThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topFirstThird,
            topSecondThird, bottomSecondThird);
        insertionIndex += Constants.floatsPerTriangle;

        this.addTriangleToVerticies(insertionIndex, topSecondThird,
            bottomSecondThird, midRight);
    }
}