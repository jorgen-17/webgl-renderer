import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPoint = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const floatsPerVertex = floatsPerPoint + floatsPerColor;
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerTriangle = verticiesPerTriangle * floatsPerVertex;

export let Constants =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerTriangle: floatsPerTriangle,
    defaultAlpha: 1.0
};