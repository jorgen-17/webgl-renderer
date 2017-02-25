import { Point2d } from "./point2d"

export class BoundingRectangle
{
    topLeft: Point2d;
    topRight: Point2d;
    bottomRight: Point2d;
    bottomLeft: Point2d;

    constructor(point1: Point2d, point2: Point2d)
    {
        if(this.isTopLeftBottomRight(point1, point2))
        {
            this.topLeft = point1;
            this.topRight = {x: point2.x, y: point1.y};
            this.bottomRight = point2;
            this.bottomLeft = {x: point1.x, y: point2.y};
        }
        else if(this.isBottomRightTopLeft(point1, point2))
        {
            this.topLeft = point2;
            this.topRight = {x: point1.x, y: point2.y};
            this.bottomRight = point1;
            this.bottomLeft = {x: point2.x, y: point1.y};
        }
        else if(this.isBottomLeftTopRight(point1, point2))
        {
            this.topLeft =  {x: point1.x, y: point2.y};
            this.topRight = point2;
            this.bottomRight = {x: point2.x, y: point1.y};
            this.bottomLeft = point1;
        }
        else//only isTopRightBottomLeft possible, no need to test for it
        {
            this.topLeft =  {x: point2.x, y: point1.y};
            this.topRight = point1;
            this.bottomRight = {x: point1.x, y: point2.y};
            this.bottomLeft = point2;
        }
    }

    //four possible pattterns for bounding rectangles based off of two points
    //returns whether or not point1 is topLeft and point2 is bottomRight
    private isTopLeftBottomRight(point1: Point2d, point2: Point2d): boolean
    {
        return point1.x <= point2.x && point1.y >= point2.y;
    }

    //returns whether or not point1 is bottomRight and point2 is topLeft
    private isBottomRightTopLeft(point1: Point2d, point2: Point2d): boolean
    {
        return point1.x >= point2.x && point1.y <= point2.y;
    }

    //returns whether or not point1 is bottomLeft and point2 is topRight
    private isBottomLeftTopRight(point1: Point2d, point2: Point2d): boolean
    {
        return point1.x <= point2.x && point1.y <= point2.y;
    }

    //returns whether or not point1 is topRight and point2 is bottomLeft
    private isTopRightBottomLeft(point1: Point2d, point2: Point2d): boolean
    {
        return point1.x >= point2.x && point1.y >= point2.y;
    }

}