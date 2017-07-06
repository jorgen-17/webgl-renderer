import { Shape2d } from "./shapes2d/shape2d";
import { Float32Vector } from "../utils/vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shapes2d/shapeMode";
import { RGBColor } from "./rgbColor";
import { Camera } from "./camera";
import { Point3d } from "./shapes2d/point3d";
import { DrawingSettings } from "./drawingSettings";
import { StringDictionary } from "../utils/dictionary";
import { Settings } from "../settings";
import { Vec3 } from "cuon-matrix-ts";

export interface IWebGLRenderer
{
    color: RGBColor;
    backgroundColor: RGBColor;
    gl: WebGLRenderingContext;
    shape: ShapeMode;
    renderMode: RenderMode;
    pointSize: number;
    camera: Camera;
    draw: () => void;
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    addXYPointToScene(x: number, y: number): void;
    addShapeToScene(shape: Shape2d): void;
    addShapesToScene(shape: Array<Shape2d>): void;
    removeAllVeriticies(): void;
}

export class WebGLRenderer implements IWebGLRenderer
{
    public gl: WebGLRenderingContext;
    private _glRenderMode: number;
    private _shapeMode: ShapeMode;
    private _renderMode: RenderMode;
    private _drawingMode: DrawingMode;
    private _pointSize: number;
    private _backgroundColor: RGBColor;
    private _color: RGBColor;
    private _camera: Camera;
    private _pointsVector: VertexBuffer;
    private _linesVector: VertexBuffer;
    private _lineStripVector: VertexBuffer;
    private _lineLoopVector: VertexBuffer;
    private _trianglesVector: VertexBuffer;
    private _triangleStripVector: VertexBuffer;
    private _triangleFanVector: VertexBuffer;
    private _vertexBuffers: Array<VertexBuffer>;
    private _shaderProgram: WebGLShader;
    private _vertexShaderSource: string =
    "    attribute vec4 a_position;\n" +
    "    attribute vec4 a_color;\n" +
    "    uniform mat4 u_viewMatrix;\n" +
    "    uniform float u_pointSize;\n" +
    "    varying vec4 v_color;\n" +
    "    void main(void)\n" +
    "    {\n" +
    "        gl_Position = u_viewMatrix * a_position;\n" +
    "        gl_PointSize = u_pointSize;\n" +
    "        v_color = a_color;\n" +
    "    }\n";

