import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Octogon } from "../../../src/graphics/shapes2d/octogon";


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
            const octogon = new Octogon(new Vec3(0, 0), new Vec3(1.0, 1.0), gl.Object, color);

            expect(color).toBe(octogon.rgbColor);
            expect(6).toBe(octogon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

                expect(48).toEqual(octogon.verticies.length);

                expect(0.666).toBeCloseTo(octogon.verticies[0]); // x1
                expect(1).toBeCloseTo(octogon.verticies[1]); // y1
                expect(0).toBeCloseTo(octogon.verticies[2]); // z1
                expect(color.red).toBeCloseTo(octogon.verticies[3]); // r1
                expect(color.green).toBeCloseTo(octogon.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(octogon.verticies[5]); // b1

                expect(0.83).toBeCloseTo(octogon.verticies[6]); // x2
                expect(1).toBeCloseTo(octogon.verticies[7]); // y2
                expect(0).toBeCloseTo(octogon.verticies[8]); // z2
                expect(color.red).toBeCloseTo(octogon.verticies[9]); // r2
                expect(color.green).toBeCloseTo(octogon.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(octogon.verticies[11]); // b2

                expect(1).toBeCloseTo(octogon.verticies[12]); // x3
                expect(0.83).toBeCloseTo(octogon.verticies[13]); // y3
                expect(0).toBeCloseTo(octogon.verticies[14]); // z3
                expect(color.red).toBeCloseTo(octogon.verticies[15]); // r3
                expect(color.green).toBeCloseTo(octogon.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(octogon.verticies[17]); // b3

                expect(1).toBeCloseTo(octogon.verticies[18]); // x4
                expect(0.666).toBeCloseTo(octogon.verticies[19]); // y4
                expect(0).toBeCloseTo(octogon.verticies[20]); // z4
                expect(color.red).toBeCloseTo(octogon.verticies[21]); // r4
                expect(color.green).toBeCloseTo(octogon.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(octogon.verticies[23]); // b4

                expect(0.83).toBeCloseTo(octogon.verticies[24]); // x5
                expect(0.5).toBeCloseTo(octogon.verticies[25]); // y5
                expect(0).toBeCloseTo(octogon.verticies[26]); // z5
                expect(color.red).toBeCloseTo(octogon.verticies[27]); // r5
                expect(color.green).toBeCloseTo(octogon.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(octogon.verticies[29]); // b5

                expect(0.666).toBeCloseTo(octogon.verticies[30]); // x6
                expect(0.5).toBeCloseTo(octogon.verticies[31]); // y6
                expect(0).toBeCloseTo(octogon.verticies[32]); // z6
                expect(color.red).toBeCloseTo(octogon.verticies[33]); // r6
                expect(color.green).toBeCloseTo(octogon.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(octogon.verticies[35]); // b6

                expect(0.5).toBeCloseTo(octogon.verticies[36]); // x7
                expect(0.666).toBeCloseTo(octogon.verticies[37]); // y7
                expect(0).toBeCloseTo(octogon.verticies[38]); // z7
                expect(color.red).toBeCloseTo(octogon.verticies[39]); // r7
                expect(color.green).toBeCloseTo(octogon.verticies[40]); // g7
                expect(color.blue).toBeCloseTo(octogon.verticies[41]); // b7

                expect(0.5).toBeCloseTo(octogon.verticies[42]); // x8
                expect(0.83).toBeCloseTo(octogon.verticies[43]); // y8
                expect(0).toBeCloseTo(octogon.verticies[44]); // z8
                expect(color.red).toBeCloseTo(octogon.verticies[45]); // r8
                expect(color.green).toBeCloseTo(octogon.verticies[46]); // g8
                expect(color.blue).toBeCloseTo(octogon.verticies[47]); // b8
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object, color);

        expect(48).toEqual(octogon.verticies.length);

        expect(0.666).toBeCloseTo(octogon.verticies[0]); // x1
        expect(1).toBeCloseTo(octogon.verticies[1]); // y1
        expect(0).toBeCloseTo(octogon.verticies[2]); // z1
        expect(color.red).toBeCloseTo(octogon.verticies[3]); // r1
        expect(color.green).toBeCloseTo(octogon.verticies[4]); // g1
        expect(color.blue).toBeCloseTo(octogon.verticies[5]); // b1

        expect(0.83).toBeCloseTo(octogon.verticies[6]); // x2
        expect(1).toBeCloseTo(octogon.verticies[7]); // y2
        expect(0).toBeCloseTo(octogon.verticies[8]); // z2
        expect(color.red).toBeCloseTo(octogon.verticies[9]); // r2
        expect(color.green).toBeCloseTo(octogon.verticies[10]); // g2
        expect(color.blue).toBeCloseTo(octogon.verticies[11]); // b2

        expect(1).toBeCloseTo(octogon.verticies[12]); // x3
        expect(0.83).toBeCloseTo(octogon.verticies[13]); // y3
        expect(0).toBeCloseTo(octogon.verticies[14]); // z3
        expect(color.red).toBeCloseTo(octogon.verticies[15]); // r3
        expect(color.green).toBeCloseTo(octogon.verticies[16]); // g3
        expect(color.blue).toBeCloseTo(octogon.verticies[17]); // b3

        expect(1).toBeCloseTo(octogon.verticies[18]); // x4
        expect(0.666).toBeCloseTo(octogon.verticies[19]); // y4
        expect(0).toBeCloseTo(octogon.verticies[20]); // z4
        expect(color.red).toBeCloseTo(octogon.verticies[21]); // r4
        expect(color.green).toBeCloseTo(octogon.verticies[22]); // g4
        expect(color.blue).toBeCloseTo(octogon.verticies[23]); // b4

        expect(0.83).toBeCloseTo(octogon.verticies[24]); // x5
        expect(0.5).toBeCloseTo(octogon.verticies[25]); // y5
        expect(0).toBeCloseTo(octogon.verticies[26]); // z5
        expect(color.red).toBeCloseTo(octogon.verticies[27]); // r5
        expect(color.green).toBeCloseTo(octogon.verticies[28]); // g5
        expect(color.blue).toBeCloseTo(octogon.verticies[29]); // b5

        expect(0.666).toBeCloseTo(octogon.verticies[30]); // x6
        expect(0.5).toBeCloseTo(octogon.verticies[31]); // y6
        expect(0).toBeCloseTo(octogon.verticies[32]); // z6
        expect(color.red).toBeCloseTo(octogon.verticies[33]); // r6
        expect(color.green).toBeCloseTo(octogon.verticies[34]); // g6
        expect(color.blue).toBeCloseTo(octogon.verticies[35]); // b6

        expect(0.5).toBeCloseTo(octogon.verticies[36]); // x7
        expect(0.666).toBeCloseTo(octogon.verticies[37]); // y7
        expect(0).toBeCloseTo(octogon.verticies[38]); // z7
        expect(color.red).toBeCloseTo(octogon.verticies[39]); // r7
        expect(color.green).toBeCloseTo(octogon.verticies[40]); // g7
        expect(color.blue).toBeCloseTo(octogon.verticies[41]); // b7

        expect(0.5).toBeCloseTo(octogon.verticies[42]); // x8
        expect(0.83).toBeCloseTo(octogon.verticies[43]); // y8
        expect(0).toBeCloseTo(octogon.verticies[44]); // z8
        expect(color.red).toBeCloseTo(octogon.verticies[45]); // r8
        expect(color.green).toBeCloseTo(octogon.verticies[46]); // g8
        expect(color.blue).toBeCloseTo(octogon.verticies[47]); // b8

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        octogon.rgbColor = newColor;

        expect(48).toEqual(octogon.verticies.length);

        expect(0.666).toBeCloseTo(octogon.verticies[0]); // x1
        expect(1).toBeCloseTo(octogon.verticies[1]); // y1
        expect(0).toBeCloseTo(octogon.verticies[2]); // z1
        expect(newColor.red).toBeCloseTo(octogon.verticies[3]); // r1
        expect(newColor.green).toBeCloseTo(octogon.verticies[4]); // g1
        expect(newColor.blue).toBeCloseTo(octogon.verticies[5]); // b1

        expect(0.83).toBeCloseTo(octogon.verticies[6]); // x2
        expect(1).toBeCloseTo(octogon.verticies[7]); // y2
        expect(0).toBeCloseTo(octogon.verticies[8]); // z2
        expect(newColor.red).toBeCloseTo(octogon.verticies[9]); // r2
        expect(newColor.green).toBeCloseTo(octogon.verticies[10]); // g2
        expect(newColor.blue).toBeCloseTo(octogon.verticies[11]); // b2

        expect(1).toBeCloseTo(octogon.verticies[12]); // x3
        expect(0.83).toBeCloseTo(octogon.verticies[13]); // y3
        expect(0).toBeCloseTo(octogon.verticies[14]); // z3
        expect(newColor.red).toBeCloseTo(octogon.verticies[15]); // r3
        expect(newColor.green).toBeCloseTo(octogon.verticies[16]); // g3
        expect(newColor.blue).toBeCloseTo(octogon.verticies[17]); // b3

        expect(1).toBeCloseTo(octogon.verticies[18]); // x4
        expect(0.666).toBeCloseTo(octogon.verticies[19]); // y4
        expect(0).toBeCloseTo(octogon.verticies[20]); // z4
        expect(newColor.red).toBeCloseTo(octogon.verticies[21]); // r4
        expect(newColor.green).toBeCloseTo(octogon.verticies[22]); // g4
        expect(newColor.blue).toBeCloseTo(octogon.verticies[23]); // b4

        expect(0.83).toBeCloseTo(octogon.verticies[24]); // x5
        expect(0.5).toBeCloseTo(octogon.verticies[25]); // y5
        expect(0).toBeCloseTo(octogon.verticies[26]); // z5
        expect(newColor.red).toBeCloseTo(octogon.verticies[27]); // r5
        expect(newColor.green).toBeCloseTo(octogon.verticies[28]); // g5
        expect(newColor.blue).toBeCloseTo(octogon.verticies[29]); // b5

        expect(0.666).toBeCloseTo(octogon.verticies[30]); // x6
        expect(0.5).toBeCloseTo(octogon.verticies[31]); // y6
        expect(0).toBeCloseTo(octogon.verticies[32]); // z6
        expect(newColor.red).toBeCloseTo(octogon.verticies[33]); // r6
        expect(newColor.green).toBeCloseTo(octogon.verticies[34]); // g6
        expect(newColor.blue).toBeCloseTo(octogon.verticies[35]); // b6

        expect(0.5).toBeCloseTo(octogon.verticies[36]); // x7
        expect(0.666).toBeCloseTo(octogon.verticies[37]); // y7
        expect(0).toBeCloseTo(octogon.verticies[38]); // z7
        expect(newColor.red).toBeCloseTo(octogon.verticies[39]); // r7
        expect(newColor.green).toBeCloseTo(octogon.verticies[40]); // g7
        expect(newColor.blue).toBeCloseTo(octogon.verticies[41]); // b7

        expect(0.5).toBeCloseTo(octogon.verticies[42]); // x8
        expect(0.83).toBeCloseTo(octogon.verticies[43]); // y8
        expect(0).toBeCloseTo(octogon.verticies[44]); // z8
        expect(newColor.red).toBeCloseTo(octogon.verticies[45]); // r8
        expect(newColor.green).toBeCloseTo(octogon.verticies[46]); // g8
        expect(newColor.blue).toBeCloseTo(octogon.verticies[47]); // b8
    });
});