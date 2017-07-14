import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Triangle } from "../../../src/graphics/shapes2d/triangle";


describe("Triangle ", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const gl = new Mock<WebGLRenderingContext>();

    beforeAll(() =>
    {
        gl.setup(x => x.TRIANGLES).is(0x0004);
    });

    describe("constructor", () =>
    {
        it("should initialize basic properties correctly", () =>
        {
            const triangle = new Triangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl.Object, color);

            expect(color).toBe(triangle.rgbColor);
            expect(4).toBe(triangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

                expect(18).toEqual(triangle.verticies.length);

                expect(0.5).toBeCloseTo(triangle.verticies[0]); // x1
                expect(0.5).toBeCloseTo(triangle.verticies[1]); // y1
                expect(0).toBeCloseTo(triangle.verticies[2]); // z1
                expect(color.red).toBeCloseTo(triangle.verticies[3]); // r1
                expect(color.green).toBeCloseTo(triangle.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(triangle.verticies[5]); // b1

                expect(0.75).toBeCloseTo(triangle.verticies[6]); // x2
                expect(1).toBeCloseTo(triangle.verticies[7]); // y2
                expect(0).toBeCloseTo(triangle.verticies[8]); // z2
                expect(color.red).toBeCloseTo(triangle.verticies[9]); // r2
                expect(color.green).toBeCloseTo(triangle.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(triangle.verticies[11]); // b2

                expect(1).toBeCloseTo(triangle.verticies[12]); // x3
                expect(0.5).toBeCloseTo(triangle.verticies[13]); // y3
                expect(0).toBeCloseTo(triangle.verticies[14]); // z3
                expect(color.red).toBeCloseTo(triangle.verticies[15]); // r3
                expect(color.green).toBeCloseTo(triangle.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(triangle.verticies[17]); // b3
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

        expect(18).toEqual(triangle.verticies.length);

        expect(0.5).toBeCloseTo(triangle.verticies[0]); // x1
        expect(0.5).toBeCloseTo(triangle.verticies[1]); // y1
        expect(0).toBeCloseTo(triangle.verticies[2]); // z1
        expect(color.red).toBeCloseTo(triangle.verticies[3]); // r1
        expect(color.green).toBeCloseTo(triangle.verticies[4]); // g1
        expect(color.blue).toBeCloseTo(triangle.verticies[5]); // b1

        expect(0.75).toBeCloseTo(triangle.verticies[6]); // x2
        expect(1).toBeCloseTo(triangle.verticies[7]); // y2
        expect(0).toBeCloseTo(triangle.verticies[8]); // z2
        expect(color.red).toBeCloseTo(triangle.verticies[9]); // r2
        expect(color.green).toBeCloseTo(triangle.verticies[10]); // g2
        expect(color.blue).toBeCloseTo(triangle.verticies[11]); // b2

        expect(1).toBeCloseTo(triangle.verticies[12]); // x3
        expect(0.5).toBeCloseTo(triangle.verticies[13]); // y3
        expect(0).toBeCloseTo(triangle.verticies[14]); // z3
        expect(color.red).toBeCloseTo(triangle.verticies[15]); // r3
        expect(color.green).toBeCloseTo(triangle.verticies[16]); // g3
        expect(color.blue).toBeCloseTo(triangle.verticies[17]); // b3

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        triangle.rgbColor = newColor;

        expect(18).toEqual(triangle.verticies.length);

        expect(0.5).toBeCloseTo(triangle.verticies[0]); // x1
        expect(0.5).toBeCloseTo(triangle.verticies[1]); // y1
        expect(0).toBeCloseTo(triangle.verticies[2]); // z1
        expect(newColor.red).toBeCloseTo(triangle.verticies[3]); // r1
        expect(newColor.green).toBeCloseTo(triangle.verticies[4]); // g1
        expect(newColor.blue).toBeCloseTo(triangle.verticies[5]); // b1

        expect(0.75).toBeCloseTo(triangle.verticies[6]); // x2
        expect(1).toBeCloseTo(triangle.verticies[7]); // y2
        expect(0).toBeCloseTo(triangle.verticies[8]); // z2
        expect(newColor.red).toBeCloseTo(triangle.verticies[9]); // r2
        expect(newColor.green).toBeCloseTo(triangle.verticies[10]); // g2
        expect(newColor.blue).toBeCloseTo(triangle.verticies[11]); // b2

        expect(1).toBeCloseTo(triangle.verticies[12]); // x3
        expect(0.5).toBeCloseTo(triangle.verticies[13]); // y3
        expect(0).toBeCloseTo(triangle.verticies[14]); // z3
        expect(newColor.red).toBeCloseTo(triangle.verticies[15]); // r3
        expect(newColor.green).toBeCloseTo(triangle.verticies[16]); // g3
        expect(newColor.blue).toBeCloseTo(triangle.verticies[17]); // b3
    });
});