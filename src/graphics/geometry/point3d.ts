import { Color } from "../color";

export class Point3d {
    public x: number;
    public y: number;
    public z: number;
    public pointSize: number;
    public color: Color;

    constructor(x: number, y: number, z: number, pointSize: number, color: Color)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pointSize = pointSize;
        this.color = color;
    }
}