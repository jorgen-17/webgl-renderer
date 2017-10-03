import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "./../color/rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Constants } from "../../constants";
import { Settings } from "../../settings";
import { ShapeMode } from "./shapeMode";
import { Shape } from "./shape";

export abstract class DynamicShape extends Shape {
    private _modelMatrix: Mat4;
    constructor(numberOfVerticies: number, point1: Vec3, point2: Vec3,
        rgbColor: RGBColor = Settings.defaultColor)
    {
        super(numberOfVerticies, rgbColor, point1, point2);

        this._modelMatrix = new Mat4().setIdentity();
    }

    public get modelMatrix(): Mat4
    {
        return this._modelMatrix;
    }

    public set modelMatrix(value: Mat4)
    {
        this._modelMatrix = value;
        this.computeVerticies();
    }

    protected abstract computeVerticies(): void;

    protected addXYZColorAndModelMatToVerticies(index: number, x: number, y: number, z: number)
    {
        const modelMatrixVerts = this._modelMatrix.elements;

        this._verticies[index] = x;
        this._verticies[index + 1] = y;
        this._verticies[index + 2] = z;
        this._verticies[index + 3] = this._rgbColor.red;
        this._verticies[index + 4] = this._rgbColor.green;
        this._verticies[index + 5] = this._rgbColor.blue;
        this._verticies[index + 6] = modelMatrixVerts[0];
        this._verticies[index + 7] = modelMatrixVerts[1];
        this._verticies[index + 8] = modelMatrixVerts[2];
        this._verticies[index + 9] = modelMatrixVerts[3];
        this._verticies[index + 10] = modelMatrixVerts[4];
        this._verticies[index + 11] = modelMatrixVerts[5];
        this._verticies[index + 12] = modelMatrixVerts[6];
        this._verticies[index + 13] = modelMatrixVerts[7];
        this._verticies[index + 14] = modelMatrixVerts[8];
        this._verticies[index + 15] = modelMatrixVerts[9];
        this._verticies[index + 16] = modelMatrixVerts[10];
        this._verticies[index + 17] = modelMatrixVerts[11];
        this._verticies[index + 18] = modelMatrixVerts[12];
        this._verticies[index + 19] = modelMatrixVerts[13];
        this._verticies[index + 20] = modelMatrixVerts[14];
        this._verticies[index + 21] = modelMatrixVerts[15];
    }

    protected addTriangleToVerticies(index: number,
        vertex1Position: Vec3, vertex2Position: Vec3, vertex3Position: Vec3)
    {
        this.addXYZColorAndModelMatToVerticies(index, vertex1Position.x,
            vertex1Position.y, vertex1Position.z);
        this.addXYZColorAndModelMatToVerticies((index + Constants.floatsPerDynamicVertex), vertex2Position.x,
            vertex2Position.y, vertex2Position.z);
        this.addXYZColorAndModelMatToVerticies((index + (Constants.floatsPerDynamicVertex * 2)),
            vertex3Position.x, vertex3Position.y, vertex3Position.z);
    }
}
