import { Shape } from "./shape";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { ThirdPoints } from "../../../src/graphics/geometry/midpoint";
import { RGBColor } from "../rgbColor";

export class Octogon extends Shape
{
    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        let boundingRect = new BoundingRectangle(point1, point2);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.numberOfVerticies = 8;
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(40);

        let { first, second } = ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight);
        this.addXYAndColorToFloat32Array(arr, 0, first.x, first.y);
        this.addXYAndColorToFloat32Array(arr, 5, second.x, second.y);
        ({ first, second } = ThirdPoints.between(boundingRect.topRight, boundingRect.bottomRight));
        this.addXYAndColorToFloat32Array(arr, 10, second.x, second.y);
        this.addXYAndColorToFloat32Array(arr, 15, first.x, first.y);
        ({ first, second } = ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft));
        this.addXYAndColorToFloat32Array(arr, 20, second.x, second.y);
        this.addXYAndColorToFloat32Array(arr, 25, first.x, first.y);
        ({ first, second } = ThirdPoints.between(boundingRect.bottomLeft, boundingRect.topLeft));
        this.addXYAndColorToFloat32Array(arr, 30, first.x, first.y);
        this.addXYAndColorToFloat32Array(arr, 35, second.x, second.y);

        return arr;
    }
}