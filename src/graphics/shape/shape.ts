import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "./../color/rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Constants } from "../../constants";
import { Settings } from "../../settings";
import { ShapeMode } from "./shapeMode";

export abstract class Shape {
    public glRenderMode: number;
    public numberOfVerticies: number;
    public numberOfFloatsPerVertex: number;
    public abstract shapeMode: ShapeMode;
    protected _verticies: Float32Array;
    protected _boundingRect: BoundingRectangle;
    protected _rgbColor: RGBColor;
    constructor(numberOfVerticies: number, numberOfFloatsPerVertex: number,
        rgbColor: RGBColor = Settings.defaultColor,
        point1: Vec3 | null = null, point2: Vec3 | null = null)
    {
        this.numberOfVerticies = numberOfVerticies;
        this.numberOfFloatsPerVertex = numberOfFloatsPerVertex;
        this._rgbColor = rgbColor;
        this._verticies = new Float32Array(numberOfVerticies * this.numberOfFloatsPerVertex);

        if (point1 && point2)
        {
            this._boundingRect = new BoundingRectangle(point1, point2);
        }
    }

    public get verticies(): Float32Array
    {
        return this._verticies;
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

    protected abstract computeVerticies(): void;
}
