import { Vec3, Vec2 } from "cuon-matrix-ts";

import { DynamicShape } from "./dynamicShape";
import { ShapeMode } from "./shapeMode";
import { Ellipse } from "./shape2d/ellipse";
import { Triangle } from "./shape2d/triangle";
import { Rectangle } from "./shape2d/rectangle";
import { Hexagon } from "./shape2d/hexagon";
import { Octogon } from "./shape2d/octogon";
import { RGBColor } from "../color/rgbColor";
import { Precision } from "../precision";
import { Box } from "./shape3d/box";
import { Point } from "./shape2d/point";
import { Line } from "./shape2d/line";

export abstract class ShapeFactory
{
    public abstract createPoint(location: Vec2 | Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor, pointSize?: number): Point;

    public abstract createLine(firstPoint: Vec2 | Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Line;

    public abstract createShape(point1: Vec2 | Vec3, point2: Vec2 | Vec3,
        shapeMode: ShapeMode, gl: WebGLRenderingContext, rgbColor?: RGBColor)
        : DynamicShape;

    protected createTriangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Triangle
    {
        return new Triangle(point1, point2, gl, rgbColor);
    }

    protected createRectangle(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Rectangle
    {
        return new Rectangle(point1, point2, gl, rgbColor);
    }

    protected createHexagon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Hexagon
    {
        return new Hexagon(point1, point2, gl, rgbColor);
    }

    protected createOctogon(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Octogon
    {
        return new Octogon(point1, point2, gl, rgbColor);
    }

    protected createEllipse(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Ellipse
    {
        return new Ellipse(point1, point2, gl, Precision.High, rgbColor);
    }

    protected createBox(point1: Vec3, point2: Vec3, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Box
    {
        return new Box(point1, point2, gl, rgbColor);
    }
}