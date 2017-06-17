import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "../../../src/graphics/shapes/midpoint";
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
        // 5x the verticies one for x, one for y, one for r, one for g, one for b
        let arr = new Float32Array(this.numberOfVerticies * 5);

        let x = boundingRect.topLeft.x;
        // divide by 2 because of horizontal symmetry, subtract one because of duplicate vertex inserted at middle
        const xIncrement = (this.horizontalRadius * 2) / ((this.numberOfVerticies - 1) / 2);

        // manually insert first, middle, and last vertex
        this.addXYAndColorToFloat32Array(arr, 0, x, boundingRect.topLeft.y - this.verticalRadius);
        // insert at half the verticies. times 5 because each vertex takes 5 spaces (x,y,r,g, and b)
        // and then add 5 since we already inserted the first vertex
        let symmetryInsertionOffset = ((this.numberOfInnerVerticies / 2) * 5) + 5;
        let endPointX = boundingRect.topRight.x;
        let endPointY = boundingRect.topRight.y - this.verticalRadius;
        this.addXYAndColorToFloat32Array(arr, symmetryInsertionOffset, endPointX, endPointY);
        this.addXYAndColorToFloat32Array(arr, arr.length - 5, endPointX, endPointY);

        // start at 2  because already inserted at 0 and 1 for x and y and then 2, 3, and 4 for r, g, and b
        let insertionIndex = 5;

        // divide by half the number of verticies because horizontal symmetry
        for ( let i = 0; i < this.numberOfInnerVerticies / 2; i++)
        {
            x += xIncrement;
            let y = this.getYDistanceFromCenterForX(x);

            this.addXYAndColorToFloat32Array(arr, insertionIndex, x, y + this.center.y);
            this.addXYAndColorToFloat32Array(arr, insertionIndex + symmetryInsertionOffset, x, this.center.y - y);

            insertionIndex += 5;
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