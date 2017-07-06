import { Mat4, Vec3 } from "cuon-matrix-ts";

export class Camera
{
    private _viewMatrix: Mat4;
    private _eyePosition: Vec3;
    private _lookAtPoint: Vec3;
    private _upPosition: Vec3;

    constructor(eyePosition: Vec3, lookAtPoint: Vec3, upPosition: Vec3)
    {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;

        this._viewMatrix = new Mat4();
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z,
            lookAtPoint.x, lookAtPoint.y, lookAtPoint.z,
            upPosition.x, upPosition.y, upPosition.z);
    }

    public getViewMatrix(): Float32Array
    {
        return this._viewMatrix.elements;
    }

    public get eyePosition(): Vec3
    {
        return this._eyePosition;
    }

    public get lookAtPoint(): Vec3
    {
        return this._lookAtPoint;
    }

    public get upPosition(): Vec3
    {
        return this._upPosition;
    }

    public setCameraView(eyePosition: Vec3, lookAtPoint: Vec3, upPosition: Vec3): void
    {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;

        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z,
            lookAtPoint.x, lookAtPoint.y, lookAtPoint.z,
            upPosition.x, upPosition.y, upPosition.z);
    }

    public translateEyePosition(eyePosition: Vec3): void
    {
        let newLookAtPoint = new Vec3(eyePosition.x, eyePosition.y, eyePosition.z - 1);
        let newUpPosition = new Vec3(eyePosition.x, eyePosition.y + 1, eyePosition.z);

        this.setCameraView(eyePosition, newLookAtPoint, newUpPosition);
    }
}