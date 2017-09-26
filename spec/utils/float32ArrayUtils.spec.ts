import { Float32ArrayUtils } from "../../src/utils/float32ArrayUtils";

describe("Float32ArrayUtils:", () =>
{
    describe("fill:", () =>
    {
        let arr: Float32Array;
        beforeEach(() =>
        {
            arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]);
        });
        it("should not throw if index in bounds", () =>
        {
            expect(() => Float32ArrayUtils.fill(arr, 6)).not.toThrow("index(6) is out of bounds");
            expect(() => Float32ArrayUtils.fill(arr, 1)).not.toThrow("index(1) is out of bounds");
            expect(() => Float32ArrayUtils.fill(arr, 0)).not.toThrow("index(0) is out of bounds");
        });
        it("should throw if index out of bounds", () =>
        {
            let vec = new Float32ArrayUtils.fill(arr);
            expect(() => Float32ArrayUtils.fill(arr, 7)).toThrow("index(7) is out of bounds");
            expect(() => Float32ArrayUtils.fill(arr, -1)).toThrow("index(-1) is out of bounds");
            expect(() => Float32ArrayUtils.fill(arr, 14)).toThrow("index(14) is out of bounds");
        });
        it("should default start to 0 if not supplied", () =>
        {
            Float32ArrayUtils.fill(arr);
            expect(arr[0]).toEqual(0);
        });
        it("should default end to the length of the array if not supplied", () =>
        {
            Float32ArrayUtils.fill(arr);
            expect(arr).toEqual(new Float32Array([0, 0, 0, 0, 0, 0, 0]));
        });
        it("should set end to start + 1 if end <= start", () =>
        {
            Float32ArrayUtils.fill(arr, 4, 4);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 0.0, 6.0, 7.0]));

            arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]);
            Float32ArrayUtils.fill(arr, 4, 3);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 0.0, 6.0, 7.0]));

            arr = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]);
            Float32ArrayUtils.fill(arr, 4, -1);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 0.0, 6.0, 7.0]));
        });
        it("should not go out of bounds if end is greater than arr.length", () =>
        {
            Float32ArrayUtils.fill(arr, 4, 14);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 0.0, 0.0, 0.0]));
        });
        it("should use value if it is supplied, other wise it should use 0", () =>
        {
            Float32ArrayUtils.fill(arr, 4, 14, 1);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 1.0, 1.0, 1.0]));

            Float32ArrayUtils.fill(arr, 4, 14);
            expect(arr).toEqual(new Float32Array([1.0, 2.0, 3.0, 4.0, 0.0, 0.0, 0.0]));
        });
    });
});