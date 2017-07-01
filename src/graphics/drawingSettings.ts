import { ShapeMode } from "./shapes/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";

export interface DrawingSettings
{
    shapeMode?: ShapeMode;
    renderMode?: RenderMode;
    drawingMode?: DrawingMode;
    pointSize?: number;
    backgroundColor?: RGBColor;
    color?: RGBColor;
}