import { RGBColor } from "../rgbColor";

export class Point3d {
    public x: number;
    public y: number;
    public z: number;
    public pointSize: number;
    public color: RGBColor;

    constructor(x: number, y: number, z: number, pointSize: number = 5,
        color: RGBColor = new RGBColor(0, 0, 0))
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pointSize = pointSize;
        this.color = color;
    }
}