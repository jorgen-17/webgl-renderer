import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "./../color/rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Constants } from "../../constants";
import { Settings } from "../../settings";
import { ShapeMode } from "./shapeMode";

export abstract class Shape {
    public rgbColor: RGBColor;
    public glRenderMode: number;
    public abstract shapeMode: ShapeMode;
    public abstract numberOfPositionVerticies: number;
    protected _positions: Float32Vector;
    protected _boundingRect: BoundingRectangle;
    private _modelMatrix: Mat4;
    constructor(rgbColor: RGBColor = Settings.defaultColor, point1: Vec3 | null = null, point2: Vec3 | null = null)
    {
        this.rgbColor = rgbColor;
        this._modelMatrix = new Mat4().setIdentity();

        if (point1 && point2)
        {
            this._boundingRect = new BoundingRectangle(point1, point2);
        }
    }

    public get positions(): Float32Array
    {
        return this._positions.arr;
    }

    public get modelMatrix(): Mat4
    {
        return this._modelMatrix;
    }

    protected abstract computeVerticies(): void;

    protected addXYZToPositions(index: number, x: number, y: number, z: number)
    {
        this._positions[index] = x;
        this._positions[index + 1] = y;
        this._positions[index + 2] = z;
    }

    protected addTriangleToPositions(index: number,
        vertex1Position: Vec3, vertex2Position: Vec3, vertex3Position: Vec3)
    {
        this.addXYZToPositions(index, vertex1Position.x,
            vertex1Position.y, vertex1Position.z);
        this.addXYZToPositions((index + Constants.floatsPerPoint), vertex2Position.x,
            vertex2Position.y, vertex2Position.z);
        this.addXYZToPositions((index + (Constants.floatsPerPoint * 2)),
            vertex3Position.x, vertex3Position.y, vertex3Position.z);
    }
}
