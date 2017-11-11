export interface GlBufferWrapper
{

}

export abstract class GlBufferWrapper
{
    protected _glBuffer: WebGLBuffer | null;
    private _gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
        this._glBuffer = this._gl.createBuffer();
    }

    public get glBuffer(): WebGLBuffer | null
    {
        return this._glBuffer;
    }

    public refreshWebglBuffer()
    {
        this._gl.deleteBuffer(this._glBuffer);
        this._glBuffer = this._gl.createBuffer();
    }
}