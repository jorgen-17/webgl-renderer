import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Line extends Shape2d
{
    private vertexPositions: Array<Vec3> ;

    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor);

        let array = new Float32Array(Settings.floatsPerVertex);

        this.vertexPositions = new Array<Vec3>();
        this.vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = gl.LINE_STRIP;
    }

    public get verticies(): Float32Array
    {
        return this._verticies.getTrimmedArray();
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this.vertexPositions.length * Settings.floatsPerVertex);

        for (let i = 0; i < this.vertexPositions.length; i++)
        {
            const insertionIndex = i * Settings.floatsPerVertex;
            const vertexPosition = this.vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this._verticies = new Float32Vector(arr);
    }

    public addVertex(vertex: Vec3): void
    {
        this.vertexPositions.push(vertex);

        let array = new Float32Array(Settings.floatsPerVertex);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticies.addArray(array);
    }
}