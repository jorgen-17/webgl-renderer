import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "../../../src/graphics/geometry/midpoint";

export abstract class Ellipse implements Shape
{
    public verticies: Float32Vector;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;
    protected center: Point2d;
    protected horizontalRadius: number;
    protected verticalRadius: number;

    constructor(boundingRect: BoundingRectangle, horizontalRadius: number, verticalRadius: number,
         gl: WebGLRenderingContext, numberOfVerticies: number)
    {
        this.numberOfVerticies = numberOfVerticies;
        this.center = Midpoint.between(boundingRect.topLeft, boundingRect.bottomRight);
        this.horizontalRadius = horizontalRadius;
        this.verticalRadius = verticalRadius;
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.vertexSize = 2;
        this.glRenderMode = gl.POINTS;
    }

    protected populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        // 2x the verticies one for x one for y
        let arr = new Float32Array(this.numberOfVerticies * 2);

        let x = boundingRect.topLeft.x;
        // divide by 2 because of horizontal symmetry
        const xIncrement = (this.horizontalRadius * 2) / (this.numberOfVerticies / 2);

        // manually insert first and last vertex
        arr[0] = x;
        arr[1] = boundingRect.topLeft.y - this.verticalRadius;
        arr[arr.length - 2] = boundingRect.topRight.x;
        arr[arr.length - 1] = boundingRect.topRight.y - this.verticalRadius;

        // start at 2  because already inserted at 0 and 1
        let insertionIndex = 2;
        // ignore the first and last verticies, and divide by half because of horizontal symmetry
        const numberOfInnerVerticies = (this.numberOfVerticies - 2) / 2;
        // times 2 because each vertex takes 2 slots in the array, and plus one to offset the first vertex already inserted
        let symmetryInsertionOffset = (numberOfInnerVerticies * 2);

        // divide by half the number of verticies because horizontal symmetry
        for ( let i = 0; i < numberOfInnerVerticies; i++)
        {
            x += xIncrement;

            arr[insertionIndex] = x;
            arr[insertionIndex + symmetryInsertionOffset] = x;
            insertionIndex++;
            let y = this.getYForX(x);
            arr[insertionIndex] = y;
            arr[insertionIndex + symmetryInsertionOffset] = y;
            insertionIndex++;
        }

        return arr;
    }

    protected abstract getYForX(x: number): number;
}

export class HorizontalEllipse extends Ellipse
{
    constructor(boundingRect: BoundingRectangle, horizontalRadius: number, verticalRadius: number,
        gl: WebGLRenderingContext, numberOfVerticies: number)
    {
        super(boundingRect, horizontalRadius, verticalRadius, gl, numberOfVerticies);
    }

    protected getYForX (x: number): number
    {
        return x;
    }
}

export class VerticalEllipse extends Ellipse
{
    constructor(boundingRect: BoundingRectangle, horizontalRadius: number, verticalRadius: number,
        gl: WebGLRenderingContext, numberOfVerticies: number)
    {
        super(boundingRect, horizontalRadius, verticalRadius, gl, numberOfVerticies);
    }

    protected getYForX (x: number): number
    {
        return x;
    }
}