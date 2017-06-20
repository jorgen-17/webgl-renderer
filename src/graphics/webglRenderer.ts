import { Shape } from "./shapes/shape";
import { Float32Vector } from "../utils/vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shapes/shapeMode";
import { RGBColor } from "./rgbColor";

export interface IWebGLRenderer
{
    color: RGBColor;
    backgroundColor: RGBColor;
    gl: WebGLRenderingContext;
    shape: ShapeMode;
    renderMode: RenderMode;
    draw: () => void;
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    addXYPointToScene(x: number, y: number): void;
    addShapeToScene(shape: Shape): void;
    addShapesToScene(shape: Array<Shape>): void;
    removeAllShapes(): void;
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
    "    attribute float a_pointSize;\n" +
    "    attribute vec4 a_color;\n" +
    "    varying vec4 v_color;\n" +
    "    void main(void) {\n" +
    "        gl_Position = a_position;\n" +
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
        backgroundColor: RGBColor = {red: 0.9, green: 0.9, blue: 0.9},
        color: RGBColor = {red: 0.0, green: 0.0, blue: 0.0})
    {
        this.gl = gl;
        this._glRenderMode = this.gl.POINTS;
        this._shapeMode = "points";
        this._drawingMode = DrawingMode.Verticies;
        this._backgroundColor = backgroundColor;
        this._color = color;
        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();
        this._pointsVector = new VertexBuffer(this.gl.POINTS, new Float32Array(0), this.gl);
        this._linesVector = new VertexBuffer(this.gl.LINES, new Float32Array(0), this.gl);
        this._lineStripVector = new VertexBuffer(this.gl.LINE_STRIP, new Float32Array(0), this.gl);
        this._lineLoopVector = new VertexBuffer(this.gl.LINE_LOOP, new Float32Array(0), this.gl);
        this._trianglesVector = new VertexBuffer(this.gl.TRIANGLES, new Float32Array(0), this.gl);
        this._triangleStripVector = new VertexBuffer(this.gl.TRIANGLE_STRIP, new Float32Array(0), this.gl);
        this._triangleFanVector = new VertexBuffer(this.gl.TRIANGLE_FAN, new Float32Array(0), this.gl);
        this._vertexBuffers = [
            this._pointsVector,
            this._linesVector,
            this._lineStripVector,
            this._lineLoopVector,
            this._trianglesVector,
            this._triangleStripVector,
            this._triangleFanVector];
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


    public draw()
    {
        this.gl.clearColor(this._backgroundColor.red, this._backgroundColor.green, this._backgroundColor.blue, 1.0);
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

    // by default vertexSize = 2 because we use two floats per vertex...only rendering 2d for now
    // colorSize = 3 because we use three floats to represent R, G, and B
    private drawGlArray(vector: Float32Vector, renderMode: number, vertexSize: number = 2, colorSize: number = 3): void
    {
        let a_position = this.gl.getAttribLocation(this._shaderProgram, "a_position");
        let a_color = this.gl.getAttribLocation(this._shaderProgram, "a_color");

        const floatSize = vector.arr.BYTES_PER_ELEMENT;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vector.arr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(a_position, vertexSize, this.gl.FLOAT, false, floatSize * 5, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, colorSize, this.gl.FLOAT, false, floatSize * 5, floatSize * 2);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.drawArrays(renderMode, 0, (vector.size / (vertexSize + colorSize) ));
    }

    private addXYAndColorToVertexBuffer(vertexBuffer: Float32Vector, x: number, y: number)
    {
        vertexBuffer.addArray(new Float32Array([x, y, this._color.red, this._color.green, this._color.blue]));
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