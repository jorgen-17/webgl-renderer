import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Shape } from "./shape";

import { Float32Vector } from "../../utils/float32Vector";
import { RGBColor } from "./../color/rgbColor";
import { BoundingRectangle } from "./boundingRectangle";
import { Constants } from "../../constants";
import { Settings } from "../../settings";
import { ShapeMode } from "./shapeMode";

export abstract class StaticShape extends Shape {
    protected abstract computeVerticies(): void;

    protected addXYZAndColorToFloat32Array(array: Float32Array, index: number,
        x: number, y: number, z: number)
    {
        array[index] = x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = this.rgbColor.red;
        array[index + 4] = this.rgbColor.green;
        array[index + 5] = this.rgbColor.blue;
    }
}
