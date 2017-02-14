import { I2DShape } from "./I2DShape";

export interface IWebGLRenderer {
    canvasWidth: number;
    canvasHeight: number;
    gl: WebGLRenderingContext;
    addShapeToScene: (shape: I2DShape) => void;
    draw: () => void;
}

export class WebGLRenderer implements IWebGLRenderer {
    canvasWidth: number;
    canvasHeight: number;
    gl: WebGLRenderingContext;

    vertexShaderSource: string =
    "    attribute vec3 vertexPos;\n" +
    "    void main(void) {\n" +
    "        gl_Position = vec4(vertexPos, 1.0);\n" +
    "    }\n";

    fragmentShaderSource: string =
    "    void main(void) {\n" +
    "    //white\n" +
    "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
    "}\n";

    projectionMatrix: Float32Array;
    modelViewMatrix: Float32Array;
    shaderProgram: WebGLShader; 
    shaderVertexPositionAttribute: number;
    scene: Array<I2DShape>;

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gl = gl;
        this.initViewport();
        this.initShaders();
        this.scene = new Array<I2DShape>();

        this.gl.clearColor(0, 0.5, 0, 0.5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    private initViewport() {
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    }

    private initShaders() {
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

        // get pointers to the shader params
        this.shaderVertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "vertexPos");
        this.gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            throw Error("Could not initialise shaders");
        }
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

    public addShapeToScene(shape: I2DShape) {
        this.scene.push(shape);
    }

    public draw() {
        // clear the background (with black)
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);


        for (let shape of this.scene) {
            // set the vertex buffer to be drawn
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shape.buffer);

            // set the shader to use
            this.gl.useProgram(this.shaderProgram);

            // connect up the shader parameters: vertex position and projection/model matrices
            this.gl.vertexAttribPointer(this.shaderVertexPositionAttribute, shape.vertSize, this.gl.FLOAT, false, 0, 0);

            // draw the object
            this.gl.drawArrays(shape.primtype, 0, shape.nVerts);
        }
        
    }
}