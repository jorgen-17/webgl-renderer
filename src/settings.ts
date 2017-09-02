import { Vec3 } from "cuon-matrix-ts";

import { RenderMode } from "./graphics/renderModeMapper";
import { Shape2dMode } from "./graphics/shape/shape2d/shape2dMode";
import { DrawingMode } from "./graphics/drawingMode";
import { RGBColor } from "./graphics/color/rgbColor";
import { Camera } from "./graphics/camera";

const defaultRenderMode: RenderMode = "points";
const defaultshape2dMode: Shape2dMode = "points";
const defaultBackgroundColor: RGBColor = { red: 0.9, green: 0.9, blue: 0.9 };
const defaultColor: RGBColor = { red: 0.0, green: 0.0, blue: 0.0 };
const defaultIsFullscreen = false;
const defaultGpuMemoryEffeciency = false;

export let Settings =
{
    defaultRendereMode: defaultRenderMode,
    defaultshape2dMode: defaultshape2dMode,
    defaultPointSize: 10,
    defaultBackgroundColor: defaultBackgroundColor,
    defaultBackgroundAlpha: 1,
    defaultColor: defaultColor,
    defaultIsFullScreen: defaultIsFullscreen,
    defaultGpuMemoryEffeciency: defaultGpuMemoryEffeciency
};