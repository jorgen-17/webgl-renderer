import { RenderMode } from "./graphics/renderModeMapper";

const floatsPerPosition = 3; // x, y, and z
const floatsPerColor = 3; // r, g, and b
const verticiesPerTriangle = 3; // obvious, but avoids random 3 everywhere
const floatsPerMat4Row = 4; // same as above
const floatsPerMat4 = 16; // same as above
const floatsPerPointSize = 1; // same as above
const floatsPerPositionColor = floatsPerPosition + floatsPerColor;
const floatsPerPointVertex = floatsPerPosition + floatsPerColor + floatsPerPointSize;
const floatsPerDynamicVertex = floatsPerPosition + floatsPerColor + floatsPerMat4; // position + color + modelMatrix
const floatsPerTriangle = verticiesPerTriangle * floatsPerDynamicVertex;
const floatSize = Float32Array.BYTES_PER_ELEMENT;
const bytesPerPosition = floatSize * floatsPerPosition;
const bytesPerColor = floatSize * floatsPerPosition;
const bytesPerPointSize = floatSize * floatsPerPointSize;
const bytesPerPositionColor = bytesPerPosition + bytesPerColor;
const bytesPerPointVertex = floatSize * floatsPerPointVertex;
const bytesPerDynamicVertex = floatSize * floatsPerDynamicVertex;
const bytesPerRow = floatsPerMat4Row * floatSize;
const bytesPerMatrix = bytesPerRow * floatSize;
const modelMatrixRow0Offset = bytesPerPositionColor + (bytesPerRow * 0);
const modelMatrixRow1Offset = bytesPerPositionColor + (bytesPerRow * 1);
const modelMatrixRow2Offset = bytesPerPositionColor + (bytesPerRow * 2);
const modelMatrixRow3Offset = bytesPerPositionColor + (bytesPerRow * 3);

export let Constants =
{
    floatsPerPosition: floatsPerPosition,
    floatsPerColor: floatsPerColor,
    floatsPerPointSize: floatsPerPointSize,
    verticiesPerTriangle: verticiesPerTriangle,
    floatsPerMat4Row: floatsPerMat4Row,
    floatsPerMat4: floatsPerMat4,
    floatsPerPositionColor: floatsPerPositionColor,
    floatsPerPointVertex: floatsPerPointVertex,
    floatsPerDynamicVertex: floatsPerDynamicVertex,
    floatsPerTriangle: floatsPerTriangle,
    bytesPerPosition: bytesPerPosition,
    bytesPerPositionColor: bytesPerPositionColor,
    bytesPerPointVertex: bytesPerPointVertex,
    bytesPerDynamicVertex: bytesPerDynamicVertex,
    modelMatrixRow0Offset: modelMatrixRow0Offset,
    modelMatrixRow1Offset: modelMatrixRow1Offset,
    modelMatrixRow2Offset: modelMatrixRow2Offset,
    modelMatrixRow3Offset: modelMatrixRow3Offset,
    defaultAlpha: 1.0
};