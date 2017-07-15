import { Shape2d } from "./shapes2d/shape2d";
import { Float32Vector } from "../utils/float32Vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shapes2d/shapeMode";
import { RGBColor } from "./rgbColor";
import { Camera } from "./camera";
import { DrawingSettings } from "./drawingSettings";
import { StringDictionary } from "../utils/dictionary";
import { Settings, ShaderSettings } from "../settings";
import { Vec3 } from "cuon-matrix-ts";
import { ShaderType } from "./shaderType";

export class WebGLRenderer
{
    public gl: WebGLRenderingContext;
    private _glRenderMode: number;
    private _renderMode: RenderMode;
    private _pointSize: number;
    private _backgroundColor: RGBColor;
    private _camera: Camera;
    private _pointsVertexBuffer: VertexBuffer;
    private _linesVertexBuffer: VertexBuffer;
    private _lineStripVertexBuffer: VertexBuffer;
    private _lineLoopVertexBuffer: VertexBuffer;
    private _trianglesVertexBuffer: VertexBuffer;
    private _triangleStripVertexBuffer: VertexBuffer;
    private _triangleFanVertexBuffer: VertexBuffer;
    private _vertexBuffers: Array<VertexBuffer>;
    private _shaderProgram: WebGLShader;
    private _vertexShaderSource: string =
`   attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    uniform mat4 ${ShaderSettings.viewMatrixUniformName};
    uniform float ${ShaderSettings.pointSizeUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.viewMatrixUniformName} * ${ShaderSettings.positionAttributeName};
        gl_PointSize = ${ShaderSettings.pointSizeUniformName};
        v_color = ${ShaderSettings.colorAttributeName};
    }`;

