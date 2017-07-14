import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Hexagon } from "../../../src/graphics/shapes2d/hexagon";


describe("Hexagon ", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const gl = new Mock<WebGLRenderingContext>();

    beforeAll(() =>
    {
        gl.setup(x => x.TRIANGLE_FAN).is(0x0006);
    });

    describe("constructor", () =>
    {
        it("should initialize basic properties correctly", () =>
        {
            const hexagon = new Hexagon(new Vec3(0, 0), new Vec3(1.0, 1.0), gl.Object, color);

            expect(color).toBe(hexagon.rgbColor);
            expect(6).toBe(hexagon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

                expect(36).toEqual(hexagon.verticies.length);

                expect(0.666).toBeCloseTo(hexagon.verticies[0]); // x1
                expect(1).toBeCloseTo(hexagon.verticies[1]); // y1
                expect(0).toBeCloseTo(hexagon.verticies[2]); // z1
                expect(color.red).toBeCloseTo(hexagon.verticies[3]); // r1
                expect(color.green).toBeCloseTo(hexagon.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(hexagon.verticies[5]); // b1

                expect(0.83).toBeCloseTo(hexagon.verticies[6]); // x2
                expect(1).toBeCloseTo(hexagon.verticies[7]); // y2
                expect(0).toBeCloseTo(hexagon.verticies[8]); // z2
                expect(color.red).toBeCloseTo(hexagon.verticies[9]); // r2
                expect(color.green).toBeCloseTo(hexagon.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(hexagon.verticies[11]); // b2

                expect(1).toBeCloseTo(hexagon.verticies[12]); // x3
                expect(0.75).toBeCloseTo(hexagon.verticies[13]); // y3
                expect(0).toBeCloseTo(hexagon.verticies[14]); // z3
                expect(color.red).toBeCloseTo(hexagon.verticies[15]); // r3
                expect(color.green).toBeCloseTo(hexagon.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(hexagon.verticies[17]); // b3

                expect(0.83).toBeCloseTo(hexagon.verticies[18]); // x4
                expect(0.5).toBeCloseTo(hexagon.verticies[19]); // y4
                expect(0).toBeCloseTo(hexagon.verticies[20]); // z4
                expect(color.red).toBeCloseTo(hexagon.verticies[21]); // r4
                expect(color.green).toBeCloseTo(hexagon.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(hexagon.verticies[23]); // b4

                expect(0.666).toBeCloseTo(hexagon.verticies[24]); // x5
                expect(0.5).toBeCloseTo(hexagon.verticies[25]); // y5
                expect(0).toBeCloseTo(hexagon.verticies[26]); // z5
                expect(color.red).toBeCloseTo(hexagon.verticies[27]); // r5
                expect(color.green).toBeCloseTo(hexagon.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(hexagon.verticies[29]); // b5

                expect(0.5).toBeCloseTo(hexagon.verticies[30]); // x6
                expect(0.75).toBeCloseTo(hexagon.verticies[31]); // y6
                expect(0).toBeCloseTo(hexagon.verticies[32]); // z6
                expect(color.red).toBeCloseTo(hexagon.verticies[33]); // r6
                expect(color.green).toBeCloseTo(hexagon.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(hexagon.verticies[35]); // b6
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

        expect(36).toEqual(hexagon.verticies.length);

        expect(0.666).toBeCloseTo(hexagon.verticies[0]); // x1
        expect(1).toBeCloseTo(hexagon.verticies[1]); // y1
        expect(0).toBeCloseTo(hexagon.verticies[2]); // z1
        expect(color.red).toBeCloseTo(hexagon.verticies[3]); // r1
        expect(color.green).toBeCloseTo(hexagon.verticies[4]); // g1
        expect(color.blue).toBeCloseTo(hexagon.verticies[5]); // b1

        expect(0.83).toBeCloseTo(hexagon.verticies[6]); // x2
        expect(1).toBeCloseTo(hexagon.verticies[7]); // y2
        expect(0).toBeCloseTo(hexagon.verticies[8]); // z2
        expect(color.red).toBeCloseTo(hexagon.verticies[9]); // r2
        expect(color.green).toBeCloseTo(hexagon.verticies[10]); // g2
        expect(color.blue).toBeCloseTo(hexagon.verticies[11]); // b2

        expect(1).toBeCloseTo(hexagon.verticies[12]); // x3
        expect(0.75).toBeCloseTo(hexagon.verticies[13]); // y3
        expect(0).toBeCloseTo(hexagon.verticies[14]); // z3
        expect(color.red).toBeCloseTo(hexagon.verticies[15]); // r3
        expect(color.green).toBeCloseTo(hexagon.verticies[16]); // g3
        expect(color.blue).toBeCloseTo(hexagon.verticies[17]); // b3

        expect(0.83).toBeCloseTo(hexagon.verticies[18]); // x4
        expect(0.5).toBeCloseTo(hexagon.verticies[19]); // y4
        expect(0).toBeCloseTo(hexagon.verticies[20]); // z4
        expect(color.red).toBeCloseTo(hexagon.verticies[21]); // r4
        expect(color.green).toBeCloseTo(hexagon.verticies[22]); // g4
        expect(color.blue).toBeCloseTo(hexagon.verticies[23]); // b4

        expect(0.666).toBeCloseTo(hexagon.verticies[24]); // x5
        expect(0.5).toBeCloseTo(hexagon.verticies[25]); // y5
        expect(0).toBeCloseTo(hexagon.verticies[26]); // z5
        expect(color.red).toBeCloseTo(hexagon.verticies[27]); // r5
        expect(color.green).toBeCloseTo(hexagon.verticies[28]); // g5
        expect(color.blue).toBeCloseTo(hexagon.verticies[29]); // b5

        expect(0.5).toBeCloseTo(hexagon.verticies[30]); // x6
        expect(0.75).toBeCloseTo(hexagon.verticies[31]); // y6
        expect(0).toBeCloseTo(hexagon.verticies[32]); // z6
        expect(color.red).toBeCloseTo(hexagon.verticies[33]); // r6
        expect(color.green).toBeCloseTo(hexagon.verticies[34]); // g6
        expect(color.blue).toBeCloseTo(hexagon.verticies[35]); // b6

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        hexagon.rgbColor = newColor;

        expect(36).toEqual(hexagon.verticies.length);

        expect(0.666).toBeCloseTo(hexagon.verticies[0]); // x1
        expect(1).toBeCloseTo(hexagon.verticies[1]); // y1
        expect(0).toBeCloseTo(hexagon.verticies[2]); // z1
        expect(newColor.red).toBeCloseTo(hexagon.verticies[3]); // r1
        expect(newColor.green).toBeCloseTo(hexagon.verticies[4]); // g1
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[5]); // b1

        expect(0.83).toBeCloseTo(hexagon.verticies[6]); // x2
        expect(1).toBeCloseTo(hexagon.verticies[7]); // y2
        expect(0).toBeCloseTo(hexagon.verticies[8]); // z2
        expect(newColor.red).toBeCloseTo(hexagon.verticies[9]); // r2
        expect(newColor.green).toBeCloseTo(hexagon.verticies[10]); // g2
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[11]); // b2

        expect(1).toBeCloseTo(hexagon.verticies[12]); // x3
        expect(0.75).toBeCloseTo(hexagon.verticies[13]); // y3
        expect(0).toBeCloseTo(hexagon.verticies[14]); // z3
        expect(newColor.red).toBeCloseTo(hexagon.verticies[15]); // r3
        expect(newColor.green).toBeCloseTo(hexagon.verticies[16]); // g3
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[17]); // b3

        expect(0.83).toBeCloseTo(hexagon.verticies[18]); // x4
        expect(0.5).toBeCloseTo(hexagon.verticies[19]); // y4
        expect(0).toBeCloseTo(hexagon.verticies[20]); // z4
        expect(newColor.red).toBeCloseTo(hexagon.verticies[21]); // r4
        expect(newColor.green).toBeCloseTo(hexagon.verticies[22]); // g4
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[23]); // b4

        expect(0.666).toBeCloseTo(hexagon.verticies[24]); // x5
        expect(0.5).toBeCloseTo(hexagon.verticies[25]); // y5
        expect(0).toBeCloseTo(hexagon.verticies[26]); // z5
        expect(newColor.red).toBeCloseTo(hexagon.verticies[27]); // r5
        expect(newColor.green).toBeCloseTo(hexagon.verticies[28]); // g5
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[29]); // b5

        expect(0.5).toBeCloseTo(hexagon.verticies[30]); // x6
        expect(0.75).toBeCloseTo(hexagon.verticies[31]); // y6
        expect(0).toBeCloseTo(hexagon.verticies[32]); // z6
        expect(newColor.red).toBeCloseTo(hexagon.verticies[33]); // r6
        expect(newColor.green).toBeCloseTo(hexagon.verticies[34]); // g6
        expect(newColor.blue).toBeCloseTo(hexagon.verticies[35]); // b6
    });
});