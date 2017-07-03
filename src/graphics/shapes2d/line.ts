import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "../../math/vec3";
import { Settings } from "../../settings";

export class Line extends Shape2d
{
    constructor(point: Vec3, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        let array = new Float32Array(Settings.floatsPerVertex);
        this.addXYAndColorToFloat32Array(array, 0, point.x, point.y, point.z);
        this.verticies = new Float32Vector(array);
        this.glRenderMode = gl.LINE_STRIP;
    }

    public addVertex(vertex: Vec3): void
    {
        let array = new Float32Array(Settings.floatsPerVertex);
        this.addXYAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this.verticies.addArray(array);
    }
}