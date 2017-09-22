import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPoint = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerMat4 = 16; // same as above
const floatsPerTriangle = verticiesPerTriangle * floatsPerPoint;

export let Constants =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerMat4: floatsPerMat4,
    floatsPerTriangle: floatsPerTriangle,
    defaultAlpha: 1.0
};