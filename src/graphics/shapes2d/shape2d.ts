import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export abstract class Shape2d {
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
}
