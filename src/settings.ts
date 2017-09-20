import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RenderMode } from "./graphics/renderModeMapper";
import { ShapeMode } from "./graphics/shape/shapeMode";
import { DrawingMode } from "./graphics/drawingMode";
import { RGBColor } from "./graphics/color/rgbColor";
import { Camera } from "./graphics/camera";

const defaultRenderMode: RenderMode = "points";
const defaultShapeMode: ShapeMode = "points";
const defaultBackgroundColor: RGBColor = { red: 0.9, green: 0.9, blue: 0.9 };
const defaultColor: RGBColor = { red: 0.0, green: 0.0, blue: 0.0 };
const defaultEyePosition = new Vec3(0, 0, 0);
const defaultLookAtPoint = new Vec3(0, 0, -1);
const defaultUpPosition = new Vec3(0, 1, 0);
const defaultFieldOfView = 60;
const defaultNear = 0.01;
const defaultFar = 2;
const defaultModelMatrix = new Mat4().setIdentity();
const defaultIsFullscreen = false;
const instancedArrayExtensionName = "ANGLE_instanced_arrays";

export let Settings =
{
    defaultRendereMode: defaultRenderMode,
    defaultShapeMode: defaultShapeMode,
    defaultPointSize: 10,
    defaultBackgroundColor: defaultBackgroundColor,
    defaultBackgroundAlpha: 1,
    defaultColor: defaultColor,
    defaultEyePosition: defaultEyePosition,
    defaultLookAtPoint: defaultLookAtPoint,
    defaultUpPosition: defaultUpPosition,
    defaultFieldOfView: defaultFieldOfView,
    defaultNear: defaultNear,
    defaultFar: defaultFar,
    defaultModelMatrix: defaultModelMatrix,
    defaultIsFullScreen: defaultIsFullscreen,
    instancedArrayExtensionName: instancedArrayExtensionName
};