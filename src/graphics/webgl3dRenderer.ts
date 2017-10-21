//#region: imports
import { WebGLRenderer } from "./webglRenderer";
import { Camera } from "./camera";
import { Shape } from "./shape/shape";
import { ShapeMode } from "./shape/shapeMode";
import { RGBColor } from "./color/rgbColor";
import { RenderingOptions } from "./renderingOptions";
import { ShapeBuffer } from "./shape/shapeBuffer";
import { Point } from "./shape/shape2d/point";
import { Triangle } from "./shape/shape2d/triangle";
import { Rectangle } from "./shape/shape2d/rectangle";
import { Hexagon } from "./shape/shape2d/hexagon";
import { Octogon } from "./shape/shape2d/octogon";
import { Ellipse } from "./shape/shape2d/ellipse";
import { Box } from "./shape/shape3d/box";
import { StringDictionary } from "../utils/dictionary";
import { ShaderSettings } from "../shaderSettings";
import { Constants } from "../constants";
import { DynamicShape } from "./shape/dynamicShape";
import { ShapeFactory3d } from "./shape/shapeFactory3d";
import { VertexBuffer } from "./vertexBuffer";
import { Vec3 } from "cuon-matrix-ts";
//#endregion: imports

export class WebGL3dRenderer extends WebGLRenderer
{
    //#region: member variables
    private _shapeFactory: ShapeFactory3d;
    private _camera: Camera;
    private _trianglesShapeBuffer: ShapeBuffer<Triangle>;
    private _rectanglesShapeBuffer: ShapeBuffer<Rectangle>;
    private _hexagonsShapeBuffer: ShapeBuffer<Hexagon>;
    private _octogonsShapeBuffer: ShapeBuffer<Octogon>;
    private _ellipsesShapeBuffer: ShapeBuffer<Ellipse>;
    private _boxShapeBuffer: ShapeBuffer<Box>;
    //#endregion: member variables

    //#region: constructor
    constructor(canvas: HTMLCanvasElement, renderingOptions: RenderingOptions = {})
    {
        super(canvas, renderingOptions);

        this._camera = new Camera((this._canvas.width / this._canvas.height));
        this.postResizeCallback = (leCanvas: HTMLCanvasElement, window: Window,
            renderer: WebGL3dRenderer) =>
        {
            this.camera.aspectRatio = (leCanvas.width / leCanvas.height);
        };

        this._shapeFactory = new ShapeFactory3d();
    }
    //#endregion: constructor

    //#region: getters and setters
    public get camera(): Camera
    {
        return this._camera;
    }

    public set camera(value: Camera)
    {
        this._camera = value;
    }

    public get shapeFactory(): ShapeFactory3d
    {
        return this._shapeFactory;
    }
    //#endregion: getters and setters

    //#region: public methods
    public addShapeToScene(shape: Shape): string
    {
        switch (shape.shapeMode)
        {
            case "points":
                return this._pointsShapeBuffer.addShape(shape as Point);
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

    public addVertexToScene(position: Vec3, renderMode: number, color?: RGBColor): void
    {
        this.addVertexToSceneBase(position, renderMode, color);
    }

    public removeShape(id: string, shapeMode?: ShapeMode): boolean
    {
        switch (shapeMode)
        {
            case "points":
                return this._pointsShapeBuffer.removeShape(id);
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
    //#endregion: public methods

    //#region: protected methods
    protected drawPointShapeBuffer(shapeBuffer: ShapeBuffer<Point>): void
    {
        this.drawPointShapeBufferBase(shapeBuffer, this._camera.vpMatrix);
    }

    protected drawDynamicShapeBuffer(shapeBuffer: ShapeBuffer<DynamicShape>): void
    {
        this.drawDynamicShapeBufferBase(shapeBuffer, this._camera.vpMatrix);
    }

    protected drawVertexBuffer(vertexBuffer: VertexBuffer): void
    {
        this.drawVertexBufferBase(vertexBuffer, this._camera.vpMatrix);
    }

    protected initializaDynamicShapeBuffers(): void
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
    //#endregion: protected methods
}