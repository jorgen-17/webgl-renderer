import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "./midpoint";
import { Precision } from "../precision";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Ellipse extends Shape2d
{
    private static readonly highPrecisionNumberOfInnerVerticies: number = 400;
    private static readonly highPrecisionNumberOfVerticies: number = Ellipse.highPrecisionNumberOfInnerVerticies + 3;
    private static readonly lowPrecisionNumberOfInnerVerticies: number = 8;
    private static readonly lowPrecisionNumberOfVerticies: number = Ellipse.lowPrecisionNumberOfInnerVerticies + 3;

    private center: Vec3;
    private horizontalRadius: number;
    private verticalRadius: number;
    private precision: Precision;

    constructor(point1: Vec3, point2: Vec3, rgbColor: RGBColor, gl: WebGLRenderingContext, precision: Precision)
    {
        super(rgbColor, point1, point2);

        this.horizontalRadius = (this.boundingRect.topRight.x - this.boundingRect.topLeft.x) / 2;
        this.verticalRadius = (this.boundingRect.topLeft.y - this.boundingRect.bottomLeft.y) / 2;
        this.center = Midpoint.between(this.boundingRect.topLeft, this.boundingRect.bottomRight);
        this.precision = precision;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    protected computeVerticies(): void
    {
        let numberOfInnerVerticies, numberOfVerticies: number = 0;
        if (this.precision === Precision.High)
        {
            numberOfInnerVerticies = Ellipse.highPrecisionNumberOfInnerVerticies;
            numberOfVerticies = Ellipse.highPrecisionNumberOfVerticies;
        }
        else if (this.precision === Precision.Low)
        {
            numberOfInnerVerticies = Ellipse.lowPrecisionNumberOfInnerVerticies;
            numberOfVerticies = Ellipse.lowPrecisionNumberOfVerticies;
        }

        let arr = new Float32Array(numberOfVerticies * Settings.floatsPerVertex);

        let x = this.boundingRect.topLeft.x;
        // divide by 2 because of horizontal symmetry, subtract one because of duplicate vertex inserted at middle
        const xIncrement = (this.horizontalRadius * 2) / ((numberOfVerticies - 1) / 2);

        // manually insert first, middle, and last vertex
        this.addXYAndColorToFloat32Array(arr, 0, x, (this.boundingRect.topLeft.y - this.verticalRadius), this.center.z);
        // insert at half the verticies. times 5 because each vertex takes 5 spaces (x,y,r,g, and b)
        // and then add 5 since we already inserted the first vertex
        let symmetryInsertionOffset = ((numberOfInnerVerticies / 2) * Settings.floatsPerVertex) + Settings.floatsPerVertex;
        let endPointX = this.boundingRect.topRight.x;
        let endPointY = this.boundingRect.topRight.y - this.verticalRadius;
        this.addXYAndColorToFloat32Array(arr, symmetryInsertionOffset, endPointX, endPointY, this.center.z);
        this.addXYAndColorToFloat32Array(arr, (arr.length - Settings.floatsPerVertex), endPointX, endPointY, this.center.z);

        // start at 6 because already inserted a vertex
        let insertionIndex = Settings.floatsPerVertex;

        // divide by half the number of verticies because horizontal symmetry
        for ( let i = 0; i < numberOfInnerVerticies / 2; i++)
        {
            x += xIncrement;
            let y = this.getYDistanceFromCenterForX(x);

            this.addXYAndColorToFloat32Array(arr, insertionIndex, x, y + this.center.y, this.center.z);
            this.addXYAndColorToFloat32Array(arr, insertionIndex + symmetryInsertionOffset, x, this.center.y - y, this.center.z);

            insertionIndex += Settings.floatsPerVertex;
        }

        this.verticies = new Float32Vector(arr);
    }

    private getYDistanceFromCenterForX(x: number): number
    {
        let verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    }
}