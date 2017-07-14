import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../rgbColor";
import { Shape2d } from "./shape2d";
import { Settings } from "../../settings";
import { Float32Vector } from "../../utils/vector";

export class Point extends Shape2d
{
    private _location: Vec3;

    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor);

        this._location = location;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
    }

    protected computeVerticies(): void
    {
        let vertex = new Float32Array(Settings.floatsPerVertex);

        this.addXYZAndColorToFloat32Array(vertex, 0, this._location.x,
            this._location.y, this._location.z);

        this._verticies = new Float32Vector(vertex);
    }
}