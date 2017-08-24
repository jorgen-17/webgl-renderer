import { Mat4, Vec3 } from "cuon-matrix-ts";
import { Settings } from "../settings";
import { Constants } from "../constants";

export class Camera
{
    private _modelMatrix: Mat4;

    constructor()
    {
        this._modelMatrix = new Mat4();
        this._modelMatrix.setIdentity();
    }

    public get modelMatrix(): Float32Array
    {
        return this._modelMatrix.elements;
    }

    public translateX(x: number): void
    {
        this._modelMatrix.translate(x, 0, 0);
    }

    public translateY(y: number): void
    {
        this._modelMatrix.translate(0, y, 0);
    }

    public zoomIn(): void
    {
        this._modelMatrix.scale(1.05, 1.05, 0);
    }

    public zoomOut(): void
    {
        this._modelMatrix.scale(0.95, 0.95, 0);
    }
}