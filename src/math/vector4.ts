// adapted to typescript from https://github.com/yukoba/WebGLBook/blob/master/lib/cuon-matrix.js

export class Vector4
{
    public elements: Float32Array;

    constructor(source: Vector4 | null = null)
    {
        let arr = new Float32Array(4);
        if (source)
        {
            arr[0] = source[0]; arr[1] = source[1]; arr[2] = source[2]; arr[3] = source[3];
        }
        this.elements = arr;
    }
}