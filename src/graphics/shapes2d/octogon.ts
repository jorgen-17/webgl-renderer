import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { ThirdPoints } from "./midpoint";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Octogon extends Shape2d
{
    private static readonly numberOfVerticies: number = 18;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(Octogon.numberOfVerticies * Settings.floatsPerVertex);

        const topThirds = ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        const rightThirds = ThirdPoints.between(this.boundingRect.topRight, this.boundingRect.bottomRight);
        const bottomThirds = ThirdPoints.between(this.boundingRect.bottomLeft, this.boundingRect.bottomRight);
        const leftThirds = ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.bottomLeft);

        const topLeftThird = topThirds.first;
        const topRightThird = topThirds.second;
        const rightTopThird = rightThirds.second;
        const rightBottomThird = rightThirds.first;
        const bottomLeftThird = bottomThirds.first;
        const bottomRightThird = bottomThirds.second;
        const leftTopThird = leftThirds.second;
        const leftBottomThird = leftThirds.first;

        let insertionIndex = 0;

        this.addTriangleToFloat32Array(arr, insertionIndex, leftTopThird,
            topLeftThird, leftBottomThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, leftBottomThird,
            topLeftThird, bottomLeftThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, bottomLeftThird,
            topLeftThird, bottomRightThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topLeftThird,
            bottomRightThird, topRightThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topRightThird,
            bottomRightThird, rightBottomThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topRightThird,
            rightBottomThird, rightTopThird);
        insertionIndex += Settings.floatsPerTriangle;

        this._verticies = new Float32Vector(arr, arr.length);
    }
}