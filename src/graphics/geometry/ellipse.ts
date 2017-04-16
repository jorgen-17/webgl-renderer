import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "../../../src/graphics/geometry/midpoint";
import { Precision } from "../precision";
import { RGBColor } from "../rgbColor";

export class Ellipse extends Shape
{
    private center: Point2d;
    private horizontalRadius: number;
    private verticalRadius: number;
    private numberOfInnerVerticies;

    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext, precision: Precision)
    {
        super(rgbColor);

        let boundingRect = new BoundingRectangle(point1, point2);
        this.horizontalRadius = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
        this.verticalRadius = (boundingRect.topLeft.y - boundingRect.bottomLeft.y) / 2;
        if (precision === Precision.High)
        {
            this.numberOfInnerVerticies = 400;
            this.numberOfVerticies = 403;
        }
        else if (precision === Precision.Low)
        {
            this.numberOfInnerVerticies = 8;
            this.numberOfVerticies = 11;
        }
        this.center = Midpoint.between(boundingRect.topLeft, boundingRect.bottomRight);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        // 2x the verticies one for x one for y
        let arr = new Float32Array(this.numberOfVerticies * 2);

        let x = boundingRect.topLeft.x;
        // divide by 2 because of horizontal symmetry, subtract one because of duplicate vertex inserted at middle
        const xIncrement = (this.horizontalRadius * 2) / ((this.numberOfVerticies - 1) / 2);

        // manually insert first, middle, and last vertex
        arr[0] = x;
        arr[1] = boundingRect.topLeft.y - this.verticalRadius;
        // plus 2 because of first vertex added
        let symmetryInsertionOffset = this.numberOfInnerVerticies + 2;
        arr[symmetryInsertionOffset] = boundingRect.topRight.x;
        arr[symmetryInsertionOffset + 1] = boundingRect.topRight.y - this.verticalRadius;
        arr[arr.length - 2] = boundingRect.topRight.x;
        arr[arr.length - 1] = boundingRect.topRight.y - this.verticalRadius;

        // start at 2  because already inserted at 0 and 1
        let insertionIndex = 2;

        // divide by half the number of verticies because horizontal symmetry
        for ( let i = 0; i < this.numberOfInnerVerticies / 2; i++)
        {
            x += xIncrement;

            arr[insertionIndex] = x;
            arr[insertionIndex + symmetryInsertionOffset] = x;
            insertionIndex++;
            let y = this.getYDistanceFromCenterForX(x);
            arr[insertionIndex] = y + this.center.y;
            arr[insertionIndex + symmetryInsertionOffset] = + this.center.y - y;
            insertionIndex++;
        }

        return arr;
    }

    private getYDistanceFromCenterForX(x: number): number
    {
        let verticalRadiusSquared = Math.pow(this.verticalRadius, 2);
        return Math.sqrt(verticalRadiusSquared -
            ((verticalRadiusSquared * Math.pow((x - this.center.x), 2)) / Math.pow(this.horizontalRadius, 2)));
    }
}