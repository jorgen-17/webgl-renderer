import { Mat4, Vec3 } from "cuon-matrix-ts";
import { Settings } from "../settings";
import { Constants } from "../constants";

export class Camera
{
    //#region: instance variables
    private readonly _worldUp: Vec3 = new Vec3(0, 1, 0);

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
        upPosition: Vec3 = Settings.defaultUpPosition)
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
    //#endregion: getters and setters

    //#region: public methods
    public panX(xOffset: number): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x + xOffset, this._eyePosition.y, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public panY(yOffset: number): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y + yOffset, this._eyePosition.z);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public zoomIn(zOffset: number = 0.01): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public zoomOut(zOffset: number = 0.01): void
    {
        this._eyePosition = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z + zOffset);
        this._lookAtPoint = new Vec3(this._eyePosition.x, this._eyePosition.y, this._eyePosition.z - 1);

        this.updateView();
    }

    public moveForward(moveAmount: number = 0.01): void
    {
        const direction = Vec3.scale(this.forward, moveAmount);

        this._eyePosition.add(direction);
        this._lookAtPoint.add(direction);

        this.updateView();
    }

    public moveBackward(moveAmount: number = 0.01): void
    {
        this.moveForward(-moveAmount);
    }

    public moveLeft(moveAmount: number = 0.01): void
    {
        this.moveRight(-moveAmount);
    }

    public moveRight(moveAmount: number = 0.01): void
    {
        const rightMovement = Vec3.scale(this.right, moveAmount);

        this._eyePosition.add(rightMovement);
        this._lookAtPoint.add(rightMovement);

        this.updateView();
    }

    public moveUp(moveAmount: number = 0.01): void
    {
        this._eyePosition.y += moveAmount;
        this._lookAtPoint.y += moveAmount;

        this.updateView();
    }

    public moveDown(moveAmount: number = 0.01): void
    {
        this.moveUp(-moveAmount);
    }

    // Helper method for cross product calculation
    private crossProduct(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    // Helper method to normalize a vector
    private normalize(v: Vec3): Vec3 {
        const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        if (length === 0) return new Vec3(0, 1, 0); // fallback to world up
        return new Vec3(v.x / length, v.y / length, v.z / length);
    }

    public reset(): void
    {
        this._eyePosition = this._initialEyePosition;
        this._lookAtPoint = this._initialLookAtPoint;
        this._upPosition = this._initialUpPosition;

        this.updateView();
    }

    // need to add this to cuon-matrix-ts
    private rotateVector(vector, angle, axis) : Vec3 {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let x = vector.x, y = vector.y, z = vector.z;

      switch (axis) {
        case 'x':
          y = vector.y * cos - vector.z * sin;
          z = vector.y * sin + vector.z * cos;
          break;
        case 'y':
          x = vector.x * cos + vector.z * sin;
          z = -vector.x * sin + vector.z * cos;
          break;
        case 'z':
          x = vector.x * cos - vector.y * sin;
          y = vector.x * sin + vector.y * cos;
          break;
        default:
          console.log('Invalid axis. Use "x", "y", or "z".');
      }

      return new Vec3(x, y, z);
    }

    public rotateView(xOffset: number, yOffset: number): void {
        // Convert to radians
        const xRadians = xOffset * (Math.PI / 180);
        const yRadians = yOffset * (Math.PI / 180);

        // Calculate current view direction vector (normalized)
        const viewDir = this.normalize(new Vec3(
            this._lookAtPoint.x - this._eyePosition.x,
            this._lookAtPoint.y - this._eyePosition.y,
            this._lookAtPoint.z - this._eyePosition.z
        ));

        // Calculate the camera's local right vector (perpendicular to view direction and world up)
        const rightVector = this.normalize(this.crossProduct(viewDir, this._worldUp));

        // Calculate the camera's local up vector (perpendicular to right and view direction)
        const upVector = this.normalize(this.crossProduct(rightVector, viewDir));

        // Rotate around world Y-axis for horizontal rotation (yaw)
        let rotatedDirection = this.rotateAroundAxis(viewDir, upVector, xRadians);

        // Rotate around camera's local right vector for vertical rotation (pitch)
        rotatedDirection = this.rotateAroundAxis(rotatedDirection, rightVector, yRadians);

        // Calculate new lookAt point = eye + rotated direction
        this._lookAtPoint = new Vec3(
            this._eyePosition.x + rotatedDirection.x,
            this._eyePosition.y + rotatedDirection.y,
            this._eyePosition.z + rotatedDirection.z
        );

        this.updateView();
    }

    // Helper method to rotate a vector around an arbitrary axis
    private rotateAroundAxis(vector: Vec3, axis: Vec3, angle: number): Vec3 {
        // Rodrigues' rotation formula
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Ensure axis is normalized
        const normalizedAxis = this.normalize(axis);

        // Calculate cross product and dot product
        const crossProduct = this.crossProduct(normalizedAxis, vector);
        const dotProduct = normalizedAxis.x * vector.x + normalizedAxis.y * vector.y + normalizedAxis.z * vector.z;

        // Apply Rodrigues' formula: v*cos(θ) + (k×v)*sin(θ) + k*(k·v)*(1-cos(θ))
        return new Vec3(
            vector.x * cos + crossProduct.x * sin + normalizedAxis.x * dotProduct * (1 - cos),
            vector.y * cos + crossProduct.y * sin + normalizedAxis.y * dotProduct * (1 - cos),
            vector.z * cos + crossProduct.z * sin + normalizedAxis.z * dotProduct * (1 - cos)
        );
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