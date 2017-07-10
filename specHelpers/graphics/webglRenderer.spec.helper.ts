import { Mock } from "ts-mocks";
import { StringDictionary } from "../../src/utils/dictionary";
import { ClassHelper } from "../../src/utils/classHelper";

export class WebglRendererTestHelper
{
    public static setupGlMockFunctions (glMock: Mock<WebGLRenderingContext>):
        StringDictionary<jasmine.Spy>
    {
        const gl = glMock.Object;
        let spyDictionary = {};

        // vertex buffer constants
        glMock.setup(x => x.POINTS).is(0x0000);
        glMock.setup(x => x.LINES).is(0x0001);
        glMock.setup(x => x.LINE_LOOP).is(0x0002);
        glMock.setup(x => x.LINE_STRIP).is(0x0003);
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        glMock.setup(x => x.TRIANGLE_FAN).is(0x0006);

        // shader constants
        glMock.setup(x => x.FRAGMENT_SHADER).is(0x8B30);
        glMock.setup(x => x.VERTEX_SHADER).is(0x8B31); // cutie patootie);
        glMock.setup(x => x.COMPILE_STATUS).is(0x8B82);
        glMock.setup(x => x.LINK_STATUS).is(0x8B82);

        // draw constants
        glMock.setup(x => x.COLOR_BUFFER_BIT).is(0x8892);
        glMock.setup(x => x.ARRAY_BUFFER).is(0x8892);
        glMock.setup(x => x.STATIC_DRAW).is(0x88E4);
        glMock.setup(x => x.FLOAT).is(0x1406);

        // init viewport
        const viewportName = ClassHelper.getMethodName(() => gl.viewport);
        spyDictionary[viewportName] = glMock.setup(x => x.viewport).is(
            (x: number, y: number, width: number, height: number) => { /* noop */ });

        // create shader
        const createShaderName = ClassHelper.getMethodName(() => gl.createShader);
        const shaderSourceName = ClassHelper.getMethodName(() => gl.shaderSource);
        const compileShaderName = ClassHelper.getMethodName(() => gl.compileShader);
        const getShaderParameterName = ClassHelper.getMethodName(() => gl.getShaderParameter);
        spyDictionary[createShaderName] = glMock.setup(x => x.createShader)
            .is((type: number) => null).Spy;
        spyDictionary[shaderSourceName] = glMock.setup(x => x.shaderSource)
            .is((shader: WebGLShader, source: string) => { /* noop */ }).Spy;
        spyDictionary[compileShaderName] = glMock.setup(x => x.compileShader)
            .is((shader: WebGLShader) => { /* noop */ }).Spy;
        spyDictionary[getShaderParameterName] = glMock.setup(x => x.getShaderParameter)
            .is((shader: WebGLShader, pName: number) => true).Spy;

        // init shaders
        const createProgramName = ClassHelper.getMethodName(() => gl.createProgram);
        const attatchShaderName = ClassHelper.getMethodName(() => gl.attachShader);
        const linkProgramtName = ClassHelper.getMethodName(() => gl.linkProgram);
        const getProgramParameterName = ClassHelper.getMethodName(() => gl.getProgramParameter);
        const useProgramName = ClassHelper.getMethodName(() => gl.useProgram);
        const shaderProgram = new Mock<WebGLProgram>();
        spyDictionary[createProgramName] = glMock.setup(x => x.createProgram)
            .is(() => shaderProgram.Object).Spy;
        spyDictionary[attatchShaderName] = glMock.setup(x => x.attachShader)
            .is((program: WebGLProgram, shader: WebGLShader) => { /* noop */}).Spy;
        spyDictionary[linkProgramtName] = glMock.setup(x => x.linkProgram)
            .is((shader: WebGLShader) => { /* noop */}).Spy;
        spyDictionary[getProgramParameterName] = glMock.setup(x => x.getProgramParameter)
            .is((shader: WebGLShader, pName: number) => true).Spy;
        spyDictionary[useProgramName] = glMock.setup(x => x.useProgram)
            .is((shader: WebGLShader) => { /* noop */ }).Spy;

        // draw
        const clearColorName = ClassHelper.getMethodName(() => gl.clearColor);
        const clearName = ClassHelper.getMethodName(() => gl.clear);
        spyDictionary[clearColorName] = glMock.setup(x => x.clearColor)
            .is((red: number, green: number, blue: number, alpha: number) => { /* noop */ }).Spy;
        spyDictionary[clearName] = glMock.setup(x => x.clear)
            .is((mask: number) => { /* noop */ }).Spy;


        // drawGlArrays
        const getAttribLocationName = ClassHelper.getMethodName(() => gl.getAttribLocation);
        const getUniformLocationName = ClassHelper.getMethodName(() => gl.getUniformLocation);
        const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
        const createBufferName = ClassHelper.getMethodName(() => gl.createBuffer);
        const bindBufferName = ClassHelper.getMethodName(() => gl.bindBuffer);
        const vertexAttribPointerName = ClassHelper.getMethodName(() => gl.vertexAttribPointer);
        const enableVertexAttribArrayName = ClassHelper.getMethodName(() => gl.enableVertexAttribArray);
        const uniformMatrix4fvName = ClassHelper.getMethodName(() => gl.uniformMatrix4fv);
        const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
        spyDictionary[getAttribLocationName] = glMock.setup(x => x.getAttribLocation)
            .is((shader: WebGLShader, name: string) => 1).Spy;
        spyDictionary[getUniformLocationName] = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) => 1).Spy;
        spyDictionary[bufferDataName] = glMock.setup(x => x.bufferData)
            .is(
                (target: number, size: number | ArrayBufferView | ArrayBuffer, usage: number) =>
                {/* noop */}
            ).Spy;
        const webglBuffer = new Mock<WebGLBuffer>();
        spyDictionary[createBufferName] = glMock.setup(x => x.createBuffer)
            .is(() => webglBuffer.Object).Spy;
        spyDictionary[bindBufferName] = glMock.setup(x => x.bindBuffer)
            .is((target: number, buffer: WebGLBuffer) => { /* noop */ }).Spy;
        spyDictionary[vertexAttribPointerName] = glMock.setup(x => x.vertexAttribPointer)
            .is(
                (index: number, size: number, type: number, normalized: boolean,
                stride: number, offset: number) =>
                { /* noop */ }
            ).Spy;
        spyDictionary[enableVertexAttribArrayName] = glMock.setup(x => x.enableVertexAttribArray)
            .is((index: number) => { /* noop */ }).Spy;
        spyDictionary[uniformMatrix4fvName] = glMock.setup(x => x.uniformMatrix4fv)
            .is(
                (uniformLocation: WebGLUniformLocation, transpose: boolean,
                value: Float32Array | number[]) =>
                { /* noop */ }).Spy;
        spyDictionary[drawArraysName] = glMock.setup(x => x.drawArrays)
            .is((mode: number, first: number, count: number) => { /* noop */ }).Spy;

        return spyDictionary;
    }
}