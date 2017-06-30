import { ShapeMode } from "./shapes/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";

export interface DrawingSettings
{
    _shapeMode?: ShapeMode;
    _renderMode?: RenderMode;
    _drawingMode?: DrawingMode;
    _pointSize?: number;
    _backgroundColor?: RGBColor;
    _color?: RGBColor;
}