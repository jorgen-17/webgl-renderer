import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";
import { ShapeMode } from "../shapeMode";
import { Settings } from "../../../settings";


export class Point extends Shape
{
    private static readonly numberOfVerticies = 1;
    public shapeMode: ShapeMode = ShapeMode.points;
    private _location: Vec3;
    private _pointSize: number;

    constructor(location: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor, pointSize: number = Settings.defaultPointSize)
    {
        super(Point.numberOfVerticies, Constants.floatsPerPointVertex, rgbColor);

        this._location = location;
        this._pointSize = pointSize;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
    }

    public get pointSize(): number
    {
        return this._pointSize;
    }

    public set pointSize(value: number)
    {
        this._pointSize = value;
        this.computeVerticies();
    }

    protected computeVerticies(): void
    {
        this.addXYZColorAndPointSize(0, this._location.x,
            this._location.y, this._location.z);
    }

    private addXYZColorAndPointSize( index: number,
        x: number, y: number, z: number)
    {
        this._verticies[index] = x;
        this._verticies[index + 1] = y;
        this._verticies[index + 2] = z;
        this._verticies[index + 3] = this.rgbColor.red;
        this._verticies[index + 4] = this.rgbColor.green;
        this._verticies[index + 5] = this.rgbColor.blue;
        this._verticies[index + 6] = this._pointSize;
    }
}