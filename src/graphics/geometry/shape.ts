import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";

export abstract class Shape {
    public verticies: Float32Vector;
    public rgbColor: RGBColor;
    public vertexSize: number; // number of floats to represent a vertex (i.e. x and y)
    public colorSize: number; // number of floats to represent a vertex's color (i.e. r, g, and b)
    public numberOfVerticies: number;
    public glRenderMode: number;

    constructor(rgbColor: RGBColor)
    {
        this.rgbColor = rgbColor;
        this.vertexSize = 2;
        this.colorSize = 3;
    }

    protected addXYAndColorToFloat32Array(array: Float32Array, index: number, x: number, y: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = this.rgbColor.red;
        array[index + 3] = this.rgbColor.green;
        array[index + 4] = this.rgbColor.blue;
    }
}
