import { IPayload } from "simple-dux/dispatcher";
import { Color } from "./graphics/colorMapper";
import { ShapeMode } from "./graphics/geometry/shapeMode";
import { RenderMode } from "./graphics/renderModeMapper";
export class ColorChangeEvent implements IPayload
{
    public event_type = "colorChanged";
    public newColor: Color;

    constructor(newColor: Color)
    {
        this.newColor = newColor;
    }
}

export class ShapeChangeEvent implements IPayload
{
    public event_type = "shapeChanged";
    public newShape: ShapeMode;

    constructor(newShape: ShapeMode)
    {
        this.newShape = newShape;
    }
}

export class DrawingLinesEvent implements IPayload
{
    public event_type = "drawingLines";
}

export class RenderModeChangeEvent implements IPayload
{
    public event_type = "renderModeChanged";
    public newRenderMode: RenderMode;

    constructor(newRenderMode: RenderMode)
    {
        this.newRenderMode = newRenderMode;
    }
}