import { Shape, Point3d } from "./Shapes";

export class ShapeFactory
{
    static createSquare(gl: WebGLRenderingContext): Shape
    {
        const vertexBuffer: WebGLBuffer | null = gl.createBuffer();
        if(vertexBuffer === null)
        {
            throw Error('could not create gl buffer');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var verts = [
            .5, .5, 0.0,
            -.5, .5, 0.0,
            .5, -.5, 0.0,
            -.5, -.5, 0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        return new Shape(vertexBuffer, 3, 4, gl.TRIANGLE_STRIP);
    };

    static createPoint(x: number, y: number, z: number, pointSize: number): Point3d
    {
        return new Point3d(x, y, z, pointSize);
    }
}