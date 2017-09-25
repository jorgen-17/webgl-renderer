import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../color/rgbColor";
import { Shape } from "../shape";
import { Constants } from "../../../constants";
import { Float32Vector } from "../../../utils/float32Vector";
import { ShapeMode } from "../shapeMode";

export class Point extends Shape
{
    private static readonly numberOfVerticies = 1;
    public shapeMode: ShapeMode = "points";
    private _location: Vec3;

    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Point.numberOfVerticies, rgbColor);

        this._location = location;
        this.computeVerticies();

        this.glRenderMode = gl.POINTS;
    }

    protected computeVerticies(): void
    {
        this.addXYZColorAndModelMatToVerticies(0, this._location.x,
            this._location.y, this._location.z);
    }
}