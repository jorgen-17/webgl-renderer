import { Point2d } from "./point2d";

export class Midpoint
{
    public static between(point1: Point2d, point2: Point2d): Point2d
    {
        let midX = (point1.x + point2.x) / 2;
        let midY = (point1.y + point2.y) / 2;
        return {x: midX, y: midY};
    }
}