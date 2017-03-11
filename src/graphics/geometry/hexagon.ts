import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { ThirdPoints } from "../../../src/graphics/geometry/midpoint";

export class Hexagon implements Shape
{
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    glRenderMode: number;
    shapeMode: ShapeMode;

    constructor(point1: Point2d, point2: Point2d, gl: WebGLRenderingContext)
    {
        let boundingRect = new BoundingRectangle(point1, point2);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.vertexSize = 2;
        this.numberOfVerticies = 6;
        this.glRenderMode = gl.TRIANGLE_FAN;
        this.shapeMode = ShapeMode.Hexagons;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(16);
        var { first, second } = ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight);
        arr[0] = first.x;
        arr[1] = first.y;
        arr[2] = second.x;
        arr[3] = second.x;
        var { first, second } = ThirdPoints.between(boundingRect.topRight, boundingRect.bottomRight);
        arr[4] = first.x;
        arr[5] = first.y;
        arr[6] = second.x;
        arr[7] = second.x;
        var { first, second } = ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft);
        arr[8] = first.x;
        arr[9] = first.y;
        arr[10] = second.x;
        arr[11] = second.x;
        var { first, second } = ThirdPoints.between(boundingRect.bottomLeft, boundingRect.topLeft);
        arr[12] = first.x;
        arr[13] = first.y;
        arr[14] = second.x;
        arr[15] = second.x;
        return arr;
    }
}