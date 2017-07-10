import { Float32Vector } from "../utils/vector";
import { Settings } from "../settings";

export class VertexBuffer
{
    public renderMode: number;
    public verticiesStack: Array<Float32Vector>;
    private _topVertexVector: Float32Vector;
    constructor(renderMode: number, gl: WebGLRenderingContext)
    {
        if (this.renderModeValidator(renderMode, gl))
        {
            this.renderMode = renderMode;
            this._topVertexVector = new Float32Vector();
            this.verticiesStack = new Array<Float32Vector>();
            this.verticiesStack.push(this._topVertexVector);
        }
        else
        {
            throw Error("Cannot initialize vertex buffer of unrecognized gl render mode");
        }
    }

    public addVertex(vertex: Float32Array)
    {
        if (vertex.length !== Settings.floatsPerVertex)
        {
            throw `cannot add vertex repersented by ${vertex.length} floats, ` +
                `we only accept verticies of ${Settings.floatsPerVertex} floats (x, y, z, r, g, b)`;
        }

        if (this._topVertexVector.size + vertex.length < Settings.vertexBufferFloatLimit)
        {
            this._topVertexVector.addArray(vertex);
        }
        else
        {
            this._topVertexVector = new Float32Vector(vertex);
            this.verticiesStack.push(this._topVertexVector);
        }
    }

    private renderModeValidator(renderMode: number, gl: WebGLRenderingContext): boolean
    {
        switch (renderMode)
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