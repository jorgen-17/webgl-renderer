export type RenderMode = "points" |
                         "lines" |
                         "lineStrip" |
                         "lineLoop" |
                         "triangles" |
                         "triangleStrip" |
                         "triangleFan";

export class RenderModeMapper
{
    public static renderModeToWebGlConstant (mode: RenderMode, gl: WebGLRenderingContext): number
    {
        switch (mode) {
            case "points":
                return gl.POINTS;
            case "lines":
                return gl.LINES;
            case "lineStrip":
                return gl.LINE_STRIP;
            case "lineLoop":
                return gl.LINE_LOOP;
            case "triangles":
                return gl.TRIANGLES;
            case "triangleStrip":
                return gl.TRIANGLE_STRIP;
            case "triangleFan":
                return gl.TRIANGLE_FAN;
            default: throw Error(`could not find renderMode named ${mode}`);
        }
    }
}