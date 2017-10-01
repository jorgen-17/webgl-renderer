import { Vec3 } from "cuon-matrix-ts";

import { StaticShape } from "../staticShape";
import { Float32Vector } from "../../../utils/float32Vector";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { RenderModeMapper } from "../../renderModeMapper";
import { ShapeMode } from "../shapeMode";

export class Line extends StaticShape
{
    public shapeMode: ShapeMode = "lines";
    private _vertexPositions: Array<Vec3>;
    private _verticiesVector: Float32Vector;

    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(1, rgbColor);

        let array = new Float32Vector();

        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = gl.LINE_STRIP;
    }

    public get verticies(): Float32Array

    {
        return this._verticiesVector.getTrimmedArray();
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this._vertexPositions.length * Constants.floatsPerStaticVertex);

        for (let i = 0; i < this._vertexPositions.length; i++)
        {
            const insertionIndex = i * Constants.floatsPerStaticVertex;
            const vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this._verticiesVector = new Float32Vector(arr);
    }

    public addVertex(vertex: Vec3): void
    {
        this._vertexPositions.push(vertex);
        this.numberOfVerticies++;

        let array = new Float32Array(Constants.floatsPerStaticVertex);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticiesVector.addArray(array);
    }
}