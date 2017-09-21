import { cuid } from "cuid";
import { Vec3 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { StringDictionary } from "../../utils/dictionary";
import { Shape } from "./shape";

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
        // populate verticies
        // this._colorVerticies.addArray(shape.)

        return id;
    }

    public removeShape(id: string): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            delete this._shapes[id];
            return true;
        }

        return false;
    }

    public updatePosition(id: string, newPosition: Vec3): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            delete this._shapes[id];
            return true;
        }

        return false;
    }
}