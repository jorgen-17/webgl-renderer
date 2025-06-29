/// <reference path="../node_modules/cuon-matrix-ts/index.d.ts" />
declare module 'graphics/renderModeMapper' {
	export enum RenderMode {
	    points = "points",
	    lines = "lines",
	    lineStrip = "lineStrip",
	    lineLoop = "lineLoop",
	    triangles = "triangles",
	    triangleStrip = "triangleStrip",
	    triangleFan = "triangleFan"
	}
	export class RenderModeMapper {
	    static renderModeToWebGlConstant(mode: RenderMode, gl: WebGLRenderingContext): number;
	}

}
declare module 'graphics/shape/shapeMode' {
	export enum ShapeMode {
	    points = "points",
	    lines = "lines",
	    triangles = "triangles",
	    rectangles = "rectangles",
	    hexagons = "hexagons",
	    octogons = "octogons",
	    ellipses = "ellipses",
	    box = "box"
	}

}
declare module 'constants' {
	export let Constants: {
	    floatsPerPosition: number;
	    floatsPerColor: number;
	    floatsPerPointSize: number;
	    verticiesPerTriangle: number;
	    floatsPerMat4Row: number;
	    floatsPerMat4: number;
	    floatsPerPositionColor: number;
	    floatsPerPointVertex: number;
	    floatsPerDynamicVertex: number;
	    floatsPerTriangle: number;
	    bytesPerPosition: number;
	    bytesPerPositionColor: number;
	    bytesPerPointVertex: number;
	    bytesPerDynamicVertex: number;
	    modelMatrixRow0Offset: number;
	    modelMatrixRow1Offset: number;
	    modelMatrixRow2Offset: number;
	    modelMatrixRow3Offset: number;
	    defaultAlpha: number;
	};

}
declare module 'utils/float32ArrayUtils' {
	export class Float32ArrayUtils {
	    static fill(arr: Float32Array, start?: number, end?: number, value?: number): void;
	}

}
declare module 'utils/float32Vector' {
	export class Float32Vector {
	    arr: Float32Array;
	    size: number;
	    private _sizeLimit;
	    private _bestFit;
	    constructor(arr?: Float32Array, sizeLimit?: number, bestFit?: boolean);
	    resize(newSize: number): void;
	    addNumber(number: number): boolean;
	    addArray(arr: Float32Array | Array<number>): boolean;
	    remove(start: number, count?: number): void;
	    overwrite(start: number, values: Array<number> | Float32Array): void;
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
	    private isTopLeftBottomRight;
	    private isBottomRightTopLeft;
	    private isBottomLeftTopRight;
	}

}
declare module 'graphics/drawingMode' {
	export enum DrawingMode {
	    Shapes = 0,
	    Verticies = 1
	}

}
declare module 'graphics/camera' {
	import { Mat4, Vec3 } from "cuon-matrix-ts";
	export class Camera {
	    private _movementSpeed;
	    private _lookSensitivity;
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
	    private _initialEyePosition;
	    private _initialLookAtPoint;
	    private _initialUpPosition;
	    constructor(aspectRatio: number, fieldOfView?: number, near?: number, far?: number, eyePosition?: Vec3, lookAtPoint?: Vec3, upPosition?: Vec3, movementSpeed?: number, lookSensitivity?: number);
	    get vpMatrix(): Mat4;
	    get viewMatrix(): Mat4;
	    get projectionMatrix(): Mat4;
	    get aspectRatio(): number;
	    set aspectRatio(value: number);
	    get fieldOfView(): number;
	    set fieldOfView(value: number);
	    get near(): number;
	    set near(value: number);
	    get far(): number;
	    set far(value: number);
	    get eyePosition(): Vec3;
	    set eyePosition(value: Vec3);
	    get lookAtPoint(): Vec3;
	    set lookAtPoint(value: Vec3);
	    get up(): Vec3;
	    set up(value: Vec3);
	    get forward(): Vec3;
	    get right(): Vec3;
	    get movementSpeed(): number;
	    set movementSpeed(value: number);
	    get lookSensitivity(): number;
	    set lookSensitivity(value: number);
	    panX(xOffset?: number): void;
	    panY(yOffset?: number): void;
	    zoomIn(zOffset?: number): void;
	    zoomOut(zOffset?: number): void;
	    moveForward(moveAmount?: number): void;
	    moveBackward(moveAmount?: number): void;
	    moveLeft(moveAmount?: number): void;
	    moveRight(moveAmount?: number): void;
	    moveUp(moveAmount?: number): void;
	    moveDown(moveAmount?: number): void;
	    reset(): void;
	    rotatePitch(yOffset: number): void;
	    rotateYaw(xOffset: number): void;
	    private updateView;
	    private updatePerspective;
	    private updateViewProjectionMatrix;
	}

}
declare module 'settings' {
	import { Vec3, Mat4 } from "cuon-matrix-ts";
	import { RenderMode } from 'graphics/renderModeMapper';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	export let Settings: {
	    defaultRendereMode: RenderMode.points;
	    defaultShapeMode: ShapeMode.points;
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
	    instancedArrayExtensionName: string;
	    defaultMovementSpeed: number;
	    defaultLookSensitivity: number;
	};

}
declare module 'graphics/shape/shape' {
	import { Vec3 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
	import { BoundingRectangle } from 'graphics/shape/boundingRectangle';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export abstract class Shape {
	    glRenderMode: number;
	    numberOfVerticies: number;
	    numberOfFloatsPerVertex: number;
	    abstract shapeMode: ShapeMode;
	    protected _verticies: Float32Array;
	    protected _boundingRect: BoundingRectangle;
	    protected _rgbColor: RGBColor;
	    constructor(numberOfVerticies: number, numberOfFloatsPerVertex: number, rgbColor?: RGBColor, point1?: Vec3 | null, point2?: Vec3 | null);
	    get verticies(): Float32Array;
	    get rgbColor(): RGBColor;
	    set rgbColor(value: RGBColor);
	    protected abstract computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/point' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Point extends Shape {
	    private static readonly numberOfVerticies;
	    shapeMode: ShapeMode;
	    private _location;
	    private _pointSize;
	    constructor(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor, pointSize?: number);
	    get pointSize(): number;
	    set pointSize(value: number);
	    protected computeVerticies(): void;
	    private addXYZColorAndPointSize;
	}

}
declare module 'utils/browserHelper' {
	export class BrowserHelper {
	    isIE(): boolean;
	    isEdge(): boolean;
	}

}
declare module 'graphics/renderingOptions' {
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Camera } from 'graphics/camera';
	import { BrowserHelper } from 'utils/browserHelper';
	export interface RenderingOptions {
	    browserHelper?: BrowserHelper;
	    backgroundColor?: RGBColor;
	    camera?: Camera;
	    window?: Window;
	    fullscreen?: boolean;
	    calcWidth?: (newWidth: number) => number;
	    calcHeight?: (newHeight: number) => number;
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
	    modelMatrixAttributeName: string;
	    pointSizeAttributeName: string;
	    vpMatrixUniformName: string;
	};

}
declare module 'graphics/shaderType' {
	export enum ShaderType {
	    fragment = "fragment",
	    vertex = "vertex"
	}

}
declare module 'graphics/shape/shape2d/line' {
	import { Vec3 } from "cuon-matrix-ts";
	import { Shape } from 'graphics/shape/shape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Line extends Shape {
	    shapeMode: ShapeMode;
	    private _vertexPositions;
	    private _verticiesVector;
	    private _glBuffer;
	    private _gl;
	    constructor(point: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    get verticies(): Float32Array;
	    get glBuffer(): WebGLBuffer | null;
	    refreshWebglBuffer(): void;
	    protected computeVerticies(): void;
	    addVertex(vertex: Vec3): void;
	    private addXYZAndColorToFloat32Array;
	}

}
declare module 'graphics/glBufferWrapper' {
	export interface GlBufferWrapper {
	}
	export abstract class GlBufferWrapper {
	    protected _glBuffer: WebGLBuffer | null;
	    private _gl;
	    constructor(gl: WebGLRenderingContext);
	    get glBuffer(): WebGLBuffer | null;
	    refreshWebglBuffer(): void;
	}

}
declare module 'graphics/shape/shapeBuffer' {
	import { Float32Vector } from 'utils/float32Vector';
	import { StringDictionary } from 'utils/dictionary';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Shape } from 'graphics/shape/shape';
	import { GlBufferWrapper } from 'graphics/glBufferWrapper';
	export class ShapeBuffer<S extends Shape> extends GlBufferWrapper {
	    protected _verticies: Float32Vector;
	    protected _trimmedArray: Float32Array;
	    protected _shapes: StringDictionary<{
	        shape: S;
	        index: number;
	    }>;
	    constructor(gl: WebGLRenderingContext);
	    get verticies(): Float32Array;
	    get count(): number;
	    get first(): S;
	    addShape(shape: S): string;
	    addShapes(shapes: Array<S>): Array<string>;
	    removeShape(id: string): boolean;
	    updateColor(id: string, newColor: RGBColor): boolean;
	    private reorderIndicies;
	    private introduceShape;
	}

}
declare module 'graphics/shape/dynamicShape' {
	import { Vec3, Mat4 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Shape } from 'graphics/shape/shape';
	export abstract class DynamicShape extends Shape {
	    private _modelMatrix;
	    constructor(numberOfVerticies: number, point1: Vec3, point2: Vec3, rgbColor?: RGBColor);
	    get modelMatrix(): Mat4;
	    set modelMatrix(value: Mat4);
	    protected abstract computeVerticies(): void;
	    protected addXYZColorAndModelMatToVerticies(index: number, x: number, y: number, z: number): void;
	    protected addTriangleToVerticies(index: number, vertex1Position: Vec3, vertex2Position: Vec3, vertex3Position: Vec3): void;
	}

}
declare module 'graphics/shape/pointBuffer' {
	import { ShapeBuffer } from 'graphics/shape/shapeBuffer';
	import { Point } from 'graphics/shape/shape2d/point';
	export class PointBuffer extends ShapeBuffer<Point> {
	    updatePointSize(id: string, newPointSize: number): boolean;
	}

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
	    High = 1
	}

}
declare module 'graphics/shape/shape2d/ellipse' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { Precision } from 'graphics/precision';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Ellipse extends DynamicShape {
	    private static readonly numberOfEndPoints;
	    private static readonly highPrecisionNumberOfPointsAlongCurve;
	    private static readonly highPrecisionNumberOfVerticies;
	    private static readonly lowPrecisionNumberOfPointsAlongCurve;
	    private static readonly lowPrecisionNumberOfVerticies;
	    shapeMode: ShapeMode;
	    numberOfVerticies: number;
	    private center;
	    private leftEndPoint;
	    private rightEndPoint;
	    private horizontalRadius;
	    private verticalRadius;
	    private precision;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, precision?: Precision, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	    private getYDistanceFromCenterForX;
	}

}
declare module 'graphics/shape/shape2d/triangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Triangle extends DynamicShape {
	    static readonly numberOfVerticies = 3;
	    shapeMode: ShapeMode;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/rectangle' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Rectangle extends DynamicShape {
	    private static readonly numberOfVerticies;
	    shapeMode: ShapeMode;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/hexagon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Hexagon extends DynamicShape {
	    private static readonly numberOfVerticies;
	    shapeMode: ShapeMode;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape2d/octogon' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Octogon extends DynamicShape {
	    private static readonly numberOfVerticies;
	    shapeMode: ShapeMode;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shape3d/box' {
	import { Vec3 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	export class Box extends DynamicShape {
	    private static readonly numberOfVerticies;
	    shapeMode: ShapeMode;
	    private _backFaceZ;
	    constructor(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor);
	    protected computeVerticies(): void;
	}

}
declare module 'graphics/shape/shapeFactory' {
	import { Vec3, Vec2 } from "cuon-matrix-ts";
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { Ellipse } from 'graphics/shape/shape2d/ellipse';
	import { Triangle } from 'graphics/shape/shape2d/triangle';
	import { Rectangle } from 'graphics/shape/shape2d/rectangle';
	import { Hexagon } from 'graphics/shape/shape2d/hexagon';
	import { Octogon } from 'graphics/shape/shape2d/octogon';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Box } from 'graphics/shape/shape3d/box';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Line } from 'graphics/shape/shape2d/line';
	export abstract class ShapeFactory {
	    abstract createPoint(location: Vec2 | Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor, pointSize?: number): Point;
	    abstract createLine(firstPoint: Vec2 | Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Line;
	    abstract createShape(point1: Vec2 | Vec3, point2: Vec2 | Vec3, shapeMode: ShapeMode, gl: WebGLRenderingContext, rgbColor?: RGBColor): DynamicShape;
	    protected createTriangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Triangle;
	    protected createRectangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Rectangle;
	    protected createHexagon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Hexagon;
	    protected createOctogon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Octogon;
	    protected createEllipse(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Ellipse;
	    protected createBox(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Box;
	}

}
declare module 'graphics/vertexBuffer' {
	import { Float32Vector } from 'utils/float32Vector';
	import { GlBufferWrapper } from 'graphics/glBufferWrapper';
	export class VertexBuffer extends GlBufferWrapper {
	    glRenderMode: number;
	    verticiesStack: Array<Float32Vector>;
	    private _vectorSizeLimit;
	    private _topVertexVector;
	    constructor(glRenderMode: number, gl: WebGLRenderingContext, vectorSizeLimit?: number);
	    addVertex(vertex: Float32Array): void;
	    private glRenderModeValidator;
	}

}
declare module 'graphics/webglRenderer' {
	import { Vec3, Mat4, Vec2 } from "cuon-matrix-ts";
	import { RenderMode } from 'graphics/renderModeMapper';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { Point } from 'graphics/shape/shape2d/point';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { StringDictionary } from 'utils/dictionary';
	import { Line } from 'graphics/shape/shape2d/line';
	import { ShapeBuffer } from 'graphics/shape/shapeBuffer';
	import { Shape } from 'graphics/shape/shape';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { PointBuffer } from 'graphics/shape/pointBuffer';
	import { ShapeFactory } from 'graphics/shape/shapeFactory';
	import { VertexBuffer } from 'graphics/vertexBuffer';
	export abstract class WebGLRenderer {
	    gl: WebGLRenderingContext;
	    abstract shapeFactory: ShapeFactory;
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
	    protected _u_vpMatrix: WebGLUniformLocation | null;
	    private _isContextLost;
	    private _browserHelper;
	    private _backgroundColor;
	    private _window;
	    private _isFullscreen;
	    private _animationFrameRequestId;
	    private _calcWidth;
	    private _calcHeight;
	    private _postResizeCallback;
	    private _pointsVertexBuffer;
	    private _linesVertexBuffer;
	    private _lineStripVertexBuffer;
	    private _lineLoopVertexBuffer;
	    private _trianglesVertexBuffer;
	    private _triangleStripVertexBuffer;
	    private _triangleFanVertexBuffer;
	    private _pointShaderProgram;
	    private _dynamicShapeShaderProgram;
	    private _positionColorShaderProgram;
	    private _pointVertexShaderSource;
	    private _dynamicVertexShaderSource;
	    private _positionColorVertexShaderSource;
	    private _fragmentShaderSource;
	    constructor(canvas: HTMLCanvasElement, renderingOptions?: RenderingOptions, postResizeCalllback?: (canvas: HTMLCanvasElement, window: Window, renderer: WebGLRenderer) => void);
	    get backgroundColor(): RGBColor;
	    set backgroundColor(backgroundColor: RGBColor);
	    get isFullscreen(): boolean;
	    set isFullscreen(value: boolean);
	    get calcWidth(): (newWidth: number) => number;
	    set calcWidth(value: (newWidth: number) => number);
	    get calcHeight(): (newHeight: number) => number;
	    set calcHeight(value: (newHeight: number) => number);
	    protected set postResizeCallback(value: (canvas: HTMLCanvasElement, window: Window, renderer: WebGLRenderer) => void);
	    setViewPortDimensions(newWidth: number, newHeight: number): void;
	    abstract addShapeToScene(shape: Shape): string;
	    abstract addHomogenoeusShapesArrayToScene(shapes: Array<Shape>): Array<string>;
	    addHeterogenoeusShapesArrayToScene<S extends Shape>(shapes: Array<S>): Array<string>;
	    abstract addVertexToScene(position: Vec2 | Vec3, renderMode: RenderMode, color: RGBColor): void;
	    removeAllShapes(): void;
	    removeAllVerticies(): void;
	    abstract removeShape(id: string, shapeMode?: ShapeMode): boolean;
	    abstract updateShapeColor(id: string, newColor: RGBColor, shapeMode?: ShapeMode): boolean;
	    updatePointSize(id: string, newPointSize: number): boolean;
	    abstract addPointToLine(id: string, point: Vec2 | Vec3): boolean;
	    start(): void;
	    stop(): void;
	    protected draw(): void;
	    protected abstract drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void;
	    protected abstract drawLine(line: Line): void;
	    protected abstract drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void;
	    protected abstract drawVertexBuffer(vertexBuffer: VertexBuffer): void;
	    protected abstract initializaDynamicShapeBuffers(): void;
	    protected addVertexToSceneBase(position: Vec3, renderMode: RenderMode, color?: RGBColor): void;
	    protected addLine(line: Line): string;
	    protected addLines(lines: Array<Line>): Array<string>;
	    protected removeLine(id: string): boolean;
	    protected updateLineColor(id: string, newColor: RGBColor): boolean;
	    protected addPointToLineBase(id: string, point: Vec3): boolean;
	    protected removeShapeFromUnspecifiedBuffer(id: string): boolean;
	    protected updateShapeColorFromUnspecifiedBuffer(id: string, newColor: RGBColor): boolean;
	    protected createUniforNotFoundErrorMessage(uniformsMap: StringDictionary<WebGLUniformLocation | null>): string;
	    protected drawPointShapeBufferBase(shapeBuffer: ShapeBuffer<Point>, mvpMatrix?: Mat4): void;
	    protected drawDynamicShapeBufferBase(shapeBuffer: ShapeBuffer<DynamicShape>, mvpMatrix?: Mat4): void;
	    protected drawLineBase(line: Line, mvpMatrix?: Mat4): void;
	    protected drawVertexBufferBase(vb: VertexBuffer, mvpMatrix?: Mat4): void;
	    private setCanvasEventHandlers;
	    private setupGlResources;
	    private getContext;
	    private handleContextLost;
	    private handleContextRestored;
	    private initializeRenderingOptions;
	    private initializaBuffers;
	    private initializaShapeBuffers;
	    private initializeVertexBuffers;
	    private refreshAllWebGlBuffers;
	    private getDynamicShapeShaderVariables;
	    private getPointShaderVariables;
	    private getShaderVariables;
	    private initShaders;
	    private createShader;
	    private renderLoop;
	    private checkForUniforms;
	    private setupWindowCallbacks;
	    private defaultCalcWidth;
	    private defaultCalcHeight;
	    private resizeCanvas;
	}

}
declare module 'graphics/shape/shapeFactory2d' {
	import { Vec2 } from "cuon-matrix-ts";
	import { ShapeFactory } from 'graphics/shape/shapeFactory';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Line } from 'graphics/shape/shape2d/line';
	export class ShapeFactory2d extends ShapeFactory {
	    createPoint(location: Vec2, gl: WebGLRenderingContext, rgbColor?: RGBColor, pointSize?: number): Point;
	    createLine(firstPoint: Vec2, gl: WebGLRenderingContext, rgbColor?: RGBColor): Line;
	    createShape(point1: Vec2, point2: Vec2, shapeMode: ShapeMode, gl: WebGLRenderingContext, rgbColor?: RGBColor, somenum?: number): DynamicShape;
	}

}
declare module 'graphics/webglRenderer2d' {
	import { WebGLRenderer } from 'graphics/webglRenderer';
	import { Shape } from 'graphics/shape/shape';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { ShapeBuffer } from 'graphics/shape/shapeBuffer';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Line } from 'graphics/shape/shape2d/line';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { ShapeFactory2d } from 'graphics/shape/shapeFactory2d';
	import { VertexBuffer } from 'graphics/vertexBuffer';
	import { Vec2 } from "cuon-matrix-ts";
	import { RenderMode } from 'graphics/renderModeMapper';
	export class WebGLRenderer2d extends WebGLRenderer {
	    private _shapeFactory;
	    private _trianglesShapeBuffer;
	    private _rectanglesShapeBuffer;
	    private _hexagonsShapeBuffer;
	    private _octogonsShapeBuffer;
	    private _ellipsesShapeBuffer;
	    constructor(canvas: HTMLCanvasElement, renderingOptions?: RenderingOptions);
	    get shapeFactory(): ShapeFactory2d;
	    addShapeToScene(shape: Shape): string;
	    addHomogenoeusShapesArrayToScene(shapes: Array<Shape>): Array<string>;
	    addVertexToScene(position: Vec2, renderMode: RenderMode, color?: RGBColor): void;
	    addPointToLine(id: string, point: Vec2): boolean;
	    removeShape(id: string, shapeMode?: ShapeMode): boolean;
	    updateShapeColor(id: string, newColor: RGBColor, shapeMode?: ShapeMode): boolean;
	    protected drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void;
	    protected drawLine(line: Line): void;
	    protected drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void;
	    protected drawVertexBuffer(vertexBuffer: VertexBuffer): void;
	    protected initializaDynamicShapeBuffers(): void;
	}

}
declare module 'graphics/shape/shapeFactory3d' {
	import { Vec3 } from "cuon-matrix-ts";
	import { ShapeFactory } from 'graphics/shape/shapeFactory';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Line } from 'graphics/shape/shape2d/line';
	export class ShapeFactory3d extends ShapeFactory {
	    createPoint(location: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor, pointSize?: number): Point;
	    createLine(firstPoint: Vec3, gl: WebGLRenderingContext, rgbColor?: RGBColor): Line;
	    createShape(point1: Vec3, point2: Vec3, shapeMode: ShapeMode, gl: WebGLRenderingContext, rgbColor?: RGBColor): DynamicShape;
	}

}
declare module 'graphics/webglRenderer3d' {
	import { WebGLRenderer } from 'graphics/webglRenderer';
	import { Camera } from 'graphics/camera';
	import { Shape } from 'graphics/shape/shape';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { RGBColor } from 'graphics/color/rgbColor';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { ShapeBuffer } from 'graphics/shape/shapeBuffer';
	import { Line } from 'graphics/shape/shape2d/line';
	import { Point } from 'graphics/shape/shape2d/point';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { ShapeFactory3d } from 'graphics/shape/shapeFactory3d';
	import { VertexBuffer } from 'graphics/vertexBuffer';
	import { Vec3 } from "cuon-matrix-ts";
	import { RenderMode } from 'graphics/renderModeMapper';
	export class WebGLRenderer3d extends WebGLRenderer {
	    private _shapeFactory;
	    private _camera;
	    private _trianglesShapeBuffer;
	    private _rectanglesShapeBuffer;
	    private _hexagonsShapeBuffer;
	    private _octogonsShapeBuffer;
	    private _ellipsesShapeBuffer;
	    private _boxShapeBuffer;
	    constructor(canvas: HTMLCanvasElement, renderingOptions?: RenderingOptions);
	    get camera(): Camera;
	    set camera(value: Camera);
	    get shapeFactory(): ShapeFactory3d;
	    addShapeToScene(shape: Shape): string;
	    addHomogenoeusShapesArrayToScene(shapes: Array<Shape>): Array<string>;
	    addVertexToScene(position: Vec3, renderMode: RenderMode, color?: RGBColor): void;
	    addPointToLine(id: string, point: Vec3): boolean;
	    removeShape(id: string, shapeMode?: ShapeMode): boolean;
	    updateShapeColor(id: string, newColor: RGBColor, shapeMode?: ShapeMode): boolean;
	    protected drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void;
	    protected drawLine(line: Line): void;
	    protected drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void;
	    protected drawVertexBuffer(vertexBuffer: VertexBuffer): void;
	    protected initializaDynamicShapeBuffers(): void;
	}

}
declare module 'graphics/color/colorMapper' {
	import { RGBColor } from 'graphics/color/rgbColor';
	export enum Color {
	    red = "red",
	    orange = "orange",
	    yellow = "yellow",
	    green = "green",
	    cyan = "cyan",
	    blue = "blue",
	    indigo = "indigo",
	    fuchsia = "fuchsia",
	    white = "white"
	}
	export class ColorMapper {
	    static colorToRGBColor(color: Color): RGBColor;
	}

}
declare module 'utils/mouseHelper' {
	import { Vec3 } from "cuon-matrix-ts";
	export class MouseHelper {
	    static mouseEventToWebGlPoints(event: MouseEvent, canvas: HTMLCanvasElement): Vec3;
	}

}
declare module 'webgl-renderer' {
	import { WebGLRenderer2d } from 'graphics/webglRenderer2d';
	import { WebGLRenderer3d } from 'graphics/webglRenderer3d';
	import { Vec2, Vec3, Mat4 } from "cuon-matrix-ts";
	import { RGBColor } from 'graphics/color/rgbColor';
	import { Color, ColorMapper } from 'graphics/color/colorMapper';
	import { RenderMode, RenderModeMapper } from 'graphics/renderModeMapper';
	import { Shape } from 'graphics/shape/shape';
	import { DynamicShape } from 'graphics/shape/dynamicShape';
	import { ShapeFactory } from 'graphics/shape/shapeFactory';
	import { ShapeFactory2d } from 'graphics/shape/shapeFactory2d';
	import { ShapeFactory3d } from 'graphics/shape/shapeFactory3d';
	import { ShapeMode } from 'graphics/shape/shapeMode';
	import { Line } from 'graphics/shape/shape2d/line';
	import { Ellipse } from 'graphics/shape/shape2d/ellipse';
	import { Rectangle } from 'graphics/shape/shape2d/rectangle';
	import { Hexagon } from 'graphics/shape/shape2d/hexagon';
	import { Octogon } from 'graphics/shape/shape2d/octogon';
	import { Triangle } from 'graphics/shape/shape2d/triangle';
	import { Point } from 'graphics/shape/shape2d/point';
	import { Box } from 'graphics/shape/shape3d/box';
	import { Camera } from 'graphics/camera';
	import { RenderingOptions } from 'graphics/renderingOptions';
	import { BrowserHelper } from 'utils/browserHelper';
	import { MouseHelper } from 'utils/mouseHelper';
	export { WebGLRenderer2d, WebGLRenderer3d, RenderingOptions, Vec2, Vec3, Mat4, RGBColor, Color, ColorMapper, RenderMode, RenderModeMapper, Shape, DynamicShape, ShapeFactory, ShapeFactory2d, ShapeFactory3d, ShapeMode, Ellipse, Triangle, Rectangle, Line, Hexagon, Octogon, Point, Box, Camera, BrowserHelper, MouseHelper };

}
