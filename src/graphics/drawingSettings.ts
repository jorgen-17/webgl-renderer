import { ShapeMode } from "./shapes2d/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";

export interface DrawingSettings
{
    renderMode?: RenderMode;
    pointSize?: number;
    backgroundColor?: RGBColor;
    fullscreen?: boolean;
}