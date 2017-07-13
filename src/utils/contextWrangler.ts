import { BrowserHelper } from "./browserHelper";

export class ContextWrangler
{
    public static getContext (canvas: HTMLCanvasElement,
            browserHelper: BrowserHelper = new BrowserHelper()): WebGLRenderingContext
    {
        let gl: WebGLRenderingContext | null;

        const isIE = browserHelper.isIE();
        const isEdge = browserHelper.isEdge();
        const contextName = (isIE || isEdge) ? "experimental-webgl" : "webgl";

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