export class RenderModeMapper
{
    public static renderModeToWebGlConstant (mode: string, gl: WebGLRenderingContext): number
    {
        switch(mode) {
            case "Points":
                return gl.POINTS;
            case "Lines":
                return gl.LINES;
            case "LineStrip":
                return gl.LINE_STRIP;
            case "LineLoop":
                return gl.LINE_LOOP;
            case "Triangles":
                return gl.TRIANGLES;
            case "TriangleStrip":
                return gl.TRIANGLE_STRIP;
            case "TriangleFan":
                return gl.TRIANGLE_FAN;
            default: throw Error(`could not find renderMode named ${mode}`);
        }
    }
}