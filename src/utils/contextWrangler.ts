export class ContextWrangler
{
    public static getContext (canvas: HTMLCanvasElement): WebGLRenderingContext
    {
        let gl: WebGLRenderingContext | null;
        try
        {
            gl = canvas.getContext("webgl",
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });

        }
        catch (e)
        {
            const msg = `Error creating WebGL Context!: ${e.toString()}`;
            throw Error(msg);
        }

        if(gl === null)
        {
            const msg = `Error creating WebGL Context!`;
            throw Error(msg);
        }

        return gl;
    }
}