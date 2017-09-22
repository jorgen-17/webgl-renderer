import { cuid } from "cuid";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { StringDictionary } from "../../utils/dictionary";
import { Shape } from "./shape";
import { Settings } from "../../settings";
import { Constants } from "../../constants";
import { RGBColor } from "../color/rgbColor";

export class ShapeBuffer<S extends Shape>
{
    private _positionVerticies: Float32Vector;
    private _colorVerticies: Float32Vector;
    private _modelMatrixVerticies: Float32Vector;
    private _shapes: StringDictionary<{shape: S, index: number}>;

    constructor()
    {
        this._positionVerticies = new Float32Vector();
        this._colorVerticies = new Float32Vector();
        this._modelMatrixVerticies = new Float32Vector();
        this._shapes = {};
    }

    public addShape(shape: S): string
    {
        const id = cuid();
        const index = Object.keys(this._shapes).length;
        this._shapes[id] = {shape, index};

        this._positionVerticies.addArray(shape.positions)
        this._colorVerticies.addArray([
            shape.rgbColor.red,
            shape.rgbColor.green,
            shape.rgbColor.blue
        ]);
        this._modelMatrixVerticies.addArray(shape.modelMatrix.elements);

        return id;
    }

    public removeShape(id: string): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            const positionCount = shape.numberOfPositionVerticies * Constants.floatsPerPoint;
            const positionIndex = index * positionCount;
            this._positionVerticies.remove(positionIndex, positionCount);
            const colorIndex = index * Constants.floatsPerColor;
            this._colorVerticies.remove(colorIndex, Constants.floatsPerColor);
            const modelMatrixIndex = index * Constants.floatsPerMat4;
            this._modelMatrixVerticies.remove(modelMatrixIndex, Constants.floatsPerMat4);

            delete this._shapes[id];

            return true;
        }

        return false;
    }

    public updateColor(id: string, newColor: RGBColor): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            const colorIndex = index * Constants.floatsPerColor;
            this._colorVerticies[colorIndex] = newColor.red;
            this._colorVerticies[colorIndex + 1] = newColor.green;
            this._colorVerticies[colorIndex + 2] = newColor.blue;

            shape.rgbColor = newColor;

            return true;
        }

        return false;
    }
}