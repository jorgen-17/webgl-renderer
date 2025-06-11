import { Vec3 } from "cuon-matrix-ts";

export class BoundingRectangle
{
    public topLeft: Vec3;
    public topRight: Vec3;
    public bottomRight: Vec3;
    public bottomLeft: Vec3;

    constructor(point1: Vec3, point2: Vec3)
    {
        if (this.isTopLeftBottomRight(point1, point2))
        {
            this.topLeft = point1;
            this.topRight = new Vec3(point2.x, point1.y, point2.z);
            this.bottomRight = point2;
            this.bottomLeft = new Vec3(point1.x, point2.y, point1.z);
        }
        else if (this.isBottomRightTopLeft(point1, point2))
        {
            this.topLeft = point2;
            this.topRight = new Vec3(point1.x, point2.y, point1.z);
            this.bottomRight = point1;
            this.bottomLeft = new Vec3(point2.x, point1.y, point2.z);
        }
        else if (this.isBottomLeftTopRight(point1, point2))
        {
            this.topLeft =  new Vec3(point1.x, point2.y, point1.z);
            this.topRight = point2;
            this.bottomRight = new Vec3(point2.x, point1.y, point2.z);
            this.bottomLeft = point1;
        }
        else// only isTopRightBottomLeft possible, no need to test for it
        {
            this.topLeft =  new Vec3(point2.x, point1.y, point2.z);
            this.topRight = point1;
            this.bottomRight = new Vec3(point1.x, point2.y, point1.z);
            this.bottomLeft = point2;
        }
    }

    // four possible pattterns for bounding rectangles based off of two points
    // returns whether or not point1 is topLeft and point2 is bottomRight
    private isTopLeftBottomRight(point1: Vec3, point2: Vec3): boolean
    {
        return point1.x <= point2.x && point1.y >= point2.y;
    }

    // returns whether or not point1 is bottomRight and point2 is topLeft
    private isBottomRightTopLeft(point1: Vec3, point2: Vec3): boolean
    {
        return point1.x >= point2.x && point1.y <= point2.y;
    }

    // returns whether or not point1 is bottomLeft and point2 is topRight
    private isBottomLeftTopRight(point1: Vec3, point2: Vec3): boolean
    {
        return point1.x <= point2.x && point1.y <= point2.y;
    }
}