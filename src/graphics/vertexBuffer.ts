import { Float32Vector } from "../utils/float32Vector";
import { Constants } from "../constants";
import { GlBufferWrapper } from "./glBufferWrapper";

export class VertexBuffer extends GlBufferWrapper
{
    public glRenderMode: number;
    public verticiesStack: Array<Float32Vector>;
    private _vectorSizeLimit: number;

    private _topVertexVector: Float32Vector;
    constructor(glRenderMode: number, gl: WebGLRenderingContext,
        vectorSizeLimit: number = 0)
    {
        super(gl);

        if (this.glRenderModeValidator(glRenderMode, gl))
        {
            this.glRenderMode = glRenderMode;
            this._vectorSizeLimit = vectorSizeLimit;
            let initialVector = this._vectorSizeLimit ?
                new Float32Vector(new Float32Array(0), this._vectorSizeLimit) :
                new Float32Vector(new Float32Array(0));
            this._topVertexVector = initialVector;
            this.verticiesStack = new Array<Float32Vector>();
            this.verticiesStack.push(this._topVertexVector);
        }
        else
        {
            throw "cannot initialize vertex buffer of unrecognized gl render mode";
        }
    }

    public addVertex(vertex: Float32Array)
    {
        if (vertex.length !== Constants.floatsPerPositionColor)
        {
            throw `cannot add vertex repersented by ${vertex.length} floats, ` +
                `we only accept verticies of ${Constants.floatsPerPositionColor} floats (x, y, z, r, g, b)`;
        }

        if (!this._vectorSizeLimit || (this._topVertexVector.size + vertex.length <= this._vectorSizeLimit))
        {
            this._topVertexVector.addArray(vertex);
        }
        else
        {
            this._topVertexVector = new Float32Vector(vertex, this._vectorSizeLimit);
            this.verticiesStack.push(this._topVertexVector);
        }

        this.refreshWebglBuffer();
    }

    private glRenderModeValidator(glRenderMode: number, gl: WebGLRenderingContext): boolean
    {
        switch (glRenderMode)
        {
            case gl.POINTS:
                return true;
            case gl.LINES:
                return true;
            case gl.LINE_STRIP:
                return true;
            case gl.LINE_LOOP:
                return true;
            case gl.TRIANGLES:
                return true;
            case gl.TRIANGLE_STRIP:
                return true;
            case gl.TRIANGLE_FAN:
                return true;
        }
        return false;
    }
}