import { ShapeMode } from "./shapes2d/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";
import { Camera } from "./camera";

export interface RenderingOptions
{
    renderMode?: RenderMode;
    pointSize?: number;
    backgroundColor?: RGBColor;
    camera?: Camera;
    window?: Window;
    fullscreen?: boolean;
    resizeCallback?: () => void;
}