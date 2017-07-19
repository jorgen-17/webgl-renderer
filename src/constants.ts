import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPoint = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const floatsPerVertex = floatsPerPoint + floatsPerColor;
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerTriangle = verticiesPerTriangle * floatsPerVertex;
const lineGlRenderMode: RenderMode = "lineStrip";

export let Constants =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerTriangle: floatsPerTriangle,
    // closest number to 65k(gl vertex limit)
    // that is also divisible by floatsPerVertex
    vertexBufferFloatLimit: 64998,
    defaultAlpha: 1.0,
    lineGlRenderMode: lineGlRenderMode
};