import { Constants } from "../constants";
export class Float32Vector
{
    public arr: Float32Array;
    public size: number;
    private _sizeLimit: number;

    constructor(arr: Float32Array = new Float32Array(0), sizeLimit: number = 0)
    {
        this.arr = arr;
        this.size = arr.length;
        this._sizeLimit = sizeLimit;
    }

    public addNumber(number: number): boolean
    {
        const newSize = this.size + 1;
        const additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (additionWillOverflowCapacity)
        {
            return false;
        }

        const newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;

        if (newSize >= this.arr.length)
        {
            let oldArr = this.arr;
            this.arr = new Float32Array(newArrayLength);
            this.arr.set(oldArr);
        }
        this.arr[this.size] = number;
        this.size = newSize;
        return true;
    }

    public addArray(arr: Float32Array | Array<number>): boolean
    {
        let newSize = this.size + arr.length;
        const additionWillOverflowCapacity = this._sizeLimit && newSize > this._sizeLimit;
        if (this._sizeLimit && newSize > this._sizeLimit)
        {
            return false;
        }

        const newArrayLength = this._sizeLimit ?
            Math.min(newSize * 2, this._sizeLimit) :
            newSize * 2;

        if (newSize >= this.arr.length)
        {
            let oldArr = this.arr;
            this.arr = new Float32Array(newArrayLength);
            this.arr.set(oldArr);
        }
        this.arr.set(arr, this.size);
        this.size = newSize;
        return true;
    }

    public remove(start: number, count: number = 1)
    {
        if (start < 0 || start >= this.arr.length)
        {
            throw `index(${start}) is out of bounds`;
        }

        count = count > 0 ? count : 1;

        let insertionIndex = start;
        for (let i = insertionIndex + count; i < this.size; i++)
        {
            this.arr[insertionIndex] = this.arr[i];
            insertionIndex++;
        }

        this.arr.fill(0, insertionIndex);

        const countOverflowed = start + count >= this.size;
        const numberDeleted = countOverflowed ?
            (this.size - start) : (this.size - count);
        this.size -= numberDeleted;
    }

    public getTrimmedArray(): Float32Array
    {
        if (this.arr.length > this.size)
        {
            let trimmedArr = new Float32Array(this.size);

            for (let i = 0; i < trimmedArr.length; i++)
            {
                trimmedArr[i] = this.arr[i];
            }

            return trimmedArr;
        }

        return this.arr;
    }
}