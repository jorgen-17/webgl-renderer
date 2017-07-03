import { Tuple } from "../../utils/tuple";
import { Vec3 } from "../../math/vec3";

export class Midpoint
{
    public static between(point1: Vec3, point2: Vec3): Vec3
    {
        let midX = (point1.x + point2.x) / 2;
        let midY = (point1.y + point2.y) / 2;
        let midZ = (point1.z + point2.z) / 2;
        return new Vec3(midX, midY, midZ);
    }
}

export class ThirdPoints
{
    public static between(point1: Vec3, point2: Vec3): Tuple<Vec3, Vec3>
    {
        let largerX = Math.max(point1.x, point2.x);
        let smallerX = Math.min(point1.x, point2.x);
        let largerY = Math.max(point1.y, point2.y);
        let smallerY = Math.min(point1.y, point2.y);
        let largerZ = Math.max(point1.z, point2.z);
        let smallerZ = Math.min(point1.z, point2.z);
        let thirdX = (largerX - smallerX) / 3;
        let thirdY = (largerY - smallerY) / 3;
        let thirdZ = (largerZ - smallerZ) / 3;
        let firstThird = new Vec3((smallerX + thirdX), (smallerY + thirdY), (smallerZ + thirdZ));
        let secondThird = new Vec3((firstThird.x + thirdX), (firstThird.y + thirdY), (firstThird.z + thirdZ));
        return     { first: firstThird, second: secondThird };
    }
}