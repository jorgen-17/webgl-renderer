//#region imports
import { Vec3, Mat4 } from "cuon-matrix-ts";
import * as cuid from "cuid";

import { RenderMode, RenderModeMapper } from "./renderModeMapper";
import { Camera } from "./camera";
import { Shape } from "./shape/shape";
import { ShapeMode } from "./shape/shapeMode";
import { RGBColor } from "./color/rgbColor";
import { RenderingOptions } from "./renderingOptions";
import { ShapeBuffer } from "./shape/shapeBuffer";
import { Line } from "./shape/line";
import { Point } from "./shape/point";
import { Triangle } from "./shape/triangle";
import { Rectangle } from "./shape/rectangle";
import { Hexagon } from "./shape/hexagon";
import { Octogon } from "./shape/octogon";
import { Ellipse } from "./shape/ellipse";
import { Box } from "./shape/box";
import { StringDictionary } from "../utils/dictionary";
import { Constants } from "../constants";
import { ShaderSettings } from "../shaderSettings";
import { ShaderType } from "./shaderType";
import { Settings } from "../settings";
import { BrowserHelper } from "../utils/browserHelper";
import { DynamicShape } from "./shape/dynamicShape";
import { PointBuffer } from "./shape/pointBuffer";
import { ShapeFactory } from "./shape/shapeFactory";
import { VertexBuffer } from "./vertexBuffer";
//#endregion

