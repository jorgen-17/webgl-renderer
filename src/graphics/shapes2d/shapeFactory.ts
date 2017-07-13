import { Shape2d } from "./shape2d";
import { ShapeMode } from "./shapeMode";
import { Ellipse } from "./ellipse";
import { Triangle } from "./triangle";
import { Rectangle } from "./rectangle";
import { Hexagon } from "./hexagon";
import { Octogon } from "./octogon";
import { RGBColor } from "../rgbColor";
import { Precision } from "../precision";
import { Vec3 } from "cuon-matrix-ts";

export class ShapeFactory
{
    public static createShape(point1: Vec3, point2: Vec3, shapeMode: ShapeMode,
        gl: WebGLRenderingContext, rgbColor?: RGBColor): Shape2d
    {
        switch (shapeMode)
        {
            case "triangles":
                return this.createTriangle(point1, point2, gl, rgbColor);
            case "rectangles":
                return this.createRectangle(point1, point2, gl, rgbColor);
            case "hexagons":
                return this.createHexagon(point1, point2, gl, rgbColor);
            case "octogons":
                return this.createOctogon(point1, point2, gl, rgbColor);
            case "ellipses":
                return this.createEllipse(point1, point2, gl, rgbColor);
            default:
                throw Error(`cannot recognize shape type ${shapeMode}`);
        }
    }

    private static createTriangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Triangle
    {
        return new Triangle(point1, point2, gl, rgbColor);
    }

    private static createRectangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Rectangle
    {
        return new Rectangle(point1, point2, gl, rgbColor);
    }

    private static createHexagon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Hexagon
    {
        return new Hexagon(point1, point2, gl, rgbColor);
        // youre
        // cute baby you know its true
        // love,
        // - your girlfriend
    }

    private static createOctogon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Octogon
    {
        return new Octogon(point1, point2, gl, rgbColor);
    }

    private static createEllipse(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Ellipse
    {
        return new Ellipse(point1, point2, gl, Precision.High, rgbColor);
    }
}