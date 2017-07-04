export class ContextWrangler
{
    public static getContext (canvas: HTMLCanvasElement): WebGLRenderingContext
    {
        let gl: WebGLRenderingContext | null;

        const isIE = /*@cc_on!@*/false || !!(document as any).documentMode;
        const isEdge = !isIE && !!(window as any).StyleMedia;
        const contextName = (isIE || isEdge) ? "experimental-webgl" : "webgl";
        console.log(contextName);

        try
        {
            gl = canvas.getContext(contextName,
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

        if (gl === null)
        {
            const msg = `Error creating WebGL Context!, gl === null`;
            throw Error(msg);
        }

        return gl;
    }
}