import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";
import { ShapeMode } from "../shapeMode";


export class Point extends Shape
{
    private static readonly numberOfVerticies = 1;
    public shapeMode: ShapeMode = "points";
    private _location: Vec3;
    private _pointSize: number;

    constructor(location: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor, pointSize: number = 5)
    {
        super(Point.numberOfVerticies, Constants.floatsPerPointVertex, rgbColor);

        this._location = location;
        this._pointSize = pointSize;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
    }

    protected computeVerticies(): void
    {
        let array = new Float32Array(Constants.floatsPerLineVertex + 1);
        this.addXYZColorAndPointSizeToFloat32Array(array, 0, this._location.x,
            this._location.y, this._location.z);
        this._verticies = array;
    }


    private addXYZColorAndPointSizeToFloat32Array(array: Float32Array, index: number,
        x: number, y: number, z: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this.rgbColor.red;
        array[index + 4] = this.rgbColor.green;
        array[index + 5] = this.rgbColor.blue;
        array[index + 6] = this._pointSize;
    }
}