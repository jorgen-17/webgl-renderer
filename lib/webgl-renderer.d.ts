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
	    defaultAlpha: number;
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
declare module 'graphics/color/rgbColor' {
	export class RGBColor {
	    red: number;
	    green: number;
	    blue: number;
	    constructor(red: number, green: number, blue: number);
	}

}
declare module 'graphics/shape/boundingRectangle' {
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
declare module 'graphics/shape/shape2d/shape2dMode' {
	export type Shape2dMode = "points" | "lines" | "triangles" | "rectangles" | "hexagons" | "octogons" | "ellipses";

}
declare module 'graphics/drawingMode' {
	export enum DrawingMode {
	    Shapes = 0,
	    Verticies = 1,
	}

}
declare module 'graphics/camera' {
	import { Mat4, Vec3 } from "cuon-matrix-ts";
	export class Camera {
	    private _vpMatrix;
	    private _viewMatrix;
	    private _projectionMatrix;
	    private _eyePosition;
	    private _aspectRatio;
	    private _fieldOfView;
	    private _near;
	    private _far;
	    private _lookAtPoint;
	    private _upPosition;
	    constructor(aspectRatio: number, fieldOfView?: number, near?: number, far?: number, eyePosition?: Vec3, lookAtPoint?: Vec3, upPosition?: Vec3);
	    readonly vpMatrix: Mat4;
	    readonly viewMatrix: Mat4;
	    readonly projectionMatrix: Mat4;
	    aspectRatio: number;
	    fieldOfView: number;
	    near: number;
	    far: number;
	    eyePosition: Vec3;
	    lookAtPoint: Vec3;
	    upPosition: Vec3;
	    panX(xOffset: number): void;
	    panY(yOffset: number): void;
	    zoomIn(zOffset?: number): void;
	    zoomOut(zOffset?: number): void;
	    private updateView();
	    private updatePerspective();
	    private updateViewProjectionMatrix();
	}

}
declare module 'settings' {
	import { Vec3, Mat4 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
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
	    defaultFieldOfView: number;
	    defaultNear: number;
	    defaultFar: number;
	    defaultModelMatrix: Mat4;
	    defaultIsFullScreen: boolean;
	};

}
declare module 'graphics/shape/shape' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Float32Vector } from 'utils/float32Vector';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { BoundingRectangle } from 'graphics/shape/boundingRectangle';
	export abstract class Shape {
	    protected _verticies: Float32Vector;
	    glRenderMode: number;
	    protected boundingRect: BoundingRectangle;
	    private _rgbColor;
	    private _modelMatrix;
	    constructor(rgbColor?: RGBColor, point1?: Vec3 | null, point2?: Vec3 | null);
	    rgbColor: RGBColor;
	    readonly verticies: Float32Array;
	    readonly modelMatrix: Float32Array;
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
	    private _vectorSizeLimit;
	    private _topVertexVector;
	    constructor(glRenderMode: number, gl: WebGLRenderingContext, vectorSizeLimit?: number);
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
	import { RGBColor } from 'graphics/color/rgbColor';
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
	    mvpMatrixUniformName: string;
	};

}
declare module 'graphics/shaderType' {
	export type ShaderType = "fragment" | "vertex";

}
declare module 'graphics/shape/shape2d/line' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Line extends Shape {
	    private _vertexPositions;
	    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    readonly verticies: Float32Array;
	    protected computeVerticies(): void;
	    addVertex(vertex: Vec3): void;
	}

}
declare module 'graphics/webglRenderer' {
	import { Shape } from 'graphics/shape/shape';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Camera } from 'graphics/camera';
	import { RenderingOptions } from 'graphics/renderingOptions';
	export class WebGLRenderer {
	    gl: WebGLRenderingContext;
	    private _isContextLost;
	    private _canvas;
	    private _browserHelper;
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
	    private _shapeScene;
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
	    addShapeToScene(shape: Shape): void;
	    addShapesToScene(shapes: Array<Shape>): void;
	    removeAllVeriticies(): void;
	    removeAllShapes(): void;
	    start(): void;
	    stop(): void;
	    protected draw(): void;
	    private setCanvasEventHandlers();
	    private setupGlResources();
	    private getContext();
	    private handleContextLost;
	    private handleContextRestored;
	    private initializeRenderingOptions(renderingOptions);
	    private initializeVertexBuffers();
	    private drawGlArray(arr, renderMode, modelMatrix?);
	    private initShaders();
	    private createShader(shaderSource, type);
	    private createUniforNotFoundErrorMessage(uniformsMap);
	    private renderLoop;
	    private setupWindowCallbacks();
	    private resizeCanvas;
	}

}
declare module 'graphics/color/colorMapper' {
	import { RGBColor } from 'graphics/color/rgbColor';
	export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "indigo" | "fuchsia" | "white";
	export class ColorMapper {
	    static colorToRGBColor(color: Color): RGBColor;
	}

}
declare module 'graphics/shape/shape3d/shape3dMode' {
	export type Shape3dMode = "box";

}
declare module 'utils/tuple' {
	export interface Tuple<T1, T2> {
	    first: T1;
	    second: T2;
	}

}
declare module 'graphics/shape/midpoint' {
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
declare module 'graphics/shape/shape2d/ellipse' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { Precision } from 'graphics/precision';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Ellipse extends Shape {
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
declare module 'graphics/shape/shape2d/triangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Triangle extends Shape {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/rectangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Rectangle extends Shape {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/hexagon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Hexagon extends Shape {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/octogon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Octogon extends Shape {
	    private static readonly numberOfVerticies;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape3d/box' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	export class Box extends Shape {
	    private static readonly numberOfVerticies;
	    private _backFaceZ;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shapeFactory' {
	import { Shape } from 'graphics/shape/shape';
	import { Shape2dMode } from 'graphics/shape/shape2d/shape2dMode';
	import { Shape3dMode } from 'graphics/shape/shape3d/shape3dMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Vec3 } from "cuon-matrix-ts";
	export class ShapeFactory {
	    static createShape2d(point1: Vec3, point2: Vec3, shape2dMode: Shape2dMode, gl: WebGLRenderingContext, rgbColor?: RGBColor): Shape;
	    static createShape3d(point1: Vec3, point2: Vec3, shape3dMode: Shape3dMode, gl: WebGLRenderingContext, rgbColor?: RGBColor): Shape;
	    private static createTriangle(point1, point2, gl, rgbColor?);
	    private static createRectangle(point1, point2, gl, rgbColor?);
	    private static createHexagon(point1, point2, gl, rgbColor?);
	    private static createOctogon(point1, point2, gl, rgbColor?);
	    private static createEllipse(point1, point2, gl, rgbColor?);
	    private static createBox(point1, point2, gl, rgbColor?);
	}

}
declare module 'graphics/shape/shape2d/point' {
	import { Vec3 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Shape } from 'graphics/shape/shape';
	export class Point extends Shape {
	    private _location;
	    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'utils/mouseHelper' {
	import { Vec3 } from "cuon-matrix-ts";
	export class MouseHelper {
	    static mouseEventToWebGlPoints(event: MouseEvent, canvas: HTMLCanvasElement): Vec3;
	}

}
declare module 'webgl-renderer' {
	import { WebGLRenderer } from 'graphics/webglRenderer';
	import { Vec3, Mat4 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Color, ColorMapper } from 'graphics/color/colorMapper';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { Shape } from 'graphics/shape/shape';
	import { ShapeFactory } from 'graphics/shape/shapeFactory';
	import { Shape2dMode } from 'graphics/shape/shape2d/shape2dMode';
	import { Line } from 'graphics/shape/shape2d/line';
	import { Ellipse } from 'graphics/shape/shape2d/ellipse';
	import { Rectangle } from 'graphics/shape/shape2d/rectangle';
	import { Hexagon } from 'graphics/shape/shape2d/hexagon';
	import { Octogon } from 'graphics/shape/shape2d/octogon';
	import { Triangle } from 'graphics/shape/shape2d/triangle';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Shape3dMode } from 'graphics/shape/shape3d/shape3dMode';
	import { Box } from 'graphics/shape/shape3d/box';
	import { Camera } from 'graphics/camera';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { BrowserHelper } from 'utils/browserHelper';
	import { MouseHelper } from 'utils/mouseHelper';
	export { WebGLRenderer, RenderingOptions, Vec3, Mat4, RGBColor, Color, ColorMapper, RenderMode, Shape, ShapeFactory, Shape2dMode, Ellipse, Triangle, Rectangle, Line, Hexagon, Octogon, Point, Shape3dMode, Box, Camera, BrowserHelper, MouseHelper };

}
