export class Float32ArrayUtils
{
    public static fill(arr: Float32Array, start: number = 0,
        end: number = arr.length, value: number = 0): void
    {
        if (start < 0 || start >= arr.length)
        {
            throw `index(${start}) is out of bounds`;
        }

        end = end <= start ? start + 1 : end;
        const stopIndex = Math.min(arr.length, end);

        for (let i = start; i < stopIndex; i++)
        {
            arr[i] = value;
        }
    }
}