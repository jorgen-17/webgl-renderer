export class Float32Vector
{
    public arr: Float32Array;
    public size: number;

    constructor(arr: Float32Array = new Float32Array(0))
    {
        this.arr = arr;
        this.size = arr.length;
    }

    public addNumber(number: number)
    {
        const newSize = this.size + 1;
        if (newSize >= this.arr.length)
        {
            let oldArr = this.arr;
            this.arr = new Float32Array(newSize * 2);
            this.arr.set(oldArr);
        }
        this.arr[this.size] = number;
        this.size = newSize;
    }

    public addArray(arr: Float32Array | Array<number>)
    {
        let newSize = this.size + arr.length;
        if (newSize >= this.arr.length)
        {
            let oldArr = this.arr;
            this.arr = new Float32Array(newSize * 2);
            this.arr.set(oldArr);
        }
        this.arr.set(arr, this.size);
        this.size = newSize;
    }

    public getTrimmedArray()
    {
        let trimmedArr = new Float32Array(this.size);

        for (let i = 0; i < trimmedArr.length; i++)
        {
            trimmedArr[i] = this.arr[i];
        }

        return trimmedArr;
    }
}