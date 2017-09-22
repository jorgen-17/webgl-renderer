import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../color/rgbColor";
import { Shape } from "../shape";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";
import { ShapeMode } from "../shapeMode";

export class Point extends Shape
{
    public shapeMode: ShapeMode = "points";
    public numberOfPositionVerticies = 1;
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
        let vertex = new Float32Array(Constants.floatsPerPoint);
        this._positions = new Float32Vector(vertex, vertex.length);

        this.addXYZToPositions(0, this._location.x,
            this._location.y, this._location.z);
    }
}