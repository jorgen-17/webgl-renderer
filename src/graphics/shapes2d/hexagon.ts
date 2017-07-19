import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { Midpoint, ThirdPoints } from "./midpoint";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Hexagon extends Shape2d
{
    private static readonly numberOfVerticies: number = 12;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }

    protected computeVerticies(): void
    {
        const arr = new Float32Array(Hexagon.numberOfVerticies * Settings.floatsPerVertex);

        const topThirds = ThirdPoints.between(this.boundingRect.topLeft,
            this.boundingRect.topRight);
        const topFirstThird = topThirds.first;
        const topSecondThird = topThirds.second;
        const bottomThirds = ThirdPoints.between(this.boundingRect.bottomRight,
            this.boundingRect.bottomLeft);
        const bottomFirstThird = bottomThirds.first;
        const bottomSecondThird = bottomThirds.second;
        const midLeft = Midpoint.between(this.boundingRect.bottomLeft, this.boundingRect.topLeft);
        const midRight = Midpoint.between(this.boundingRect.topRight, this.boundingRect.bottomRight);

        let insertionIndex = 0;

        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird,
            bottomFirstThird, midLeft);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird,
            bottomFirstThird, bottomSecondThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topFirstThird,
            topSecondThird, bottomSecondThird);
        insertionIndex += Settings.floatsPerTriangle;

        this.addTriangleToFloat32Array(arr, insertionIndex, topSecondThird,
            bottomSecondThird, midRight);

        this._verticies = new Float32Vector(arr, arr.length);
    }
}