    private _fragmentShaderSource: string =
    "    precision mediump float;\n" +
    "    uniform vec4 u_fragColor;" +
    "    varying vec4 v_color;\n" +
    "    void main(void)\n" +
    "    {\n" +
    "        gl_FragColor = v_color;\n" +
    "    }\n";

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext,
        drawingSettings: DrawingSettings, camera: Camera | null = null)
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
        this._drawingMode = DrawingMode.Verticies;
        this._renderMode = renderMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
    }

    public get shape(): ShapeMode
    {
        return this._shapeMode;
    }

    public set shape(newShapeMode: ShapeMode)
    {
        this._drawingMode = DrawingMode.Shapes;
        this._shapeMode = newShapeMode;
    }

    public get color(): RGBColor
    {
        return this._color;
    }

    public set color(color: RGBColor)
    {
        this._color = color;
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

    public addXYPointToScene(x: number, y: number, renderMode: number = this._glRenderMode,
        r: number = this._color.red, g: number = this._color.green, b: number = this._color.blue): void
    {
        switch (renderMode)
        {
            case this.gl.POINTS:
                this._pointsVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINES:
                this._linesVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVector.addVertex(new Float32Array([x, y, r, g, b]));
                break;
        }
    }

    public addShapeToScene(shape: Shape2d): void
    {
        let vertexIndex = 0;
        for (let i = 0; i < shape.verticies.arr.length; i += Settings.floatsPerVertex)
        {
            const x = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            const y = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            const r = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            const g = shape.verticies.arr[vertexIndex];
            vertexIndex++;
            const b = shape.verticies.arr[vertexIndex];
            vertexIndex++;

            this.addXYPointToScene(x, y, shape.glRenderMode, r, g, b);
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
            this._backgroundColor.blue, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let vb of this._vertexBuffers)
        {
            for (let verts of vb.verticiesStack)
            {
                if (verts.size > 0)
                {
                    this.drawGlArray(verts.getTrimmedArray(), vb.renderMode);
                }
            }
        }
    }

    private initializeDrawingSettings(drawingSettings: DrawingSettings)
    {
        this._renderMode = drawingSettings.renderMode || Settings.defaultRendereMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._shapeMode = drawingSettings.shapeMode || Settings.defaultShapeMode;
        this._drawingMode = drawingSettings.drawingMode || Settings.defaultDrawingMode;
        this._pointSize = drawingSettings.pointSize || Settings.defaultPointSize;
        this._backgroundColor = drawingSettings.backgroundColor || Settings.defaultBackgroundColor;
        this._color = drawingSettings.color || Settings.defaultColor;
    }

    private initializeCamera(camera: Camera | null)
    {
        if (camera)
        {
            this._camera = camera;
        }
        else
        {
            const eyePosition = new Vec3(0, 0, 0);
            const lookAtPoint = new Vec3(0, 0, -1);
            const upPosition = new Vec3(0, 1, 0);
            this._camera = new Camera(eyePosition, lookAtPoint, upPosition);
        }
    }

    private initializeVertexBuffers()
    {
        this._pointsVector = new VertexBuffer(this.gl.POINTS, this.gl);
        this._linesVector = new VertexBuffer(this.gl.LINES, this.gl);
        this._lineStripVector = new VertexBuffer(this.gl.LINE_STRIP, this.gl);
        this._lineLoopVector = new VertexBuffer(this.gl.LINE_LOOP, this.gl);
        this._trianglesVector = new VertexBuffer(this.gl.TRIANGLES, this.gl);
        this._triangleStripVector = new VertexBuffer(this.gl.TRIANGLE_STRIP, this.gl);
        this._triangleFanVector = new VertexBuffer(this.gl.TRIANGLE_FAN, this.gl);
        this._vertexBuffers = [
            this._pointsVector,
            this._linesVector,
            this._lineStripVector,
            this._lineLoopVector,
            this._trianglesVector,
            this._triangleStripVector,
            this._triangleFanVector
        ];
    }

    private drawGlArray(arr: Float32Array, renderMode: number): void
    {
        const pointSizeUniformName = "u_pointSize";
        const viewMatrixUniformName = "u_viewMatrix";

        const a_position = this.gl.getAttribLocation(this._shaderProgram, "a_position");
        const a_color = this.gl.getAttribLocation(this._shaderProgram, "a_color");
        const u_pointSize = this.gl.getUniformLocation(this._shaderProgram, pointSizeUniformName);
        const u_viewMatrix = this.gl.getUniformLocation(this._shaderProgram, viewMatrixUniformName);


        if (!u_pointSize || !u_viewMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> =
            {
                pointSizeUniformName: u_pointSize,
                viewMatrixUniformName: u_viewMatrix
            };
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
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.getViewMatrix());
        this.gl.drawArrays(renderMode, 0, (arr.length / Settings.floatsPerVertex));
    }

    private initShaders(): void
    {
        const fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this._vertexShaderSource, "vertex");

        let shader: WebGLProgram | null = this.gl.createProgram();
        if (shader === null)
        {
            throw Error("Could not create shader program");
        }
        this._shaderProgram = shader;
        this.gl.attachShader(this._shaderProgram, vertexShader);
        this.gl.attachShader(this._shaderProgram, fragmentShader);
        this.gl.linkProgram(this._shaderProgram);

        if (!this.gl.getProgramParameter(this._shaderProgram, this.gl.LINK_STATUS))
        {
            throw Error("Could not initialise shaders");
        }

        this.gl.useProgram(this._shaderProgram);
    }

    private createShader(str, type): WebGLShader | null
    {
        let shader: WebGLShader | null;
        if (type === "fragment")
        {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex")
        {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }
        else
        {
            return null;
        }

        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    private createUniforNotFoundErrorMessage(uniformsMap: StringDictionary<WebGLUniformLocation | null>): string
    {
        let result = `cannot find uniform in shader program`;


        result += `Potential culprits:`;

        for (let key in uniformsMap)
        {
            if (uniformsMap.hasOwnProperty(key))
            {
                result += `\t${key}: ${uniformsMap[key]}`;
            }
        }

        return result;
    }
}