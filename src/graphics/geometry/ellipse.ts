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
        let arr = new Float32Array(this.numberOfVerticies * 2); // 2x the verticies one for x one for y

        let insertionIndex = 0;
        let x = boundingRect.topLeft.x;
        // divide by half the number of verticies because horizontal symmetry
        const xIncrement = (this.horizontalRadius * 2) / (this.numberOfVerticies / 2);

        // divide by half the number of verticies because horizontal symmetry
        for ( let i = 0; i < this.numberOfVerticies / 2; i++)
        {
            arr[insertionIndex] = x;
            insertionIndex++;
            let y = this.getYForX(x);
            arr[insertionIndex] = y;
            insertionIndex++;

            x += xIncrement;
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
        return 0;
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
        return 0;
    }
}