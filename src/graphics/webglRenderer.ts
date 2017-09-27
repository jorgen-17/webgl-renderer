import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Shape} from "./shape/shape";
import { Float32Vector } from "../utils/float32Vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { VertexBuffer } from "./vertexBuffer";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shape/shapeMode";
import { Triangle } from "./shape/shape2d/triangle";
import { RGBColor } from "./color/rgbColor";
import { Camera } from "./camera";
import { RenderingOptions } from "./renderingOptions";
import { StringDictionary } from "../utils/dictionary";
import { Constants } from "../constants";
import { ShaderSettings } from "../shaderSettings";
import { ShaderType } from "./shaderType";
import { Line } from "./shape/shape2d/line";
import { Settings } from "../settings";
import { BrowserHelper } from "../utils/browserHelper";
import { ShapeBuffer } from "./shape/shapeBuffer";
import { Rectangle } from "./shape/shape2d/rectangle";
import { Hexagon } from "./shape/shape2d/hexagon";
import { Octogon } from "./shape/shape2d/octogon";
import { Ellipse } from "./shape/shape2d/ellipse";
import { Box } from "./shape/shape3d/box";

export class WebGLRenderer
{
// region: member variables
    public gl: WebGLRenderingContext;
    private _isContextLost: boolean;
    private _canvas: HTMLCanvasElement;
    private _browserHelper: BrowserHelper;
    private _glRenderMode: number;
    private _renderMode: RenderMode;
    private _pointSize: number;
    private _backgroundColor: RGBColor;
    private _camera: Camera;
    private _window: Window;
    private _isFullscreen: boolean;
    private _animationFrameRequestId: number;
    private _resizeCallback: (canvas: HTMLCanvasElement, window: Window,
        renderer: WebGLRenderer) => void;
    private _trianglesShapeBuffer: ShapeBuffer<Triangle>;
    private _rectanglesShapeBuffer: ShapeBuffer<Rectangle>;
    private _hexagonsShapeBuffer: ShapeBuffer<Hexagon>;
    private _octogonsShapeBuffer: ShapeBuffer<Octogon>;
    private _ellipsesShapeBuffer: ShapeBuffer<Ellipse>;
    private _boxShapeBuffer: ShapeBuffer<Box>;
    private _shapeBuffers: Array<ShapeBuffer<Shape>>;
    private _shaderProgram: WebGLShader;
    private _a_position: number;
    private _a_color: number;
    private _a_modelMatrixRow0: number;
    private _a_modelMatrixRow1: number;
    private _a_modelMatrixRow2: number;
    private _a_modelMatrixRow3: number;
    private _u_pointSize: WebGLUniformLocation  | null;
    private _u_vpMatrix: WebGLUniformLocation  | null;
    private _instancedArraysExt: ANGLE_instanced_arrays;
// end_region: member variables

// region: shaders
    private _vertexShaderSource: string =
    `    attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    attribute mat4 ${ShaderSettings.modelMatrixAttributeName};
    uniform mat4 ${ShaderSettings.vpMatrixUniformName};
    uniform float ${ShaderSettings.pointSizeUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.vpMatrixUniformName} * ${ShaderSettings.modelMatrixAttributeName} * ${ShaderSettings.positionAttributeName};
        gl_PointSize = ${ShaderSettings.pointSizeUniformName};
        v_color = ${ShaderSettings.colorAttributeName};
    }`;

    private _fragmentShaderSource: string =
    `    precision mediump float;
    uniform vec4 u_fragColor;
    varying vec4 v_color;
    void main(void)
    {
        gl_FragColor = v_color;
    }`;
// end_region: shaders

// region: constructor
    constructor(canvas: HTMLCanvasElement, renderingOptions: RenderingOptions = {})
    {
        this._canvas = canvas;
        this.setCanvasEventHandlers();
        this._browserHelper = renderingOptions.browserHelper || new BrowserHelper();

        this.setupGlResources();

        this.initializeRenderingOptions(renderingOptions);

        this.initializaShapeBuffers();

        this.setupWindowCallbacks();
    }
// end_region: constructor

// region: getters and setters
    public get renderMode(): RenderMode
    {
        return this._renderMode;
    }

    public set renderMode(renderMode: RenderMode)
    {
        this._renderMode = renderMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);
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

    public get isFullscreen(): boolean
    {
        return this._isFullscreen;
    }

