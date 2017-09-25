import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../src/graphics/color/rgbColor";
import { Rectangle } from "../../../../src/graphics/shape/shape2d/rectangle";


describe("rectangle:", () =>
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
            const rectangle = new Rectangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(rectangle.rgbColor);
            expect(gl.TRIANGLES).toBe(rectangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(36).toEqual(rectangle.verticies.length);

                expect(0.5).toBeCloseTo(rectangle.verticies[0]); // x1
                expect(1).toBeCloseTo(rectangle.verticies[1]); // y1
                expect(0).toBeCloseTo(rectangle.verticies[2]); // z1
                expect(color.red).toBeCloseTo(rectangle.verticies[3]); // r1
                expect(color.green).toBeCloseTo(rectangle.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(rectangle.verticies[5]); // b1

                expect(1).toBeCloseTo(rectangle.verticies[6]); // x2
                expect(1).toBeCloseTo(rectangle.verticies[7]); // y2
                expect(0).toBeCloseTo(rectangle.verticies[8]); // z2
                expect(color.red).toBeCloseTo(rectangle.verticies[9]); // r2
                expect(color.green).toBeCloseTo(rectangle.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(rectangle.verticies[11]); // b2

                expect(0.5).toBeCloseTo(rectangle.verticies[12]); // x3
                expect(0.5).toBeCloseTo(rectangle.verticies[13]); // y3
                expect(0).toBeCloseTo(rectangle.verticies[14]); // z3
                expect(color.red).toBeCloseTo(rectangle.verticies[15]); // r3
                expect(color.green).toBeCloseTo(rectangle.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(rectangle.verticies[17]); // b3

                expect(0.5).toBeCloseTo(rectangle.verticies[18]); // x4
                expect(0.5).toBeCloseTo(rectangle.verticies[19]); // y4
                expect(0).toBeCloseTo(rectangle.verticies[20]); // z4
                expect(color.red).toBeCloseTo(rectangle.verticies[21]); // r4
                expect(color.green).toBeCloseTo(rectangle.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(rectangle.verticies[23]); // b4

                expect(1).toBeCloseTo(rectangle.verticies[24]); // x5
                expect(1).toBeCloseTo(rectangle.verticies[25]); // y5
                expect(0).toBeCloseTo(rectangle.verticies[26]); // z5
                expect(color.red).toBeCloseTo(rectangle.verticies[27]); // r5
                expect(color.green).toBeCloseTo(rectangle.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(rectangle.verticies[29]); // b5

                expect(1).toBeCloseTo(rectangle.verticies[30]); // x6
                expect(0.5).toBeCloseTo(rectangle.verticies[31]); // y6
                expect(0).toBeCloseTo(rectangle.verticies[32]); // z6
                expect(color.red).toBeCloseTo(rectangle.verticies[33]); // r6
                expect(color.green).toBeCloseTo(rectangle.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(rectangle.verticies[35]); // b6
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

        expect(36).toEqual(rectangle.verticies.length);

        expect(0.5).toBeCloseTo(rectangle.verticies[0]); // x1
        expect(1).toBeCloseTo(rectangle.verticies[1]); // y1
        expect(0).toBeCloseTo(rectangle.verticies[2]); // z1
        expect(color.red).toBeCloseTo(rectangle.verticies[3]); // r1
        expect(color.green).toBeCloseTo(rectangle.verticies[4]); // g1
        expect(color.blue).toBeCloseTo(rectangle.verticies[5]); // b1

        expect(1).toBeCloseTo(rectangle.verticies[6]); // x2
        expect(1).toBeCloseTo(rectangle.verticies[7]); // y2
        expect(0).toBeCloseTo(rectangle.verticies[8]); // z2
        expect(color.red).toBeCloseTo(rectangle.verticies[9]); // r2
        expect(color.green).toBeCloseTo(rectangle.verticies[10]); // g2
        expect(color.blue).toBeCloseTo(rectangle.verticies[11]); // b2

        expect(0.5).toBeCloseTo(rectangle.verticies[12]); // x3
        expect(0.5).toBeCloseTo(rectangle.verticies[13]); // y3
        expect(0).toBeCloseTo(rectangle.verticies[14]); // z3
        expect(color.red).toBeCloseTo(rectangle.verticies[15]); // r3
        expect(color.green).toBeCloseTo(rectangle.verticies[16]); // g3
        expect(color.blue).toBeCloseTo(rectangle.verticies[17]); // b3

        expect(0.5).toBeCloseTo(rectangle.verticies[18]); // x4
        expect(0.5).toBeCloseTo(rectangle.verticies[19]); // y4
        expect(0).toBeCloseTo(rectangle.verticies[20]); // z4
        expect(color.red).toBeCloseTo(rectangle.verticies[21]); // r4
        expect(color.green).toBeCloseTo(rectangle.verticies[22]); // g4
        expect(color.blue).toBeCloseTo(rectangle.verticies[23]); // b4

        expect(1).toBeCloseTo(rectangle.verticies[24]); // x5
        expect(1).toBeCloseTo(rectangle.verticies[25]); // y5
        expect(0).toBeCloseTo(rectangle.verticies[26]); // z5
        expect(color.red).toBeCloseTo(rectangle.verticies[27]); // r5
        expect(color.green).toBeCloseTo(rectangle.verticies[28]); // g5
        expect(color.blue).toBeCloseTo(rectangle.verticies[29]); // b5

        expect(1).toBeCloseTo(rectangle.verticies[30]); // x6
        expect(0.5).toBeCloseTo(rectangle.verticies[31]); // y6
        expect(0).toBeCloseTo(rectangle.verticies[32]); // z6
        expect(color.red).toBeCloseTo(rectangle.verticies[33]); // r6
        expect(color.green).toBeCloseTo(rectangle.verticies[34]); // g6
        expect(color.blue).toBeCloseTo(rectangle.verticies[35]); // b6

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        rectangle.rgbColor = newColor;

        expect(36).toEqual(rectangle.verticies.length);

        expect(0.5).toBeCloseTo(rectangle.verticies[0]); // x1
        expect(1).toBeCloseTo(rectangle.verticies[1]); // y1
        expect(0).toBeCloseTo(rectangle.verticies[2]); // z1
        expect(newColor.red).toBeCloseTo(rectangle.verticies[3]); // r1
        expect(newColor.green).toBeCloseTo(rectangle.verticies[4]); // g1
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[5]); // b1

        expect(1).toBeCloseTo(rectangle.verticies[6]); // x2
        expect(1).toBeCloseTo(rectangle.verticies[7]); // y2
        expect(0).toBeCloseTo(rectangle.verticies[8]); // z2
        expect(newColor.red).toBeCloseTo(rectangle.verticies[9]); // r2
        expect(newColor.green).toBeCloseTo(rectangle.verticies[10]); // g2
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[11]); // b2

        expect(0.5).toBeCloseTo(rectangle.verticies[12]); // x3
        expect(0.5).toBeCloseTo(rectangle.verticies[13]); // y3
        expect(0).toBeCloseTo(rectangle.verticies[14]); // z3
        expect(newColor.red).toBeCloseTo(rectangle.verticies[15]); // r3
        expect(newColor.green).toBeCloseTo(rectangle.verticies[16]); // g3
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[17]); // b3

        expect(0.5).toBeCloseTo(rectangle.verticies[18]); // x4
        expect(0.5).toBeCloseTo(rectangle.verticies[19]); // y4
        expect(0).toBeCloseTo(rectangle.verticies[20]); // z4
        expect(newColor.red).toBeCloseTo(rectangle.verticies[21]); // r4
        expect(newColor.green).toBeCloseTo(rectangle.verticies[22]); // g4
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[23]); // b4

        expect(1).toBeCloseTo(rectangle.verticies[24]); // x5
        expect(1).toBeCloseTo(rectangle.verticies[25]); // y5
        expect(0).toBeCloseTo(rectangle.verticies[26]); // z5
        expect(newColor.red).toBeCloseTo(rectangle.verticies[27]); // r5
        expect(newColor.green).toBeCloseTo(rectangle.verticies[28]); // g5
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[29]); // b5

        expect(1).toBeCloseTo(rectangle.verticies[30]); // x6
        expect(0.5).toBeCloseTo(rectangle.verticies[31]); // y6
        expect(0).toBeCloseTo(rectangle.verticies[32]); // z6
        expect(newColor.red).toBeCloseTo(rectangle.verticies[33]); // r6
        expect(newColor.green).toBeCloseTo(rectangle.verticies[34]); // g6
        expect(newColor.blue).toBeCloseTo(rectangle.verticies[35]); // b6
    });
});