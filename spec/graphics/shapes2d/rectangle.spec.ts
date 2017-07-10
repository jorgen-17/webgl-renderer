import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Rectangle } from "../../../src/graphics/shapes2d/rectangle";


describe("Rectangle ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = new Mock<WebGLRenderingContext>();

        beforeAll(() =>
        {
            gl.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        });

        it("should initialize basic properties correctly", () =>
        {
            const rectangle = new Rectangle(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl.Object);

            expect(color).toBe(rectangle.rgbColor);
            expect(5).toBe(rectangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl.Object);

                expect(24).toEqual(rectangle.verticies.length);

                expect(0.5).toBeCloseTo(rectangle.verticies[0]); // x1
                expect(1).toBeCloseTo(rectangle.verticies[1]); // y1
                expect(0).toBeCloseTo(rectangle.verticies[2]); // z1
                expect(1.0).toBeCloseTo(rectangle.verticies[3]); // r1
                expect(1.0).toBeCloseTo(rectangle.verticies[4]); // g1
                expect(1.0).toBeCloseTo(rectangle.verticies[5]); // b1

                expect(1).toBeCloseTo(rectangle.verticies[6]); // x2
                expect(1).toBeCloseTo(rectangle.verticies[7]); // y2
                expect(0).toBeCloseTo(rectangle.verticies[8]); // z2
                expect(1.0).toBeCloseTo(rectangle.verticies[9]); // r2
                expect(1.0).toBeCloseTo(rectangle.verticies[10]); // g2
                expect(1.0).toBeCloseTo(rectangle.verticies[11]); // b2

                expect(0.5).toBeCloseTo(rectangle.verticies[12]); // x3
                expect(0.5).toBeCloseTo(rectangle.verticies[13]); // y3
                expect(0).toBeCloseTo(rectangle.verticies[14]); // z3
                expect(1.0).toBeCloseTo(rectangle.verticies[15]); // r3
                expect(1.0).toBeCloseTo(rectangle.verticies[16]); // g3
                expect(1.0).toBeCloseTo(rectangle.verticies[17]); // b3

                expect(1).toBeCloseTo(rectangle.verticies[18]); // x4
                expect(0.5).toBeCloseTo(rectangle.verticies[19]); // y4
                expect(0).toBeCloseTo(rectangle.verticies[20]); // z4
                expect(1.0).toBeCloseTo(rectangle.verticies[21]); // r4
                expect(1.0).toBeCloseTo(rectangle.verticies[22]); // g4
                expect(1.0).toBeCloseTo(rectangle.verticies[23]); // b4
            });
        });
    });

});