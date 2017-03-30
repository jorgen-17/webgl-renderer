import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint, ThirdPoints } from "../../../src/graphics/geometry/midpoint";

export class Hexagon implements Shape
{
    public verticies: Float32Vector;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        let boundingRect = new BoundingRectangle(point1, point2);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.vertexSize = 2;
        this.numberOfVerticies = 6;
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(12);
        var { first, second } = ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight);
        arr[0] = first.x;
        arr[1] = first.y;
        arr[2] = second.x;
        arr[3] = second.y;
        let mid = Midpoint.between(boundingRect.topRight, boundingRect.bottomRight);
        arr[4] = mid.x;
        arr[5] = mid.y;
        var { first, second } = ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft);
        arr[6] = second.x;
        arr[7] = second.y;
        arr[8] = first.x;
        arr[9] = first.y;
        mid = Midpoint.between(boundingRect.bottomLeft, boundingRect.topLeft);
        arr[10] = mid.x;
        arr[11] = mid.y;
        return arr;
    }
}