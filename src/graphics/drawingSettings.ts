import { ShapeMode } from "./shapes/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";

export interface DrawingSettings
{
    _glRenderMode?: number;
    _shapeMode?: ShapeMode;
    _renderModeStr?: RenderMode;
    _drawingMode?: DrawingMode;
    _pointSize?: number;
    _backgroundColor?: RGBColor;
    _color?: RGBColor;
}