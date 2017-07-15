import { Mock } from "ts-mocks";

import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";


describe("HorizontalEllipse ", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLE_FAN).is(0x0006);
    });

    describe("constructor should initialize points correctly ", () =>
    {
        it("should initialize basic properties correctly", () =>
        {
            const ellipse = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                Precision.Low, color);

            expect(color).toBe(ellipse.rgbColor);
            expect(6).toBe(ellipse.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0) AKA its actually a circle", () =>
            {
                const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

                expect(66).toEqual(circle.verticies.length);

                expect(0.5).toBeCloseTo(circle.verticies[0]); // x1
                expect(0.75).toBeCloseTo(circle.verticies[1]); // y1
                expect(0).toBeCloseTo(circle.verticies[2]); // z1
                expect(color.red).toBeCloseTo(circle.verticies[3]); // r1
                expect(color.green).toBeCloseTo(circle.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(circle.verticies[5]); // b1
                expect(0.6).toBeCloseTo(circle.verticies[6]); // x2
                expect(0.95).toBeCloseTo(circle.verticies[7]); // y2
                expect(0).toBeCloseTo(circle.verticies[8]); // z2
                expect(color.red).toBeCloseTo(circle.verticies[9]); // r2
                expect(color.green).toBeCloseTo(circle.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(circle.verticies[11]); // b2
                expect(0.7).toBeCloseTo(circle.verticies[12]); // x3
                expect(0.99494).toBeCloseTo(circle.verticies[13]); // y3
                expect(0).toBeCloseTo(circle.verticies[14]); // z3
                expect(color.red).toBeCloseTo(circle.verticies[15]); // r3
                expect(color.green).toBeCloseTo(circle.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(circle.verticies[17]); // b3
                expect(0.8).toBeCloseTo(circle.verticies[18]); // x4
                expect(0.99494).toBeCloseTo(circle.verticies[19]); // y4
                expect(0).toBeCloseTo(circle.verticies[20]); // z4
                expect(color.red).toBeCloseTo(circle.verticies[21]); // r4
                expect(color.green).toBeCloseTo(circle.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(circle.verticies[23]); // b4
                expect(0.9).toBeCloseTo(circle.verticies[24]); // x5
                expect(0.95).toBeCloseTo(circle.verticies[25]); // y5
                expect(0).toBeCloseTo(circle.verticies[26]); // z5
                expect(color.red).toBeCloseTo(circle.verticies[27]); // r5
                expect(color.green).toBeCloseTo(circle.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(circle.verticies[29]); // b5
                expect(1.0).toBeCloseTo(circle.verticies[30]); // x6
                expect(0.75).toBeCloseTo(circle.verticies[31]); // y6
                expect(0).toBeCloseTo(circle.verticies[32]); // z6
                expect(color.red).toBeCloseTo(circle.verticies[33]); // r6
                expect(color.green).toBeCloseTo(circle.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(circle.verticies[35]); // b6
                expect(0.6).toBeCloseTo(circle.verticies[36]); // x7
                expect(0.55).toBeCloseTo(circle.verticies[37]); // y7
                expect(0).toBeCloseTo(circle.verticies[38]); // z7
                expect(color.red).toBeCloseTo(circle.verticies[39]); // r7
                expect(color.green).toBeCloseTo(circle.verticies[40]); // g7
                expect(color.blue).toBeCloseTo(circle.verticies[41]); // b7
                expect(0.7).toBeCloseTo(circle.verticies[42]); // x8
                expect(0.50505).toBeCloseTo(circle.verticies[43]); // y8
                expect(0).toBeCloseTo(circle.verticies[44]); // z8
                expect(color.red).toBeCloseTo(circle.verticies[45]); // r8
                expect(color.green).toBeCloseTo(circle.verticies[46]); // g8
                expect(color.blue).toBeCloseTo(circle.verticies[47]); // b8
                expect(0.8).toBeCloseTo(circle.verticies[48]); // x9
                expect(0.50505).toBeCloseTo(circle.verticies[49]); // y9
                expect(0).toBeCloseTo(circle.verticies[50]); // z9
                expect(color.red).toBeCloseTo(circle.verticies[51]); // r9
                expect(color.green).toBeCloseTo(circle.verticies[52]); // g9
                expect(color.blue).toBeCloseTo(circle.verticies[53]); // b9
                expect(0.9).toBeCloseTo(circle.verticies[54]); // x10
                expect(0.55).toBeCloseTo(circle.verticies[55]); // y10
                expect(0).toBeCloseTo(circle.verticies[56]); // z10
                expect(color.red).toBeCloseTo(circle.verticies[57]); // r10
                expect(color.green).toBeCloseTo(circle.verticies[58]); // g10
                expect(color.blue).toBeCloseTo(circle.verticies[59]); // b10
                expect(1.0).toBeCloseTo(circle.verticies[60]); // x11
                expect(0.75).toBeCloseTo(circle.verticies[61]); // y11
                expect(0).toBeCloseTo(circle.verticies[62]); // z11
                expect(color.red).toBeCloseTo(circle.verticies[63]); // r11
                expect(color.green).toBeCloseTo(circle.verticies[64]); // g11
                expect(color.blue).toBeCloseTo(circle.verticies[65]); // b11
            });

            it("when constructed with point(0.0, 0.5) and point(1.0, 1.0) AKA its a real horizontal ellipse", () =>
            {
                const horizontalEllipse = new Ellipse(new Vec3(0.0, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

                expect(66).toEqual(horizontalEllipse.verticies.length);

                expect(0.0).toBeCloseTo(horizontalEllipse.verticies[0]); // x1
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[1]); // y1
                expect(0).toBeCloseTo(horizontalEllipse.verticies[2]); // z1
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[3]); // r1
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[5]); // b1
                expect(0.2).toBeCloseTo(horizontalEllipse.verticies[6]); // x2
                expect(0.95).toBeCloseTo(horizontalEllipse.verticies[7]); // y2
                expect(0).toBeCloseTo(horizontalEllipse.verticies[8]); // z2
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[9]); // r2
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[11]); // b2
                expect(0.4).toBeCloseTo(horizontalEllipse.verticies[12]); // x3
                expect(0.99494).toBeCloseTo(horizontalEllipse.verticies[13]); // y3
                expect(0).toBeCloseTo(horizontalEllipse.verticies[14]); // z3
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[15]); // r3
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[17]); // b3
                expect(0.6).toBeCloseTo(horizontalEllipse.verticies[18]); // x4
                expect(0.99494).toBeCloseTo(horizontalEllipse.verticies[19]); // y4
                expect(0).toBeCloseTo(horizontalEllipse.verticies[20]); // z4
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[21]); // r4
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[23]); // b4
                expect(0.8).toBeCloseTo(horizontalEllipse.verticies[24]); // x5
                expect(0.95).toBeCloseTo(horizontalEllipse.verticies[25]); // y5
                expect(0).toBeCloseTo(horizontalEllipse.verticies[26]); // z5
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[27]); // r5
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[29]); // b5
                expect(1.0).toBeCloseTo(horizontalEllipse.verticies[30]); // x6
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[31]); // y6
                expect(0).toBeCloseTo(horizontalEllipse.verticies[32]); // z6
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[33]); // r6
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[35]); // b6
                expect(0.2).toBeCloseTo(horizontalEllipse.verticies[36]); // x7
                expect(0.55).toBeCloseTo(horizontalEllipse.verticies[37]); // y7
                expect(0).toBeCloseTo(horizontalEllipse.verticies[38]); // z7
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[39]); // r7
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[40]); // g7
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[41]); // b7
                expect(0.4).toBeCloseTo(horizontalEllipse.verticies[42]); // x8
                expect(0.50505).toBeCloseTo(horizontalEllipse.verticies[43]); // y8
                expect(0).toBeCloseTo(horizontalEllipse.verticies[44]); // z8
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[45]); // r8
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[46]); // g8
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[47]); // b8
                expect(0.6).toBeCloseTo(horizontalEllipse.verticies[48]); // x9
                expect(0.50505).toBeCloseTo(horizontalEllipse.verticies[49]); // y9
                expect(0).toBeCloseTo(horizontalEllipse.verticies[50]); // z9
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[51]); // r9
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[52]); // g9
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[53]); // b9
                expect(0.8).toBeCloseTo(horizontalEllipse.verticies[54]); // x10
                expect(0.55).toBeCloseTo(horizontalEllipse.verticies[55]); // y10
                expect(0).toBeCloseTo(horizontalEllipse.verticies[56]); // z10
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[57]); // r10
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[58]); // g10
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[59]); // b10
                expect(1.0).toBeCloseTo(horizontalEllipse.verticies[60]); // x11
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[61]); // y11
                expect(0).toBeCloseTo(horizontalEllipse.verticies[62]); // z11
                expect(color.red).toBeCloseTo(horizontalEllipse.verticies[63]); // r11
                expect(color.green).toBeCloseTo(horizontalEllipse.verticies[64]); // g11
                expect(color.blue).toBeCloseTo(horizontalEllipse.verticies[65]); // b11
            });

            it("when constructed with point(0.0, 0.0) and point(0.5, 1.0) AKA its vertical ellipse", () =>
            {
                const verticalEllipse = new Ellipse(new Vec3(0.0, 0.0), new Vec3(0.5, 1.0), gl,
                    Precision.Low, color);

                expect(66).toEqual(verticalEllipse.verticies.length);

                expect(0.0).toBeCloseTo(verticalEllipse.verticies[0]); // x1
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[1]); // y1
                expect(0).toBeCloseTo(verticalEllipse.verticies[2]); // z1
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[3]); // r1
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[4]); // g1
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[5]); // b1
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[6]); // x2
                expect(0.9).toBeCloseTo(verticalEllipse.verticies[7]); // y2
                expect(0).toBeCloseTo(verticalEllipse.verticies[8]); // z2
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[9]); // r2
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[10]); // g2
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[11]); // b2
                expect(0.2).toBeCloseTo(verticalEllipse.verticies[12]); // x3
                expect(0.98989).toBeCloseTo(verticalEllipse.verticies[13]); // y3
                expect(0).toBeCloseTo(verticalEllipse.verticies[14]); // z3
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[15]); // r3
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[16]); // g3
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[17]); // b3
                expect(0.3).toBeCloseTo(verticalEllipse.verticies[18]); // x4
                expect(0.98989).toBeCloseTo(verticalEllipse.verticies[19]); // y4
                expect(0).toBeCloseTo(verticalEllipse.verticies[20]); // z4
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[21]); // r4
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[22]); // g4
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[23]); // b4
                expect(0.4).toBeCloseTo(verticalEllipse.verticies[24]); // x5
                expect(0.9).toBeCloseTo(verticalEllipse.verticies[25]); // y5
                expect(0).toBeCloseTo(verticalEllipse.verticies[26]); // z5
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[27]); // r5
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[28]); // g5
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[29]); // b5
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[30]); // x6
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[31]); // y6
                expect(0).toBeCloseTo(verticalEllipse.verticies[32]); // z6
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[33]); // r6
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[34]); // g6
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[35]); // b6
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[36]); // x7
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[37]); // y7
                expect(0).toBeCloseTo(verticalEllipse.verticies[38]); // z7
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[39]); // r7
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[40]); // g7
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[41]); // b7
                expect(0.2).toBeCloseTo(verticalEllipse.verticies[42]); // x8
                expect(0.0101).toBeCloseTo(verticalEllipse.verticies[43]); // y8
                expect(0).toBeCloseTo(verticalEllipse.verticies[44]); // z8
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[45]); // r8
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[46]); // g8
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[47]); // b8
                expect(0.3).toBeCloseTo(verticalEllipse.verticies[48]); // x9
                expect(0.0101).toBeCloseTo(verticalEllipse.verticies[49]); // y9
                expect(0).toBeCloseTo(verticalEllipse.verticies[50]); // z9
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[51]); // r9
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[52]); // g9
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[53]); // b9
                expect(0.4).toBeCloseTo(verticalEllipse.verticies[54]); // x10
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[55]); // y10
                expect(0).toBeCloseTo(verticalEllipse.verticies[56]); // z10
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[57]); // r10
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[58]); // g10
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[59]); // b10
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[60]); // x11
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[61]); // y11
                expect(0).toBeCloseTo(verticalEllipse.verticies[62]); // z11
                expect(color.red).toBeCloseTo(verticalEllipse.verticies[63]); // r11
                expect(color.green).toBeCloseTo(verticalEllipse.verticies[64]); // g11
                expect(color.blue).toBeCloseTo(verticalEllipse.verticies[65]); // b11
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

        expect(66).toEqual(circle.verticies.length);

        expect(0.5).toBeCloseTo(circle.verticies[0]); // x1
        expect(0.75).toBeCloseTo(circle.verticies[1]); // y1
        expect(0).toBeCloseTo(circle.verticies[2]); // z1
        expect(color.red).toBeCloseTo(circle.verticies[3]); // r1
        expect(color.green).toBeCloseTo(circle.verticies[4]); // g1
        expect(color.blue).toBeCloseTo(circle.verticies[5]); // b1
        expect(0.6).toBeCloseTo(circle.verticies[6]); // x2
        expect(0.95).toBeCloseTo(circle.verticies[7]); // y2
        expect(0).toBeCloseTo(circle.verticies[8]); // z2
        expect(color.red).toBeCloseTo(circle.verticies[9]); // r2
        expect(color.green).toBeCloseTo(circle.verticies[10]); // g2
        expect(color.blue).toBeCloseTo(circle.verticies[11]); // b2
        expect(0.7).toBeCloseTo(circle.verticies[12]); // x3
        expect(0.99494).toBeCloseTo(circle.verticies[13]); // y3
        expect(0).toBeCloseTo(circle.verticies[14]); // z3
        expect(color.red).toBeCloseTo(circle.verticies[15]); // r3
        expect(color.green).toBeCloseTo(circle.verticies[16]); // g3
        expect(color.blue).toBeCloseTo(circle.verticies[17]); // b3
        expect(0.8).toBeCloseTo(circle.verticies[18]); // x4
        expect(0.99494).toBeCloseTo(circle.verticies[19]); // y4
        expect(0).toBeCloseTo(circle.verticies[20]); // z4
        expect(color.red).toBeCloseTo(circle.verticies[21]); // r4
        expect(color.green).toBeCloseTo(circle.verticies[22]); // g4
        expect(color.blue).toBeCloseTo(circle.verticies[23]); // b4
        expect(0.9).toBeCloseTo(circle.verticies[24]); // x5
        expect(0.95).toBeCloseTo(circle.verticies[25]); // y5
        expect(0).toBeCloseTo(circle.verticies[26]); // z5
        expect(color.red).toBeCloseTo(circle.verticies[27]); // r5
        expect(color.green).toBeCloseTo(circle.verticies[28]); // g5
        expect(color.blue).toBeCloseTo(circle.verticies[29]); // b5
        expect(1.0).toBeCloseTo(circle.verticies[30]); // x6
        expect(0.75).toBeCloseTo(circle.verticies[31]); // y6
        expect(0).toBeCloseTo(circle.verticies[32]); // z6
        expect(color.red).toBeCloseTo(circle.verticies[33]); // r6
        expect(color.green).toBeCloseTo(circle.verticies[34]); // g6
        expect(color.blue).toBeCloseTo(circle.verticies[35]); // b6
        expect(0.6).toBeCloseTo(circle.verticies[36]); // x7
        expect(0.55).toBeCloseTo(circle.verticies[37]); // y7
        expect(0).toBeCloseTo(circle.verticies[38]); // z7
        expect(color.red).toBeCloseTo(circle.verticies[39]); // r7
        expect(color.green).toBeCloseTo(circle.verticies[40]); // g7
        expect(color.blue).toBeCloseTo(circle.verticies[41]); // b7
        expect(0.7).toBeCloseTo(circle.verticies[42]); // x8
        expect(0.50505).toBeCloseTo(circle.verticies[43]); // y8
        expect(0).toBeCloseTo(circle.verticies[44]); // z8
        expect(color.red).toBeCloseTo(circle.verticies[45]); // r8
        expect(color.green).toBeCloseTo(circle.verticies[46]); // g8
        expect(color.blue).toBeCloseTo(circle.verticies[47]); // b8
        expect(0.8).toBeCloseTo(circle.verticies[48]); // x9
        expect(0.50505).toBeCloseTo(circle.verticies[49]); // y9
        expect(0).toBeCloseTo(circle.verticies[50]); // z9
        expect(color.red).toBeCloseTo(circle.verticies[51]); // r9
        expect(color.green).toBeCloseTo(circle.verticies[52]); // g9
        expect(color.blue).toBeCloseTo(circle.verticies[53]); // b9
        expect(0.9).toBeCloseTo(circle.verticies[54]); // x10
        expect(0.55).toBeCloseTo(circle.verticies[55]); // y10
        expect(0).toBeCloseTo(circle.verticies[56]); // z10
        expect(color.red).toBeCloseTo(circle.verticies[57]); // r10
        expect(color.green).toBeCloseTo(circle.verticies[58]); // g10
        expect(color.blue).toBeCloseTo(circle.verticies[59]); // b10
        expect(1.0).toBeCloseTo(circle.verticies[60]); // x11
        expect(0.75).toBeCloseTo(circle.verticies[61]); // y11
        expect(0).toBeCloseTo(circle.verticies[62]); // z11
        expect(color.red).toBeCloseTo(circle.verticies[63]); // r11
        expect(color.green).toBeCloseTo(circle.verticies[64]); // g11
        expect(color.blue).toBeCloseTo(circle.verticies[65]); // b11

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        circle.rgbColor = newColor;

        expect(66).toEqual(circle.verticies.length);

        expect(0.5).toBeCloseTo(circle.verticies[0]); // x1
        expect(0.75).toBeCloseTo(circle.verticies[1]); // y1
        expect(0).toBeCloseTo(circle.verticies[2]); // z1
        expect(newColor.red).toBeCloseTo(circle.verticies[3]); // r1
        expect(newColor.green).toBeCloseTo(circle.verticies[4]); // g1
        expect(newColor.blue).toBeCloseTo(circle.verticies[5]); // b1
        expect(0.6).toBeCloseTo(circle.verticies[6]); // x2
        expect(0.95).toBeCloseTo(circle.verticies[7]); // y2
        expect(0).toBeCloseTo(circle.verticies[8]); // z2
        expect(newColor.red).toBeCloseTo(circle.verticies[9]); // r2
        expect(newColor.green).toBeCloseTo(circle.verticies[10]); // g2
        expect(newColor.blue).toBeCloseTo(circle.verticies[11]); // b2
        expect(0.7).toBeCloseTo(circle.verticies[12]); // x3
        expect(0.99494).toBeCloseTo(circle.verticies[13]); // y3
        expect(0).toBeCloseTo(circle.verticies[14]); // z3
        expect(newColor.red).toBeCloseTo(circle.verticies[15]); // r3
        expect(newColor.green).toBeCloseTo(circle.verticies[16]); // g3
        expect(newColor.blue).toBeCloseTo(circle.verticies[17]); // b3
        expect(0.8).toBeCloseTo(circle.verticies[18]); // x4
        expect(0.99494).toBeCloseTo(circle.verticies[19]); // y4
        expect(0).toBeCloseTo(circle.verticies[20]); // z4
        expect(newColor.red).toBeCloseTo(circle.verticies[21]); // r4
        expect(newColor.green).toBeCloseTo(circle.verticies[22]); // g4
        expect(newColor.blue).toBeCloseTo(circle.verticies[23]); // b4
        expect(0.9).toBeCloseTo(circle.verticies[24]); // x5
        expect(0.95).toBeCloseTo(circle.verticies[25]); // y5
        expect(0).toBeCloseTo(circle.verticies[26]); // z5
        expect(newColor.red).toBeCloseTo(circle.verticies[27]); // r5
        expect(newColor.green).toBeCloseTo(circle.verticies[28]); // g5
        expect(newColor.blue).toBeCloseTo(circle.verticies[29]); // b5
        expect(1.0).toBeCloseTo(circle.verticies[30]); // x6
        expect(0.75).toBeCloseTo(circle.verticies[31]); // y6
        expect(0).toBeCloseTo(circle.verticies[32]); // z6
        expect(newColor.red).toBeCloseTo(circle.verticies[33]); // r6
        expect(newColor.green).toBeCloseTo(circle.verticies[34]); // g6
        expect(newColor.blue).toBeCloseTo(circle.verticies[35]); // b6
        expect(0.6).toBeCloseTo(circle.verticies[36]); // x7
        expect(0.55).toBeCloseTo(circle.verticies[37]); // y7
        expect(0).toBeCloseTo(circle.verticies[38]); // z7
        expect(newColor.red).toBeCloseTo(circle.verticies[39]); // r7
        expect(newColor.green).toBeCloseTo(circle.verticies[40]); // g7
        expect(newColor.blue).toBeCloseTo(circle.verticies[41]); // b7
        expect(0.7).toBeCloseTo(circle.verticies[42]); // x8
        expect(0.50505).toBeCloseTo(circle.verticies[43]); // y8
        expect(0).toBeCloseTo(circle.verticies[44]); // z8
        expect(newColor.red).toBeCloseTo(circle.verticies[45]); // r8
        expect(newColor.green).toBeCloseTo(circle.verticies[46]); // g8
        expect(newColor.blue).toBeCloseTo(circle.verticies[47]); // b8
        expect(0.8).toBeCloseTo(circle.verticies[48]); // x9
        expect(0.50505).toBeCloseTo(circle.verticies[49]); // y9
        expect(0).toBeCloseTo(circle.verticies[50]); // z9
        expect(newColor.red).toBeCloseTo(circle.verticies[51]); // r9
        expect(newColor.green).toBeCloseTo(circle.verticies[52]); // g9
        expect(newColor.blue).toBeCloseTo(circle.verticies[53]); // b9
        expect(0.9).toBeCloseTo(circle.verticies[54]); // x10
        expect(0.55).toBeCloseTo(circle.verticies[55]); // y10
        expect(0).toBeCloseTo(circle.verticies[56]); // z10
        expect(newColor.red).toBeCloseTo(circle.verticies[57]); // r10
        expect(newColor.green).toBeCloseTo(circle.verticies[58]); // g10
        expect(newColor.blue).toBeCloseTo(circle.verticies[59]); // b10
        expect(1.0).toBeCloseTo(circle.verticies[60]); // x11
        expect(0.75).toBeCloseTo(circle.verticies[61]); // y11
        expect(0).toBeCloseTo(circle.verticies[62]); // z11
        expect(newColor.red).toBeCloseTo(circle.verticies[63]); // r11
        expect(newColor.green).toBeCloseTo(circle.verticies[64]); // g11
        expect(newColor.blue).toBeCloseTo(circle.verticies[65]); // b11
    });
});