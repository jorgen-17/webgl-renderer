import { Vec3 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "./../color/rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Constants } from "../../constants";
import { Settings } from "../../settings";

export abstract class Shape {
    protected _verticies: Float32Vector;
    public glRenderMode: number;
    protected boundingRect: BoundingRectangle;
    private _rgbColor: RGBColor;
    constructor(rgbColor: RGBColor = Settings.defaultColor, point1: Vec3 | null = null, point2: Vec3 | null = null)
    {
        this._rgbColor = rgbColor;

        if (point1 && point2)
        {
            this.boundingRect = new BoundingRectangle(point1, point2);
        }
    }

    public get rgbColor(): RGBColor
    {
        return this._rgbColor;
    }

    public set rgbColor(value: RGBColor)
    {
        this._rgbColor = value;
        this.computeVerticies();
    }

    public get verticies(): Float32Array
    {
        return this._verticies.arr;
    }

    protected abstract computeVerticies(): void;

    protected addXYZAndColorToFloat32Array(array: Float32Array, index: number,
        x: number, y: number, z: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this._rgbColor.red;
        array[index + 4] = this._rgbColor.green;
        array[index + 5] = this._rgbColor.blue;
    }

    protected addTriangleToFloat32Array(array: Float32Array, index: number,
        vertex1Position: Vec3, vertex2Position: Vec3, vertex3Position: Vec3)
    {
        this.addXYZAndColorToFloat32Array(array, index, vertex1Position.x,
            vertex1Position.y, vertex1Position.z);
        this.addXYZAndColorToFloat32Array(array, (index + Constants.floatsPerVertex), vertex2Position.x,
            vertex2Position.y, vertex2Position.z);
        this.addXYZAndColorToFloat32Array(array, (index + (Constants.floatsPerVertex * 2)),
            vertex3Position.x, vertex3Position.y, vertex3Position.z);
    }
}
