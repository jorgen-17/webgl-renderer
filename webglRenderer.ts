import { Shape, Point3d } from "./Shapes";

export interface IWebGLRenderer {
    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
    gl: WebGLRenderingContext;
    addShapeToScene: (shape: Shape) => void;
    addPointToScene: (point: Point3d) => void;
    draw: () => void;
}

export class WebGLRenderer implements IWebGLRenderer {
    gl: WebGLRenderingContext;

    vertexShaderSource: string =
    "    attribute vec3 a_position;\n" +
    "    attribute float a_pointSize;\n" +
    "    void main(void) {\n" +
    "        gl_Position = vec4(a_position, 1.0);\n" +
    "        gl_PointSize = a_pointSize;\n" +
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
    scene: Array<Shape>;
    points: Array<Point3d>;

    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext) {
        this.gl = gl;
        this.setViewPortDimensions(canvasWidth, canvasHeight);
        this.initShaders();
        this.scene = new Array<Shape>();
        this.points = new Array<Point3d>();

        this.gl.clearColor(0, 0.5, 0, 0.5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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

    public addShapeToScene(shape: Shape) {
        this.scene.push(shape);
    }

    public addPointToScene(point: Point3d): void
    {
        this.points.push(point);
    }

    public draw()
    {
        // clear the background (with black)
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let shape of this.scene)
        {
            // set the vertex buffer to be drawn
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shape.buffer);

            // set the shader to use
            this.gl.useProgram(this.shaderProgram);

            // connect up the shader parameters: vertex position and projection/model matrices
            this.gl.vertexAttribPointer(this.shaderVertexPositionAttribute, shape.vertexSize, this.gl.FLOAT, false, 0, 0);

            // draw the object
            this.gl.drawArrays(shape.primitiveType, 0, shape.numberOfVerticies);
        }

        for(let point of this.points)
        {
            let a_position = this.gl.getAttribLocation(this.shaderProgram, 'a_position');
            let a_pointSize = this.gl.getAttribLocation(this.shaderProgram, 'a_pointSize');
            this.gl.vertexAttrib3f(a_position, point.x, point.y, point.z);
            this.gl.vertexAttrib1f(a_pointSize, point.pointSize);
            this.gl.drawArrays(this.gl.POINTS, 0, 1);
        }
    }
}