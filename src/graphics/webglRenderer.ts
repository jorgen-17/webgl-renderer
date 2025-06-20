﻿//#region imports
import { Vec3, Mat4, Vec2 } from "cuon-matrix-ts";
import * as cuid from "cuid";

import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { ShapeMode } from "./shape/shapeMode";
import { Point } from "./shape/shape2d/point";
import { RGBColor } from "./color/rgbColor";
import { RenderingOptions } from "./renderingOptions";
import { StringDictionary } from "../utils/dictionary";
import { Constants } from "../constants";
import { ShaderSettings } from "../shaderSettings";
import { ShaderType } from "./shaderType";
import { Line } from "./shape/shape2d/line";
import { Settings } from "../settings";
import { BrowserHelper } from "../utils/browserHelper";
import { ShapeBuffer } from "./shape/shapeBuffer";
import { Shape } from "./shape/shape";
import { DynamicShape } from "./shape/dynamicShape";
import { PointBuffer } from "./shape/pointBuffer";
import { ShapeFactory } from "./shape/shapeFactory";
import { VertexBuffer } from "./vertexBuffer";
//#endregion

export abstract class WebGLRenderer
{
    //#region: member variables
    public gl: WebGLRenderingContext;
    public abstract shapeFactory: ShapeFactory;
    protected _canvas: HTMLCanvasElement;
    protected _pointsShapeBuffer: PointBuffer;
    protected _lineBuffer: StringDictionary<Line>;
    protected _dynamicShapeBuffers: Array<ShapeBuffer<DynamicShape>>;
    protected _vertexBuffers: Array<VertexBuffer>;
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
    private _pointsVertexBuffer: VertexBuffer;
    private _linesVertexBuffer: VertexBuffer;
    private _lineStripVertexBuffer: VertexBuffer;
    private _lineLoopVertexBuffer: VertexBuffer;
    private _trianglesVertexBuffer: VertexBuffer;
    private _triangleStripVertexBuffer: VertexBuffer;
    private _triangleFanVertexBuffer: VertexBuffer;
    private _pointShaderProgram: WebGLShader;
    private _dynamicShapeShaderProgram: WebGLShader;
    private _positionColorShaderProgram: WebGLShader;
    //#endregion: member variables

    //#region: shaders
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

