import { Matrix4 } from "../math/matrix4";
import { Point3d } from "./shapes/point3d";

export class Camera
{
    private _viewMatrix: Matrix4;
    private _eyePosition: Point3d;
    private _lookAtPoint: Point3d;
    private _upPosition: Point3d;

    constructor(eyePosition: Point3d, lookAtPoint: Point3d, upPosition: Point3d)
    {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;

        this._viewMatrix = new Matrix4();
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z,
            lookAtPoint.x, lookAtPoint.y, lookAtPoint.z,
            upPosition.x, upPosition.y, upPosition.z);
    }

    public getViewMatrix(): Float32Array
    {
        return this._viewMatrix.elements;
    }

    public get eyePosition(): Point3d
    {
        return this._eyePosition;
    }

    public get lookAtPoint(): Point3d
    {
        return this._lookAtPoint;
    }

    public get upPosition(): Point3d
    {
        return this._upPosition;
    }

    public setCameraView(eyePosition: Point3d, lookAtPoint: Point3d, upPosition: Point3d): void
    {
        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;

        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z,
            lookAtPoint.x, lookAtPoint.y, lookAtPoint.z,
            upPosition.x, upPosition.y, upPosition.z);
    }
}