import { RenderMode } from "./graphics/renderModeMapper";
import { ShapeMode } from "./graphics/shapes2d/shapeMode";
import { DrawingMode } from "./graphics/drawingMode";
import { RGBColor } from "./graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Camera } from "./graphics/camera";


const floatsPerPoint = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const floatsPerVertex = floatsPerPoint + floatsPerColor;
const defaultRenderMode: RenderMode = "points";
const defaultShapeMode: ShapeMode = "points";
const defaultDrawingMode: DrawingMode = DrawingMode.Verticies;
const defaultBackgroundColor: RGBColor = { red: 0.9, green: 0.9, blue: 0.9 };
const defaultColor: RGBColor = { red: 0.0, green: 0.0, blue: 0.0 };
const defaultEyePosition = new Vec3(0, 0, 0);
const defaultLookAtPoint = new Vec3(0, 0, -1);
const defaultUpPosition = new Vec3(0, 1, 0);

export let Settings =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    // closest number to 65k(gl vertex limit)
    // that is also divisible by floatsPerVertex
    vertexBufferFloatLimit: 64998,
    defaultAlpha: 1.0,
    defaultRendereMode: defaultRenderMode,
    defaultShapeMode: defaultShapeMode,
    defaultDrawingMode: defaultDrawingMode,
    defaultPointSize: 10,
    defaultBackgroundColor: defaultBackgroundColor,
    defaultBackgroundAlpha: 1,
    defaultColor: defaultColor,
    defaultEyePosition: defaultEyePosition,
    defaultLookAtPoint: defaultLookAtPoint,
    defaultUpPosition: defaultUpPosition
};

export let ShaderSettings =
{
    positionAttributeName: "a_position",
    colorAttributeName: "a_color",
    pointSizeUniformName: "u_pointSize",
    viewMatrixUniformName: "u_viewMatrix"
};