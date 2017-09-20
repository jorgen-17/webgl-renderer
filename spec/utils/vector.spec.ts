import { Float32Vector } from "../../src/utils/float32Vector";

describe("Float32Vector:", () =>
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

    describe("addNumber:", () =>
    {
        describe("without size limit:", () =>
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

        describe("with size limit:", () =>
        {
            it("should insert a new value in the correct place " +
                "and double the size of the underlying Float32Array until sizeLimit is reached", () =>
                {
                    let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 5);
                    let couldAdd = vec.addNumber(4.0);
                    expect(couldAdd).toEqual(true);
                    expect(vec.size).toBe(4);
                    expect(vec.arr[3]).toBe(4.0);
                    expect(vec.arr.length).toBe(5);
                    couldAdd = vec.addNumber(5.0);
                    expect(couldAdd).toEqual(true);
                    expect(vec.size).toBe(5);
                    expect(vec.arr[4]).toBe(5.0);
                    expect(vec.arr.length).toBe(5);
                    couldAdd = vec.addNumber(6.0);
                    expect(couldAdd).toEqual(false);
                    expect(vec.size).toBe(5);
                    expect(vec.arr[4]).toBe(5.0);
                    expect(vec.arr.length).toBe(5);
                });
        });
    });

    describe("addArray:", () =>
    {
        describe("without size limit:", () =>
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

        describe("with size limit:", () =>
        {
            it("should insert new values from Float32Array or Array<number> in the correct place " +
                "and double the size of the underlying Float32Array until sizeLimit is reached", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 12);
                let float32ArrToAdd = new Float32Array([4.0, 5.0, 6.0]);
                let couldAdd = vec.addArray(float32ArrToAdd);
                expect(couldAdd).toEqual(true);
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
                couldAdd = vec.addArray(arrToAdd);
                expect(couldAdd).toEqual(true);
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
                couldAdd = vec.addArray(arrToAdd);
                expect(couldAdd).toEqual(false);
                expect(vec.size).toBe(9);
                expect(vec.arr.length).toBe(12);

                arrToAdd = [10.0, 11.0, 12.0];
                couldAdd = vec.addArray(arrToAdd);
                expect(couldAdd).toEqual(true);
                expect(vec.size).toBe(12);
                expect(vec.arr.length).toBe(12);
            });
        });
    });

    describe("remove:", () =>
    {
        describe("without size limit:", () =>
        {
            it("should not throw if index in of bounds", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                expect(() => vec.remove(2)).not.toThrow("index(2) is out of bounds");
                expect(() => vec.remove(1)).not.toThrow("index(1) is out of bounds");
                expect(() => vec.remove(0)).not.toThrow("index(0) is out of bounds");
            });
            it("should throw if index out of bounds", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                expect(() => vec.remove(3)).toThrow("index(3) is out of bounds");
                expect(() => vec.remove(-1)).toThrow("index(-1) is out of bounds");
                expect(() => vec.remove(7)).toThrow("index(7) is out of bounds");
            });
            it("should default count to 1 if its 0 or negative or not provided", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                vec.remove(1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                vec.remove(1, -1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                vec.remove(1, 0);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));
            });
            it("should remove single value, shift values after, and zero out the end of the array", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                vec.remove(1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]));
                vec.remove(2);
                expect(vec.arr).toEqual(new Float32Array([1.0, 2.0, 0.0]));
            });
            it("should remove multiple values, shift values after, and zero out the end of the array", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]));
                vec.remove(1, 3);
                expect(vec.arr).toEqual(new Float32Array([1.0, 5.0, 6.0, 0.0, 0.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]));
                vec.remove(3, 5);
                expect(vec.arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 0.0, 0.0, 0.0]));
            });
        });

        describe("with size limit:", () =>
        {
            it("should not throw if index in of bounds", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                expect(() => vec.remove(2)).not.toThrow("index(2) is out of bounds");
                expect(() => vec.remove(1)).not.toThrow("index(1) is out of bounds");
                expect(() => vec.remove(0)).not.toThrow("index(0) is out of bounds");
            });
            it("should throw if index out of bounds", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                expect(() => vec.remove(3)).toThrow("index(3) is out of bounds");
                expect(() => vec.remove(-1)).toThrow("index(-1) is out of bounds");
                expect(() => vec.remove(7)).toThrow("index(7) is out of bounds");
            });
            it("should default count to 1 if its 0 or negative or not provided", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                vec.remove(1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                vec.remove(1, -1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                vec.remove(1, 0);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));
            });
            it("should remove single value, shift values after, and zero out the end of the array", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                vec.remove(1);
                expect(vec.arr).toEqual(new Float32Array([1.0, 3.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0]), 3);
                vec.remove(2);
                expect(vec.arr).toEqual(new Float32Array([1.0, 2.0, 0.0]));
            });
            it("should remove multiple values, shift values after, and zero out the end of the array", () =>
            {
                let vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]), 6);
                vec.remove(1, 3);
                expect(vec.arr).toEqual(new Float32Array([1.0, 5.0, 6.0, 0.0, 0.0, 0.0]));

                vec = new Float32Vector(new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]), 6);
                vec.remove(3, 5);
                expect(vec.arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 0.0, 0.0, 0.0]));
            });
        });
    });

    describe("getTrimmedArray:", () =>
    {
        it("if arr.length === size returns the array without copying it", () =>
        {
            const arr = new Float32Array([1.0, 2.0, 3.0]);
            const vec = new Float32Vector(arr, arr.length);
            expect(arr).toBe(vec.getTrimmedArray());
        });

        it("if arr.length > size returns trimmed array without extranoeus elements", () =>
        {
            const arr = new Float32Array([1.0, 2.0, 3.0]);
            const vec = new Float32Vector(arr);
            vec.addNumber(4.0);

            const expectedArr = new Float32Array([1.0, 2.0, 3.0, 4.0]);

            expect(expectedArr).toEqual(vec.getTrimmedArray());
        });
    });
});