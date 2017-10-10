//#region imports
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Float32Vector } from "../utils/float32Vector";
import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { ShapeMode } from "./shape/shapeMode";
import { Point } from "./shape/shape2d/point";
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
import { Shape } from "./shape/shape";
import { DynamicShape } from "./shape/dynamicShape";
import { PointBuffer } from "./shape/pointBuffer";
//#endregion

export abstract class WebGLRenderer
{
    //#region: member variables
    public gl: WebGLRenderingContext;
    protected _canvas: HTMLCanvasElement;
    protected _pointsShapeBuffer: PointBuffer;
    protected _dynamicShapeBuffers: Array<ShapeBuffer<DynamicShape>>;
    protected _a_position: number;
    protected _a_color: number;
    protected _a_pointSize: number;
    protected _a_modelMatrixRow0: number;
    protected _a_modelMatrixRow1: number;
    protected _a_modelMatrixRow2: number;
    protected _a_modelMatrixRow3: number;
    protected _u_vpMatrix: WebGLUniformLocation  | null;
    private _isContextLost: boolean;
    private _browserHelper: BrowserHelper;
    private _backgroundColor: RGBColor;
    private _window: Window;
    private _isFullscreen: boolean;
    private _animationFrameRequestId: number;
    private _calcWidth: (newWidth: number) => number;
    private _calcHeight: (newHeight: number) => number;
    private _postResizeCallback: (canvas: HTMLCanvasElement, window: Window,
        renderer: WebGLRenderer) => void;
    private _pointShaderProgram: WebGLShader;
    private _dynamicShapeShaderProgram: WebGLShader;
    //#endregion: member variables

    //#region: shaders
    private _dynamicVertexShaderSource: string =
    `    attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    attribute mat4 ${ShaderSettings.modelMatrixAttributeName};
    uniform mat4 ${ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.vpMatrixUniformName} * ${ShaderSettings.modelMatrixAttributeName} * ${ShaderSettings.positionAttributeName};
        v_color = ${ShaderSettings.colorAttributeName};
    }`;

