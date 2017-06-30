import {Float32Vector} from "../../src/utils/vector";

describe("Float32Vector ", () =>
{
    describe("constructor ", () =>
    {
        it("should initialize arr and size correctly", () =>
        {
            let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
            expect(vec.size).toBe(3);
            expect(vec.arr[0]).toBe(1.0);
            expect(vec.arr[1]).toBe(2.0);
            expect(vec.arr[2]).toBe(3.0);
        });
    });
    describe("addNumber ", () =>
    {
        it("should insert a new value in the correct place " +
        "and double the size of the underlying Float32Array to (size + 1) * 2", () =>
        {
            let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
            vec.addNumber(4.0);
            expect(vec.size).toBe(4);
            expect(vec.arr[3]).toBe(4.0);
            expect(vec.arr.length).toBe(8);
            vec.addNumber(5.0);
            vec.addNumber(6.0);
            vec.addNumber(7.0);
            vec.addNumber(8.0);
            expect(vec.size).toBe(8);
            expect(vec.arr.length).toBe(16);
            vec.addNumber(9.0);
            expect(vec.size).toBe(9);
            expect(vec.arr.length).toBe(16);
        });
    });
        describe("addArray ", () =>
        {
        it("should insert new values from Float32Array or Array<number> in the correct place " +
        "and double the size of the underlying Float32Array to (size + arrToAdd.length) * 2", () =>
        {
            let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
            let float32ArrToAdd = new Float32Array([4.0, 5.0, 6.0]);
            vec.addArray(float32ArrToAdd);
            expect(vec.size).toBe(6);
            // copied ver old elements
            expect(vec.arr[0]).toBe(1.0);
            expect(vec.arr[1]).toBe(2.0);
            expect(vec.arr[2]).toBe(3.0);
            // added new elements from Float32Array
            expect(vec.arr[3]).toBe(4.0);
            expect(vec.arr[4]).toBe(5.0);
            expect(vec.arr[5]).toBe(6.0);
            expect(vec.arr.length).toBe(12);
            let arrToAdd = [7.0, 8.0, 9.0];
            vec.addArray(arrToAdd);
            expect(vec.size).toBe(9);
            // fully copied over old array elements
            expect(vec.arr[0]).toBe(1.0);
            expect(vec.arr[1]).toBe(2.0);
            expect(vec.arr[2]).toBe(3.0);
            expect(vec.arr[3]).toBe(4.0);
            expect(vec.arr[4]).toBe(5.0);
            expect(vec.arr[5]).toBe(6.0);
            // added new elements from array
            expect(vec.arr[6]).toBe(7.0);
            expect(vec.arr[7]).toBe(8.0);
            expect(vec.arr[8]).toBe(9.0);
            // empty locations in array
            expect(vec.arr[9]).toBe(0.0);

            arrToAdd = [10.0, 11.0, 12.0, 13.0];
            vec.addArray(arrToAdd);
            expect(vec.size).toBe(13);
            expect(vec.arr.length).toBe(26);
        });
    });
});