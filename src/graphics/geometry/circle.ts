import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint, ThirdPoints } from "../../../src/graphics/geometry/midpoint";

export class Hexagon implements Shape
{
    private diameter: number;
    private radius: number;

    public verticies: Float32Vector;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;
    public shapeMode: ShapeMode;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        this.numberOfVerticies = 50;
        let boundingRect = new BoundingRectangle(point1, point2);
        this.diameter = boundingRect.topLeft.x - boundingRect.topRight.x;
        this.radius = this.diameter / 2;
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.vertexSize = 2;
        this.glRenderMode = gl.TRIANGLE_FAN;
        this.shapeMode = ShapeMode.Hexagons;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let numberOfPoints = this.numberOfVerticies * 2
        let arr = new Float32Array(numberOfPoints);
        let firstPoint = Midpoint.between(boundingRect.topLeft, boundingRect.bottomLeft);
        arr[0] = firstPoint.x;
        arr[1] = firstPoint.y;
        let lastPoint = Midpoint.between(boundingRect.topRight, boundingRect.bottomRight);
        arr[numberOfPoints - 2] = lastPoint.x;
        arr[numberOfPoints - 1] = lastPoint.y;

        // 2 less than because the first and last verticies are added manually outside of this function
        let verticiesToIterateOver = this.numberOfVerticies - 2;
        let xIncrement = this.diameter / this.numberOfVerticies;
        let x = boundingRect.topLeft.x + xIncrement;
        let insertionIndex = 2; // already inserted at position 0 and 1

        for ( let i = 0; i < verticiesToIterateOver / 2; i++)
        {
            let y = this.getYForGivenX(x);
            let negY = -1 * y;

            arr[insertionIndex] = x;
            insertionIndex++;
            arr[insertionIndex] = y;
            insertionIndex++;
            arr[insertionIndex] = x;
            insertionIndex++;
            arr[insertionIndex] = negY;
            insertionIndex++;

            x += xIncrement;
        }

        return arr;
    }

    // circle formula y^2 = r^2 - x^2
    // returns y for a given x
    private getYForGivenX(x: number): number
    {
        return Math.sqrt((Math.pow(this.radius,2) - Math.pow(x, 2)));
    }
}