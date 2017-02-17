import { Color } from "./Color";

export class Shape {
    buffer: WebGLBuffer;
    vertexSize: number;
    numberOfVerticies: number;
    primitiveType: number;

    constructor(buffer: WebGLBuffer, vertexSize: number, numberOfVerticies: number, primitiveType: number)
    {
        this.buffer = buffer;
        this.vertexSize = vertexSize;
        this. numberOfVerticies = numberOfVerticies;
        this.primitiveType = primitiveType;
    }
}

export class Point3d {
    x: number;
    y: number;
    z: number;
    pointSize: number;
    color: Color;

    constructor(x: number, y: number, z: number, pointSize: number, color: Color)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pointSize = pointSize;
        this.color = color;
    }
}