// adapted to typescript from https://github.com/yukoba/WebGLBook/blob/master/lib/cuon-matrix.js

export class Vector3
{
    public elements: Float32Array;

    constructor(source: Vector3 | null = null)
    {
        let arr = new Float32Array(3);

        if (source)
        {
            arr[0] = source[0]; arr[1] = source[1]; arr[2] = source[2];
        }
        this.elements = arr;
    }

    public normalize()
    {
        let v = this.elements;
        let c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
        if (g)
        {
            if (g === 1)
            {
                return this;
            }
        } else
        {
            v[0] = 0; v[1] = 0; v[2] = 0;
            return this;
        }
        g = 1 / g;
        v[0] = c * g; v[1] = d * g; v[2] = e * g;
        return this;
    }
}