    public set isFullscreen(value: boolean)
    {
        this._isFullscreen = value;
        this.setupWindowCallbacks();
    }

    public get resizeCallback(): (canvas: HTMLCanvasElement,
        window: Window, renderer: WebGLRenderer) => void
    {
        return this._resizeCallback;
    }

    public set resizeCallback(value: (canvas: HTMLCanvasElement,
        window: Window, renderer: WebGLRenderer) => void)
    {
        this._resizeCallback = value;
        this.setupWindowCallbacks();
    }

    public get camera(): Camera
    {
        return this._camera;
    }

    public set camera(value: Camera)
    {
        this._camera = value;
    }
// end_region: getters and setters

// region: public methods
    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public addShapeToScene(shape: Shape): string
    {
        switch (shape.shapeMode)
        {
            case "triangles":
                return this._trianglesShapeBuffer.addShape(shape as Triangle);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShape(shape as Rectangle);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShape(shape as Hexagon);
            case "octogons":
                return this._octogonsShapeBuffer.addShape(shape as Octogon);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShape(shape as Ellipse);
            case "box":
                return this._boxShapeBuffer.addShape(shape as Box);
        }

        return "";
    }

    public addHomogenoeusShapesArrayToScene(shapes: Array<Shape>): Array<string>
    {
        const shape = shapes.pop();

        if (!shape)
        {
            return new Array<string>();
        }

        switch (shape.shapeMode)
        {
            case "triangles":
                return this._trianglesShapeBuffer.addShapes(shapes as Array<Triangle>);
            case "rectangles":
                return this._rectanglesShapeBuffer.addShapes(shapes as Array<Rectangle>);
            case "hexagons":
                return this._hexagonsShapeBuffer.addShapes(shapes as Array<Hexagon>);
            case "octogons":
                return this._octogonsShapeBuffer.addShapes(shapes as Array<Octogon>);
            case "ellipses":
                return this._ellipsesShapeBuffer.addShapes(shapes as Array<Ellipse>);
            case "box":
                return this._boxShapeBuffer.addShapes(shapes as Array<Box>);
        }

        return new Array<string>();
    }

    public addHeterogenoeusShapesArrayToScene<S extends Shape>(shapes: Array<S>): void
    {
        for (let shape of shapes)
        {
            this.addShapeToScene(shape);
        }
    }

    public removeAllShapes(): void
    {
        this.initializaShapeBuffers();
    }

    public removeShape(id: string, shapeMode?: ShapeMode): boolean
    {
        switch (shapeMode)
        {
            case "triangles":
                return this._trianglesShapeBuffer.removeShape(id);
            case "rectangles":
                return this._rectanglesShapeBuffer.removeShape(id);
            case "hexagons":
                return this._hexagonsShapeBuffer.removeShape(id);
            case "octogons":
                return this._octogonsShapeBuffer.removeShape(id);
            case "ellipses":
                return this._ellipsesShapeBuffer.removeShape(id);
            case "box":
                return this._boxShapeBuffer.removeShape(id);
        }

        return this.removeShapeFromUnspecifiedBuffer(id);
    }

    public updateShapeColor(id: string, newColor: RGBColor,
        shapeMode?: ShapeMode): boolean
    {
        switch (shapeMode)
        {
            case "triangles":
                return this._trianglesShapeBuffer.updateColor(id, newColor);
            case "rectangles":
                return this._rectanglesShapeBuffer.updateColor(id, newColor);
            case "hexagons":
                return this._hexagonsShapeBuffer.updateColor(id, newColor);
            case "octogons":
                return this._octogonsShapeBuffer.updateColor(id, newColor);
            case "ellipses":
                return this._ellipsesShapeBuffer.updateColor(id, newColor);
            case "box":
                return this._boxShapeBuffer.updateColor(id, newColor);
        }

        return this.updateShapeColorFromUnspecifiedBuffer(id, newColor);
    }

    public start()
    {
        this.renderLoop();
    }

