import { Point2d } from "./point2d";
import { Tuple } from "../../utils/tuple";

export class Midpoint
{
    public static between(point1: Point2d, point2: Point2d): Point2d
    {
        let midX = (point1.x + point2.x) / 2;
        let midY = (point1.y + point2.y) / 2;
        return {x: midX, y: midY};
    }
}

export class ThirdPoints
{
    public static between(point1: Point2d, point2: Point2d): Tuple<Point2d, Point2d>
    {
        let largerX = Math.max(point1.x, point2.x);
        let smallerX = Math.min(point1.x, point2.x);
        let largerY = Math.max(point1.y, point2.y);
        let smallerY = Math.min(point1.y, point2.y);
        let thirdX = (largerX - smallerX) / 3;
        let thirdY = (largerY - smallerY) / 3;
        let firstThird = {x: smallerX + thirdX, y: smallerY + thirdY};
        let secondThird = {x: firstThird.x + thirdX, y: firstThird.y + thirdY};
        return { first: firstThird, second: secondThird };
    }
}