export class WebGLRenderer
{
    //#region: member variables
    public gl: WebGLRenderingContext;
    private _canvas: HTMLCanvasElement;
    private _pointsShapeBuffer: PointBuffer;
    private _lineBuffer: StringDictionary<Line>;
    private _dynamicShapeBuffers: Array<ShapeBuffer<DynamicShape>>;
    private _vertexBuffers: Array<VertexBuffer>;
    private _a_position: number;
    private _a_color: number;
    private _a_pointSize: number;
    private _a_modelMatrixRow0: number;
    private _a_modelMatrixRow1: number;
    private _a_modelMatrixRow2: number;
    private _a_modelMatrixRow3: number;
    private _u_vpMatrix: WebGLUniformLocation  | null;
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
    private _shapeFactory: ShapeFactory;
    private _camera: Camera;
    private _trianglesShapeBuffer: ShapeBuffer<Triangle>;
    private _rectanglesShapeBuffer: ShapeBuffer<Rectangle>;
    private _hexagonsShapeBuffer: ShapeBuffer<Hexagon>;
    private _octogonsShapeBuffer: ShapeBuffer<Octogon>;
    private _ellipsesShapeBuffer: ShapeBuffer<Ellipse>;
    private _boxShapeBuffer: ShapeBuffer<Box>;

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
    constructor(canvas: HTMLCanvasElement, renderingOptions: RenderingOptions = {})
    {
        this._canvas = canvas;

        this._camera = new Camera(this._canvas.width / this._canvas.height);

        this._postResizeCallback = (leCanvas: HTMLCanvasElement, window: Window,
            renderer: WebGLRenderer) =>
        {
            this._camera.aspectRatio = (leCanvas.width / leCanvas.height);
        };

        this.setCanvasEventHandlers();

        this._browserHelper = renderingOptions.browserHelper || new BrowserHelper();

        this.setupGlResources();

        this.initializeRenderingOptions(renderingOptions);

        this.initializaBuffers();

        this.setupWindowCallbacks();

        this._shapeFactory = new ShapeFactory();
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

    private set postResizeCallback(value: (canvas: HTMLCanvasElement,
        window: Window, renderer: WebGLRenderer) => void)
    {
        this._postResizeCallback = value;
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

    public get shapeFactory(): ShapeFactory
    {
        return this._shapeFactory;
    }
     //#endregion: getters and setters

    //#region: public methods
    public setViewPortDimensions(newWidth: number, newHeight: number): void
    {
        this.gl.viewport(0, 0, newWidth, newHeight);
    }

    public getAllShapesInScene(): Array<Shape>
    {
        let arr = new Array<Shape>();

        arr.push(...this._pointsShapeBuffer.getShapes())
        arr.push(...this._trianglesShapeBuffer.getShapes())
        arr.push(...this._rectanglesShapeBuffer.getShapes())
        arr.push(...this._hexagonsShapeBuffer.getShapes())
        arr.push(...this._octogonsShapeBuffer.getShapes())
        arr.push(...this._ellipsesShapeBuffer.getShapes())
        arr.push(...this._boxShapeBuffer.getShapes())

        return arr;
    }

    public addShapeToScene(shape: Shape): string
    {
        switch (shape.shapeMode)
        {
            case "points":
                return this._pointsShapeBuffer.addShape(shape as Point);
            case "lines":
                return this.addLine(shape as Line);
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
        const shape = shapes[0];

        if (!shape)
        {
            return new Array<string>();
        }

        switch (shape.shapeMode)
        {
            case "points":
                return this._pointsShapeBuffer.addShapes(shapes as Array<Point>);
            case "lines":
                return this.addLines(shapes as Array<Line>);
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

    public addHeterogenoeusShapesArrayToScene<S extends Shape>(shapes: Array<S>): Array<string>
    {
        let shapeIds = new Array<string>();

        for (let shape of shapes)
        {
            shapeIds.push(this.addShapeToScene(shape));
        }

        return shapeIds;
    }

    public addVertexToScene(position: Vec3, renderMode: RenderMode, color: RGBColor): void
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

    public addPointToLine(id: string, point: Vec3): boolean
    {
        if (this._lineBuffer[id])
        {
            this._lineBuffer[id].addVertex(point);
            return true;
        }

        return false;
    }

    public removeAllShapes(): void
    {
        this.initializaShapeBuffers();
    }

    public removeAllVerticies(): void
    {
        this.initializeVertexBuffers();
    }

    public removeShape(id: string, shapeMode?: ShapeMode): boolean
    {
        switch (shapeMode)
        {
            case "points":
                return this._pointsShapeBuffer.removeShape(id);
            case "lines":
                return this.removeLine(id);
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
            case "points":
                return this._pointsShapeBuffer.updateColor(id, newColor);
            case "lines":
                return this.updateLineColor(id, newColor);
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
    // protected in order to be able to call it from mock class
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
    //#endregion: protected methods

    //#region: private methods
    private drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void
    {
        const mvpMatrix = this._camera.vpMatrix.elements
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
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, this._camera.vpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerPointVertex));
    }

    private drawLine(line: Line): void
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
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, this._camera.vpMatrix.elements);
        this.gl.drawArrays(line.glRenderMode, 0, (verticies.length / Constants.floatsPerPointVertex));
    }

    private drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void
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
        this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, this._camera.vpMatrix.elements);
        this.gl.drawArrays(shapePrototype.glRenderMode, 0, (verticies.length / Constants.floatsPerDynamicVertex));
    }

    private drawVertexBuffer(vb: VertexBuffer): void
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
            this.gl.uniformMatrix4fv(this._u_vpMatrix as WebGLUniformLocation, false, this._camera.vpMatrix.elements);
            this.gl.drawArrays(vb.glRenderMode, 0, (arr.length / Constants.floatsPerPositionColor));
        }
    }

    private initializaDynamicShapeBuffers(): void
    {
        this._trianglesShapeBuffer = new ShapeBuffer<Triangle>(this.gl);
        this._rectanglesShapeBuffer = new ShapeBuffer<Rectangle>(this.gl);
        this._hexagonsShapeBuffer = new ShapeBuffer<Hexagon>(this.gl);
        this._octogonsShapeBuffer = new ShapeBuffer<Octogon>(this.gl);
        this._ellipsesShapeBuffer = new ShapeBuffer<Ellipse>(this.gl);
        this._boxShapeBuffer = new ShapeBuffer<Box>(this.gl);
        this._dynamicShapeBuffers = [
            this._trianglesShapeBuffer,
            this._rectanglesShapeBuffer,
            this._hexagonsShapeBuffer,
            this._octogonsShapeBuffer,
            this._ellipsesShapeBuffer,
            this._boxShapeBuffer
        ];
    }

    private addLine(line: Line): string
    {
        const id = cuid();
        this._lineBuffer[id] = line;
        return id;
    }

    private addLines(lines: Array<Line>): Array<string>
    {
        let ids: Array<string> = [];

        for (let line of lines)
        {
            ids.push(this.addLine(line));
        }

        return ids;
    }

    private removeLine(id: string): boolean
    {
        if (this._lineBuffer[id])
        {
            delete this._lineBuffer[id];
            return true;
        }

        return false;
    }

    private updateLineColor(id: string, newColor: RGBColor): boolean
    {
        if (this._lineBuffer[id])
        {
            this._lineBuffer[id].rgbColor = newColor;
            return true;
        }

        return false;
    }

    private removeShapeFromUnspecifiedBuffer(id: string): boolean
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

    private updateShapeColorFromUnspecifiedBuffer(id: string, newColor: RGBColor): boolean
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