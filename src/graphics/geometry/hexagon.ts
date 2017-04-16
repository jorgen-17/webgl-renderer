import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint, ThirdPoints } from "../../../src/graphics/geometry/midpoint";
import { RGBColor } from "../rgbColor";

export class Hexagon extends Shape
{
    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        let boundingRect = new BoundingRectangle(point1, point2);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.numberOfVerticies = 6;
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(12);
        let { first, second } = ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight);
        arr[0] = first.x;
        arr[1] = first.y;
        arr[2] = second.x;
        arr[3] = second.y;
        let mid = Midpoint.between(boundingRect.topRight, boundingRect.bottomRight);
        arr[4] = mid.x;
        arr[5] = mid.y;
        ({ first, second } = ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft));
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