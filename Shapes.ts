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

    constructor(x: number, y: number, z: number, pointSize: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pointSize = pointSize;
    }
}