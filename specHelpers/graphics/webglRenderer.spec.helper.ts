import * as TypeMoq from "typemoq";

export class WebglRendererTestHelper
{
    public static setupGlMockFunctions (gl: TypeMoq.IMock<WebGLRenderingContext>): void
    {
        gl.setup(x => x.TRIANGLES).returns(() => 0x0004);
        gl.setup(x => x.TRIANGLE_STRIP).returns(() => 0x0005);
        gl.setup(x => x.TRIANGLE_FAN).returns(() => 0x0006);
        gl.setup(x => x.LINK_STATUS).returns(() => 0x8B82);

        gl.setup(x => x.viewport(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber(),
            TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()));
        gl.setup(x => x.createProgram()).returns(() => new WebGLProgram());
        gl.setup(x => x.attachShader(TypeMoq.It.isAnyObject(WebGLProgram),
            TypeMoq.It.isAnyObject(WebGLShader)));
        gl.setup(x => x.linkProgram(TypeMoq.It.isAnyObject(WebGLShader)));
        gl.setup(x => x.getProgramParameter(TypeMoq.It.isAnyObject(WebGLShader),
            TypeMoq.It.isAnyNumber())).returns(() => true);
        gl.setup(x => x.useProgram(TypeMoq.It.isAnyObject(WebGLShader)));
    }
}