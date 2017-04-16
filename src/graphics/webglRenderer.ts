import { Shape } from "./geometry/shape";
import { Float32Vector } from "../utils/vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./geometry/shapeMode";
import { Color, ColorMapper } from "./colorMapper";
import { RGBColor } from "./rgbColor";

export interface IWebGLRenderer
{
    gl: WebGLRenderingContext;
    color: Color;
    shape: ShapeMode;
    renderMode: RenderMode;
    getRGBColor: () => RGBColor;
    draw: () => void;
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    addXYPointToScene(x: number, y: number): void;
    addShapeToScene(shape: Shape): void;
}

export class WebGLRenderer implements IWebGLRenderer
{
    public gl: WebGLRenderingContext;
    private glRenderMode: number;
    private shapeMode: ShapeMode;
    private renderModeStr: RenderMode;
    private drawingMode: DrawingMode;
    private colorStr: Color;
    private rgbColor: RGBColor;
    private vertexShaderSource: string =
    "    attribute vec3 a_position;\n" +
    "    attribute float a_pointSize;\n" +
    "    attribute vec4 a_color;\n" +
    "    varying vec4 v_color;\n" +
    "    void main(void) {\n" +
    "        gl_Position = vec4(a_position, 1.0);\n" +
    "        gl_PointSize = 10.0;\n" +
    "        v_color = a_color;\n" +
    "    }\n";

    private fragmentShaderSource: string =
    "    precision mediump float;\n" +
    "    uniform vec4 u_fragColor;" +
    "    varying vec4 v_color;\n" +
    "    void main(void) {\n" +
    "        gl_FragColor = v_color;\n" +
    "    }\n";

    private shaderProgram: WebGLShader;
    private pointsVector: VertexBuffer;
    private linesVector: VertexBuffer;
    private lineStripVector: VertexBuffer;
    private lineLoopVector: VertexBuffer;
    private trianglesVector: VertexBuffer;
    private triangleStripVector: VertexBuffer;
    private triangleFanVector: VertexBuffer;
    private vertexBuffers: Array<VertexBuffer>;
    private shapeScene: Array<Shape>;

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext)
    {
        this.gl = gl;
        this.glRenderMode = this.gl.POINTS;
        this.shapeMode = "points";
        this.drawingMode = DrawingMode.Verticies;
        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();
        this.pointsVector = new VertexBuffer(this.gl.POINTS, new Float32Array(0), this.gl);
        this.linesVector = new VertexBuffer(this.gl.LINES, new Float32Array(0), this.gl);
        this.lineStripVector = new VertexBuffer(this.gl.LINE_STRIP, new Float32Array(0), this.gl);
        this.lineLoopVector = new VertexBuffer(this.gl.LINE_LOOP, new Float32Array(0), this.gl);
        this.trianglesVector = new VertexBuffer(this.gl.TRIANGLES, new Float32Array(0), this.gl);
        this.triangleStripVector = new VertexBuffer(this.gl.TRIANGLE_STRIP, new Float32Array(0), this.gl);
        this.triangleFanVector = new VertexBuffer(this.gl.TRIANGLE_FAN, new Float32Array(0), this.gl);
        this.vertexBuffers = [
            this.pointsVector,
            this.linesVector,
            this.lineStripVector,
            this.lineLoopVector,
            this.trianglesVector,
            this.triangleStripVector,
            this.triangleFanVector];
        this.shapeScene = [];
    }

    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public get renderMode(): RenderMode
    {
        return this.renderModeStr;
    }

    public set renderMode(renderMode: RenderMode)
    {
        this.drawingMode = DrawingMode.Verticies;
        this.renderModeStr = renderMode;
        this.glRenderMode = RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
    }

    public get shape(): ShapeMode
    {
        return this.shapeMode;
    }

    public set shape(newShapeMode: ShapeMode)
    {
        this.drawingMode = DrawingMode.Shapes;
        this.shapeMode = newShapeMode;
    }

    public get color(): Color
    {
        return this.colorStr;
    }

    public set color(color: Color)
    {
        this.colorStr = color;
        this.rgbColor = ColorMapper.colorToRGBColor(color);
    }

    public getRGBColor(): RGBColor
    {
        return this.rgbColor;
    }

    public addXYPointToScene(x: number, y: number): void
    {
        if (this.drawingMode !== DrawingMode.Verticies) { return; }

        switch (this.glRenderMode)
        {
            case this.gl.POINTS:
                this.addXYAndColorToVertexBuffer(this.pointsVector.verticies, x, y);
                break;
            case this.gl.LINES:
                this.addXYAndColorToVertexBuffer(this.linesVector.verticies, x, y);
                break;
            case this.gl.LINE_STRIP:
                this.addXYAndColorToVertexBuffer(this.lineStripVector.verticies, x, y);
                break;
            case this.gl.LINE_LOOP:
                this.addXYAndColorToVertexBuffer(this.lineLoopVector.verticies, x, y);
                break;
            case this.gl.TRIANGLES:
                this.addXYAndColorToVertexBuffer(this.trianglesVector.verticies, x, y);
                break;
            case this.gl.TRIANGLE_STRIP:
                this.addXYAndColorToVertexBuffer(this.triangleStripVector.verticies, x, y);
                break;
            case this.gl.TRIANGLE_FAN:
                this.addXYAndColorToVertexBuffer(this.triangleFanVector.verticies, x, y);
                break;
        }
    }

    public addShapeToScene(shape: Shape): void
    {
        this.shapeScene.push(shape);
    }

    public draw()
    {
        this.gl.clearColor(0.09, 0.09, 0.09, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let vb of this.vertexBuffers)
        {
            if (vb.verticies.size > 0)
            {
                this.drawGlArray(vb.verticies, vb.renderMode);
            }
        }

        if (this.shapeScene.length > 0)
        {
            for (let shape of this.shapeScene)
            {
                this.drawGlArray(shape.verticies, shape.glRenderMode, shape.vertexSize, shape.colorSize);
            }
        }
    }

    // by default vertexSize = 2 because we use two floats per vertex...only rendering 2d for now
    // colorSize = 3 because we use three floats to represent R, G, and B
    private drawGlArray(vector: Float32Vector, renderMode: number, vertexSize: number = 2, colorSize: number = 3): void
    {
        let a_position = this.gl.getAttribLocation(this.shaderProgram, "a_position");
        let a_color = this.gl.getAttribLocation(this.shaderProgram, "a_color");

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
        vertexBuffer.addArray(new Float32Array([x, y, this.rgbColor.red, this.rgbColor.green, this.rgbColor.blue]));
    }

    private initShaders(): void
    {
        // load and compile the fragment and vertex shader
        const fragmentShader = this.createShader(this.fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this.vertexShaderSource, "vertex");

        // link them together into a new program
        let shader: WebGLProgram | null = this.gl.createProgram();
        if (shader === null)
        {
            throw Error("Could not create shader program");
        }
        this.shaderProgram = shader;
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS))
        {
            throw Error("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);
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