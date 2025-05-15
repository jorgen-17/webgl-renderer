import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { StringDictionary } from "../../../src/utils/dictionary";
import { Line } from "../../../src/graphics/shape/shape2d/line";
import { Constants } from "../../../src/constants";
import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { WebGLRenderer } from "../../../src/graphics/webglRenderer";
import { RenderMode, RenderModeMapper } from "../../../src/graphics/renderModeMapper";
import { Point } from "../../../src/graphics/shape/shape2d/point";
import { Settings } from "../../../src/settings";
import { VertexBuffer } from "../../../src/graphics/vertexBuffer";

export class WebglRendererTestHelper
{
    public static setupGlMockFunctions(glMock: Mock<WebGLRenderingContext>,
        instancedArrayExtension: ANGLE_instanced_arrays)
        : StringDictionary<jasmine.SpyObj<any>>
    {
        const gl = glMock.Object;
        let spyDictionary: StringDictionary<jasmine.SpyObj<any>> = {};

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
        glMock.setup(x => x.COMPILE_STATUS).is(0x8B81);
        glMock.setup(x => x.LINK_STATUS).is(0x8B82);

        // draw constants
        glMock.setup(x => x.COLOR_BUFFER_BIT).is(0x00004000);
        glMock.setup(x => x.ARRAY_BUFFER).is(0x8892);
        glMock.setup(x => x.STATIC_DRAW).is(0x88E4);
        glMock.setup(x => x.FLOAT).is(0x1406);

        // getExtensions
        spyDictionary["getExtension"] = glMock.setup(x => x.getExtension).is(
            ((extensionName: string) => {
                if (extensionName === Settings.instancedArrayExtensionName) {
                    return instancedArrayExtension;
                }
                return null;
            }) as any
        ) as jasmine.SpyObj<any>;


        // init viewport
        spyDictionary["viewport"] = glMock.setup(x => x.viewport).is(
            (x: number, y: number, width: number, height: number) => { /* noop */ }) as jasmine.SpyObj<any>;

        // create shader
        spyDictionary["createShader"] = glMock.setup(x => x.createShader)
            .is((type: number) => {
                const shader = new Mock<WebGLShader>();
                return shader.Object;
            }) as jasmine.SpyObj<any>;
        spyDictionary["shaderSource"] = glMock.setup(x => x.shaderSource)
            .is((shader: WebGLShader, source: string) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["compileShader"] = glMock.setup(x => x.compileShader)
            .is((shader: WebGLShader) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["getShaderParameter"] = glMock.setup(x => x.getShaderParameter)
            .is((shader: WebGLShader, pName: number) => true) as jasmine.SpyObj<any>;

        // init shaders
        const shaderProgram = new Mock<WebGLProgram>();
        spyDictionary["createProgram"] = glMock.setup(x => x.createProgram)
            .is(() => shaderProgram.Object) as jasmine.SpyObj<any>;
        spyDictionary["attachShader"] = glMock.setup(x => x.attachShader)
            .is((program: WebGLProgram, shader: WebGLShader) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["linkProgram"] = glMock.setup(x => x.linkProgram)
            .is((program: WebGLProgram) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["getProgramParameter"] = glMock.setup(x => x.getProgramParameter)
            .is((program: WebGLProgram, pName: number) => true) as jasmine.SpyObj<any>;
        spyDictionary["getShaderInfoLog"] = glMock.setup(x => x.getShaderInfoLog)
            .is((shader: WebGLShader) => "theres some shady shit going on") as jasmine.SpyObj<any>;
        spyDictionary["useProgram"] = glMock.setup(x => x.useProgram)
            .is((program: WebGLProgram) => { /* noop */ }) as jasmine.SpyObj<any>;

        // draw
        spyDictionary["clearColor"] = glMock.setup(x => x.clearColor)
            .is((red: number, green: number, blue: number, alpha: number) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["clear"] = glMock.setup(x => x.clear)
            .is((mask: number) => { /* noop */ }) as jasmine.SpyObj<any>;


        // drawGlArrays
        spyDictionary["getAttribLocation"] = glMock.setup(x => x.getAttribLocation)
            .is((shader: WebGLShader, name: string) => 1) as jasmine.SpyObj<any>;
        spyDictionary["getUniformLocation"] = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) => 1) as jasmine.SpyObj<any>;
        spyDictionary["bufferData"] = glMock.setup(x => x.bufferData)
            .is(
            (_target: number, _dataOrSize: number | ArrayBufferView | ArrayBuffer | null, _usage: number) =>
            {/* noop */ }
            ) as jasmine.SpyObj<any>;
        const webglBuffer = new Mock<WebGLBuffer>();
        spyDictionary["createBuffer"] = glMock.setup(x => x.createBuffer)
            .is(() => webglBuffer.Object) as jasmine.SpyObj<any>;
        spyDictionary["bindBuffer"] = glMock.setup(x => x.bindBuffer)
            .is((target: number, buffer: WebGLBuffer) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["vertexAttribPointer"] = glMock.setup(x => x.vertexAttribPointer)
            .is(
            (index: number, size: number, type: number, normalized: boolean,
                stride: number, offset: number) =>
            { /* noop */ }
            ) as jasmine.SpyObj<any>;
        spyDictionary["enableVertexAttribArray"] = glMock.setup(x => x.enableVertexAttribArray)
            .is((index: number) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["uniformMatrix4fv"] = glMock.setup(x => x.uniformMatrix4fv)
            .is(
            (uniformLocation: WebGLUniformLocation, transpose: boolean,
                value: Float32Array | number[]) =>
            { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["uniform1f"] = glMock.setup(x => x.uniform1f)
            .is(
            (uniformLocation: WebGLUniformLocation, value: number) =>
            { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["drawArrays"] = glMock.setup(x => x.drawArrays)
            .is((mode: number, first: number, count: number) => { /* noop */ }) as jasmine.SpyObj<any>;
        spyDictionary["deleteBuffer"] = glMock.setup(x => x.deleteBuffer)
            .is((buffer: WebGLBuffer) => { /* noop */ }) as jasmine.SpyObj<any>;

        // resize callback
        spyDictionary["isContextLost"] = glMock.setup(x => x.isContextLost)
            .is(() => false) as jasmine.SpyObj<any>;

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
        let arr = new Float32Array(numberOfVerticies * Constants.floatsPerPositionColor);

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

            arr.set(xyzRGB, (i * Constants.floatsPerPositionColor));
        }

        return arr;
    }
     public static getRandomXYPoint(): Vec3
    {
        const plusOrMinusX = this.plusOrMinus();
        const randX = Math.random() * plusOrMinusX;

        const plusOrMinusY = this.plusOrMinus();
        const randY = Math.random() * plusOrMinusY;

        return new Vec3(randX, randY);
    }

    public static addVerticiesToVertexBuffer(vertexBuffer: VertexBuffer, arr: Float32Array)
    {
        if (arr.length % 6 !== 0)
        {
            throw `incorrect number of floats, must be divisible by ${Constants.floatsPerPositionColor}`;
        }
        const numberOfVerticies = (arr.length / Constants.floatsPerPositionColor);
        for (let i = 0; i < numberOfVerticies; i++)
        {
            const x = arr[i * Constants.floatsPerPositionColor];
            const y = arr[(i * Constants.floatsPerPositionColor) + 1];
            const z = arr[(i * Constants.floatsPerPositionColor) + 2];
            const r = arr[(i * Constants.floatsPerPositionColor) + 3];
            const g = arr[(i * Constants.floatsPerPositionColor) + 4];
            const b = arr[(i * Constants.floatsPerPositionColor) + 5];
            vertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
        }
    }

    public static plusOrMinus(): number
    {
        return ((((Math.random() * 100) / 100) % 2) === 0) ? 1 : -1;
    }

    public static concatFloat32Arrays(arrs: Array<Float32Array>): Float32Array
    {
        let newArrayLength = 0;
        arrs.forEach(arr =>
        {
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
        : StringDictionary<jasmine.SpyObj<any>>
    {
        let spyDictionary: StringDictionary<jasmine.SpyObj<any>> = {};

        instancedArrayExtensionMock.setup(ia => ia.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE)
            .is(0x88FE);

        spyDictionary["drawArraysInstancedANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.drawArraysInstancedANGLE)
            .is((mode: number, first: number, count: number,
                primcount: number) => { /* do nothing */ }) as jasmine.SpyObj<any>;
        spyDictionary["drawElementsInstancedANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.drawElementsInstancedANGLE)
            .is((mode: number, count: number, type: number, offset: number,
                primcount: number) => { /* do nothing */ }) as jasmine.SpyObj<any>;
        spyDictionary["vertexAttribDivisorANGLE"] = instancedArrayExtensionMock
            .setup(ia => ia.vertexAttribDivisorANGLE)
            .is((index: number, divisor: number) => { /* do nothing */ }) as jasmine.SpyObj<any>;

        return spyDictionary;
    }
}