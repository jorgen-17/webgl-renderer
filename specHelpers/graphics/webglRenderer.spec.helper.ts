import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { StringDictionary } from "../../src/utils/dictionary";
import { Line } from "../../src/graphics/shape/shape2d/line";
import { Constants } from "../../src/constants";
import { RGBColor } from "../../src/graphics/color/rgbColor";
import { WebGLRenderer } from "../../src/graphics/webglRenderer";
import { RenderMode, RenderModeMapper } from "../../src/graphics/renderModeMapper";
import { Point } from "../../src/graphics/shape/shape2d/point";
import { VertexBuffer } from "../../src/graphics/vertexBuffer";
import { Settings } from "../../src/settings";

export class WebglRendererTestHelper
{
    public static setupGlMockFunctions (glMock: Mock<WebGLRenderingContext>,
        instancedArrayExtension: ANGLE_instanced_arrays)
        : StringDictionary<jasmine.Spy>
    {
        const gl = glMock.Object;
        let spyDictionary: StringDictionary<jasmine.Spy> = {};

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

        // getExtensions
        spyDictionary["getExtension"] = glMock.setup(x => x.getExtension).is(
            (extensionName: string) =>
            {
                if (extensionName === Settings.instancedArrayExtensionName)
                {
                    return instancedArrayExtension;
                }
            }).Spy;


        // init viewport
        spyDictionary["viewport"] = glMock.setup(x => x.viewport).is(
            (x: number, y: number, width: number, height: number) => { /* noop */ }).Spy;

        // create shader
        spyDictionary["createShader"] = glMock.setup(x => x.createShader)
            .is((type: number) => null).Spy;
        spyDictionary["shaderSource"] = glMock.setup(x => x.shaderSource)
            .is((shader: WebGLShader, source: string) => { /* noop */ }).Spy;
        spyDictionary["compileShader"] = glMock.setup(x => x.compileShader)
            .is((shader: WebGLShader) => { /* noop */ }).Spy;
        spyDictionary["getShaderParameter"] = glMock.setup(x => x.getShaderParameter)
            .is((shader: WebGLShader, pName: number) => true).Spy;

        // init shaders
        const shaderProgram = new Mock<WebGLProgram>();
        spyDictionary["createProgram"] = glMock.setup(x => x.createProgram)
            .is(() => shaderProgram.Object).Spy;
        spyDictionary["attatchShader"] = glMock.setup(x => x.attachShader)
            .is((program: WebGLProgram, shader: WebGLShader) => { /* noop */}).Spy;
        spyDictionary["linkProgramt"] = glMock.setup(x => x.linkProgram)
            .is((shader: WebGLShader) => { /* noop */}).Spy;
        spyDictionary["getProgramParameter"] = glMock.setup(x => x.getProgramParameter)
            .is((shader: WebGLShader, pName: number) => true).Spy;
        spyDictionary["getShaderInfoLog"] = glMock.setup(x => x.getShaderInfoLog)
            .is((shader: WebGLShader) => "theres some shady shit going on").Spy;
        spyDictionary["useProgram"] = glMock.setup(x => x.useProgram)
            .is((shader: WebGLShader) => { /* noop */ }).Spy;

        // draw
        spyDictionary["clearColor"] = glMock.setup(x => x.clearColor)
            .is((red: number, green: number, blue: number, alpha: number) => { /* noop */ }).Spy;
        spyDictionary["clear"] = glMock.setup(x => x.clear)
            .is((mask: number) => { /* noop */ }).Spy;


        // drawGlArrays
        spyDictionary["getAttribLocation"] = glMock.setup(x => x.getAttribLocation)
            .is((shader: WebGLShader, name: string) => 1).Spy;
        spyDictionary["getUniformLocation"] = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) => 1).Spy;
        spyDictionary["bufferData"] = glMock.setup(x => x.bufferData)
            .is(
                (target: number, size: number | ArrayBufferView | ArrayBuffer, usage: number) =>
                {/* noop */}
            ).Spy;
        const webglBuffer = new Mock<WebGLBuffer>();
        spyDictionary["createBuffer"] = glMock.setup(x => x.createBuffer)
            .is(() => webglBuffer.Object).Spy;
        spyDictionary["bindBuffer"] = glMock.setup(x => x.bindBuffer)
            .is((target: number, buffer: WebGLBuffer) => { /* noop */ }).Spy;
        spyDictionary["vertexAttribPointer"] = glMock.setup(x => x.vertexAttribPointer)
            .is(
                (index: number, size: number, type: number, normalized: boolean,
                stride: number, offset: number) =>
                { /* noop */ }
            ).Spy;
        spyDictionary["enableVertexAttribArray"] = glMock.setup(x => x.enableVertexAttribArray)
            .is((index: number) => { /* noop */ }).Spy;
        spyDictionary["uniformMatrix4fv"] = glMock.setup(x => x.uniformMatrix4fv)
            .is(
                (uniformLocation: WebGLUniformLocation, transpose: boolean,
                value: Float32Array | number[]) =>
                { /* noop */ }).Spy;
        spyDictionary["uniform1f"] = glMock.setup(x => x.uniform1f)
            .is(
                (uniformLocation: WebGLUniformLocation, value: number) =>
                { /* noop */ }).Spy;
        spyDictionary["drawArrays"] = glMock.setup(x => x.drawArrays)
            .is((mode: number, first: number, count: number) => { /* noop */ }).Spy;
        spyDictionary["deleteBuffer"] = glMock.setup(x => x.deleteBuffer)
            .is((buffer: WebGLBuffer) => { /* noop */ }).Spy;

        // resize callback
        spyDictionary["isContextLost"] = glMock.setup(x => x.isContextLost)
            .is(() => false).Spy;

        return spyDictionary;
    }

    public static getRandomLine(gl: WebGLRenderingContext, color: RGBColor = Settings.defaultColor,
        numberOfVerticies: number = 10): Line
    {
        const randomStartPoint = this.getRandomXYPoint();
        let line = new Line(randomStartPoint, gl, color);
        numberOfVerticies--;

        for (let i = 0; i < numberOfVerticies; i++)
        {
            let nextVertex = this.getRandomXYPoint();
            line.addVertex(nextVertex);
        }

        return line;
    }

    public static getRandomPoint(gl: WebGLRenderingContext,
        color: RGBColor = Settings.defaultColor): Point
    {
        const location = this.getRandomXYPoint();
        return new Point(location, gl);
    }

    public static getRandomVerticies(gl: WebGLRenderingContext, numberOfVerticies: number = 10,
        color: RGBColor = Settings.defaultColor): Float32Array
    {
        let arr = new Float32Array(numberOfVerticies * Constants.floatsPerPoint);

        for (let i = 0; i < numberOfVerticies; i++)
        {
            const position = this.getRandomXYPoint();
            const xyzRGB = new Float32Array([
                position.x,
                position.y,
                position.z,
                color.red,
                color.green,
                color.blue
            ]);
            arr.set(xyzRGB, (i * Constants.floatsPerPoint));
        }

        return arr;
    }

    public static addVerticiesToVertexBuffer(vertexBuffer: VertexBuffer, arr: Float32Array)
    {
        if (arr.length % 6 !== 0)
        {
            throw `incorrect number of floats, must be divisible by ${Constants.floatsPerPoint}`;
        }

        const numberOfVerticies = (arr.length / Constants.floatsPerPoint);
        for (let i = 0; i < numberOfVerticies; i++)
        {
            const x = arr[i * Constants.floatsPerPoint];
            const y = arr[(i * Constants.floatsPerPoint) + 1];
            const z = arr[(i * Constants.floatsPerPoint) + 2];
            const r = arr[(i * Constants.floatsPerPoint) + 3];
            const g = arr[(i * Constants.floatsPerPoint) + 4];
            const b = arr[(i * Constants.floatsPerPoint) + 5];

            vertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
        }
    }

    public static getRandomXYPoint(): Vec3
    {
        const plusOrMinusX = this.plusOrMinus();
        const randX = Math.random() * plusOrMinusX;

        const plusOrMinusY = this.plusOrMinus();
        const randY = Math.random() * plusOrMinusY;

        return new Vec3(randX, randY);
    }

    public static plusOrMinus(): number
    {
        return ((((Math.random() *  100) / 100) % 2) === 0) ? 1 : -1;
    }

    public static concatFloat32Arrays(arrs: Array<Float32Array>): Float32Array
    {
        let newArrayLength = 0;
        arrs.forEach(arr => {
            newArrayLength += arr.length;
        });

        let newArr = new Float32Array(newArrayLength);
        let insertionIndex = 0;
        newArr.set(arrs[0]);
        for (let i = 1; i < arrs.length; i++)
        {
            insertionIndex += arrs[i - 1].length;
            newArr.set(arrs[i], insertionIndex);
        }

        return newArr;
    }

    public static setupInstancedArrayMocks(instancedArrayExtensionMock: Mock<ANGLE_instanced_arrays>)
        : StringDictionary<jasmine.Spy>
    {
        let spyDictionary: StringDictionary<jasmine.Spy> = {};

        instancedArrayExtensionMock.setup(ia => ia.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE)
            .is(0x88FE);

        spyDictionary["drawArraysInstancedANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.drawArraysInstancedANGLE)
            .is((mode: number, first: number, count: number,
                primcount: number) => { /* do nothing */ }).Spy;
        spyDictionary["drawElementsInstancedANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.drawElementsInstancedANGLE)
            .is((mode: number, count: number, type: number, offset: number,
                primcount: number) => { /* do nothing */ }).Spy;
        spyDictionary["vertexAttribDivisorANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.vertexAttribDivisorANGLE)
            .is((index: number, divisor: number) => { /* do nothing */ }).Spy;

        return spyDictionary;
    }
}