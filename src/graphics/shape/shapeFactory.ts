import { Shape } from "./shape";
import { Shape2dMode } from "./shape2d/shape2dMode";
import { Ellipse } from "./shape2d/ellipse";
import { Triangle } from "./shape2d/triangle";
import { Rectangle } from "./shape2d/rectangle";
import { Hexagon } from "./shape2d/hexagon";
import { Octogon } from "./shape2d/octogon";
import { RGBColor } from "../color/rgbColor";
import { Precision } from "../precision";
import { Vec3 } from "cuon-matrix-ts";

export class ShapeFactory
{
    public static createShape(point1: Vec3, point2: Vec3, shape2dMode: Shape2dMode,
        gl: WebGLRenderingContext, rgbColor?: RGBColor): Shape
    {
        switch (shape2dMode)
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
                throw Error(`cannot recognize shape type ${shape2dMode}`);
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