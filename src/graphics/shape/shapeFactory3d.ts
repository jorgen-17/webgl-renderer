import { Vec3 } from "cuon-matrix-ts";

import { ShapeFactory } from "./shapeFactory";
import { ShapeMode } from "./shapeMode";
import { RGBColor } from "../color/rgbColor";
import { DynamicShape } from "./dynamicShape";

export class ShapeFactory3d extends ShapeFactory
{
    public createShape(point1: Vec3, point2: Vec3, shapeMode: ShapeMode,
        gl: WebGLRenderingContext, rgbColor?: RGBColor): DynamicShape
    {
        switch (shapeMode)
        {
            case "points":
                throw Error(`cannot create a point with this method, please use createPoint`);
            case "lines":
                throw Error(`cannot create a line with this method, please use createLine`);
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
            case "box":
                return this.createBox(point1, point2, gl, rgbColor);
            default:
                throw Error(`cannot recognize shape type ${shapeMode}`);
        }
    }
}