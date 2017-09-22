import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../../src/graphics/shape/shape2d/triangle";


describe("triangle:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
    });

    describe("constructor:", () =>
    {
        it("should initialize basic properties correctly", () =>
        {
            const triangle = new Triangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(triangle.rgbColor);
            expect(gl.TRIANGLES).toBe(triangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(18).toEqual(triangle.positions.length);

                expect(0.5).toBeCloseTo(triangle.positions[0]); // x1
                expect(0.5).toBeCloseTo(triangle.positions[1]); // y1
                expect(0).toBeCloseTo(triangle.positions[2]); // z1
                expect(color.red).toBeCloseTo(triangle.positions[3]); // r1
                expect(color.green).toBeCloseTo(triangle.positions[4]); // g1
                expect(color.blue).toBeCloseTo(triangle.positions[5]); // b1

                expect(0.75).toBeCloseTo(triangle.positions[6]); // x2
                expect(1).toBeCloseTo(triangle.positions[7]); // y2
                expect(0).toBeCloseTo(triangle.positions[8]); // z2
                expect(color.red).toBeCloseTo(triangle.positions[9]); // r2
                expect(color.green).toBeCloseTo(triangle.positions[10]); // g2
                expect(color.blue).toBeCloseTo(triangle.positions[11]); // b2

                expect(1).toBeCloseTo(triangle.positions[12]); // x3
                expect(0.5).toBeCloseTo(triangle.positions[13]); // y3
                expect(0).toBeCloseTo(triangle.positions[14]); // z3
                expect(color.red).toBeCloseTo(triangle.positions[15]); // r3
                expect(color.green).toBeCloseTo(triangle.positions[16]); // g3
                expect(color.blue).toBeCloseTo(triangle.positions[17]); // b3
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

        expect(18).toEqual(triangle.positions.length);

        expect(0.5).toBeCloseTo(triangle.positions[0]); // x1
        expect(0.5).toBeCloseTo(triangle.positions[1]); // y1
        expect(0).toBeCloseTo(triangle.positions[2]); // z1
        expect(color.red).toBeCloseTo(triangle.positions[3]); // r1
        expect(color.green).toBeCloseTo(triangle.positions[4]); // g1
        expect(color.blue).toBeCloseTo(triangle.positions[5]); // b1

        expect(0.75).toBeCloseTo(triangle.positions[6]); // x2
        expect(1).toBeCloseTo(triangle.positions[7]); // y2
        expect(0).toBeCloseTo(triangle.positions[8]); // z2
        expect(color.red).toBeCloseTo(triangle.positions[9]); // r2
        expect(color.green).toBeCloseTo(triangle.positions[10]); // g2
        expect(color.blue).toBeCloseTo(triangle.positions[11]); // b2

        expect(1).toBeCloseTo(triangle.positions[12]); // x3
        expect(0.5).toBeCloseTo(triangle.positions[13]); // y3
        expect(0).toBeCloseTo(triangle.positions[14]); // z3
        expect(color.red).toBeCloseTo(triangle.positions[15]); // r3
        expect(color.green).toBeCloseTo(triangle.positions[16]); // g3
        expect(color.blue).toBeCloseTo(triangle.positions[17]); // b3

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        triangle.rgbColor = newColor;

        expect(18).toEqual(triangle.positions.length);

        expect(0.5).toBeCloseTo(triangle.positions[0]); // x1
        expect(0.5).toBeCloseTo(triangle.positions[1]); // y1
        expect(0).toBeCloseTo(triangle.positions[2]); // z1
        expect(newColor.red).toBeCloseTo(triangle.positions[3]); // r1
        expect(newColor.green).toBeCloseTo(triangle.positions[4]); // g1
        expect(newColor.blue).toBeCloseTo(triangle.positions[5]); // b1

        expect(0.75).toBeCloseTo(triangle.positions[6]); // x2
        expect(1).toBeCloseTo(triangle.positions[7]); // y2
        expect(0).toBeCloseTo(triangle.positions[8]); // z2
        expect(newColor.red).toBeCloseTo(triangle.positions[9]); // r2
        expect(newColor.green).toBeCloseTo(triangle.positions[10]); // g2
        expect(newColor.blue).toBeCloseTo(triangle.positions[11]); // b2

        expect(1).toBeCloseTo(triangle.positions[12]); // x3
        expect(0.5).toBeCloseTo(triangle.positions[13]); // y3
        expect(0).toBeCloseTo(triangle.positions[14]); // z3
        expect(newColor.red).toBeCloseTo(triangle.positions[15]); // r3
        expect(newColor.green).toBeCloseTo(triangle.positions[16]); // g3
        expect(newColor.blue).toBeCloseTo(triangle.positions[17]); // b3
    });
});