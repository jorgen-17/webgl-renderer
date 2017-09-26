import * as slice from "generic-slice";

import { Constants } from "../constants";
import { Float32ArrayUtils } from "./float32ArrayUtils";
export class Float32Vector
{
    public arr: Float32Array;
    public size: number;
    private _sizeLimit: number;
    private _bestFit: boolean;

    constructor(arr: Float32Array = new Float32Array(0), sizeLimit: number = 0,
        bestFit: boolean = true)
    {
        this.arr = arr;
        this.size = arr.length;
        this._sizeLimit = sizeLimit;
        this._bestFit = bestFit;
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
        if (additionWillOverflowCapacity)
        {
            if (!this._bestFit)
            {
                return false;
            }

            const numberThatCanFit = this._sizeLimit - this.size;
            const shortenedArr = slice(arr, 0, numberThatCanFit);
            return this.addArray(shortenedArr);
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

    public remove(start: number, count: number = 1): void
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

        Float32ArrayUtils.fill(this.arr, insertionIndex);

        const countOverflowed = start + count >= this.size;
        const numberDeleted = countOverflowed ?
            (this.size - start) : count;
        this.size -= numberDeleted;
    }

    public overwrite(start: number, values: Array<number> | Float32Array)
    {
        if (start < 0 || start >= this.arr.length)
        {
            throw `index(${start}) is out of bounds`;
        }

        if (!(values.length > 0))
        {
            return;
        }

        let valuesIndex = 0;
        for (let i = start; i < this.size; i++)
        {
            if (valuesIndex >= values.length)
            {
                break;
            }

            this.arr[i] = values[valuesIndex];
            valuesIndex++;
        }

        if (valuesIndex < values.length)
        {
            const arrToAdd = slice(values, valuesIndex);
            this.addArray(arrToAdd);
        }
    }

    public getTrimmedArray(): Float32Array
    {
        if (this.arr.length > this.size)
        {
            return slice(this.arr, 0, this.size);
        }

        return this.arr;
    }
}