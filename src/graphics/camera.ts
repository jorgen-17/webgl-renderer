import { Mat4, Vec3 } from "cuon-matrix-ts";
import { Settings } from "../settings";

export class Camera
{
    //#region: instance variables
    private _movementSpeed: number;
    private _lookSensitivity: number;
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

    private _initialEyePosition: Vec3;
    private _initialLookAtPoint: Vec3;
    private _initialUpPosition: Vec3;

    //#endregion: instance variables

    //#region: constructor
    constructor(aspectRatio: number,
        fieldOfView: number = Settings.defaultFieldOfView,
        near: number = Settings.defaultNear,
        far: number = Settings.defaultFar,
        eyePosition: Vec3 = Settings.defaultEyePosition,
        lookAtPoint: Vec3 = Settings.defaultLookAtPoint,
        upPosition: Vec3 = Settings.defaultUpPosition,
        movementSpeed: number = Settings.defaultMovementSpeed,
        lookSensitivity: number = Settings.defaultLookSensitivity)
    {
        this._viewMatrix = new Mat4();
        this._projectionMatrix = new Mat4();
        this._vpMatrix = new Mat4();

        this._eyePosition = this._initialEyePosition = eyePosition;
        this._lookAtPoint = this._initialLookAtPoint = lookAtPoint;
        this._upPosition = this._initialUpPosition = upPosition;
        this.updateView();

        this._aspectRatio = aspectRatio;
        this._fieldOfView = fieldOfView;
        this._near = near;
        this._far = far;
        this.updatePerspective();

        this._movementSpeed = movementSpeed;
        this._lookSensitivity = lookSensitivity;
    }
    //#endregion: constructor

    //#region: getters and setters
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

    public get up(): Vec3
    {
        return this._upPosition;
    }

    public set up(value: Vec3)
    {
        this._upPosition = value;

        this.updateView();
    }

    public get forward(): Vec3
    {
        return Vec3.normalize(Vec3.sub(this._lookAtPoint, this._eyePosition));
    }

    public get right(): Vec3
    {
        return Vec3.normalize(Vec3.cross(this.forward, this._upPosition));
    }

    public get movementSpeed(): number
    {
        return this._movementSpeed;
    }

    public set movementSpeed(value: number)
    {
        this._movementSpeed = value;
    }

    public get lookSensitivity(): number
    {
        return this._lookSensitivity;
    }

    public set lookSensitivity(value: number)
    {
        this._lookSensitivity = value;
    }
    //#endregion: getters and setters

    //#region: public methods
    public panX(xOffset: number = this._movementSpeed): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x + xOffset, this._eyePosition.y, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public panY(yOffset: number = this._movementSpeed): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y + yOffset, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public zoomIn(zOffset: number = this._movementSpeed): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public zoomOut(zOffset: number = this._movementSpeed): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z + zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public moveForward(moveAmount: number = this._movementSpeed): void
    {
        const direction = Vec3.scale(this.forward, moveAmount);

        this._eyePosition.add(direction);
        this._lookAtPoint.add(direction);

        this.updateView();
    }

    public moveBackward(moveAmount: number = this._movementSpeed): void
    {
        this.moveForward(-moveAmount);
    }

    public moveLeft(moveAmount: number = this._movementSpeed): void
    {
        this.moveRight(-moveAmount);
    }

    public moveRight(moveAmount: number = this._movementSpeed): void
    {
        const rightMovement = Vec3.scale(this.right, moveAmount);

        this._eyePosition.add(rightMovement);
        this._lookAtPoint.add(rightMovement);

        this.updateView();
    }

    public moveUp(moveAmount: number = this._movementSpeed): void
    {
        this._eyePosition.y += moveAmount;
        this._lookAtPoint.y += moveAmount;

        this.updateView();
    }

    public moveDown(moveAmount: number = this._movementSpeed): void
    {
        this.moveUp(-moveAmount);
    }

    public reset(): void
    {
        this._eyePosition = this._initialEyePosition;
        this._lookAtPoint = this._initialLookAtPoint;
        this._upPosition = this._initialUpPosition;

        this.updateView();
    }

    public rotatePitch(yOffset: number): void {
        let yRadians = yOffset * (Math.PI / 180);
        // Clamp view up
        let maxAngleUp = this._upPosition.angle(this._lookAtPoint);
        maxAngleUp -= 0.001; // avoid numerical errors
        if (yRadians > maxAngleUp) yRadians = maxAngleUp;

        // Clamp view down
        let maxAngleDown = Vec3.negate(this._upPosition).angle(this._lookAtPoint);
        maxAngleDown *= -1; // downwards angle is negative
        maxAngleDown += 0.001; // avoid numerical errors
        if (yRadians < maxAngleDown) yRadians = maxAngleDown;

        yRadians *= this._lookSensitivity;

        const rotatedDirection = Vec3.rotate(this.forward, this.right, yRadians);

        this._lookAtPoint = Vec3.add(this._eyePosition, rotatedDirection);

        this.updateView();
    }

    public rotateYaw(xOffset: number): void {
        let xRadians = xOffset * (Math.PI / 180);
        xRadians *= this._lookSensitivity;

        const rotatedDirection = this.forward.rotate(this.up, xRadians);

        this._lookAtPoint = Vec3.add(this._eyePosition, rotatedDirection);

        this.updateView();
    }
    //#endregion: public methods

    //#region: private methods
    private updateView()
    {
        this._viewMatrix.setLookAt(this.eyePosition.x, this.eyePosition.y, this.eyePosition.z,
            this.lookAtPoint.x, this.lookAtPoint.y, this.lookAtPoint.z,
            this.up.x, this.up.y, this.up.z);

        this.updateViewProjectionMatrix();
    }

    private updatePerspective()
    {
        this._projectionMatrix.setPerspective(this._fieldOfView, this._aspectRatio, this._near, this._far);

        this.updateViewProjectionMatrix();
    }

    private updateViewProjectionMatrix()
    {
        this._vpMatrix = new Mat4().setIdentity();
        this._vpMatrix.multiply(this._projectionMatrix);
        this._vpMatrix.multiply(this._viewMatrix);
    }
    //#endregion: private methods
}