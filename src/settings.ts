const floatsPerPoint = 2; // x and y
const floatsPerColor = 3; // r, g, and b
const floatsPerVertex = floatsPerPoint + floatsPerColor;

export let Settings =
{
    floatsPerPoint: floatsPerPoint,
    floatsPerColor: floatsPerColor,
    floatsPerVertex: floatsPerVertex,
    vertexBufferFloatLimit: 65000,
    defaultAlpha: 1.0
};