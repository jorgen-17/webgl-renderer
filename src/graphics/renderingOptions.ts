import { ShapeMode } from "./shape/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./color/rgbColor";
import { Camera } from "./camera";
import { BrowserHelper } from "../utils/browserHelper";
import { WebGLRenderer } from "./webglRenderer";

export interface RenderingOptions
{
    browserHelper?: BrowserHelper;
    backgroundColor?: RGBColor;
    camera?: Camera;
    window?: Window;
    fullscreen?: boolean;
    calcWidth?: (newWidth: number) => number;
    calcHeight?: (newHeight: number) => number;
}