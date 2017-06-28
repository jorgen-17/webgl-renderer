import { Shape } from "./shapes/shape";
import { Float32Vector } from "../utils/vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shapes/shapeMode";
import { RGBColor } from "./rgbColor";
import { Matrix4 } from "../math/matrix4";
import { Camera } from "./camera";
import { Point3d } from "./shapes/point3d";
import { Axis } from "../utils/axis";
import { Settings } from "../settings";

export interface IWebGLRenderer
{
    color: RGBColor;
    backgroundColor: RGBColor;
    gl: WebGLRenderingContext;
    shape: ShapeMode;
    renderMode: RenderMode;
    camera: Camera;
    draw: () => void;
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    addXYPointToScene(x: number, y: number): void;
    addShapeToScene(shape: Shape): void;
    addShapesToScene(shape: Array<Shape>): void;
    removeAllVeriticies(): void;
    translateCamera(eyePosition: Point3d): void;
}

export class WebGLRenderer implements IWebGLRenderer
{
    public gl: WebGLRenderingContext;
    private _glRenderMode: number;
    private _shapeMode: ShapeMode;
    private _renderModeStr: RenderMode;
    private _drawingMode: DrawingMode;
    private _backgroundColor: RGBColor;
    private _color: RGBColor;

    private _eyePosition: Point3d;
    private _lookAtPoint: Point3d;
    private _upPosition: Point3d;
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
    "    attribute float a_pointSize;\n" +
    "    attribute vec4 a_color;\n" +
    "    uniform mat4 u_viewMatrix;\n" +
    "    varying vec4 v_color;\n" +
    "    void main(void) {\n" +
    "        gl_Position = u_viewMatrix * a_position;\n" +
    "        gl_PointSize = 10.0;\n" +
    "        v_color = a_color;\n" +
    "    }\n";

    private _fragmentShaderSource: string =
    "    precision mediump float;\n" +
    "    uniform vec4 u_fragColor;" +
    "    varying vec4 v_color;\n" +
    "    void main(void) {\n" +
    "        gl_FragColor = v_color;\n" +
    "    }\n";

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext,
        backgroundColor: RGBColor = { red: 0.9, green: 0.9, blue: 0.9 },
        color: RGBColor = { red: 0.0, green: 0.0, blue: 0.0 }, camera: Camera | null = null)
    {
        this.gl = gl;

        this.initializeRenderingProperties(backgroundColor, color);

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

    public addShapeToScene(shape: Shape): void
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

    public addShapesToScene(shapes: Array<Shape>): void
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

    public translateCamera(eyePosition: Point3d): void
    {
        this._eyePosition = eyePosition;
        this._lookAtPoint = new Point3d(eyePosition.x, eyePosition.y, eyePosition.z - 1);
        this._upPosition = new Point3d(eyePosition.x, eyePosition.y + 1, eyePosition.z);

        this.camera.setCameraView(this._eyePosition, this._lookAtPoint, this._upPosition);
    }

    public draw()
    {
        this.gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let vb of this._vertexBuffers)
        {
            for (let verts of vb.verticiesStack)
            {
                if (verts.size > 0)
                {
                    this.drawGlArray(verts, vb.renderMode);
                }
            }
        }
    }

    private initializeRenderingProperties(backgroundColor: RGBColor, color: RGBColor)
    {
        this._glRenderMode = this.gl.POINTS;
        this._shapeMode = "points";
        this._drawingMode = DrawingMode.Verticies;
        this._backgroundColor = backgroundColor;
        this._color = color;
    }

    private initializeCamera(camera: Camera | null)
    {
        if (camera)
        {
            this._eyePosition = camera.eyePosition;
            this._lookAtPoint = camera.lookAtPoint;
            this._upPosition = camera.upPosition;
            this._camera = new Camera(this._eyePosition, this._lookAtPoint, this._upPosition);
        }
        else
        {
            this._eyePosition = new Point3d(0, 0, 0);
            this._lookAtPoint = new Point3d(0, 0, -1);
            this._upPosition = new Point3d(0, 1, 0);
            this._camera = new Camera(this._eyePosition, this._lookAtPoint, this._upPosition);
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
            this._triangleFanVector];
    }

    // by default vertexSize = 2 because we use two floats per vertex...only rendering 2d for now
    // colorSize = 3 because we use three floats to represent R, G, and B
    private drawGlArray(vector: Float32Vector, renderMode: number): void
    {
        let a_position = this.gl.getAttribLocation(this._shaderProgram, "a_position");
        let a_color = this.gl.getAttribLocation(this._shaderProgram, "a_color");
        let u_viewMatrix = this.gl.getUniformLocation(this._shaderProgram, "u_viewMatrix");

        if (!u_viewMatrix)
        {
            throw "cannot find uniform u_viewMatrix in shader program";
        }

        const floatSize = vector.arr.BYTES_PER_ELEMENT;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vector.arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, Settings.floatsPerPoint, this.gl.FLOAT, false, floatSize * 5, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, Settings.floatsPerColor, this.gl.FLOAT, false, floatSize * 5, floatSize * 2);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_viewMatrix, false, this._camera.getViewMatrix());
        this.gl.drawArrays(renderMode, 0, (vector.size / Settings.floatsPerVertex));
    }

    private initShaders(): void
    {
        // load and compile the fragment and vertex shader
        const fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this._vertexShaderSource, "vertex");

        // link them together into a new program
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
}