/// <reference path="../node_modules/cuon-matrix-ts/index.d.ts" />
declare module 'graphics/renderModeMapper' {
	export type RenderMode = "points" | "lines" | "lineStrip" | "lineLoop" | "triangles" | "triangleStrip" | "triangleFan";
	export class RenderModeMapper {
	    static renderModeToWebGlConstant(mode: RenderMode, gl: WebGLRenderingContext): number;
	}

}
declare module 'constants' {
	export let Constants: {
	    floatsPerPoint: number;
	    floatsPerColor: number;
	    floatsPerVertex: number;
	    verticiesPerTriangle: number;
	    floatsPerTriangle: number;
	    vertexBufferFloatLimit: number;
	    defaultAlpha: number;
	    lineGlRenderMode: "lineStrip";
	};

}
declare module 'utils/float32Vector' {
	export class Float32Vector {
	    arr: Float32Array;
	    size: number;
	    private _sizeLimit;
	    constructor(arr?: Float32Array, sizeLimit?: number);
	    addNumber(number: number): boolean;
	    addArray(arr: Float32Array | Array<number>): boolean;
	    getTrimmedArray(): Float32Array;
	}

}
declare module 'graphics/rgbColor' {
	export class RGBColor {
	    red: number;
	    green: number;
	    blue: number;
	    constructor(red: number, green: number, blue: number);
	}

}
declare module 'graphics/shapes2d/boundingRectangle' {
	import { Vec3 } from "cuon-matrix-ts";
	export class BoundingRectangle {
	    topLeft: Vec3;
	    topRight: Vec3;
	    bottomRight: Vec3;
	    bottomLeft: Vec3;
	    constructor(point1: Vec3, point2: Vec3);
	    private isTopLeftBottomRight(point1, point2);
	    private isBottomRightTopLeft(point1, point2);
	    private isBottomLeftTopRight(point1, point2);
	}

}
declare module 'graphics/shapes2d/shapeMode' {
	export type ShapeMode = "points" | "lines" | "triangles" | "rectangles" | "hexagons" | "octogons" | "ellipses";

}
declare module 'graphics/drawingMode' {
	export enum DrawingMode {
	    Shapes = 0,
	    Verticies = 1,
	}

}
declare module 'graphics/camera' {
	import { Vec3 } from "cuon-matrix-ts";
	export class Camera {
	    private _viewMatrix;
	    private _eyePosition;
	    private _lookAtPoint;
	    private _upPosition;
	    constructor(eyePosition?: Vec3, lookAtPoint?: Vec3, upPosition?: Vec3);
	    readonly viewMatrix: Float32Array;
	    readonly eyePosition: Vec3;
	    readonly lookAtPoint: Vec3;
	    readonly upPosition: Vec3;
	    setCameraView(eyePosition: Vec3, lookAtPoint: Vec3, upPosition: Vec3): void;
	    translateEyePosition(eyePosition: Vec3): void;
	}

}
declare module 'settings' {
	import { Vec3 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/rgbColor';
	export let Settings: {
	    defaultRendereMode: "points";
	    defaultShapeMode: "points";
	    defaultPointSize: number;
	    defaultBackgroundColor: RGBColor;
	    defaultBackgroundAlpha: number;
	    defaultColor: RGBColor;
	    defaultEyePosition: Vec3;
	    defaultLookAtPoint: Vec3;
	    defaultUpPosition: Vec3;
	    defaultIsFullScreen: boolean;
	};

}
declare module 'graphics/shapes2d/shape2d' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Float32Vector } from 'utils/float32Vector';
	import { RGBColor } from 'graphics/rgbColor';
	import { BoundingRectangle } from 'graphics/shapes2d/boundingRectangle';
	export abstract class Shape2d {
	    protected _verticies: Float32Vector;
	    glRenderMode: number;
	    protected boundingRect: BoundingRectangle;
	    private _rgbColor;
	    constructor(rgbColor?: RGBColor, point1?: Vec3 | null, point2?: Vec3 | null);
	    rgbColor: RGBColor;
	    readonly verticies: Float32Array;
	    protected abstract computeVerticies(): void;
	    protected addXYZAndColorToFloat32Array(array: Float32Array, index: number, x: number, y: number, z: number): void;
	    protected addTriangleToFloat32Array(array: Float32Array, index: number, vertex1Position: Vec3, vertex2Position: Vec3, vertex3Position: Vec3): void;
	}

}
declare module 'graphics/vertexBuffer' {
	import { Float32Vector } from 'utils/float32Vector';
	export class VertexBuffer {
	    glRenderMode: number;
	    verticiesStack: Array<Float32Vector>;
	    private _topVertexVector;
	    constructor(glRenderMode: number, gl: WebGLRenderingContext);
	    addVertex(vertex: Float32Array): void;
	    private glRenderModeValidator(glRenderMode, gl);
	}

}
declare module 'utils/browserHelper' {
	export class BrowserHelper {
	    isIE(): boolean;
	    isEdge(): boolean;
	}

}
declare module 'graphics/renderingOptions' {
	import { RenderMode } from 'graphics/renderModeMapper';
	import { RGBColor } from 'graphics/rgbColor';
	import { Camera } from 'graphics/camera';
	import { BrowserHelper } from 'utils/browserHelper';
	import { WebGLRenderer } from 'graphics/webglRenderer';
	export interface RenderingOptions {
	    browserHelper?: BrowserHelper;
	    renderMode?: RenderMode;
	    pointSize?: number;
	    backgroundColor?: RGBColor;
	    camera?: Camera;
	    window?: Window;
	    fullscreen?: boolean;
	    resizeCallback?: (canvas: HTMLCanvasElement, window: Window, renderer: WebGLRenderer) => void;
	}

}
declare module 'utils/dictionary' {
	export interface StringDictionary<T> {
	    [key: string]: T;
	}
	export interface NumberDictionary<T> {
	    [key: number]: T;
	}

}
declare module 'shaderSettings' {
	export let ShaderSettings: {
	    positionAttributeName: string;
	    colorAttributeName: string;
	    pointSizeUniformName: string;
	    viewMatrixUniformName: string;
	};

}
declare module 'graphics/shaderType' {
	export type ShaderType = "fragment" | "vertex";

}
declare module 'graphics/shapes2d/line' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Line extends Shape2d {
	    private _vertexPositions;
	    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    readonly verticies: Float32Array;
	    protected computeVerticies(): void;
	    addVertex(vertex: Vec3): void;
	}

}
declare module 'graphics/webglRenderer' {
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { RGBColor } from 'graphics/rgbColor';
	import { Camera } from 'graphics/camera';
	import { RenderingOptions } from 'graphics/renderingOptions';
	export class WebGLRenderer {
	    gl: WebGLRenderingContext;
	    private _canvas;
	    private _glRenderMode;
	    private _renderMode;
	    private _pointSize;
	    private _backgroundColor;
	    private _camera;
	    private _window;
	    private _isFullscreen;
	    private _animationFrameRequestId;
	    private _resizeCallback;
	    private _pointsVertexBuffer;
	    private _linesVertexBuffer;
	    private _lineStripVertexBuffer;
	    private _lineLoopVertexBuffer;
	    private _trianglesVertexBuffer;
	    private _triangleStripVertexBuffer;
	    private _triangleFanVertexBuffer;
	    private _vertexBuffers;
	    private _lineFloat32Arrays;
	    private _lineRenderMode;
	    private _shaderProgram;
	    private _vertexShaderSource;
	    private _fragmentShaderSource;
	    constructor(canvas: HTMLCanvasElement, renderingOptions?: RenderingOptions);
	    renderMode: RenderMode;
	    backgroundColor: RGBColor;
	    pointSize: number;
	    isFullscreen: boolean;
	    resizeCallback: (canvas: HTMLCanvasElement, window: Window, renderer: WebGLRenderer) => void;
	    camera: Camera;
	    setViewPortDimensions(newWidth: number, newHeight: number): void;
	    addXYZPointToScene(x: number, y: number, z?: number, r?: number, g?: number, b?: number, renderMode?: number): void;
	    addShapeToScene(shape: Shape2d): void;
	    addShapesToScene(shapes: Array<Shape2d>): void;
	    removeAllVeriticies(): void;
	    start(): void;
	    stop(): void;
	    protected draw(): void;
	    private getContext(canvas, browserHelper);
	    private initializeRenderingOptions(renderingOptions);
	    private initializeVertexBuffers();
	    private drawGlArray(arr, renderMode);
	    private initShaders();
	    private createShader(shaderSource, type);
	    private createUniforNotFoundErrorMessage(uniformsMap);
	    private renderLoop;
	    private setupWindowCallbacks();
	    private resizeCanvas;
	}

}
declare module 'graphics/colorMapper' {
	import { RGBColor } from 'graphics/rgbColor';
	export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "indigo" | "fuchsia" | "white";
	export class ColorMapper {
	    static colorToRGBColor(color: Color): RGBColor;
	}

}
declare module 'utils/tuple' {
	export interface Tuple<T1, T2> {
	    first: T1;
	    second: T2;
	}

}
declare module 'graphics/shapes2d/midpoint' {
	import { Tuple } from 'utils/tuple';
	import { Vec3 } from "cuon-matrix-ts";
	export class Midpoint {
	    static between(point1: Vec3, point2: Vec3): Vec3;
	}
	export class ThirdPoints {
	    static between(point1: Vec3, point2: Vec3): Tuple<Vec3, Vec3>;
	}

}
declare module 'graphics/precision' {
	export enum Precision {
	    Low = 0,
	    High = 1,
	}

}
declare module 'graphics/shapes2d/ellipse' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { Precision } from 'graphics/precision';
	import { RGBColor } from 'graphics/rgbColor';
	export class Ellipse extends Shape2d {
	    private static readonly numberOfEndPoints;
	    private static readonly highPrecisionNumberOfPointsAlongCurve;
	    private static readonly highPrecisionNumberOfVerticies;
	    private static readonly lowPrecisionNumberOfPointsAlongCurve;
	    private static readonly lowPrecisionNumberOfVerticies;
	    private center;
	    private leftEndPoint;
	    private rightEndPoint;
	    private horizontalRadius;
	    private verticalRadius;
	    private precision;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, precision?: Precision, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	    private getYDistanceFromCenterForX(x);
	}

}
declare module 'graphics/shapes2d/triangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Triangle extends Shape2d {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shapes2d/rectangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Rectangle extends Shape2d {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shapes2d/hexagon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Hexagon extends Shape2d {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shapes2d/octogon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Octogon extends Shape2d {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shapes2d/shapeFactory' {
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { ShapeMode } from 'graphics/shapes2d/shapeMode';
	import { RGBColor } from 'graphics/rgbColor';
	import { Vec3 } from "cuon-matrix-ts";
	export class ShapeFactory {
	    static createShape(point1: Vec3, point2: Vec3, shapeMode: ShapeMode, gl: WebGLRenderingContext, rgbColor?: RGBColor): Shape2d;
	    private static createTriangle(point1, point2, gl, rgbColor?);
	    private static createRectangle(point1, point2, gl, rgbColor?);
	    private static createHexagon(point1, point2, gl, rgbColor?);
	    private static createOctogon(point1, point2, gl, rgbColor?);
	    private static createEllipse(point1, point2, gl, rgbColor?);
	}

}
declare module 'graphics/shapes2d/point' {
	import { Vec3 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/rgbColor';
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	export class Point extends Shape2d {
	    private _location;
	    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'webgl-renderer' {
	import { WebGLRenderer } from 'graphics/webglRenderer';
	import { Color, ColorMapper } from 'graphics/colorMapper';
	import { Line } from 'graphics/shapes2d/line';
	import { Shape2d } from 'graphics/shapes2d/shape2d';
	import { ShapeFactory } from 'graphics/shapes2d/shapeFactory';
	import { ShapeMode } from 'graphics/shapes2d/shapeMode';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { Ellipse } from 'graphics/shapes2d/ellipse';
	import { Rectangle } from 'graphics/shapes2d/rectangle';
	import { Hexagon } from 'graphics/shapes2d/hexagon';
	import { Octogon } from 'graphics/shapes2d/octogon';
	import { Triangle } from 'graphics/shapes2d/triangle';
	import { RGBColor } from 'graphics/rgbColor';
	import { Camera } from 'graphics/camera';
	import { Point } from 'graphics/shapes2d/point';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { Vec3 } from "cuon-matrix-ts";
	import { BrowserHelper } from 'utils/browserHelper';
	export { WebGLRenderer, RenderingOptions, RGBColor, Color, ColorMapper, ShapeMode, RenderMode, Shape2d, Ellipse, Triangle, Rectangle, Line, Hexagon, Octogon, Point, ShapeFactory, Camera, Vec3, BrowserHelper };

}
