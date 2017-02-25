import { Point2d } from "./point2d";

export class Midpoint
{
    public static between(point1: Point2d, point2: Point2d): Point2d
    {
        let midX = point2.x >= point1.x ? point2.x - point1.x : point1.x - point2.x;
        let midY = point2.y >= point1.y ? point2.y - point1.y : point1.y - point2.y;
        return {x: midX, y: midY};
    }
}