import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Triangle } from "../../../src/graphics/shapes2d/triangle";


describe("Triangle ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = new Mock<WebGLRenderingContext>();

        beforeAll(() =>
        {
            gl.setup(x => x.TRIANGLES).is(0x0004);
        });

        it("should initialize basic properties correctly", () =>
        {
            const triangle = new Triangle(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl.Object);

            expect(color).toBe(triangle.rgbColor);
            expect(4).toBe(triangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl.Object);

                expect(18).toEqual(triangle.verticies.size);

                expect(0.5).toBeCloseTo(triangle.verticies.arr[0]); // x1
                expect(0.5).toBeCloseTo(triangle.verticies.arr[1]); // y1
                expect(0).toBeCloseTo(triangle.verticies.arr[2]); // z1
                expect(1.0).toBeCloseTo(triangle.verticies.arr[3]); // r1
                expect(1.0).toBeCloseTo(triangle.verticies.arr[4]); // g1
                expect(1.0).toBeCloseTo(triangle.verticies.arr[5]); // b1

                expect(0.75).toBeCloseTo(triangle.verticies.arr[6]); // x2
                expect(1).toBeCloseTo(triangle.verticies.arr[7]); // y2
                expect(0).toBeCloseTo(triangle.verticies.arr[8]); // z2
                expect(1.0).toBeCloseTo(triangle.verticies.arr[9]); // r2
                expect(1.0).toBeCloseTo(triangle.verticies.arr[10]); // g2
                expect(1.0).toBeCloseTo(triangle.verticies.arr[11]); // b2

                expect(1).toBeCloseTo(triangle.verticies.arr[12]); // x3
                expect(0.5).toBeCloseTo(triangle.verticies.arr[13]); // y3
                expect(0).toBeCloseTo(triangle.verticies.arr[14]); // z3
                expect(1.0).toBeCloseTo(triangle.verticies.arr[15]); // r3
                expect(1.0).toBeCloseTo(triangle.verticies.arr[16]); // g3
                expect(1.0).toBeCloseTo(triangle.verticies.arr[17]); // b3
            });
        });
    });

});