import { Vec3 } from "cuon-matrix-ts";

import { DynamicShape } from "../dynamicShape";
import { Float32Vector } from "../../../utils/float32Vector";
import { BoundingRectangle } from "../boundingRectangle";
import { RGBColor } from "../../color/rgbColor";
import { Constants } from "../../../constants";
import { ShapeMode } from "../shapeMode";

export class Box extends DynamicShape
{
    private static readonly numberOfVerticies = 36;
    public shapeMode: ShapeMode = ShapeMode.box;
    private _backFaceZ: number;

    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor)
    {
        super(Box.numberOfVerticies, point1, point2, rgbColor);

        const length = this._boundingRect.topRight.x - this._boundingRect.topLeft.x;
        const height = this._boundingRect.topRight.y - this._boundingRect.bottomRight.y;
        const depth = Math.min(length, height);
        this._backFaceZ = this._boundingRect.bottomLeft.z + depth;

        this.computeVerticies();

        this.glRenderMode = gl.TRIANGLES;
    }
    protected computeVerticies(): void
    {
        let insertionIndex = 0;

        // front face
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.topLeft,
            this._boundingRect.topRight, this._boundingRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, this._boundingRect.bottomLeft,
            this._boundingRect.topRight, this._boundingRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // right face
        const rightFaceRect = new BoundingRectangle(this._boundingRect.topRight,
            new Vec3(this._boundingRect.bottomRight.x, this._boundingRect.bottomRight.y, this._backFaceZ));
        this.addTriangleToVerticies(insertionIndex, rightFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, rightFaceRect.bottomLeft,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // left face
        const leftFaceRect = new BoundingRectangle(this._boundingRect.topLeft,
            new Vec3(this._boundingRect.bottomLeft.x, this._boundingRect.bottomLeft.y, this._backFaceZ));
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topLeft,
            leftFaceRect.topRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomLeft,
            leftFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // back face
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.topRight, rightFaceRect.bottomRight);
        insertionIndex += Constants.floatsPerTriangle;

        // top face
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topRight,
            rightFaceRect.topRight, leftFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.topLeft,
            rightFaceRect.topRight, rightFaceRect.topLeft);
        insertionIndex += Constants.floatsPerTriangle;

        // bottom face
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomRight,
            rightFaceRect.bottomRight, leftFaceRect.bottomLeft);
        insertionIndex += Constants.floatsPerTriangle;
        this.addTriangleToVerticies(insertionIndex, leftFaceRect.bottomLeft,
            rightFaceRect.bottomRight, rightFaceRect.bottomLeft);
    }
}