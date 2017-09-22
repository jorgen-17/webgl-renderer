import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { RenderModeMapper } from "../../renderModeMapper";
import { ShapeMode } from "../shapeMode";

export class Line extends Shape
{
    public shapeMode: ShapeMode = "lines";
    public numberOfPositionVerticies = 1;
    private _verticies: Float32Vector;
    private _vertexPositions: Array<Vec3>;

    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor);

        let array = new Float32Array(Constants.floatsPerPoint);

        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = gl.LINE_STRIP;
    }

    public get positions(): Float32Array
    {
        return this._verticies.getTrimmedArray();
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this._vertexPositions.length * Constants.floatsPerPoint);

        for (let i = 0; i < this._vertexPositions.length; i++)
        {
            const insertionIndex = i * Constants.floatsPerPoint;
            const vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this._verticies = new Float32Vector(arr);
    }

    public addVertex(vertex: Vec3): void
    {
        this._vertexPositions.push(vertex);
        this.numberOfPositionVerticies++;

        let array = new Float32Array(Constants.floatsPerPoint);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticies.addArray(array);
    }

    private addXYZAndColorToFloat32Array(array: Float32Array, index: number,
        x: number, y: number, z: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this.rgbColor.red;
        array[index + 4] = this.rgbColor.green;
        array[index + 5] = this.rgbColor.blue;
    }
}