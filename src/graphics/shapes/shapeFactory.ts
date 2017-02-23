import { Rectangle } from "./rectangle";
import { Point3d } from "./point3d"
import { Point2d } from "./point2d"
import { Color } from "../color";

export class ShapeFactory
{
    static createSquare(topLeft: Point2d, topRight: Point2d, bottomLeft: Point2d, bottomRight: Point2d, gl: WebGLRenderingContext): Rectangle
    {
        return new Rectangle(topLeft, topRight, bottomLeft, bottomRight, gl);
    };

    static createPoint3d(x: number, y: number, z: number, pointSize: number, color: Color): Point3d
    {
        return new Point3d(x, y, z, pointSize, color);
    }
}