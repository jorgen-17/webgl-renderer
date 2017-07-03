import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint, ThirdPoints } from "./midpoint";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "../../math/vec3";
import { Settings } from "../../settings";

export class Hexagon extends Shape2d
{
    private static readonly numberOfVerticies: number = 6;

    constructor(point1: Vec3, point2: Vec3, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        let boundingRect = new BoundingRectangle(point1, point2);
        let vertexArray = this.populateVerticies(boundingRect);
        this.verticies = new Float32Vector(vertexArray);
        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    private populateVerticies(boundingRect: BoundingRectangle): Float32Array
    {
        let arr = new Float32Array(Hexagon.numberOfVerticies * Settings.floatsPerVertex);


        let { first, second } = ThirdPoints.between(boundingRect.topLeft, boundingRect.topRight);

        let insertionIndex = 0;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += Settings.floatsPerVertex;
        let mid = Midpoint.between(boundingRect.topRight, boundingRect.bottomRight);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, mid.x, mid.y, mid.z);
        insertionIndex += Settings.floatsPerVertex;
        ({ first, second } = ThirdPoints.between(boundingRect.bottomRight, boundingRect.bottomLeft));
        this.addXYAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        mid = Midpoint.between(boundingRect.bottomLeft, boundingRect.topLeft);
        this.addXYAndColorToFloat32Array(arr, insertionIndex, mid.x, mid.y, mid.z);

        return arr;
    }
}