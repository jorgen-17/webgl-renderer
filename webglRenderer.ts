export interface I2DShape {
    buffer: WebGLBuffer;
    vertSize: number;
    nVerts: number;
    primtype: number;
}

export interface IWebGLRenderer {
    canvasWidth: number;
    canvasHeight: number;
    gl: WebGLRenderingContext;
    addSquareToScene: () => void;
    draw: () => void;
}

export class WebGLRenderer implements IWebGLRenderer {
    canvasWidth: number;
    canvasHeight: number;
    gl: WebGLRenderingContext;

    vertexShaderSource: string =
    "    attribute vec3 vertexPos;\n" +
    "    void main(void) {\n" +
    "        // Return the transformed and projected vertex value\n" +
    "        gl_Position = vec4(vertexPos, 1.0);\n" +
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

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gl = gl;
        this.initViewport();
        this.initShaders();
        this.initMatrices();
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

        let shaderProjectionMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "projectionMatrix");
        if(shaderProjectionMatrixUniform === null)
        {
            throw Error("Could not create shader projection matrix uniform");
        }
        this.shaderProjectionMatrixUniform = shaderProjectionMatrixUniform;
        let shaderModelViewMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "modelViewMatrix");
        if(shaderModelViewMatrixUniform === null)
        {
            throw Error("Could not create shader model view matrix uniform");
        }
        this.shaderModelViewMatrixUniform = shaderModelViewMatrixUniform;

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
        const vertexBuffer: WebGLBuffer | null = this.gl.createBuffer();
        if(vertexBuffer === null)
        {
            throw Error('could not create gl buffer');
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        var verts = [
            .5, .5, 0.0,
            -.5, .5, 0.0,
            .5, -.5, 0.0,
            -.5, -.5, 0.0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verts), this.gl.STATIC_DRAW);
        const square: I2DShape = { buffer: vertexBuffer, vertSize: 3, nVerts: 4, primtype: this.gl.TRIANGLE_STRIP };
        this.scene.push(square);
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
            this.gl.uniformMatrix4fv(this.shaderProjectionMatrixUniform, false, this.projectionMatrix);
            this.gl.uniformMatrix4fv(this.shaderModelViewMatrixUniform, false, this.modelViewMatrix);

            // draw the object
            this.gl.drawArrays(shape.primtype, 0, shape.nVerts);
        }
        
    }
}