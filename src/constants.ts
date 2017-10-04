import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPosition = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerMat4Row = 4; // same as above
const floatsPerMat4 = 16; // same as above
const floatsPerStaticVertex = floatsPerColor + floatsPerPosition;
const floatsPerDynamicVertex = floatsPerPosition + floatsPerColor + floatsPerMat4; // position + color + modelMatrix
const floatsPerTriangle = verticiesPerTriangle * floatsPerDynamicVertex;
const floatSize = Float32Array.BYTES_PER_ELEMENT;
const bytesPerVertex = floatSize * floatsPerDynamicVertex;
const bytesPerPoint = floatSize * floatsPerPosition;
const bytesPerColor = floatSize * floatsPerPosition;
const bytesPerPointColor = bytesPerPoint + bytesPerColor;
const bytesPerRow = floatsPerMat4Row * floatSize;
const bytesPerMatrix = bytesPerRow * floatSize;
const modelMatrixRow0Offset = bytesPerPointColor + (bytesPerRow * 0);
const modelMatrixRow1Offset = bytesPerPointColor + (bytesPerRow * 1);
const modelMatrixRow2Offset = bytesPerPointColor + (bytesPerRow * 2);
const modelMatrixRow3Offset = bytesPerPointColor + (bytesPerRow * 3);

export let Constants =
{
    floatsPerPosition: floatsPerPosition,
    floatsPerColor: floatsPerColor,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerMat4Row: floatsPerMat4Row,
    floatsPerMat4: floatsPerMat4,
    floatsPerStaticVertex: floatsPerStaticVertex,
    floatsPerDynamicVertex: floatsPerDynamicVertex,
    floatsPerTriangle: floatsPerTriangle,
    bytesPerVertex: bytesPerVertex,
    bytesPerPoint: bytesPerPoint,
    modelMatrixRow0Offset: modelMatrixRow0Offset,
    modelMatrixRow1Offset: modelMatrixRow1Offset,
    modelMatrixRow2Offset: modelMatrixRow2Offset,
    modelMatrixRow3Offset: modelMatrixRow3Offset,
    defaultAlpha: 1.0
};