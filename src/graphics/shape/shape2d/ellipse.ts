import { Vec3 } from "cuon-matrix-ts";

import { DynamicShape } from "../dynamicShape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { Midpoint } from "../midpoint";
import { Precision } from "../../precision";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Ellipse extends DynamicShape
{
    private static readonly numberOfEndPoints = 2;
    private static readonly highPrecisionNumberOfPointsAlongCurve: number = 400 + Ellipse.numberOfEndPoints;
    private static readonly highPrecisionNumberOfVerticies: number =
        Ellipse.highPrecisionNumberOfPointsAlongCurve * Constants.verticiesPerTriangle;
    private static readonly lowPrecisionNumberOfPointsAlongCurve: number = 8 + Ellipse.numberOfEndPoints;
    private static readonly lowPrecisionNumberOfVerticies: number =
        Ellipse.lowPrecisionNumberOfPointsAlongCurve * Constants.verticiesPerTriangle;
    public shapeMode: ShapeMode = "ellipses";
    public numberOfVerticies: number;
    private center: Vec3;
    private leftEndPoint: Vec3;
    private rightEndPoint: Vec3;
    private horizontalRadius: number;
    private verticalRadius: number;
    private precision: Precision;
    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        precision: Precision = Precision.High, rgbColor?: RGBColor)
    {
        super(precision === Precision.High ? Ellipse.highPrecisionNumberOfVerticies :
            Ellipse.lowPrecisionNumberOfVerticies, rgbColor, point1, point2);

        this.horizontalRadius = (this._boundingRect.topRight.x - this._boundingRect.topLeft.x) / 2;
        this.verticalRadius = (this._boundingRect.topLeft.y - this._boundingRect.bottomLeft.y) / 2;
        this.center = Midpoint.between(this._boundingRect.topLeft, this._boundingRect.bottomRight);
        this.leftEndPoint = Midpoint.between(this._boundingRect.topLeft, this._boundingRect.bottomLeft);
        this.rightEndPoint = Midpoint.between(this._boundingRect.topRight, this._boundingRect.bottomRight);
        this.precision = precision;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
        this.numberOfVerticies = this.precision === Precision.High ? Ellipse.highPrecisionNumberOfVerticies
            : Ellipse.lowPrecisionNumberOfVerticies;
    }

    protected computeVerticies(): void
    {
        let numberOfPointsAlongTheCurve, numberOfVerticies: number = 0;
        if (this.precision === Precision.High)
        {
            numberOfPointsAlongTheCurve = Ellipse.highPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.highPrecisionNumberOfVerticies;
        }
        else if (this.precision === Precision.Low)
        {
            numberOfPointsAlongTheCurve = Ellipse.lowPrecisionNumberOfPointsAlongCurve;
            numberOfVerticies = Ellipse.lowPrecisionNumberOfVerticies;
        }

        let x = this.leftEndPoint.x;
        // divide by 2 because of horizontal symmetry, subtract one because of duplicate vertex inserted at middle
        const xIncrement = (this.horizontalRadius * 2) / (numberOfPointsAlongTheCurve / 2);

        let previousPointAboveCenter = this.leftEndPoint;
        let previousPointBelowCenter = this.leftEndPoint;

        let insertionIndex = 0;

        // divide by half the number of verticies because horizontal symmetry
        // subtract by one because last triangle inserted after loop terminates
        for ( let i = 0; i < (numberOfPointsAlongTheCurve / 2) - 1; i++)
        {
            x += xIncrement;
            let y = this.getYDistanceFromCenterForX(x);

            const newPointAboveCenter = new Vec3(x, y + this.center.y);
            const newPointBelowCenter = new Vec3(x, this.center.y - y);

            this.addTriangleToVerticies(insertionIndex, previousPointAboveCenter, this.center, newPointAboveCenter);
            insertionIndex += Constants.floatsPerTriangle;
            this.addTriangleToVerticies(insertionIndex, previousPointBelowCenter, this.center, newPointBelowCenter);
            insertionIndex += Constants.floatsPerTriangle;

            previousPointAboveCenter = newPointAboveCenter;
            previousPointBelowCenter = newPointBelowCenter;
        }

        this.addTriangleToVerticies(insertionIndex, previousPointAboveCenter, this.center, this.rightEndPoint);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, previousPointBelowCenter, this.center, this.rightEndPoint);
    }

    private getYDistanceFromCenterForX(x: number): number
    {
        let verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    }
}