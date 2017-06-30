import { Shape } from "./shapes/shape";
import { Float32Vector } from "../utils/vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shapes/shapeMode";
import { RGBColor } from "./rgbColor";
import { Camera } from "./camera";
import { Point3d } from "./shapes/point3d";
import { DrawingSettings } from "./drawingSettings";
import { StringDictionary } from "../utils/dictionary";

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
    addShapeToScene(shape: Shape): void;
    addShapesToScene(shape: Array<Shape>): void;
    removeAllShapes(): void;
    translateCamera(eyePosition: Point3d): void;
}

export class WebGLRenderer implements IWebGLRenderer
{
    public gl: WebGLRenderingContext;
    private _glRenderMode: number;
    private _shapeMode: ShapeMode;
    private _renderModeStr: RenderMode;
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
    private _shapeScene: Array<Shape>;
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

        this._shapeScene = new Array<Shape>();
    }

    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public get renderMode(): RenderMode
    {
        return this._renderModeStr;
    }

    public set renderMode(renderMode: RenderMode)
    {
        this._drawingMode = DrawingMode.Verticies;
        this._renderModeStr = renderMode;
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

    public addXYPointToScene(x: number, y: number): void
    {
        if (this._drawingMode !== DrawingMode.Verticies) { return; }

        switch (this._glRenderMode)
        {
            case this.gl.POINTS:
                this.addXYAndColorToVertexBuffer(this._pointsVector.verticies, x, y);
                break;
            case this.gl.LINES:
                this.addXYAndColorToVertexBuffer(this._linesVector.verticies, x, y);
                break;
            case this.gl.LINE_STRIP:
                this.addXYAndColorToVertexBuffer(this._lineStripVector.verticies, x, y);
                break;
            case this.gl.LINE_LOOP:
                this.addXYAndColorToVertexBuffer(this._lineLoopVector.verticies, x, y);
                break;
            case this.gl.TRIANGLES:
                this.addXYAndColorToVertexBuffer(this._trianglesVector.verticies, x, y);
                break;
            case this.gl.TRIANGLE_STRIP:
                this.addXYAndColorToVertexBuffer(this._triangleStripVector.verticies, x, y);
                break;
            case this.gl.TRIANGLE_FAN:
                this.addXYAndColorToVertexBuffer(this._triangleFanVector.verticies, x, y);
                break;
        }
    }

    public addShapeToScene(shape: Shape): void
    {
        this._shapeScene.push(shape);
    }

    public addShapesToScene(shapes: Array<Shape>): void
    {
        Array.prototype.push.apply(this._shapeScene, shapes);
    }

    public removeAllShapes(): void
    {
        this._shapeScene = new Array<Shape>();
    }

    public translateCamera(eyePosition: Point3d): void
    {
        let newLookAtPoint = new Point3d(eyePosition.x, eyePosition.y, eyePosition.z - 1);
        let newUpPosition = new Point3d(eyePosition.x, eyePosition.y + 1, eyePosition.z);

        this.camera.setCameraView(eyePosition, newLookAtPoint, newUpPosition);
    }

    public draw()
    {
        this.gl.clearColor(this._backgroundColor.red,
            this._backgroundColor.green,
            this._backgroundColor.blue, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let vb of this._vertexBuffers)
        {
            if (vb.verticies.size > 0)
            {
                this.drawGlArray(vb.verticies, vb.renderMode);
            }
        }

        if (this._shapeScene.length > 0)
        {
            for (let shape of this._shapeScene)
            {
                this.drawGlArray(shape.verticies, shape.glRenderMode, shape.vertexSize, shape.colorSize);
            }
        }
    }

    private initializeDrawingSettings(drawingSettings: DrawingSettings)
    {
        this._renderModeStr = "points";
        this._glRenderMode = drawingSettings._glRenderMode || this.gl.POINTS;
        this._shapeMode = drawingSettings._shapeMode || "points";
        this._drawingMode = drawingSettings._drawingMode || DrawingMode.Verticies;
        this._pointSize = drawingSettings._pointSize || 10;
        this._backgroundColor = drawingSettings._backgroundColor || { red: 0.9, green: 0.9, blue: 0.9 };
        this._color = drawingSettings._color || { red: 0.0, green: 0.0, blue: 0.0 };
    }

    private initializeCamera(camera: Camera | null)
    {
        if (camera)
        {
            this._camera = camera;
        }
        else
        {
            let eyePosition = new Point3d(0, 0, 0);
            let lookAtPoint = new Point3d(0, 0, -1);
            let upPosition = new Point3d(0, 1, 0);
            this._camera = new Camera(eyePosition, lookAtPoint, upPosition);
        }
    }

    private initializeVertexBuffers()
    {
        this._pointsVector = new VertexBuffer(this.gl.POINTS, new Float32Array(0), this.gl);
        this._linesVector = new VertexBuffer(this.gl.LINES, new Float32Array(0), this.gl);
        this._lineStripVector = new VertexBuffer(this.gl.LINE_STRIP, new Float32Array(0), this.gl);
        this._lineLoopVector = new VertexBuffer(this.gl.LINE_LOOP, new Float32Array(0), this.gl);
        this._trianglesVector = new VertexBuffer(this.gl.TRIANGLES, new Float32Array(0), this.gl);
        this._triangleStripVector = new VertexBuffer(this.gl.TRIANGLE_STRIP, new Float32Array(0), this.gl);
        this._triangleFanVector = new VertexBuffer(this.gl.TRIANGLE_FAN, new Float32Array(0), this.gl);
        this._vertexBuffers =
        [
            this._pointsVector,
            this._linesVector,
            this._lineStripVector,
            this._lineLoopVector,
            this._trianglesVector,
            this._triangleStripVector,
            this._triangleFanVector
        ];
    }

    private drawGlArray(vector: Float32Vector, renderMode: number, vertexSize: number = 2, colorSize: number = 3): void
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
            throw "cannot find uniform u_viewMatrix in shader program";
        }

        const floatSize = vector.arr.BYTES_PER_ELEMENT;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vector.arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, vertexSize, this.gl.FLOAT, false, floatSize * 5, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, colorSize, this.gl.FLOAT, false, floatSize * 5, floatSize * 2);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.getViewMatrix());
        this.gl.drawArrays(renderMode, 0, (vector.size / (vertexSize + colorSize)));
    }

    private addXYAndColorToVertexBuffer(vertexBuffer: Float32Vector, x: number, y: number)
    {
        vertexBuffer.addArray(new Float32Array([x, y, this._color.red,
            this._color.green, this._color.blue]));
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
        } else if (type === "vertex")
        {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        } else
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