import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { BoundingRectangle } from "./boundingRectangle";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Rectangle extends Shape2d
{
    private static readonly numberOfVerticies: number = 4;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLE_STRIP;
    }
    protected computeVerticies(): void
    {
        let array = new Float32Array(Rectangle.numberOfVerticies * Settings.floatsPerVertex);

        let insertionIndex = 0;
        this.addXYZAndColorToFloat32Array(array, insertionIndex, this.boundingRect.topLeft.x,
            this.boundingRect.topLeft.y, this.boundingRect.topLeft.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(array, insertionIndex, this.boundingRect.topRight.x,
            this.boundingRect.topRight.y, this.boundingRect.topRight.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft.x,
            this.boundingRect.bottomLeft.y, this.boundingRect.bottomLeft.z);
        insertionIndex += Settings.floatsPerVertex;
        this.addXYZAndColorToFloat32Array(array, insertionIndex, this.boundingRect.bottomRight.x,
            this.boundingRect.bottomRight.y, this.boundingRect.bottomRight.z);

        this._verticies = new Float32Vector(array, array.length);
    }
}