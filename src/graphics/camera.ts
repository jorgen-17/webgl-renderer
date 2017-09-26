import { Mat4, Vec3 } from "cuon-matrix-ts";
import { Settings } from "../settings";
import { Constants } from "../constants";

export class Camera
{
// region: instance variables
    private _vpMatrix: Mat4;
    private _viewMatrix: Mat4;
    private _projectionMatrix: Mat4;
    private _eyePosition: Vec3;
    private _aspectRatio: number;
    private _fieldOfView: number;
    private _near: number;
    private _far: number;
    private _lookAtPoint: Vec3;
    private _upPosition: Vec3;
// end_region: instance variables

// region: constructor
    constructor(aspectRatio: number,
        fieldOfView: number = Settings.defaultFieldOfView,
        near: number = Settings.defaultNear,
        far: number = Settings.defaultFar,
        eyePosition: Vec3 = Settings.defaultEyePosition,
        lookAtPoint: Vec3 = Settings.defaultLookAtPoint,
        upPosition: Vec3 = Settings.defaultUpPosition)
    {
        this._viewMatrix = new Mat4();
        this._projectionMatrix = new Mat4();
        this._vpMatrix = new Mat4();

        this._eyePosition = eyePosition;
        this._lookAtPoint = lookAtPoint;
        this._upPosition = upPosition;
        this.updateView();


        this._aspectRatio = aspectRatio;
        this._fieldOfView = fieldOfView;
        this._near = near;
        this._far = far;
        this.updatePerspective();
    }
// end_region: constructor

// region: getters and setters
    public get vpMatrix(): Mat4
    {
        return this._vpMatrix;
    }

    public get viewMatrix(): Mat4
    {
        return this._viewMatrix;
    }

    public get projectionMatrix(): Mat4
    {
        return this._projectionMatrix;
    }

    public get aspectRatio(): number
    {
        return this._aspectRatio;
    }

    public set aspectRatio(value: number)
    {
        this._aspectRatio = value;

        this.updatePerspective();
    }

    public get fieldOfView(): number
    {
        return this._fieldOfView;
    }

    public set fieldOfView(value: number)
    {
        this._fieldOfView = value;

        this.updatePerspective();
    }

    public get near(): number
    {
        return this._near;
    }

    public set near(value: number)
    {
        this._near = value;

        this.updatePerspective();
    }

    public get far(): number
    {
        return this._far;
    }

    public set far(value: number)
    {
        this._far = value;

        this.updatePerspective();
    }

    public get eyePosition(): Vec3
    {
        return this._eyePosition;
    }

    public set eyePosition(value: Vec3)
    {
        this._eyePosition = value;

        this.updateView();
    }

    public get lookAtPoint(): Vec3
    {
        return this._lookAtPoint;
    }

    public set lookAtPoint(value: Vec3)
    {
        this._lookAtPoint = value;

        this.updateView();
    }

    public get upPosition(): Vec3
    {
        return this._upPosition;
    }

    public set upPosition(value: Vec3)
    {
        this._upPosition = value;

        this.updateView();
    }
// end_region: getters and setters

// region: public methods
    public panX(xOffset: number): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x + xOffset, this._eyePosition.y, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this._upPosition = new Vec3(this._eyePosition.x, this._eyePosition.y + 1, this._eyePosition.z);

        this.updateView();
    }

    public panY(yOffset: number): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y + yOffset, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this._upPosition = new Vec3(this._eyePosition.x, this._eyePosition.y + 1, this._eyePosition.z);

        this.updateView();
    }

    public zoomIn(zOffset: number = 0.01): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this._upPosition = new Vec3(this._eyePosition.x, this._eyePosition.y + 1, this._eyePosition.z);

        this.updateView();
    }

    public zoomOut(zOffset: number = 0.01): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z + zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);
        this._upPosition = new Vec3(this._eyePosition.x, this._eyePosition.y + 1, this._eyePosition.z);

        this.updateView();
    }
// end_region: public methods

// region: private methods
    private updateView()
    {
        this._viewMatrix.setLookAt(this.eyePosition.x, this.eyePosition.y, this.eyePosition.z,
            this.lookAtPoint.x, this.lookAtPoint.y, this.lookAtPoint.z,
            this.upPosition.x, this.upPosition.y, this.upPosition.z);

        this.updateViewProjectionMatrix();
    }

    private updatePerspective()
    {
        this._projectionMatrix.setPerspective(this._fieldOfView, this._aspectRatio, this._near, this._far);

        this.updateViewProjectionMatrix();
    }

    private updateViewProjectionMatrix()
    {
        this._vpMatrix = this._projectionMatrix.multiply(this.viewMatrix);
    }
// end_region: private methods
}