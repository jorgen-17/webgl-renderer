import { Shape } from "./shape";
import { ShapeMode } from "./shapeMode";
import { Ellipse } from "./ellipse";
import { Triangle } from "./triangle";
import { Rectangle } from "./rectangle";
import { Hexagon } from "./hexagon";
import { Octogon } from "./octogon";
import { Point3d } from "./point3d";
import { Point2d } from "./point2d";
import { RGBColor } from "../rgbColor";
import { Precision } from "../precision";

export class ShapeFactory
{
    public static createShape(point1: Point2d, point2: Point2d, shapeMode: ShapeMode,
        rgbColor: RGBColor, gl: WebGLRenderingContext): Shape
    {
        switch (shapeMode)
        {
            case "ellipses":
                return this.createEllipse(point1, point2, rgbColor, gl);
            case "triangles":
                return this.createTriangle(point1, point2, rgbColor, gl);
            case "rectangles":
                return this.createRectangle(point1, point2, rgbColor, gl);
            case "hexagons":
                return this.createHexagon(point1, point2, rgbColor, gl);
            case "octogons":
                return this.createOctogon(point1, point2, rgbColor, gl);
            default:
                throw Error(`cannot recognize shape type ${shapeMode}`);
        }
    }

    private static createEllipse(point1: Point2d, point2: Point2d, rgbColor: RGBColor,
        gl: WebGLRenderingContext): Ellipse
    {
        return new Ellipse(point1, point2, rgbColor, gl, Precision.High);
    }

    private static createTriangle(point1: Point2d, point2: Point2d, rgbColor: RGBColor,
        gl: WebGLRenderingContext): Triangle
    {
        return new Triangle(point1, point2, rgbColor, gl);
    }

    private static createRectangle(point1: Point2d, point2: Point2d, rgbColor: RGBColor,
        gl: WebGLRenderingContext): Rectangle
    {
        return new Rectangle(point1, point2, rgbColor, gl);
    };

    private static createHexagon(point1: Point2d, point2: Point2d, rgbColor: RGBColor,
        gl: WebGLRenderingContext): Hexagon
    {
        return new Hexagon(point1, point2, rgbColor, gl);
        // youre
        // cute baby you know its true
        // love,
        // - your girlfriend
    }

    private static createOctogon(point1: Point2d, point2: Point2d, rgbColor: RGBColor,
        gl: WebGLRenderingContext): Octogon
    {
        return new Octogon(point1, point2, rgbColor, gl);
    }
}