import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "./midpoint";
import { Precision } from "../precision";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Ellipse extends Shape2d
{
    private static readonly numberOfEndPoints = 2;
    private static readonly highPrecisionNumberOfPointsAlongCurve: number = 400 + Ellipse.numberOfEndPoints;
    private static readonly highPrecisionNumberOfVerticies: number =
        Ellipse.highPrecisionNumberOfPointsAlongCurve * Settings.verticiesPerTriangle;
    private static readonly lowPrecisionNumberOfPointsAlongCurve: number = 8 + Ellipse.numberOfEndPoints;
    private static readonly lowPrecisionNumberOfVerticies: number =
        Ellipse.lowPrecisionNumberOfPointsAlongCurve * Settings.verticiesPerTriangle;

    private center: Vec3;
    private leftEndPoint: Vec3;
    private rightEndPoint: Vec3;
    private horizontalRadius: number;
    private verticalRadius: number;
    private precision: Precision;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        precision: Precision = Precision.High, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.horizontalRadius = (this.boundingRect.topRight.x - this.boundingRect.topLeft.x) / 2;
        this.verticalRadius = (this.boundingRect.topLeft.y - this.boundingRect.bottomLeft.y) / 2;
        this.center = Midpoint.between(this.boundingRect.topLeft, this.boundingRect.bottomRight);
        this.leftEndPoint = Midpoint.between(this.boundingRect.topLeft, this.boundingRect.bottomLeft);
        this.rightEndPoint = Midpoint.between(this.boundingRect.topRight, this.boundingRect.bottomRight);
        this.precision = precision;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
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

        let arr = new Float32Array(numberOfVerticies * Settings.floatsPerVertex);

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

            this.addTriangleToFloat32Array(arr, insertionIndex, previousPointAboveCenter, this.center, newPointAboveCenter);
            insertionIndex += Settings.floatsPerTriangle;
            this.addTriangleToFloat32Array(arr, insertionIndex, previousPointBelowCenter, this.center, newPointBelowCenter);
            insertionIndex += Settings.floatsPerTriangle;

            previousPointAboveCenter = newPointAboveCenter;
            previousPointBelowCenter = newPointBelowCenter;
        }

        this.addTriangleToFloat32Array(arr, insertionIndex, previousPointAboveCenter, this.center, this.rightEndPoint);
        insertionIndex += Settings.floatsPerTriangle;
        this.addTriangleToFloat32Array(arr, insertionIndex, previousPointBelowCenter, this.center, this.rightEndPoint);

        this._verticies = new Float32Vector(arr, arr.length);
    }

    private getYDistanceFromCenterForX(x: number): number
    {
        let verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    }
}