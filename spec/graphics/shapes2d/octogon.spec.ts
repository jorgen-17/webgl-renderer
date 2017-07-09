import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Octogon } from "../../../src/graphics/shapes2d/octogon";


describe("Hexagon ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = new Mock<WebGLRenderingContext>();

        beforeAll(() =>
        {
            gl.setup(x => x.TRIANGLE_FAN).is(0x0006);
        });

        it("should initialize basic properties correctly", () =>
        {
            const octogon = new Octogon(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl.Object);

            expect(color).toBe(octogon.rgbColor);
            expect(6).toBe(octogon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl.Object);

                expect(48).toEqual(octogon.verticies.size);

                expect(0.666).toBeCloseTo(octogon.verticies.arr[0]); // x1
                expect(1).toBeCloseTo(octogon.verticies.arr[1]); // y1
                expect(0).toBeCloseTo(octogon.verticies.arr[2]); // z1
                expect(1.0).toBeCloseTo(octogon.verticies.arr[3]); // r1
                expect(1.0).toBeCloseTo(octogon.verticies.arr[4]); // g1
                expect(1.0).toBeCloseTo(octogon.verticies.arr[5]); // b1

                expect(0.83).toBeCloseTo(octogon.verticies.arr[6]); // x2
                expect(1).toBeCloseTo(octogon.verticies.arr[7]); // y2
                expect(0).toBeCloseTo(octogon.verticies.arr[8]); // z2
                expect(1.0).toBeCloseTo(octogon.verticies.arr[9]); // r2
                expect(1.0).toBeCloseTo(octogon.verticies.arr[10]); // g2
                expect(1.0).toBeCloseTo(octogon.verticies.arr[11]); // b2

                expect(1).toBeCloseTo(octogon.verticies.arr[12]); // x3
                expect(0.83).toBeCloseTo(octogon.verticies.arr[13]); // y3
                expect(0).toBeCloseTo(octogon.verticies.arr[14]); // z3
                expect(1.0).toBeCloseTo(octogon.verticies.arr[15]); // r3
                expect(1.0).toBeCloseTo(octogon.verticies.arr[16]); // g3
                expect(1.0).toBeCloseTo(octogon.verticies.arr[17]); // b3

                expect(1).toBeCloseTo(octogon.verticies.arr[18]); // x4
                expect(0.666).toBeCloseTo(octogon.verticies.arr[19]); // y4
                expect(0).toBeCloseTo(octogon.verticies.arr[20]); // z4
                expect(1.0).toBeCloseTo(octogon.verticies.arr[21]); // r4
                expect(1.0).toBeCloseTo(octogon.verticies.arr[22]); // g4
                expect(1.0).toBeCloseTo(octogon.verticies.arr[23]); // b4

                expect(0.83).toBeCloseTo(octogon.verticies.arr[24]); // x5
                expect(0.5).toBeCloseTo(octogon.verticies.arr[25]); // y5
                expect(0).toBeCloseTo(octogon.verticies.arr[26]); // z5
                expect(1.0).toBeCloseTo(octogon.verticies.arr[27]); // r5
                expect(1.0).toBeCloseTo(octogon.verticies.arr[28]); // g5
                expect(1.0).toBeCloseTo(octogon.verticies.arr[29]); // b5

                expect(0.666).toBeCloseTo(octogon.verticies.arr[30]); // x6
                expect(0.5).toBeCloseTo(octogon.verticies.arr[31]); // y6
                expect(0).toBeCloseTo(octogon.verticies.arr[32]); // z6
                expect(1.0).toBeCloseTo(octogon.verticies.arr[33]); // r6
                expect(1.0).toBeCloseTo(octogon.verticies.arr[34]); // g6
                expect(1.0).toBeCloseTo(octogon.verticies.arr[35]); // b6

                expect(0.5).toBeCloseTo(octogon.verticies.arr[36]); // x7
                expect(0.666).toBeCloseTo(octogon.verticies.arr[37]); // y7
                expect(0).toBeCloseTo(octogon.verticies.arr[38]); // z7
                expect(1.0).toBeCloseTo(octogon.verticies.arr[39]); // r7
                expect(1.0).toBeCloseTo(octogon.verticies.arr[40]); // g7
                expect(1.0).toBeCloseTo(octogon.verticies.arr[41]); // b7

                expect(0.5).toBeCloseTo(octogon.verticies.arr[42]); // x8
                expect(0.83).toBeCloseTo(octogon.verticies.arr[43]); // y8
                expect(0).toBeCloseTo(octogon.verticies.arr[44]); // z8
                expect(1.0).toBeCloseTo(octogon.verticies.arr[45]); // r8
                expect(1.0).toBeCloseTo(octogon.verticies.arr[46]); // g8
                expect(1.0).toBeCloseTo(octogon.verticies.arr[47]); // b8
            });
        });
    });

});