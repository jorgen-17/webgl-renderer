import { Float32Vector } from "../utils/float32Vector";
import { Settings } from "../settings";

export class VertexBuffer
{
    public glRenderMode: number;
    public verticiesStack: Array<Float32Vector>;
    private _topVertexVector: Float32Vector;
    constructor(glRenderMode: number, gl: WebGLRenderingContext)
    {
        if (this.glRenderModeValidator(glRenderMode, gl))
        {
            this.glRenderMode = glRenderMode;
            this._topVertexVector = new Float32Vector(new Float32Array(0), Settings.vertexBufferFloatLimit);
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
        if (vertex.length !== Settings.floatsPerVertex)
        {
            throw `cannot add vertex repersented by ${vertex.length} floats, ` +
                `we only accept verticies of ${Settings.floatsPerVertex} floats (x, y, z, r, g, b)`;
        }

        if (this._topVertexVector.size + vertex.length <= Settings.vertexBufferFloatLimit)
        {
            this._topVertexVector.addArray(vertex);
        }
        else
        {
            this._topVertexVector = new Float32Vector(vertex, Settings.vertexBufferFloatLimit);
            this.verticiesStack.push(this._topVertexVector);
        }
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