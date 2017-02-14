import { I2DShape } from "./I2DShape";

export class ShapeFactory
{
    static createSquare(gl: WebGLRenderingContext): I2DShape {
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
        return { buffer: vertexBuffer, vertSize: 3, nVerts: 4, primtype: gl.TRIANGLE_STRIP };
    };
}