    private _pointVertexShaderSource: string =
    `    attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    attribute float ${ShaderSettings.pointSizeAttributeName};
    uniform mat4 ${ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.vpMatrixUniformName} * ${ShaderSettings.positionAttributeName};
        gl_PointSize = ${ShaderSettings.pointSizeAttributeName};
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
    //#endregion: shaders

    //#region: constructor
    constructor(canvas: HTMLCanvasElement, renderingOptions: RenderingOptions = {},
        postResizeCalllback: (canvas: HTMLCanvasElement, window: Window,
            renderer: WebGLRenderer) => void = () => { /* do nothing */ })
    {
        this._canvas = canvas;
        this._postResizeCallback = postResizeCalllback;

        this.setCanvasEventHandlers();
        this._browserHelper = renderingOptions.browserHelper || new BrowserHelper();

        this.setupGlResources();

        this.initializeRenderingOptions(renderingOptions);

        this.initializaShapeBuffers();

        this.setupWindowCallbacks();
    }
    //#endregion: constructor

    //#region: getters and setters
    public get backgroundColor(): RGBColor
    {
        return this._backgroundColor;
    }

    public set backgroundColor(backgroundColor: RGBColor)
    {
        this._backgroundColor = backgroundColor;
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

    protected get postResizeCallback(): (canvas: HTMLCanvasElement,
        window: Window, renderer: WebGLRenderer) => void
    {
        return this._postResizeCallback;
    }

    protected set postResizeCallback(value: (canvas: HTMLCanvasElement,
        window: Window, renderer: WebGLRenderer) => void)
    {
        this._postResizeCallback = value;
        this.setupWindowCallbacks();
    }

    //#endregion: getters and setters

    //#region: public methods
    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public abstract addShapeToScene(shape: Shape): string;

    public abstract addHomogenoeusShapesArrayToScene(shapes: Array<Shape>): Array<string>;

    public addHeterogenoeusShapesArrayToScene<S extends Shape>(shapes: Array<S>): Array<string>
    {
        let shapeIds = new Array<string>();

        for (let shape of shapes)
        {
            shapeIds.push(this.addShapeToScene(shape));
        }

        return shapeIds;
    }

    public removeAllShapes(): void
    {
        this.initializaShapeBuffers();
    }

    public abstract removeShape(id: string, shapeMode?: ShapeMode): boolean;

    public abstract updateShapeColor(id: string, newColor: RGBColor,
        shapeMode?: ShapeMode): boolean;

    public updatePointSize(id: string, newPointSize: number): boolean
    {
        return this._pointsShapeBuffer.updatePointSize(id, newPointSize);
    }

    public start()
    {
        this.renderLoop();
    }

    public stop()
    {
        this._window.cancelAnimationFrame(this._animationFrameRequestId);
    }
    //#endregion: public methods

    //#region: protected methods
    protected draw(): void
    {
        this.gl.clearColor(this._backgroundColor.red,
            this._backgroundColor.green,
            this._backgroundColor.blue, Settings.defaultBackgroundAlpha);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this._pointShaderProgram);
        this.getPointShaderVariables();
        if (this._pointsShapeBuffer.count > 0)
        {
            this.drawPointShapeBuffer(this._pointsShapeBuffer);
        }

        this.gl.useProgram(this._dynamicShapeShaderProgram);
        this.getDynamicShapeShaderVariables();
        for (let sb of this._dynamicShapeBuffers)
        {
            if (sb.count > 0)
            {
                this.drawDynamicShapeBuffer(sb);
            }
        }
    }

    protected abstract drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void;

    protected abstract drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void;

    protected abstract initializaDynamicShapeBuffers(): void;

    protected removeShapeFromUnspecifiedBuffer(id: string): boolean
    {
        for (let shapeBuffer of this._dynamicShapeBuffers)
        {
            if (shapeBuffer.removeShape(id))
            {
                return true;
            }
        }

        return false;
    }

    protected updateShapeColorFromUnspecifiedBuffer(id: string, newColor: RGBColor): boolean
    {
        for (let shapeBuffer of this._dynamicShapeBuffers)
        {
            if (shapeBuffer.updateColor(id, newColor))
            {
                return true;
            }
        }

        return false;
    }

    protected createUniforNotFoundErrorMessage(uniformsMap: StringDictionary<WebGLUniformLocation | null>): string
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

    protected drawPointShapeBufferBase(shapeBuffer: ShapeBuffer<Point>,
        mvpMatrix: Mat4 = new Mat4().setIdentity()): void
    {
        if (!this._u_vpMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.vpMatrixUniformName] = this._u_vpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }

        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.webglBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW); // ur cutieful
        this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPosition, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_pointSize, Constants.floatsPerPointSize, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, Constants.bytesPerPositionColor);
        this.gl.enableVertexAttribArray(this._a_pointSize);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerPointVertex));
    }

    protected drawDynamicShapeBufferBase(shapeBuffer: ShapeBuffer<DynamicShape>,
        mvpMatrix: Mat4 = new Mat4().setIdentity()): void
    {
        if (!this._u_vpMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.vpMatrixUniformName] = this._u_vpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }

        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.webglBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW); // ur cutieful
        this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPosition, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow0, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, Constants.modelMatrixRow0Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow0);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow1, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, Constants.modelMatrixRow1Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow1);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow2, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, Constants.modelMatrixRow2Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow2);
        this.gl.vertexAttribPointer(this._a_modelMatrixRow3, Constants.floatsPerMat4Row, this.gl.FLOAT,
            false, Constants.bytesPerDynamicVertex, Constants.modelMatrixRow3Offset);
        this.gl.enableVertexAttribArray(this._a_modelMatrixRow3);
        this.gl.uniformMatrix4fv(this._u_vpMatrix, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerDynamicVertex));
    }
    //#endregion: protected methods

    //#region: private methods
    private setCanvasEventHandlers (): void
    {
        this._canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
        this._canvas.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }

    private setupGlResources(): void
    {
        this.getContext();

        this.setViewPortDimensions(this._canvas.width, this._canvas.height);

        this._dynamicShapeShaderProgram = this.initShaders(this._dynamicVertexShaderSource,
            this._fragmentShaderSource);
        this._pointShaderProgram = this.initShaders(this._pointVertexShaderSource,
            this._fragmentShaderSource);
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

    private initializeRenderingOptions(renderingOptions: RenderingOptions | null): void
    {
        this._backgroundColor = (renderingOptions && renderingOptions.backgroundColor) || Settings.defaultBackgroundColor;
        this._window = (renderingOptions && renderingOptions.window) || window;
        this._isFullscreen = (renderingOptions && renderingOptions.fullscreen) || Settings.defaultIsFullScreen;
        this._calcWidth = (renderingOptions && renderingOptions.calcWidth) || this.defaultCalcWidth;
        this._calcHeight = (renderingOptions && renderingOptions.calcHeight) || this.defultCalcHeight;
    }

    private  initializaShapeBuffers(): void
    {
        this.initializaDynamicShapeBuffers();

        this._pointsShapeBuffer = new PointBuffer(this.gl);
    }


    private getDynamicShapeShaderVariables(): void
    {
        this.getShaderVariables(this._dynamicShapeShaderProgram);
        this._a_modelMatrixRow0 = this.gl.getAttribLocation(this._dynamicShapeShaderProgram, ShaderSettings.modelMatrixAttributeName);
        this._a_modelMatrixRow1 = this._a_modelMatrixRow0 + 1;
        this._a_modelMatrixRow2 = this._a_modelMatrixRow0 + 2;
        this._a_modelMatrixRow3 = this._a_modelMatrixRow0 + 3;
    }

    private getPointShaderVariables(): void
    {
        this.getShaderVariables(this._pointShaderProgram);
        this._a_pointSize = this.gl.getAttribLocation(this._pointShaderProgram, ShaderSettings.pointSizeAttributeName);
    }

    private getShaderVariables(shader: WebGLShader): void
    {
        this._a_position = this.gl.getAttribLocation(shader, ShaderSettings.positionAttributeName);
        this._a_color = this.gl.getAttribLocation(shader, ShaderSettings.colorAttributeName);
        this._u_vpMatrix = this.gl.getUniformLocation(shader, ShaderSettings.vpMatrixUniformName);
    }

    private initShaders(vertexSource: string, fragmentSource: string): WebGLShader
    {
        const vertexShader = this.createShader(vertexSource, "vertex");
        const fragmentShader = this.createShader(fragmentSource, "fragment");

        let shader: WebGLProgram | null = this.gl.createProgram();
        if (shader === null)
        {
            throw "could not create shader program";
        }

        const shaderProgram = shader;
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
        {
            throw "could not link shader program";
        }

        return shaderProgram;
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
                        this.resizeCanvas(this._canvas, this._window, this);
                    }
                }, false);
            this.resizeCanvas(this._canvas, this._window, this);
        }
    }

    private defaultCalcWidth = (newWidth) =>
    {
        return newWidth;
    }

    private defultCalcHeight = (newHeight) =>
    {
        return newHeight;
    }

    private resizeCanvas = (canvas: HTMLCanvasElement, window: Window,
        renderer: WebGLRenderer) =>
    {
        const newWidth = this._calcWidth(window.innerWidth);
        const newHeight = this._calcHeight(window.innerHeight);

        renderer.setViewPortDimensions(newWidth, newHeight);
        canvas.width = newWidth;
        canvas.height = newHeight;

        this._postResizeCallback(canvas, window, renderer);
    }
    //#endregion: private methods
}