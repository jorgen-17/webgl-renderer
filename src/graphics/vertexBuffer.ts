import { Float32Vector } from "../utils/vector"

export class VertexBuffer
{
    renderMode: number;
    verticies: Float32Vector;

    constructor(renderMode: number, vertexArray: Float32Array, gl: WebGLRenderingContext)
    {
        if(this.renderModeValidator(renderMode, gl))
        {
            this.renderMode = renderMode;
            this.verticies = new Float32Vector(vertexArray);
        }
        else
        {
            throw Error("Cannot initialize vertex buffer of unrecognized gl render mode");
        }
    }

    private renderModeValidator(renderMode: number, gl: WebGLRenderingContext): boolean
    {
        switch(renderMode)
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