﻿import { Vec3, Mat4 } from "cuon-matrix-ts";

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
    private _pointsVertexBuffer: VertexBuffer;
    private _linesVertexBuffer: VertexBuffer;
    private _lineStripVertexBuffer: VertexBuffer;
    private _lineLoopVertexBuffer: VertexBuffer;
    private _trianglesVertexBuffer: VertexBuffer;
    private _triangleStripVertexBuffer: VertexBuffer;
    private _triangleFanVertexBuffer: VertexBuffer;
    private _vertexBuffers: Array<VertexBuffer>;
    private _trianglesShapeBuffer: ShapeBuffer<Triangle>;
    private _rectanglesShapeBuffer: ShapeBuffer<Rectangle>;
    private _hexagonsShapeBuffer: ShapeBuffer<Hexagon>;
    private _octogonsShapeBuffer: ShapeBuffer<Octogon>;
    private _ellipsesShapeBuffer: ShapeBuffer<Ellipse>;
    private _boxShapeBuffer: ShapeBuffer<Box>;
    private _shapeBuffers: Array<ShapeBuffer<Shape>>;
    private _shaderProgram: WebGLShader;
    private _instancedArraysExt: ANGLE_instanced_arrays;
// end_region: member variables

// region: shaders
    private _vertexShaderSource: string =
    `    attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    uniform mat4 ${ShaderSettings.mvpMatrixUniformName};
    uniform float ${ShaderSettings.pointSizeUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.mvpMatrixUniformName} * ${ShaderSettings.positionAttributeName};
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

        this.initializeVertexBuffers();
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

    public addXYZPointToScene(x: number, y: number, z: number = 0,
        r: number = Settings.defaultColor.red, g: number = Settings.defaultColor.green,
        b: number = Settings.defaultColor.blue, renderMode: number = this._glRenderMode): void
    {
        switch (renderMode)
        {
            case this.gl.POINTS:
                this._pointsVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINES:
                this._linesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVertexBuffer.addVertex(new Float32Array([x, y, z, r, g, b]));
                break;
        }
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
                return this._trianglesShapeBuffer.removeShape(id);
            case "hexagons":
                return this._trianglesShapeBuffer.removeShape(id);
            case "octogons":
                return this._trianglesShapeBuffer.removeShape(id);
            case "ellipses":
                return this._trianglesShapeBuffer.removeShape(id);
            case "box":
                return this._trianglesShapeBuffer.removeShape(id);
        }

        return this.removeShapeFromUnspecifiedBuffer(id);
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

        for (let vb of this._vertexBuffers)
        {
            for (let verts of vb.verticiesStack)
            {
                if (verts.size > 0)
                {
                    this.drawGlArray(verts.getTrimmedArray(), vb.glRenderMode);
                }
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
        this.getGlExtensions();

        this.setViewPortDimensions(this._canvas.width, this._canvas.height);
        this.initShaders();
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

    private getGlExtensions(): void
    {
        this._instancedArraysExt = this.gl.getExtension(Settings.instancedArrayExtensionName);
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

    private initializeVertexBuffers()
    {
        this._pointsVertexBuffer = new VertexBuffer(this.gl.POINTS, this.gl);
        this._linesVertexBuffer = new VertexBuffer(this.gl.LINES, this.gl);
        this._lineStripVertexBuffer = new VertexBuffer(this.gl.LINE_STRIP, this.gl);
        this._lineLoopVertexBuffer = new VertexBuffer(this.gl.LINE_LOOP, this.gl);
        this._trianglesVertexBuffer = new VertexBuffer(this.gl.TRIANGLES, this.gl);
        this._triangleStripVertexBuffer = new VertexBuffer(this.gl.TRIANGLE_STRIP, this.gl);
        this._triangleFanVertexBuffer = new VertexBuffer(this.gl.TRIANGLE_FAN, this.gl);
        this._vertexBuffers = [
            this._pointsVertexBuffer,
            this._linesVertexBuffer,
            this._lineStripVertexBuffer,
            this._lineLoopVertexBuffer,
            this._trianglesVertexBuffer,
            this._triangleStripVertexBuffer,
            this._triangleFanVertexBuffer
        ];
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

    private drawGlArray(arr: Float32Array, renderMode: number,
        modelMatrix: Mat4 = Settings.defaultModelMatrix): void
    {
        const a_position = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.positionAttributeName);
        const a_color = this.gl.getAttribLocation(this._shaderProgram, ShaderSettings.colorAttributeName);
        const u_pointSize = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.pointSizeUniformName);
        const u_mvpMatrix = this.gl.getUniformLocation(this._shaderProgram, ShaderSettings.mvpMatrixUniformName);

        if (!u_pointSize || !u_mvpMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.pointSizeUniformName] = u_pointSize;
            uniformsMap[ShaderSettings.mvpMatrixUniformName] = u_mvpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }

        const floatSize = arr.BYTES_PER_ELEMENT;
        const bytesPerPoint = floatSize * Constants.floatsPerPoint;
        const bytesPerVertex = floatSize * Constants.floatsPerPoint;

        let vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW); // ur cutieful
        this.gl.vertexAttribPointer(a_position, Constants.floatsPerPoint, this.gl.FLOAT,
            false, bytesPerVertex, 0);
        this.gl.enableVertexAttribArray(a_position);
        this.gl.vertexAttribPointer(a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, bytesPerVertex, bytesPerPoint);
        this.gl.enableVertexAttribArray(a_color);
        this.gl.uniformMatrix4fv(u_mvpMatrix, false, this._camera.viewMatrix.multiply(modelMatrix).elements);
        this.gl.uniform1f(u_pointSize, this._pointSize);
        this.gl.drawArrays(renderMode, 0, (arr.length / Constants.floatsPerPoint));
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
// end_region: private methods
}