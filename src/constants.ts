import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPoint = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerMat4Row = 4; // same as above
const floatsPerMat4 = 16; // same as above
const floatsPerVertex = floatsPerPoint + floatsPerColor + floatsPerMat4; // position + color + modelMatrix
const floatsPerTriangle = verticiesPerTriangle * floatsPerPoint;

export let Constants =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerMat4Row: floatsPerMat4Row,
    floatsPerMat4: floatsPerMat4,
    floatsPerVertex: floatsPerVertex,
    floatsPerTriangle: floatsPerTriangle,
    defaultAlpha: 1.0
};