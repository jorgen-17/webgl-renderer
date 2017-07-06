import { Shape2d } from "./shape2d";
import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Settings } from "../../settings";

export class Line extends Shape2d
{
    private vertexPositions: Array<Vec3> ;

    constructor(point: Vec3, rgbColor: RGBColor, gl: WebGLRenderingContext)
    {
        super(rgbColor);

        let array = new Float32Array(Settings.floatsPerVertex);

        this.vertexPositions = new Array<Vec3>();
        this.vertexPositions.push(point);

        this.computeVerticies();

        this.glRenderMode = gl.LINE_STRIP;
    }

    protected computeVerticies(): void
    {
        let arr = new Float32Array(this.vertexPositions.length * Settings.floatsPerVertex);

        for (let i = 0; i < this.vertexPositions.length; i++)
        {
            const insertionIndex = i * Settings.floatsPerVertex;
            const vertexPosition = this.vertexPositions[i];
            this.addXYAndColorToFloat32Array(arr, insertionIndex, vertexPosition.x, vertexPosition.y, vertexPosition.z);
        }

        this.verticies = new Float32Vector(arr);
    }

    public addVertex(vertex: Vec3): void
    {
        this.vertexPositions.push(vertex);

        let array = new Float32Array(Settings.floatsPerVertex);
        this.addXYAndColorToFloat32Array(array, 0, vertex.x, vertex.y, vertex.z);
        this.verticies.addArray(array);
    }
}