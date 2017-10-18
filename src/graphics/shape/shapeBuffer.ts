//#region imports
import * as cuid from "cuid";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../../utils/float32Vector";
import { StringDictionary } from "../../utils/dictionary";
import { Settings } from "../../settings";
import { Constants } from "../../constants";
import { RGBColor } from "../color/rgbColor";
import { Shape } from "./shape";
import { GlBufferWrapper } from "../glBufferWrapper";

export class ShapeBuffer<S extends Shape> extends GlBufferWrapper
{
    protected _verticies: Float32Vector;
    protected _trimmedArray: Float32Array;
    protected _shapes: StringDictionary<{shape: S, index: number}>;

    constructor(gl: WebGLRenderingContext)
    {
        super(gl);

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
        const id = this.introduceShape(shape);
        this._trimmedArray = this._verticies.getTrimmedArray();
        this.refreshWebglBuffer();

        return id;
    }

    public addShapes(shapes: Array<S>): Array<string>
    {
        let ids = new Array<string>();

        if (shapes.length < 1)
        {
            return ids;
        }

        const exampleShape = shapes[0];
        const numberOfFloatsPerShape = exampleShape.numberOfVerticies * exampleShape.numberOfFloatsPerVertex;
        const numberOfFloatsBeingAdded = numberOfFloatsPerShape * shapes.length;
        this._verticies.resize(numberOfFloatsBeingAdded);

        for (let i = 0; i < shapes.length; i++)
        {
            const shape = shapes[i];
            const id = this.introduceShape(shape);
            ids[i] = id;
        }

        this._trimmedArray = this._verticies.getTrimmedArray();
        this.refreshWebglBuffer();

        return ids;
    }

    public removeShape(id: string): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;

            this._verticies.remove(verticiesIndex, verticiesCount);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();

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

            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;

            this._verticies.overwrite(verticiesIndex, shape.verticies);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();

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

    private introduceShape(shape: S): string
    {
        const id = cuid();
        const index = this.count;
        this._shapes[id] = {shape, index};

        this._verticies.addArray(shape.verticies);

        return id;
    }
}