    public stop()
    {
        this._window.cancelAnimationFrame(this._animationFrameRequestId);
    }
// end_region: public methods

// region: protected methods
    protected draw()
    {
        this.gl.clearColor(this._backgroundColor.red,
            this._backgroundColor.green,
            this._backgroundColor.blue, Settings.defaultBackgroundAlpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (let sb of this._shapeBuffers)
        {
            if (sb.count > 0)
            {
                this.drawShapeBuffer(sb);
            }
        }
    }
// end_region: protected methods

// region: private methods
    private setCanvasEventHandlers (): void
    {
        this._canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
        this._canvas.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }

    private setupGlResources()
    {
        this.getContext();

        this.setViewPortDimensions(this._canvas.width, this._canvas.height);
        this.initShaders();

        this.getShaderVariables();
    }

    private getContext (): void
    {
        let gl: WebGLRenderingContext | null;

        const isIE = this._browserHelper.isIE();
        const isEdge = this._browserHelper.isEdge();
        const contextId = (isIE || isEdge) ? "experimental-webgl" : "webgl";

        try
        {
            gl = this._canvas.getContext(contextId,
                {
                    alpha: false,
                    antialias: false,
                    depth: true
                });
        }
        catch (e)
        {
            throw `error creating webgl context!: ${e.toString()}`;
        }

        if (gl === null)
        {
            throw `error creating webgl context!, gl === null`;
        }

        this._isContextLost = false;
        this.gl = gl;
    }

    private handleContextLost = (event: WebGLContextEvent) =>
    {
        this.stop();
        event.preventDefault();
        this._isContextLost = true;
    }

    private handleContextRestored = () =>
    {
        this._isContextLost = false;
        this.setupGlResources();
        this.start();
    }

    private initializeRenderingOptions(renderingOptions: RenderingOptions | null)
    {
        this._renderMode = (renderingOptions && renderingOptions.renderMode) || Settings.defaultRendereMode;
        this._glRenderMode = RenderModeMapper.renderModeToWebGlConstant(this._renderMode, this.gl);
        this._pointSize = (renderingOptions && renderingOptions.pointSize) || Settings.defaultPointSize;
        this._backgroundColor = (renderingOptions && renderingOptions.backgroundColor) || Settings.defaultBackgroundColor;
        this._camera = (renderingOptions && renderingOptions.camera) || new Camera((this._canvas.width / this._canvas.height));
        this._window = (renderingOptions && renderingOptions.window) || window;
        this._isFullscreen = (renderingOptions && renderingOptions.fullscreen) || Settings.defaultIsFullScreen;
        this._resizeCallback = (renderingOptions && renderingOptions.resizeCallback) || this.resizeCanvas;
    }

    private initializaShapeBuffers()
    {
        this._trianglesShapeBuffer = new ShapeBuffer<Triangle>();
        this._rectanglesShapeBuffer = new ShapeBuffer<Rectangle>();
        this._hexagonsShapeBuffer = new ShapeBuffer<Hexagon>();
        this._octogonsShapeBuffer = new ShapeBuffer<Octogon>();
        this._ellipsesShapeBuffer = new ShapeBuffer<Ellipse>();
        this._boxShapeBuffer = new ShapeBuffer<Box>();
        this._shapeBuffers = [
            this._trianglesShapeBuffer,
            this._rectanglesShapeBuffer,
            this._hexagonsShapeBuffer,
            this._octogonsShapeBuffer,
            this._ellipsesShapeBuffer,
            this._boxShapeBuffer
        ];
    }

    private getShaderVariables(): void
    {
        this._a_position = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.positionAttributeName);
        this._a_color = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.colorAttributeName);
        this._a_modelMatrixRow0 = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.modelMatrixAttributeName);
        this._a_modelMatrixRow1 = this._a_modelMatrixRow0 + 1;
        this._a_modelMatrixRow2 = this._a_modelMatrixRow0 + 2;
        this._a_modelMatrixRow3 = this._a_modelMatrixRow0 + 3;
        this._u_pointSize = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.pointSizeUniformName);
        this._u_vpMatrix = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.vpMatrixUniformName);
    }

    private drawShapeBuffer(shapeBuffer: ShapeBuffer<Shape>): void
    {
        if (!this._u_pointSize || !this._u_vpMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.pointSizeUniformName] = this._u_pointSize;
            uniformsMap[ShaderSettings.vpMatrixUniformName] = this._u_vpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }

        const verticies = shapeBuffer.verticies;
        const floatSize = verticies.BYTES_PER_ELEMENT;
        const bytesPerPoint = floatSize * Constants.floatsPerPoint;
        const bytesPerColor = floatSize * Constants.floatsPerPoint;
        const bytesPerPointColor = bytesPerPoint + bytesPerColor;
        const bytesPerVertex = floatSize * Constants.floatsPerVertex;
        const floatsPerRow = Constants.floatsPerMat4Row;
        const bytesPerRow = floatsPerRow * floatSize;
        const bytesPerMatrix = bytesPerRow * floatSize;
        const modelMatrixRow0Offset = bytesPerPointColor + (bytesPerRow * 0);
        const modelMatrixRow1Offset = bytesPerPointColor + (bytesPerRow * 1);
        const modelMatrixRow2Offset = bytesPerPointColor + (bytesPerRow * 2);
        const modelMatrixRow3Offset = bytesPerPointColor + (bytesPerRow * 3);

        const shapePrototype = shapeBuffer.first;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW); // ur cutieful
        this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPoint, this.gl.FLOAT,
            false, bytesPerVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, bytesPerVertex, bytesPerPoint);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow0, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, bytesPerVertex, modelMatrixRow0Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow0);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow1, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, bytesPerVertex, modelMatrixRow1Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow1);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow2, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, bytesPerVertex, modelMatrixRow2Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow2);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow3, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, bytesPerVertex, modelMatrixRow3Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow3);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, this._camera.vpMatrix.elements);
        this.gl.uniform1f(this._u_pointSize, this._pointSize);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerVertex));
        this.gl.deleteBuffer(vertexBuffer);
    }

    private initShaders(): void
    {
        const fragmentShader = this.createShader(this._fragmentShaderSource, "fragment");
        const vertexShader = this.createShader(this._vertexShaderSource, "vertex");

        let shader: WebGLProgram | null = this.gl.createProgram();
        if (shader === null)
        {
            throw "could not create shader program";
        }

        this._shaderProgram = shader;
        this.gl.attachShader(this._shaderProgram, vertexShader);
        this.gl.attachShader(this._shaderProgram, fragmentShader);
        this.gl.linkProgram(this._shaderProgram);

        if (!this.gl.getProgramParameter(this._shaderProgram, this.gl.LINK_STATUS))
        {
            throw "could not link shader program";
        }

        this.gl.useProgram(this._shaderProgram);
    }

    private createShader(shaderSource: string, type: ShaderType): WebGLShader | null
    {
        let shader: WebGLShader | null = null;
        if (type === "fragment")
        {
            shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        }
        else if (type === "vertex")
        {
            shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        }

        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            throw `could not compile shader, shader info log: ${this.gl.getShaderInfoLog(shader)}`;
        }
        return shader;
    }

    private createUniforNotFoundErrorMessage(uniformsMap: StringDictionary<WebGLUniformLocation | null>): string
    {
        let result = `cannot find uniform in shader program\n`;

        result += `potential culprits:\n`;

        for (let key in uniformsMap)
        {
            if (uniformsMap.hasOwnProperty(key))
            {
                result += `\t${key}: ${uniformsMap[key]}\n`;
            }
        }

        return result;
    }

    private renderLoop = () =>
    {
        this.draw();
        this._animationFrameRequestId = this._window.requestAnimationFrame(this.renderLoop);
    }

    private setupWindowCallbacks()
    {
        if (this._isFullscreen)
        {
            this._window.addEventListener("resize",
                () => {
                    if (!this._isContextLost)
                    {
                        this._resizeCallback(this._canvas, this._window, this);
                    }
                }, false);
            this._resizeCallback(this._canvas, this._window, this);
        }
    }

    private resizeCanvas = (canvas: HTMLCanvasElement, window: Window,
        renderer: WebGLRenderer) =>
    {
        renderer.setViewPortDimensions(window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderer.camera.aspectRatio = (this._canvas.width / this._canvas.height);
    }

    private removeShapeFromUnspecifiedBuffer(id: string): boolean
    {
        for (let shapeBuffer of this._shapeBuffers)
        {
            if (shapeBuffer.removeShape(id))
            {
                return true;
            }
        }

        return false;
    }

    private updateShapeColorFromUnspecifiedBuffer(id: string, newColor: RGBColor): boolean
    {
        for (let shapeBuffer of this._shapeBuffers)
        {
            if (shapeBuffer.updateColor(id, newColor))
            {
                return true;
            }
        }

        return false;
    }
// end_region: private methods
}