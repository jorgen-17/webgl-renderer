import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint } from "../../../src/graphics/geometry/midpoint";

export class Ellipse implements Shape
{
    public verticies: Float32Vector;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    private center: Point2d;
    private horizontalRadius: number;
    private verticalRadius: number;
    private type: EllipseType;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        this.numberOfVerticies = 360;
        let boundingRect = new BoundingRectangle(point1, point2);
        this.center = Midpoint.between(boundingRect.topLeft, boundingRect.bottomRight);
        this.horizontalRadius = boundingRect.topRight.x - boundingRect.topLeft.x / 2;
        this.verticalRadius = boundingRect.topRight.x - boundingRect.topLeft.x / 2;
        this.type = this.horizontalRadius >= this.verticalRadius ? EllipseType.Horizontal : EllipseType.Vertical;
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.vertexSize = 2;
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(this.numberOfVerticies * 2); // 2x the verticies one for x one for y

        const radiansInACircle = 2 * Math.PI;
        const thetaIncrement = radiansInACircle / this.numberOfVerticies;
        let theta = 0;
        let insertionIndex = 0;

        for ( let i = 0; i < this.numberOfVerticies; i++)
        {
            // let x = (Math.cos(theta) * this.radius) + this.center.x;
            // arr[insertionIndex] = x;
            // insertionIndex++;
            // let y = (Math.sin(theta) * this.radius) + this.center.y;
            // arr[insertionIndex] = y;
            // insertionIndex++;
            theta += thetaIncrement;
        }

        return arr;
    }
}

enum EllipseType
{
    Vertical,
    Horizontal
}