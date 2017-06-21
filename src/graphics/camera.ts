import { Vector3 } from "../math/vector3";
import { Matrix4 } from "../math/matrix4";
import { Point3d } from "./shapes/point3d";

export class Camera
{
    private _viewMatrix: Matrix4;

    constructor(eyePosition: Point3d, lookAtPoint: Point3d, upPosition: Point3d)
    {
        this._viewMatrix = new Matrix4();
        this._viewMatrix.setLookAt(eyePosition.x, eyePosition.y, eyePosition.z,
            lookAtPoint.x, lookAtPoint.y, lookAtPoint.z,
            upPosition.x, upPosition.y, upPosition.z);
    }

    public getViewMatrix(): Float32Array
    {
        return this._viewMatrix.elements;
    }
}