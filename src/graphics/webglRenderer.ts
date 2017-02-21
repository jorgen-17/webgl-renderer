import { Shape, Point3d } from "./shapes";
import { Float32Vector } from "../utils/vector"

export interface IWebGLRenderer {
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    gl: WebGLRenderingContext;
    addPointToScene(x: number, y: number): void
    addLinePointToScene(x: number, y: number): void
    addLineStripPointToScene(x: number, y: number): void
    addLineLoopPointToScene(x: number, y: number): void
    addTrianglePointToScene(x: number, y: number): void
    addTriangleStripPointToScene(x: number, y: number): void
    addTriangleFanPointToScene(x: number, y: number): void
    draw: () => void;
}

export class WebGLRenderer implements IWebGLRenderer {
    gl: WebGLRenderingContext;

    vertexShaderSource: string =
    "    attribute vec3 a_position;\n" +
    "    attribute float a_pointSize;\n" +
    "    void main(void) {\n" +
    "        gl_Position = vec4(a_position, 1.0);\n" +
    "        gl_PointSize = 10.0;\n" +
    "    }\n";
 
    fragmentShaderSource: string =
    "    precision mediump float;\n" +
    "    uniform vec4 u_fragColor;" +
    "    void main(void) {\n" +
    "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
    "}\n";

    projectionMatrix: Float32Array;
    modelViewMatrix: Float32Array;
    shaderProgram: WebGLShader; 
    shaderVertexPositionAttribute: number;
    pointsVector: Float32Vector;
    linesVector: Float32Vector;
    lineStripVector: Float32Vector;
    lineLoopVector: Float32Vector;
    trianglesVector: Float32Vector;
    triangleStripVector: Float32Vector;
    triangleFanVector: Float32Vector;

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext) {
        this.gl = gl;
        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();
        this.pointsVector = new Float32Vector(new Float32Array(0));
    }

    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    private initShaders() : void
    {
        // load and compile the fragment and vertex shader
        const fragmentShader = this.createShader(this.fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this.vertexShaderSource, "vertex");

        // link them together into a new program
        let shader: WebGLProgram | null = this.gl.createProgram();
        if(shader === null)
        {
            throw Error("Could not create shader program");
        }
        this.shaderProgram = shader;
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            throw Error("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);
    }

    private createShader(str, type): WebGLShader | null {
        let shader: WebGLShader | null;
        if (type === "fragment") {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        } else if (type === "vertex") {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        } else {
            return null;
        }

        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    public addPointToScene(x: number, y: number): void
    {
        this.pointsVector.addArray(new Float32Array([x, y]));
    }

    public addLinePointToScene(x: number, y: number): void
    {
        this.linesVector.addArray(new Float32Array([x, y]));
    }

    public addLineStripPointToScene(x: number, y: number): void
    {
        this.lineStripVector.addArray(new Float32Array([x, y]));
    }

    public addLineLoopPointToScene(x: number, y: number): void
    {
        this.lineLoopVector.addArray(new Float32Array([x, y]));
    }

    public addTrianglePointToScene(x: number, y: number): void
    {
        this.trianglesVector.addArray(new Float32Array([x, y]));
    }

    public addTriangleStripPointToScene(x: number, y: number): void
    {
        this.triangleStripVector.addArray(new Float32Array([x, y]));
    }

    public addTriangleFanPointToScene(x: number, y: number): void
    {
        this.triangleFanVector.addArray(new Float32Array([x, y]));
    }

    public draw()
    {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        if(this.pointsVector.size > 0)
        {
            let a_position = this.gl.getAttribLocation(this.shaderProgram, 'a_position');

            let vertexBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.pointsVector.arr, this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(a_position, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(a_position);
            this.gl.drawArrays(this.gl.POINTS, 0, (this.pointsVector.size / 2));
        }
    }
}