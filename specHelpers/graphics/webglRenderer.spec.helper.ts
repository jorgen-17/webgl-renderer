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
            (x: number, y: number, width: number, height: number) => { /* noop */ });

        // create shader
        gl.setup(x => x.createShader).is((type: number) => null);
        gl.setup(x => x.shaderSource).is((shader: WebGLShader, source: string) => { /* noop */ });
        gl.setup(x => x.compileShader).is((shader: WebGLShader) => { /* noop */ });
        gl.setup(x => x.getShaderParameter).is((shader: WebGLShader, pName: number) => true);

        // init shaders
        const shaderProgram = new Mock<WebGLProgram>();
        gl.setup(x => x.createProgram).is(() => shaderProgram.Object);
        gl.setup(x => x.attachShader).is(
            (program: WebGLProgram, shader: WebGLShader) => { /* noop */});
        gl.setup(x => x.linkProgram).is((shader: WebGLShader) => { /* noop */});
        gl.setup(x => x.getProgramParameter).is((shader: WebGLShader, pName: number) => true);
        gl.setup(x => x.useProgram).is((shader: WebGLShader) => { /* noop */ });

        // drawGlArrays
        gl.setup(x => x.shaderSource).is((shader: WebGLShader, source: string) => 1);
        const webglBuffer = new Mock<WebGLBuffer>();
        gl.setup(x => x.createBuffer).is(() => webglBuffer.Object);
        gl.setup(x => x.bindBuffer).is((target: number, buffer: WebGLBuffer) => { /* noop */ });
        gl.setup(x => x.bufferData).is(
            (target: number, size: number | ArrayBufferView | ArrayBuffer, usage: number) => {/* noop */});
        gl.setup(x => x.vertexAttribPointer).is(
            (index: number, size: number, type: number, normalized: boolean,
            stride: number, offset: number) => { /* noop */ });
        gl.setup(x => x.enableVertexAttribArray).is((index: number) => { /* noop */ });
        gl.setup(x => x.uniformMatrix4fv).is(
            (uniformLocation: WebGLUniformLocation, transpose: boolean,
            value: Float32Array | number[]) => { /* noop */ });
        gl.setup(x => x.drawArrays).is((mode: number, first: number, count: number) => { /* noop */ });
    }
}