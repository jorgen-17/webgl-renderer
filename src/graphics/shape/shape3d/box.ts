import { Vec3 } from "cuon-matrix-ts";

import { Shape } from "../shape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";

export class Box extends Shape
{
    private static readonly numberOfVerticies: number = 36;
    private _backFaceZ: number;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(rgbColor, point1, point2);

        const length = this._boundingRect.topRight.x - this._boundingRect.topLeft.x;
        const height = this._boundingRect.topRight.y - this._boundingRect.bottomRight.y;
        const depth = Math.min(length, height);
        this._backFaceZ = this._boundingRect.bottomLeft.z + depth;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
        this.shapeMode = "box";
    }
    protected computeVerticies(): void
    {
        let array = new Float32Array(Box.numberOfVerticies * Constants.floatsPerPoint);

        let insertionIndex = 0;

        // front face
        this.addTriangleToPositions(insertionIndex, this._boundingRect.topLeft,
            this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, this._boundingRect.bottomLeft,
            this._boundingRect.topRight, this._boundingRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // right face
        const rightFaceRect = new BoundingRectangle(this._boundingRect.topRight,
            new Vec3(this._boundingRect.bottomRight.x, this._boundingRect.bottomRight.y, this._backFaceZ));
        this.addTriangleToPositions(insertionIndex, rightFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, rightFaceRect.bottomLeft,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // left face
        const leftFaceRect = new BoundingRectangle(this._boundingRect.topLeft,
            new Vec3(this._boundingRect.bottomLeft.x, this._boundingRect.bottomLeft.y, this._backFaceZ));
        this.addTriangleToPositions(insertionIndex, leftFaceRect.topLeft,
            leftFaceRect.topRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, leftFaceRect.bottomLeft,
            leftFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // back face
        this.addTriangleToPositions(insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // top face
        this.addTriangleToPositions(insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, leftFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;

        // bottom face
        this.addTriangleToPositions(insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.bottomRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToPositions(insertionIndex, leftFaceRect.bottomLeft,
            rightFaceRect.bottomRight, rightFaceRect.bottomLeft);

        this._positions = new Float32Vector(array, array.length);
    }
}