    private _fragmentShaderSource: string =
`   precision mediump float;
    uniform vec4 u_fragColor;
    varying vec4 v_color;
    void main(void)
    {
        gl_FragColor = v_color;
    }`;

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext,
        drawingSettings: DrawingSettings | null = null, camera: Camera | null = null)
    {
        this.gl = gl;

        this.initializeDrawingSettings(drawingSettings);

        this.initializeCamera(camera);

        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();

        this.initializeVertexBuffers();
    }

    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public get renderMode(): RenderMode
    {
        return this._renderMode;
    }

    public set renderMode(renderMode: RenderMode)
    {
        this._renderMode = renderMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
    }

    public get backgroundColor(): RGBColor
    {
        return this._backgroundColor;
    }

    public set backgroundColor(backgroundColor: RGBColor)
    {
        this._backgroundColor = backgroundColor;
    }

    public get pointSize(): number
    {
        return this._pointSize;
    }

    public set pointSize(value: number)
    {
        this._pointSize = value;
    }

    public get camera(): Camera
    {
        return this._camera;
    }

    public set camera(value: Camera)
    {
        this._camera = value;
    }

    public addXYZPointToScene(x: number, y: number, z: number = 0,
        r: number = Settings.defaultColor.red, g: number = Settings.defaultColor.green,
        b: number = Settings.defaultColor.blue, renderMode: number = this._glRenderMode): void
    {
        switch (renderMode)
        {
            case this.gl.POINTS:
                this._pointsVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINES:
                this._linesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
        }
    }

    public addShapeToScene(shape: Shape2d): void
    {
        let vertexIndex = 0;
        for (let i = 0; i < shape.verticies.length; i += Settings.floatsPerVertex)
        {
            const x = shape.verticies[vertexIndex];
            vertexIndex++;
            const y = shape.verticies[vertexIndex];
            vertexIndex++;
            const z = shape.verticies[vertexIndex];
            vertexIndex++;
            const r = shape.verticies[vertexIndex];
            vertexIndex++;
            const g = shape.verticies[vertexIndex];
            vertexIndex++;
            const b = shape.verticies[vertexIndex];
            vertexIndex++;

            this.addXYZPointToScene(x, y, z, r, g, b, shape.glRenderMode);
        }
    }

    public addShapesToScene(shapes: Array<Shape2d>): void
    {
        for (let shape of shapes)
        {
            this.addShapeToScene(shape);
        }
    }

    public removeAllVeriticies(): void
    {
        this.initializeVertexBuffers();
    }

    public draw()
    {
        this.gl.clearColor(this._backgroundColor.red,
            this._backgroundColor.green,
            this._backgroundColor.blue, Settings.defaultBackgroundAlpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let vb of this._vertexBuffers)
        {
            for (let verts of vb.verticiesStack)
            {
                if (verts.size > 0)
                {
                    this.drawGlArray(verts.getTrimmedArray(), vb.glRenderMode);
                }
            }
        }
    }

    private initializeDrawingSettings(drawingSettings: DrawingSettings | null)
    {
        this._renderMode = (drawingSettings && drawingSettings.renderMode) || Settings.defaultRendereMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._pointSize = (drawingSettings && drawingSettings.pointSize) || Settings.defaultPointSize;
        this._backgroundColor = (drawingSettings && drawingSettings.backgroundColor) || Settings.defaultBackgroundColor;
    }

    private initializeCamera(camera: Camera | null)
    {
        if (camera)
        {
            this._camera = camera;
        }
        else
        {
            this._camera = new Camera();
        }
    }

    private initializeVertexBuffers()
    {
        this._pointsVertexBuffer = new VertexBuffer(this.gl.POINTS, this.gl);
        this._linesVertexBuffer = new VertexBuffer(this.gl.LINES, this.gl);
        this._lineStripVertexBuffer = new VertexBuffer(this.gl.LINE_STRIP, this.gl);
        this._lineLoopVertexBuffer = new VertexBuffer(this.gl.LINE_LOOP, this.gl);
        this._trianglesVertexBuffer = new VertexBuffer(this.gl.TRIANGLES, this.gl);
        this._triangleStripVertexBuffer = new VertexBuffer(this.gl.TRIANGLE_STRIP, this.gl);
        this._triangleFanVertexBuffer = new VertexBuffer(this.gl.TRIANGLE_FAN, this.gl);
        this._vertexBuffers = [
            this._pointsVertexBuffer,
            this._linesVertexBuffer,
            this._lineStripVertexBuffer,
            this._lineLoopVertexBuffer,
            this._trianglesVertexBuffer,
            this._triangleStripVertexBuffer,
            this._triangleFanVertexBuffer
        ];
    }

    private drawGlArray(arr: Float32Array, renderMode: number): void
    {
        const a_position = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.positionAttributeName);
        const a_color = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.colorAttributeName);
        const u_pointSize = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.pointSizeUniformName);
        const u_viewMatrix = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.viewMatrixUniformName);

        if (!u_pointSize || !u_viewMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.pointSizeUniformName] = u_pointSize;
            uniformsMap[ShaderSettings.viewMatrixUniformName] = u_viewMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }

        const floatSize = arr.BYTES_PER_ELEMENT;
        const bytesPerPoint = floatSize * Settings.floatsPerPoint;
        const bytesPerVertex = floatSize * Settings.floatsPerVertex;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, Settings.floatsPerPoint, this.gl.FLOAT,
            false, bytesPerVertex, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, Settings.floatsPerColor, this.gl.FLOAT,
            false, bytesPerVertex, bytesPerPoint);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.viewMatrix);
        this.gl.uniform1f(u_pointSize, this._pointSize);
        this.gl.drawArrays(renderMode, 0, (arr.length / Settings.floatsPerVertex));
    }

    private initShaders(): void
    {
        const fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this._vertexShaderSource, "vertex");

        let shader: WebGLProgram | null = this.gl.createProgram();
        if (shader === null)
        {
            throw "could not create shader program";
        }
        this._shaderProgram = shader;
        this.gl.attachShader(this._shaderProgram, vertexShader);
        this.gl.attachShader(this._shaderProgram, fragmentShader);
        this.gl.linkProgram(this._shaderProgram);

        if (!this.gl.getProgramParameter(this._shaderProgram, this.gl.LINK_STATUS))
        {
            throw "could not link shader program";
        }

        this.gl.useProgram(this._shaderProgram);
    }

    private createShader(shaderSource: string, type: ShaderType): WebGLShader | null
    {
        let shader: WebGLShader | null = null;
        if (type === "fragment")
        {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex")
        {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }

        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            throw `could not compile shader, shader info log: ${this.gl.getShaderInfoLog(shader)}`;
        }
        return shader;
    }

    private createUniforNotFoundErrorMessage(uniformsMap: StringDictionary<WebGLUniformLocation | null>): string
    {
        let result = `cannot find uniform in shader program\n`;

        result += `potential culprits:\n`;

        for (let key in uniformsMap)
        {
            if (uniformsMap.hasOwnProperty(key))
            {
                result += `\t${key}: ${uniformsMap[key]}\n`;
            }
        }

        return result;
    }
}