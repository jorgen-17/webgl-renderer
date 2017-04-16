import { Float32Vector } from "../../utils/vector";
import { RGBColor } from "../rgbColor";

export abstract class Shape {
    public verticies: Float32Vector;
    public rgbColor: RGBColor;
    public vertexSize: number;
    public numberOfVerticies: number;
    public glRenderMode: number;

    protected addXYAndColorToFloat32Array(array: Float32Array, index: number, x: number, y: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = this.rgbColor.red;
        array[index + 3] = this.rgbColor.green;
        array[index + 4] = this.rgbColor.blue;
    }
}
