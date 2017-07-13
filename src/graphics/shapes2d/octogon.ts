import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/vector";
import { BoundingRectangle } from "./boundingRectangle";
import { ThirdPoints } from "./midpoint";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Octogon extends Shape2d
{
    private static readonly numberOfVerticies: number = 8;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLE_FAN;
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(Octogon.numberOfVerticies * Settings.floatsPerVertex);

        let insertionIndex = 0;
        let { first, second } = ThirdPoints.between(this.boundingRect.topLeft, this.boundingRect.topRight);
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += Settings.floatsPerVertex;
        ({ first, second } = ThirdPoints.between(this.boundingRect.topRight, this.boundingRect.bottomRight));
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        ({ first, second } = ThirdPoints.between(this.boundingRect.bottomRight, this.boundingRect.bottomLeft));
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        ({ first, second } = ThirdPoints.between(this.boundingRect.bottomLeft, this.boundingRect.topLeft));
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, first.x, first.y, first.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(arr, insertionIndex, second.x, second.y, second.z);

        this._verticies = new Float32Vector(arr);
    }
}