import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../color/rgbColor";
import { Shape } from "../shape";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";

export class Point extends Shape
{
    private _location: Vec3;

    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor);

        this._location = location;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
        this.shapeMode = "points";
    }

    protected computeVerticies(): void
    {
        let vertex = new Float32Array(Constants.floatsPerPoint);
        this._positions = new Float32Vector(vertex, vertex.length);

        this.addXYZToPositions(0, this._location.x,
            this._location.y, this._location.z);
    }
}