export interface I2DShape {
    buffer: WebGLBuffer;
    vertSize: number;
    nVerts: number;
    primtype: number;
}

export interface IWebGLRenderer {
    canvas: HTMLCanvasElement;
    glContext: WebGLRenderingContext;
    addSquareToScene: () => void;
    draw: () => void;
}

export class WebGLRenderer implements IWebGLRenderer {
    canvas: HTMLCanvasElement;
    glContext: WebGLRenderingContext;

    vertexShaderSource: string =
    "    attribute vec3 vertexPos;\n" +
    "    uniform mat4 modelViewMatrix;\n" +
    "    uniform mat4 projectionMatrix;\n" +
    "    void main(void) {\n" +
    "        // Return the transformed and projected vertex value\n" +
    "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
    "        vec4(vertexPos, 1.0);\n" +
    "    }\n";

    fragmentShaderSource: string =
    "    void main(void) {\n" +
    "    // Return the pixel color: always output white\n" +
    "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
    "}\n";

    projectionMatrix: Float32Array;
    modelViewMatrix: Float32Array;
    shaderProgram: WebGLShader; 
    shaderVertexPositionAttribute: number;
    shaderProjectionMatrixUniform: WebGLUniformLocation;
    shaderModelViewMatrixUniform: WebGLUniformLocation;
    scene: Array<I2DShape>;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.initGl();
        this.initViewport();
        this.initShaders();
        this.initMatrices();
        this.scene = new Array<I2DShape>();

        this.glContext.clearColor(0, 0.5, 0, 0.5);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
    }

    private initGl(): void {
        let gl: WebGLRenderingContext;
        try {
            gl = this.canvas.getContext("webgl",
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });

        } catch (e) {
            const msg = `Error creating WebGL Context!: ${e.toString()}`;
            throw Error(msg);
        }

        this.glContext = gl;
    }

    private initViewport() {
        this.glContext.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    private initShaders() {
        // load and compile the fragment and vertex shader
        const fragmentShader = this.createShader(this.fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this.vertexShaderSource, "vertex");

        // link them together into a new program
        this.shaderProgram = this.glContext.createProgram();
        this.glContext.attachShader(this.shaderProgram, vertexShader);
        this.glContext.attachShader(this.shaderProgram, fragmentShader);
        this.glContext.linkProgram(this.shaderProgram);

        // get pointers to the shader params
        this.shaderVertexPositionAttribute = this.glContext.getAttribLocation(this.shaderProgram, "vertexPos");
        this.glContext.enableVertexAttribArray(this.shaderVertexPositionAttribute);

        this.shaderProjectionMatrixUniform = this.glContext.getUniformLocation(this.shaderProgram, "projectionMatrix");
        this.shaderModelViewMatrixUniform = this.glContext.getUniformLocation(this.shaderProgram, "modelViewMatrix");

        if (!this.glContext.getProgramParameter(this.shaderProgram, this.glContext.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    }

    private createShader(str, type) {
        let shader: WebGLShader;
        if (type === "fragment") {
            shader = this.glContext.createShader(this.glContext.FRAGMENT_SHADER);
        } else if (type === "vertex") {
            shader = this.glContext.createShader(this.glContext.VERTEX_SHADER);
        } else {
            return null;
        }

        this.glContext.shaderSource(shader, str);
        this.glContext.compileShader(shader);
        if (!this.glContext.getShaderParameter(shader, this.glContext.COMPILE_STATUS)) {
            alert(this.glContext.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    private initMatrices() {
        // The transform matrix for the square - translate back in Z for the camera
        this.modelViewMatrix = new Float32Array(
            [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, -3.333, 1]);

        // The projection matrix (for a 45 degree field of view)
        this.projectionMatrix = new Float32Array(
            [2.41421, 0, 0, 0,
                0, 2.41421, 0, 0,
                0, 0, -1.002002, -1,
                0, 0, -0.2002002, 0]);

    }

    public addSquareToScene() {
        const vertexBuffer = this.glContext.createBuffer();
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, vertexBuffer);
        var verts = [
            .5, .5, 0.0,
            -.5, .5, 0.0,
            .5, -.5, 0.0,
            -.5, -.5, 0.0
        ];
        this.glContext.bufferData(this.glContext.ARRAY_BUFFER, new Float32Array(verts), this.glContext.STATIC_DRAW);
        const square = { buffer: vertexBuffer, vertSize: 3, nVerts: 4, primtype: this.glContext.TRIANGLE_STRIP };
        this.scene.push(square);
    }

    public draw() {
        // clear the background (with black)
        this.glContext.clearColor(0.0, 0.0, 0.0, 1.0);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);


        for (let shape of this.scene) {
            // set the vertex buffer to be drawn
            this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, shape.buffer);

            // set the shader to use
            this.glContext.useProgram(this.shaderProgram);

            // connect up the shader parameters: vertex position and projection/model matrices
            this.glContext.vertexAttribPointer(this.shaderVertexPositionAttribute, shape.vertSize, this.glContext.FLOAT, false, 0, 0);
            this.glContext.uniformMatrix4fv(this.shaderProjectionMatrixUniform, false, this.projectionMatrix);
            this.glContext.uniformMatrix4fv(this.shaderModelViewMatrixUniform, false, this.modelViewMatrix);

            // draw the object
            this.glContext.drawArrays(shape.primtype, 0, shape.nVerts);
        }
        
    }
}