    private _positionColorVertexShaderSource: string =
    `    attribute vec4 ${ShaderSettings.positionAttributeName};
    attribute vec4 ${ShaderSettings.colorAttributeName};
    uniform mat4 ${ShaderSettings.vpMatrixUniformName};
    varying vec4 v_color;
    void main(void)
    {
        gl_Position = ${ShaderSettings.vpMatrixUniformName} * ${ShaderSettings.positionAttributeName};
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

        this.initializaBuffers();

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

    public get calcWidth(): (newWidth: number) => number
    {
        return this._calcWidth;
    }

    public set calcWidth(value: (newWidth: number) => number)
    {
        this._calcWidth = value;
        this.setupWindowCallbacks();
    }

    public get calcHeight(): (newHeight: number) => number
    {
        return this._calcHeight;
    }

    public set calcHeight(value: (newHeight: number) => number)
    {
        this._calcHeight = value;
        this.setupWindowCallbacks();
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

    public abstract addVertexToScene(position: Vec2 | Vec3, renderMode: RenderMode, color: RGBColor): void;

    public removeAllShapes(): void
    {
        this.initializaShapeBuffers();
    }

    public removeAllVerticies(): void
    {
        this.initializeVertexBuffers();
    }

    public abstract removeShape(id: string, shapeMode?: ShapeMode): boolean;

    public abstract updateShapeColor(id: string, newColor: RGBColor,
        shapeMode?: ShapeMode): boolean;

    public updatePointSize(id: string, newPointSize: number): boolean
    {
        return this._pointsShapeBuffer.updatePointSize(id, newPointSize);
    }

    public abstract addPointToLine(id: string, point: Vec2 | Vec3): boolean;

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

        for (let key in this._lineBuffer)
        {
            if (this._lineBuffer[key])
            {
                let line = this._lineBuffer[key];
                this.drawLine(line);
            }
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

        this.gl.useProgram(this._positionColorShaderProgram);
        this.getShaderVariables(this._positionColorShaderProgram);
        for (let vb of this._vertexBuffers)
        {
            for (let verts of vb.verticiesStack)
            {
                if (verts.size > 0)
                {
                    this.drawVertexBuffer(vb);
                }
            }
        }
    }

    protected abstract drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void;

    protected abstract drawLine(line: Line): void;

    protected abstract drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void;

    protected abstract drawVertexBuffer(vertexBuffer: VertexBuffer): void;

    protected abstract initializaDynamicShapeBuffers(): void;

    protected addVertexToSceneBase(position: Vec3, renderMode: RenderMode, color: RGBColor = Settings.defaultColor): void
    {
        const glRenderMode = RenderModeMapper.renderModeToWebGlConstant(renderMode, this.gl);

        switch (glRenderMode)
        {
            case this.gl.POINTS:
                this._pointsVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINES:
                this._linesVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINE_STRIP:
                this._lineStripVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.LINE_LOOP:
                this._lineLoopVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLES:
                this._trianglesVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLE_STRIP:
                this._triangleStripVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
            case this.gl.TRIANGLE_FAN:
                this._triangleFanVertexBuffer.addVertex(new Float32Array([
                    position.x, position.y, position.z,
                    color.red, color.green, color.blue
                ]));
                break;
        }
    }

    protected addLine(line: Line): string
    {
        const id = cuid();
        this._lineBuffer[id] = line;
        return id;
    }

    protected addLines(lines: Array<Line>): Array<string>
    {
        let ids: Array<string> = [];

        for (let line of lines)
        {
            ids.push(this.addLine(line));
        }

        return ids;
    }

    protected removeLine(id: string): boolean
    {
        if (this._lineBuffer[id])
        {
            delete this._lineBuffer[id];
            return true;
        }

        return false;
    }

    protected updateLineColor(id: string, newColor: RGBColor): boolean
    {
        if (this._lineBuffer[id])
        {
            this._lineBuffer[id].rgbColor = newColor;
            return true;
        }

        return false;
    }

    protected addPointToLineBase(id: string, point: Vec3): boolean
    {
        if (this._lineBuffer[id])
        {
            this._lineBuffer[id].addVertex(point);
            return true;
        }

        return false;
    }

    protected removeShapeFromUnspecifiedBuffer(id: string): boolean
    {
        if (this._pointsShapeBuffer.removeShape(id))
        {
            return true;
        }

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
        if (this._pointsShapeBuffer.updateColor(id, newColor))
        {
            return true;
        }

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
        this.checkForUniforms();

        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPosition, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.vertexAttribPointer(this._a_pointSize, Constants.floatsPerPointSize, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, Constants.bytesPerPositionColor);
        this.gl.enableVertexAttribArray(this._a_pointSize);
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerPointVertex));
    }

    protected drawDynamicShapeBufferBase(shapeBuffer: ShapeBuffer<DynamicShape>,
        mvpMatrix: Mat4 = new Mat4().setIdentity()): void
    {
        this.checkForUniforms();

        const verticies = shapeBuffer.verticies;
        const shapePrototype = shapeBuffer.first;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeBuffer.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
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
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, mvpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerDynamicVertex));
    }

    protected drawLineBase(line: Line,
        mvpMatrix: Mat4 = new Mat4().setIdentity()): void
    {
        this.checkForUniforms();

        const verticies = line.verticies;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, line.glBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPosition, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, 0);
        this.gl.enableVertexAttribArray(this._a_position);
        this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
            false, Constants.bytesPerPointVertex, Constants.bytesPerPosition);
        this.gl.enableVertexAttribArray(this._a_color);
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, mvpMatrix.elements);
        this.gl.drawArrays(line.glRenderMode, 0, (verticies.length / Constants.floatsPerPointVertex));
    }

    protected drawVertexBufferBase(vb: VertexBuffer, mvpMatrix: Mat4 = new Mat4().setIdentity()): void
    {
        this.checkForUniforms();

        for (const vec of vb.verticiesStack)
        {
            const arr = vec.arr;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vb.glBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, arr, this.gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(this._a_position, Constants.floatsPerPosition, this.gl.FLOAT,
                false, Constants.bytesPerPositionColor, 0);
            this.gl.enableVertexAttribArray(this._a_position);
            this.gl.vertexAttribPointer(this._a_color, Constants.floatsPerColor, this.gl.FLOAT,
                false, Constants.bytesPerPositionColor, Constants.bytesPerPosition);
            this.gl.enableVertexAttribArray(this._a_color);
            this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, mvpMatrix.elements);
            this.gl.drawArrays(vb.glRenderMode, 0, (arr.length / Constants.floatsPerPositionColor));
        }
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

        this._pointShaderProgram = this.initShaders(this._pointVertexShaderSource,
            this._fragmentShaderSource);
        this._dynamicShapeShaderProgram = this.initShaders(this._dynamicVertexShaderSource,
            this._fragmentShaderSource);
        this._positionColorShaderProgram = this.initShaders(this._positionColorVertexShaderSource,
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
                }) as WebGLRenderingContext | null;
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
        this.refreshAllWebGlBuffers();
        this.start();
    }

    private initializeRenderingOptions(renderingOptions: RenderingOptions | null): void
    {
        this._backgroundColor = (renderingOptions && renderingOptions.backgroundColor) || Settings.defaultBackgroundColor;
        this._window = (renderingOptions && renderingOptions.window) || window;
        this._isFullscreen = (renderingOptions && renderingOptions.fullscreen) || Settings.defaultIsFullScreen;
        this._calcWidth = (renderingOptions && renderingOptions.calcWidth) || this.defaultCalcWidth;
        this._calcHeight = (renderingOptions && renderingOptions.calcHeight) || this.defaultCalcHeight;
    }

    private initializaBuffers(): void
    {
        this.initializaShapeBuffers();

        this.initializeVertexBuffers();
    }

    private initializaShapeBuffers(): void
    {
        this.initializaDynamicShapeBuffers();
        this.initializeVertexBuffers();

        this._pointsShapeBuffer = new PointBuffer(this.gl);
        this._lineBuffer = {};
    }

    private initializeVertexBuffers(): void
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

    private refreshAllWebGlBuffers()
    {
        this._pointsShapeBuffer.refreshWebglBuffer();

        for (let key in this._lineBuffer)
        {
            if (this._lineBuffer[key])
            {
                let line = this._lineBuffer[key];
                line.refreshWebglBuffer();
            }
        }

        for (let sb of this._dynamicShapeBuffers)
        {
            sb.refreshWebglBuffer();
        }

        for (let vb of this._vertexBuffers)
        {
            vb.refreshWebglBuffer();
        }
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
        const vertexShader = this.createShader(vertexSource, ShaderType.vertex);
        const fragmentShader = this.createShader(fragmentSource, ShaderType.fragment);

        if (vertexShader === null || fragmentShader === null) {
            throw "could not create shaders";
        }

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

        if (shader === null) {
            throw `could not create ${type} shader`;
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

    private checkForUniforms(): void
    {
        if (!this._u_vpMatrix)
        {
            const uniformsMap: StringDictionary<WebGLUniformLocation | null> = {};
            uniformsMap[ShaderSettings.vpMatrixUniformName] = this._u_vpMatrix;
            const errorMessage = this.createUniforNotFoundErrorMessage(uniformsMap);
            throw errorMessage;
        }
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

    private defaultCalcHeight = (newHeight) =>
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