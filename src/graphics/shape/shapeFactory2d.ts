import { Vec2, Vec3 } from "cuon-matrix-ts";

import { ShapeFactory } from "./shapeFactory";
import { ShapeMode } from "./shapeMode";
import { RGBColor } from "../color/rgbColor";
import { DynamicShape } from "./dynamicShape";
import { Point } from "./shape2d/point";
import { Line } from "./shape2d/line";

export class ShapeFactory2d extends ShapeFactory
{
    public createPoint(location: Vec2, gl: WebGLRenderingContext,
        rgbColor?: RGBColor, pointSize?: number): Point
    {
        const locationVec3 = new Vec3(location.x, location.y, 0);

        return new Point(locationVec3, gl, rgbColor, pointSize);
    }

    public createLine(firstPoint: Vec2, gl: WebGLRenderingContext,
        rgbColor?: RGBColor): Line
    {
        const locationVec3 = new Vec3(firstPoint.x, firstPoint.y, 0);

        return new Line(locationVec3, gl, rgbColor);
    }

    public createShape(point1: Vec2, point2: Vec2, shapeMode: ShapeMode,
        gl: WebGLRenderingContext, rgbColor?: RGBColor, somenum?: number): DynamicShape
    {
        const point1Vec3 = new Vec3(point1.x, point1.y, 0);
        const point2Vec3 = new Vec3(point2.x, point2.y, 0);

        switch (shapeMode)
        {
            case "points":
                throw Error(`cannot create a point with this method, please use createPoint`);
            case "lines":
                throw Error(`cannot create a line with this method, please use createLine`);
            case "triangles":
                return this.createTriangle(point1Vec3, point2Vec3, gl, rgbColor);
            case "rectangles":
                return this.createRectangle(point1Vec3, point2Vec3, gl, rgbColor);
            case "hexagons":
                return this.createHexagon(point1Vec3, point2Vec3, gl, rgbColor);
            case "octogons":
                return this.createOctogon(point1Vec3, point2Vec3, gl, rgbColor);
            case "ellipses":
                return this.createEllipse(point1Vec3, point2Vec3, gl, rgbColor);
            case "box":
                throw Error(`cannot create 3d shape(${shapeMode}), use WebGL3dRenderer instead`);
            default:
                throw Error(`cannot recognize shape type ${shapeMode}`);
        }
    }
}