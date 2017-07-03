import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";

export abstract class Shape2d {
    public verticies: Float32Vector;
    public rgbColor: RGBColor;
    public glRenderMode: number;
    constructor(rgbColor: RGBColor)
    {
        this.rgbColor = rgbColor;
    }

    protected addXYAndColorToFloat32Array(array: Float32Array, index: number, x: number, y: number, z: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this.rgbColor.red;
        array[index + 4] = this.rgbColor.green;
        array[index + 5] = this.rgbColor.blue;
    }
}
