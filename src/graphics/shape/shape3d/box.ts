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

        const length = this.boundingRect.topRight.x - this.boundingRect.topLeft.x;
        const height = this.boundingRect.topRight.y - this.boundingRect.bottomRight.y;
        const depth = Math.min(length, height);
        this._backFaceZ = this.boundingRect.bottomLeft.z + depth;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }
    protected computeVerticies(): void
    {
        let array = new Float32Array(Box.numberOfVerticies * Constants.floatsPerVertex);

        let insertionIndex = 0;

        // front face
        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.topLeft,
            this.boundingRect.topRight, this.boundingRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, this.boundingRect.bottomLeft,
            this.boundingRect.topRight, this.boundingRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // right face
        const rightFaceRect = new BoundingRectangle(this.boundingRect.topRight,
            new Vec3(this.boundingRect.bottomRight.x,this.boundingRect.bottomRight.y, this._backFaceZ));
        this.addTriangleToFloat32Array(array, insertionIndex, rightFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, rightFaceRect.bottomLeft,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // left face
        const leftFaceRect = new BoundingRectangle(this.boundingRect.topLeft,
            new Vec3(this.boundingRect.bottomLeft.x,this.boundingRect.bottomLeft.y, this._backFaceZ));
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.topLeft,
            leftFaceRect.topRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.bottomLeft,
            leftFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // back face
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // top face
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;

        // bottom face
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.bottomRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToFloat32Array(array, insertionIndex, leftFaceRect.bottomLeft,
            rightFaceRect.bottomRight, rightFaceRect.bottomLeft);

        this._verticies = new Float32Vector(array, array.length);
    }
}