import * as cuid from "cuid";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { StringDictionary } from "../../utils/dictionary";
import { Shape } from "./shape";
import { Settings } from "../../settings";
import { Constants } from "../../constants";
import { RGBColor } from "../color/rgbColor";

export class ShapeBuffer<S extends Shape>
{
    private _verticies: Float32Vector;
    private _trimmedArray: Float32Array;
    private _shapes: StringDictionary<{shape: S, index: number}>;
    private _protoShape: S;

    constructor()
    {
        this._verticies = new Float32Vector();
        this._trimmedArray = new Float32Array(0);
        this._shapes = {};
    }

    public get verticies(): Float32Array
    {
        return this._trimmedArray;
    }

    public get count(): number
    {
        return Object.keys(this._shapes).length;
    }

    public get first(): S
    {
        const firstKey = Object.keys(this._shapes)[0];
        return this._shapes[firstKey].shape;
    }

    public addShape(shape: S): string
    {
        const id = cuid();
        const index = this.count;
        this._shapes[id] = {shape, index};

        this._verticies.addArray(shape.verticies);
        this._trimmedArray = this._verticies.getTrimmedArray();

        return id;
    }

    public removeShape(id: string): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            const verticiesCount = shape.numberOfVerticies * Constants.floatsPerVertex;
            const verticiesIndex = index * verticiesCount;

            this._verticies.remove(verticiesIndex, verticiesCount);
            this._trimmedArray = this._verticies.getTrimmedArray();

            this.reorderIndicies(index);

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

            shape.rgbColor = newColor;

            const verticiesCount = shape.numberOfVerticies * Constants.floatsPerVertex;
            const verticiesIndex = index * verticiesCount;

            this._verticies.overwrite(verticiesIndex, shape.verticies);
            this._trimmedArray = this._verticies.getTrimmedArray();

            return true;
        }

        return false;
    }

    private reorderIndicies(deletedIndex: number) {
        for (let key of Object.keys(this._shapes))
        {
            if (this._shapes[key].index > deletedIndex)
            {
                this._shapes[key].index--;
            }
        }
    }
}