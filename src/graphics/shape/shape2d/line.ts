import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { RenderModeMapper } from "../../renderModeMapper";

export class Line extends Shape
{
    private _vertexPositions: Array<Vec3> ;

    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor);

        let array = new Float32Array(Constants.floatsPerVertex);

        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions = new Array<Vec3>();
        this._vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = RenderModeMapper.renderModeToWebGlConstant("lineStrip", gl);
    }

    public get verticies(): Float32Array
    {
        return this._verticies.getTrimmedArray();
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this._vertexPositions.length * Constants.floatsPerVertex);

        for (let i = 0; i < this._vertexPositions.length; i++)
        {
            const insertionIndex = i * Constants.floatsPerVertex;
            const vertexPosition = this._vertexPositions[i];
            this.addXYZAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this._verticies = new Float32Vector(arr); // todo: make vertexBuffer to avoid issues with 65k verticies limit
    }

    public addVertex(vertex: Vec3): void
    {
        this._vertexPositions.push(vertex);

        let array = new Float32Array(Constants.floatsPerVertex);
        this.addXYZAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this._verticies.addArray(array);
    }
}