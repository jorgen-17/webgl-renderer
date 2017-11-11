import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { RenderModeMapper } from "../../renderModeMapper";
import { ShapeMode } from "../shapeMode";

export class Line extends Shape
{
    public shapeMode: ShapeMode = ShapeMode.lines;
    private _vertexPositions: Array<Vec3>;
    private _verticiesVector: Float32Vector;
    private _glBuffer: WebGLBuffer | null;
    private _gl: WebGLRenderingContext;

    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(1, Constants.floatsPerPositionColor, rgbColor);

        let array = new Float32Vector();

        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = gl.LINE_STRIP;
        this._gl = gl;
        this._glBuffer = this._gl.createBuffer();
    }

    public get verticies(): Float32Array

    {
        return this._verticiesVector.getTrimmedArray();
    }

    public get glBuffer(): WebGLBuffer | null
    {
        return this._glBuffer;
    }

    public refreshWebglBuffer()
    {
        this._gl.deleteBuffer(this._glBuffer);
        this._glBuffer = this._gl.createBuffer();
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this._vertexPositions.length * Constants.floatsPerPositionColor);

        for (let i = 0; i < this._vertexPositions.length; i++)
        {
            const insertionIndex = i * Constants.floatsPerPositionColor;
            const vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this._verticiesVector = new Float32Vector(arr);
    }

    public addVertex(vertex: Vec3): void
    {
        this._vertexPositions.push(vertex);
        this.numberOfVerticies++;

        let array = new Float32Array(Constants.floatsPerPositionColor);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticiesVector.addArray(array);

        this.refreshWebglBuffer();
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