import * as TypeMoq from "typemoq";
import { Mock } from "ts-mocks";

export class WebglRendererTestHelper
{
    public static setupGlMockFunctions (gl: Mock<WebGLRenderingContext>): void
    {
        // vertex buffer constants
        gl.setup(x => x.POINTS).is(0x0000);
        gl.setup(x => x.LINES).is(0x0001);
        gl.setup(x => x.LINE_LOOP).is(0x0002);
        gl.setup(x => x.LINE_STRIP).is(0x0003);
        gl.setup(x => x.TRIANGLES).is(0x0004);
        gl.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        gl.setup(x => x.TRIANGLE_FAN).is(0x0006);

        // shader constants
        gl.setup(x => x.FRAGMENT_SHADER).is(0x8B30);
        gl.setup(x => x.VERTEX_SHADER).is(0x8B31); // cutie patootie);
        gl.setup(x => x.COMPILE_STATUS).is(0x8B82);
        gl.setup(x => x.LINK_STATUS).is(0x8B82);
        gl.setup(x => x.ARRAY_BUFFER).is(0x8892);
        gl.setup(x => x.STATIC_DRAW).is(0x88E4);
        gl.setup(x => x.FLOAT).is(0x1406);

        // init viewport
        gl.setup(x => x.viewport).is(
            (x: number, y: number, width: number, height: number) =>
            { /* do nothing */ });

        // create/init shaders
        // gl.setup(x => x.createShader(TypeMoq.It.isAnyNumber()));
        // gl.setup(x => x.getProgramParameter(TypeMoq.It.isAnyObject(WebGLShader),
        //     TypeMoq.It.isAnyNumber())).is(true);
        // gl.setup(x => x.shaderSource(TypeMoq.It.isAnyObject(WebGLShader),
        //     TypeMoq.It.isAnyString()));
        // gl.setup(x => x.compileShader(TypeMoq.It.isAnyObject(WebGLShader)));
        // gl.setup(x => x.createProgram()).is(new WebGLProgram());
        // gl.setup(x => x.attachShader(TypeMoq.It.isAnyObject(WebGLProgram),
        //     TypeMoq.It.isAnyObject(WebGLShader)));
        // gl.setup(x => x.linkProgram(TypeMoq.It.isAnyObject(WebGLShader)));
        // gl.setup(x => x.useProgram(TypeMoq.It.isAnyObject(WebGLShader)));

        // drawGlArrays
        // gl.setup(x => x.shaderSource(TypeMoq.It.isAnyObject(WebGLShader),
        //     TypeMoq.It.isAnyString())).is(1);
        // gl.setup(x => x.createBuffer()).is(new WebGLBuffer());
        // gl.setup(x => x.bindBuffer(TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isAnyString()));
        // gl.setup(x => x.bufferData(TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()));
        // gl.setup(x => x.vertexAttribPointer(TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isValue<boolean>(false), TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isAnyNumber()));
        // gl.setup(x => x.enableVertexAttribArray(TypeMoq.It.isAnyNumber()));
        // gl.setup(x => x.uniformMatrix4fv(TypeMoq.It.isAnyObject(WebGLUniformLocation),
        //     TypeMoq.It.isValue<boolean>(false), TypeMoq.It.isAny()));
        // gl.setup(x => x.drawArrays(TypeMoq.It.isAnyNumber(),
        //     TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()));
    }
}