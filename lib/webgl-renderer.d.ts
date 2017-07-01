declare module 'utils/vector' {
	export class Float32Vector {
	    arr: Float32Array;
	    size: number;
	    constructor(arr?: Float32Array);
	    addNumber(number: number): void;
	    addArray(arr: Float32Array | Array<number>): void;
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
declare module 'graphics/shapes/shape' {
	import { Float32Vector } from 'utils/vector';
	import { RGBColor } from 'graphics/rgbColor';
	export abstract class Shape {
	    verticies: Float32Vector;
	    rgbColor: RGBColor;
	    vertexSize: number;
	    colorSize: number;
	    numberOfVerticies: number;
	    glRenderMode: number;
	    constructor(rgbColor: RGBColor);
	    protected addXYAndColorToFloat32Array(array: Float32Array, index: number, x: number, y: number): void;
	}

}
declare module 'graphics/renderModeMapper' {
	export type RenderMode = "points" | "lines" | "lineStrip" | "lineLoop" | "triangles" | "triangleStrip" | "triangleFan";
	export class RenderModeMapper {
	    static renderModeToWebGlConstant(mode: RenderMode, gl: WebGLRenderingContext): number;
	}

}
declare module 'graphics/shapes/shapeMode' {
	export type ShapeMode = "points" | "lines" | "ellipses" | "triangles" | "rectangles" | "hexagons" | "octogons";

}
declare module 'graphics/drawingMode' {
	export enum DrawingMode {
	    Shapes = 0,
	    Verticies = 1,
	}

}
declare module 'settings' {
	import { DrawingMode } from 'graphics/drawingMode';
	import { RGBColor } from 'graphics/rgbColor';
	export let Settings: {
	    floatsPerPoint: number;
	    floatsPerColor: number;
	    floatsPerVertex: number;
	    vertexBufferFloatLimit: number;
	    defaultAlpha: number;
	    defaultRendereMode: "points";
	    defaultShapeMode: "points";
	    defaultDrawingMode: DrawingMode;
	    defaultPointSize: number;
	    defaultBackgroundColor: RGBColor;
	    defaultColor: RGBColor;
	};

}
declare module 'graphics/vertexBuffer' {
	import { Float32Vector } from 'utils/vector';
	export class VertexBuffer {
	    renderMode: number;
	    verticiesStack: Array<Float32Vector>;
	    private _topVertexVector;
	    constructor(renderMode: number, gl: WebGLRenderingContext);
	    addVertex(vertex: Float32Array): void;
	    private renderModeValidator(renderMode, gl);
	}

}
declare module 'math/vector3' {
	export class Vector3 {
	    elements: Float32Array;
	    constructor(source?: Vector3 | null);
	    normalize(): this;
	}

}
declare module 'math/vector4' {
	export class Vector4 {
	    elements: Float32Array;
	    constructor(source?: Vector4 | null);
	}

}
declare module 'math/matrix4' {
	import { Vector3 } from 'math/vector3';
	import { Vector4 } from 'math/vector4';
	export class Matrix4 {
	    elements: Float32Array;
	    constructor(source?: Matrix4 | null);
	    setIdentity(): this;
	    set(src: any): this | undefined;
	    multiply(other: any): this;
	    multiplyVector3(pos: any): Vector3;
	    multiplyVector4(pos: any): Vector4;
	    transpose(): this;
	    setInverseOf(other: any): this;
	    invert(): this;
	    setOrtho(left: any, right: any, bottom: any, top: any, near: any, far: any): this;
	    ortho(left: any, right: any, bottom: any, top: any, near: any, far: any): this;
	    setFrustum(left: any, right: any, bottom: any, top: any, near: any, far: any): this;
	    frustum(left: any, right: any, bottom: any, top: any, near: any, far: any): this;
	    setPerspective(fovy: any, aspect: any, near: any, far: any): this;
	    perspective(fovy: any, aspect: any, near: any, far: any): this;
	    setScale(x: any, y: any, z: any): this;
	    scale(x: any, y: any, z: any): this;
	    setTranslate(x: any, y: any, z: any): this;
	    translate(x: any, y: any, z: any): this;
	    setRotate(angle: any, x: any, y: any, z: any): this;
	    rotate(angle: any, x: any, y: any, z: any): this;
	    setLookAt(eyeX: any, eyeY: any, eyeZ: any, centerX: any, centerY: any, centerZ: any, upX: any, upY: any, upZ: any): this;
	    lookAt(eyeX: any, eyeY: any, eyeZ: any, centerX: any, centerY: any, centerZ: any, upX: any, upY: any, upZ: any): this;
	    dropShadow(plane: any, light: any): this;
	    dropShadowDirectionally(normX: any, normY: any, normZ: any, planeX: any, planeY: any, planeZ: any, lightX: any, lightY: any, lightZ: any): this;
	    private concat(other);
	}

}
declare module 'graphics/shapes/point3d' {
	import { RGBColor } from 'graphics/rgbColor';
	export class Point3d {
	    x: number;
	    y: number;
	    z: number;
	    pointSize: number;
	    color: RGBColor;
	    constructor(x: number, y: number, z: number, pointSize?: number, color?: RGBColor);
	}

}
declare module 'graphics/camera' {
	import { Point3d } from 'graphics/shapes/point3d';
	export class Camera {
	    private _viewMatrix;
	    private _eyePosition;
	    private _lookAtPoint;
	    private _upPosition;
	    constructor(eyePosition: Point3d, lookAtPoint: Point3d, upPosition: Point3d);
	    getViewMatrix(): Float32Array;
	    readonly eyePosition: Point3d;
	    readonly lookAtPoint: Point3d;
	    readonly upPosition: Point3d;
	    setCameraView(eyePosition: Point3d, lookAtPoint: Point3d, upPosition: Point3d): void;
	    translateEyePosition(eyePosition: Point3d): void;
	}

}
declare module 'graphics/drawingSettings' {
	import { ShapeMode } from 'graphics/shapes/shapeMode';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { DrawingMode } from 'graphics/drawingMode';
	import { RGBColor } from 'graphics/rgbColor';
	export interface DrawingSettings {
	    shapeMode?: ShapeMode;
	    renderMode?: RenderMode;
	    drawingMode?: DrawingMode;
	    pointSize?: number;
	    backgroundColor?: RGBColor;
	    color?: RGBColor;
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
declare module 'graphics/webglRenderer' {
	import { Shape } from 'graphics/shapes/shape';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { ShapeMode } from 'graphics/shapes/shapeMode';
	import { RGBColor } from 'graphics/rgbColor';
	import { Camera } from 'graphics/camera';
	import { DrawingSettings } from 'graphics/drawingSettings';
	export interface IWebGLRenderer {
	    color: RGBColor;
	    backgroundColor: RGBColor;
	    gl: WebGLRenderingContext;
	    shape: ShapeMode;
	    renderMode: RenderMode;
	    pointSize: number;
	    camera: Camera;
	    draw: () => void;
	    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
	    addXYPointToScene(x: number, y: number): void;
	    addShapeToScene(shape: Shape): void;
	    addShapesToScene(shape: Array<Shape>): void;
	    removeAllVeriticies(): void;
	}
	export class WebGLRenderer implements IWebGLRenderer {
	    gl: WebGLRenderingContext;
	    private _glRenderMode;
	    private _shapeMode;
	    private _renderMode;
	    private _drawingMode;
	    private _pointSize;
	    private _backgroundColor;
	    private _color;
	    private _camera;
	    private _pointsVector;
	    private _linesVector;
	    private _lineStripVector;
	    private _lineLoopVector;
	    private _trianglesVector;
	    private _triangleStripVector;
	    private _triangleFanVector;
	    private _vertexBuffers;
	    private _shaderProgram;
	    private _vertexShaderSource;
	    private _fragmentShaderSource;
	    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext, drawingSettings: DrawingSettings, camera?: Camera | null);
	    setViewPortDimensions(newWidth: number, newHeight: number): void;
	    renderMode: RenderMode;
	    shape: ShapeMode;
	    color: RGBColor;
	    backgroundColor: RGBColor;
	    pointSize: number;
	    readonly camera: Camera;
	    addXYPointToScene(x: number, y: number, renderMode?: number, r?: number, g?: number, b?: number): void;
	    addShapeToScene(shape: Shape): void;
	    addShapesToScene(shapes: Array<Shape>): void;
	    removeAllVeriticies(): void;
	    draw(): void;
	    private initializeDrawingSettings(drawingSettings);
	    private initializeCamera(camera);
	    private initializeVertexBuffers();
	    private drawGlArray(arr, renderMode);
	    private addXYAndColorToVertexBuffer(vertexBuffer, x, y);
	    private initShaders();
	    private createShader(str, type);
	    private createUniforNotFoundErrorMessage(uniformsMap);
	}

}
declare module 'utils/contextWrangler' {
	export class ContextWrangler {
	    static getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
	}

}
declare module 'graphics/colorMapper' {
	import { RGBColor } from 'graphics/rgbColor';
	export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "indigo" | "fuchsia" | "white";
	export class ColorMapper {
	    static colorToRGBColor(color: Color): RGBColor;
	}

}
declare module 'graphics/shapes/point2d' {
	export interface Point2d {
	    x: number;
	    y: number;
	}

}
declare module 'graphics/shapes/line' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Line extends Shape {
	    constructor(point: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    addVertex(vertex: Point2d): void;
	}

}
declare module 'graphics/shapes/boundingRectangle' {
	import { Point2d } from 'graphics/shapes/point2d';
	export class BoundingRectangle {
	    topLeft: Point2d;
	    topRight: Point2d;
	    bottomRight: Point2d;
	    bottomLeft: Point2d;
	    constructor(point1: Point2d, point2: Point2d);
	    private isTopLeftBottomRight(point1, point2);
	    private isBottomRightTopLeft(point1, point2);
	    private isBottomLeftTopRight(point1, point2);
	}

}
declare module 'utils/tuple' {
	export interface Tuple<T1, T2> {
	    first: T1;
	    second: T2;
	}

}
declare module 'graphics/shapes/midpoint' {
	import { Point2d } from 'graphics/shapes/point2d';
	import { Tuple } from 'utils/tuple';
	export class Midpoint {
	    static between(point1: Point2d, point2: Point2d): Point2d;
	}
	export class ThirdPoints {
	    static between(point1: Point2d, point2: Point2d): Tuple<Point2d, Point2d>;
	}

}
declare module 'graphics/precision' {
	export enum Precision {
	    Low = 0,
	    High = 1,
	}

}
declare module 'graphics/shapes/ellipse' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { Precision } from 'graphics/precision';
	import { RGBColor } from 'graphics/rgbColor';
	export class Ellipse extends Shape {
	    private center;
	    private horizontalRadius;
	    private verticalRadius;
	    private numberOfInnerVerticies;
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext, precision: Precision);
	    private populateVerticies(boundingRect);
	    private getYDistanceFromCenterForX(x);
	}

}
declare module 'graphics/shapes/triangle' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Triangle extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	}

}
declare module 'graphics/shapes/rectangle' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Rectangle extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	}

}
declare module 'graphics/shapes/hexagon' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Hexagon extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    private populateVerticies(boundingRect);
	}

}
declare module 'graphics/shapes/octogon' {
	import { Shape } from 'graphics/shapes/shape';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Octogon extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    private populateVerticies(boundingRect);
	}

}
declare module 'graphics/shapes/shapeFactory' {
	import { Shape } from 'graphics/shapes/shape';
	import { ShapeMode } from 'graphics/shapes/shapeMode';
	import { Point2d } from 'graphics/shapes/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class ShapeFactory {
	    static createShape(point1: Point2d, point2: Point2d, shapeMode: ShapeMode, rgbColor: RGBColor, gl: WebGLRenderingContext): Shape;
	    private static createEllipse(point1, point2, rgbColor, gl);
	    private static createTriangle(point1, point2, rgbColor, gl);
	    private static createRectangle(point1, point2, rgbColor, gl);
	    private static createHexagon(point1, point2, rgbColor, gl);
	    private static createOctogon(point1, point2, rgbColor, gl);
	}

}
declare module 'webgl-renderer' {
	import { IWebGLRenderer, WebGLRenderer } from 'graphics/webglRenderer';
	import { ContextWrangler } from 'utils/contextWrangler';
	import { Color, ColorMapper } from 'graphics/colorMapper';
	import { Point2d } from 'graphics/shapes/point2d';
	import { Line } from 'graphics/shapes/line';
	import { Shape } from 'graphics/shapes/shape';
	import { ShapeFactory } from 'graphics/shapes/shapeFactory';
	import { ShapeMode } from 'graphics/shapes/shapeMode';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { Ellipse } from 'graphics/shapes/ellipse';
	import { Rectangle } from 'graphics/shapes/rectangle';
	import { Hexagon } from 'graphics/shapes/hexagon';
	import { Octogon } from 'graphics/shapes/octogon';
	import { Triangle } from 'graphics/shapes/triangle';
	import { RGBColor } from 'graphics/rgbColor';
	import { Camera } from 'graphics/camera';
	import { Point3d } from 'graphics/shapes/point3d';
	import { DrawingSettings } from 'graphics/drawingSettings';
	export { IWebGLRenderer, WebGLRenderer, DrawingSettings, ContextWrangler, RGBColor, Color, ColorMapper, ShapeMode, RenderMode, Shape, Ellipse, Triangle, Rectangle, Line, Hexagon, Octogon, Point2d, Point3d, ShapeFactory, Camera };

}
