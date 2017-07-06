import * as TypeMoq from "typemoq";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Rectangle } from "../../../src/graphics/shapes2d/rectangle";


describe("Rectangle ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = TypeMoq.Mock.ofType<WebGLRenderingContext>(undefined);
        gl.setup(x => x.TRIANGLE_STRIP).returns(() => 5);

        it("should initialize basic properties correctly", () =>
        {
            const rectangle = new Rectangle(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl.object);

            expect(color).toBe(rectangle.rgbColor);
            expect(5).toBe(rectangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl.object);

                expect(24).toEqual(rectangle.verticies.size);

                expect(0.5).toBeCloseTo(rectangle.verticies.arr[0]); // x1
                expect(1).toBeCloseTo(rectangle.verticies.arr[1]); // y1
                expect(0).toBeCloseTo(rectangle.verticies.arr[2]); // z1
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[3]); // r1
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[4]); // g1
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[5]); // b1

                expect(1).toBeCloseTo(rectangle.verticies.arr[6]); // x2
                expect(1).toBeCloseTo(rectangle.verticies.arr[7]); // y2
                expect(0).toBeCloseTo(rectangle.verticies.arr[8]); // z2
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[9]); // r2
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[10]); // g2
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[11]); // b2

                expect(0.5).toBeCloseTo(rectangle.verticies.arr[12]); // x3
                expect(0.5).toBeCloseTo(rectangle.verticies.arr[13]); // y3
                expect(0).toBeCloseTo(rectangle.verticies.arr[14]); // z3
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[15]); // r3
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[16]); // g3
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[17]); // b3

                expect(1).toBeCloseTo(rectangle.verticies.arr[18]); // x4
                expect(0.5).toBeCloseTo(rectangle.verticies.arr[19]); // y4
                expect(0).toBeCloseTo(rectangle.verticies.arr[20]); // z4
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[21]); // r4
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[22]); // g4
                expect(1.0).toBeCloseTo(rectangle.verticies.arr[23]); // b4
            });
        });
    });

});