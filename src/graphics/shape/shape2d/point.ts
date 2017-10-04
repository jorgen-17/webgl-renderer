import { Vec3 } from "cuon-matrix-ts";

import { StaticShape } from "../staticShape";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";
import { ShapeMode } from "../shapeMode";


export class Point extends StaticShape
{
    private static readonly numberOfVerticies = 1;
    public shapeMode: ShapeMode = "points";
    private _location: Vec3;
    private _pointSize: number;

    constructor(location: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor, pointSize: number = 5)
    {
        super(Point.numberOfVerticies, rgbColor);

        this._location = location;
        this._pointSize = pointSize;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
    }

    protected computeVerticies(): void
    {
        let array = new Float32Array(Constants.floatsPerStaticVertex + 1);
        this.addXYZAndColorToFloat32Array(array, 0, this._location.x,
            this._location.y, this._location.z);
        this._verticies = array;
    }
}