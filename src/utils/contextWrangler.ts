import { BrowserHelper } from "./browserHelper";

export class ContextWrangler
{
    public static getContext (canvas: HTMLCanvasElement,
            browserHelper: BrowserHelper = new BrowserHelper()): WebGLRenderingContext
    {
        let gl: WebGLRenderingContext | null;

        const isIE = browserHelper.isIE();
        const isEdge = browserHelper.isEdge();
        const contextId = (isIE || isEdge) ? "experimental-webgl" : "webgl";

        try
        {
            gl = canvas.getContext(contextId,
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });

        }
        catch (e)
        {
            throw `error creating webgl context!: ${e.toString()}`;
        }

        if (gl === null)
        {
            throw `error creating webgl context!, gl === null`;
        }

        return gl;
    }
}