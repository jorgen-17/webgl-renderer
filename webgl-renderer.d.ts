declare module 'utils/vector' {
	export class Float32Vector {
	    arr: Float32Array;
	    size: number;
	    constructor(arr: Float32Array);
	    addNumber(number: number): void;
	    addArray(arr: Float32Array | Array<number>): void;
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
declare module 'graphics/geometry/shape' {
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
declare module 'graphics/vertexBuffer' {
	import { Float32Vector } from 'utils/vector';
	export class VertexBuffer {
	    renderMode: number;
	    verticies: Float32Vector;
	    constructor(renderMode: number, vertexArray: Float32Array, gl: WebGLRenderingContext);
	    private renderModeValidator(renderMode, gl);
	}

}
declare module 'graphics/drawingMode' {
	export enum DrawingMode {
	    Shapes = 0,
	    Verticies = 1,
	}

}
declare module 'graphics/geometry/shapeMode' {
	export type ShapeMode = "points" | "lines" | "ellipses" | "triangles" | "rectangles" | "hexagons" | "octogons";

}
declare module 'graphics/colorMapper' {
	import { RGBColor } from 'graphics/rgbColor';
	export type Color = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "indigo" | "fuchsia" | "white";
	export class ColorMapper {
	    static colorToRGBColor(color: Color): RGBColor;
	}

}
declare module 'graphics/webglRenderer' {
	import { Shape } from 'graphics/geometry/shape';
	import { RenderMode } from 'graphics/renderModeMapper';
	import { ShapeMode } from 'graphics/geometry/shapeMode';
	import { Color } from 'graphics/colorMapper';
	import { RGBColor } from 'graphics/rgbColor';
	export interface IWebGLRenderer {
	    gl: WebGLRenderingContext;
	    color: Color;
	    shape: ShapeMode;
	    renderMode: RenderMode;
	    getRGBColor: () => RGBColor;
	    draw: () => void;
	    setViewPortDimensions: (newWidth: number, newHeight: number) => void;
	    addXYPointToScene(x: number, y: number): void;
	    addShapeToScene(shape: Shape): void;
	}
	export class WebGLRenderer implements IWebGLRenderer {
	    gl: WebGLRenderingContext;
	    private glRenderMode;
	    private shapeMode;
	    private renderModeStr;
	    private drawingMode;
	    private colorStr;
	    private rgbColor;
	    private vertexShaderSource;
	    private fragmentShaderSource;
	    private shaderProgram;
	    private pointsVector;
	    private linesVector;
	    private lineStripVector;
	    private lineLoopVector;
	    private trianglesVector;
	    private triangleStripVector;
	    private triangleFanVector;
	    private vertexBuffers;
	    private shapeScene;
	    constructor(canvasWidth: number, canvasHeight: number, gl: WebGLRenderingContext);
	    setViewPortDimensions(newWidth: number, newHeight: number): void;
	    renderMode: RenderMode;
	    shape: ShapeMode;
	    color: Color;
	    getRGBColor(): RGBColor;
	    addXYPointToScene(x: number, y: number): void;
	    addShapeToScene(shape: Shape): void;
	    draw(): void;
	    private drawGlArray(vector, renderMode, vertexSize?, colorSize?);
	    private addXYAndColorToVertexBuffer(vertexBuffer, x, y);
	    private initShaders();
	    private createShader(str, type);
	}

}
declare module 'utils/contextWrangler' {
	export class ContextWrangler {
	    static getContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
	}

}
declare module 'graphics/geometry/point2d' {
	export interface Point2d {
	    x: number;
	    y: number;
	}

}
declare module 'graphics/geometry/line' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Line extends Shape {
	    constructor(point: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    addVertex(vertex: Point2d): void;
	}

}
declare module 'graphics/geometry/boundingRectangle' {
	import { Point2d } from 'graphics/geometry/point2d';
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
declare module 'graphics/geometry/midpoint' {
	import { Point2d } from 'graphics/geometry/point2d';
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
declare module 'graphics/geometry/ellipse' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
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
declare module 'graphics/geometry/triangle' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Triangle extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	}

}
declare module 'graphics/geometry/rectangle' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Rectangle extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	}

}
declare module 'graphics/geometry/hexagon' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Hexagon extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    private populateVerticies(boundingRect);
	}

}
declare module 'graphics/geometry/octogon' {
	import { Shape } from 'graphics/geometry/shape';
	import { Point2d } from 'graphics/geometry/point2d';
	import { RGBColor } from 'graphics/rgbColor';
	export class Octogon extends Shape {
	    constructor(point1: Point2d, point2: Point2d, rgbColor: RGBColor, gl: WebGLRenderingContext);
	    private populateVerticies(boundingRect);
	}

}
declare module 'graphics/geometry/point3d' {
	import { RGBColor } from 'graphics/rgbColor';
	export class Point3d {
	    x: number;
	    y: number;
	    z: number;
	    pointSize: number;
	    color: RGBColor;
	    constructor(x: number, y: number, z: number, pointSize: number, color: RGBColor);
	}

}
declare module 'graphics/geometry/shapeFactory' {
	import { Shape } from 'graphics/geometry/shape';
	import { ShapeMode } from 'graphics/geometry/shapeMode';
	import { Point2d } from 'graphics/geometry/point2d';
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
	import { Point2d } from 'graphics/geometry/point2d';
	import { Line } from 'graphics/geometry/line';
	import { Shape } from 'graphics/geometry/shape';
	import { ShapeFactory } from 'graphics/geometry/shapeFactory';
	import { ShapeMode } from 'graphics/geometry/shapeMode';
	import { RenderMode } from 'graphics/renderModeMapper';
	export { IWebGLRenderer, WebGLRenderer, ContextWrangler, Color, ColorMapper, ShapeMode, RenderMode, Shape, ShapeFactory, Point2d, Line };

}
