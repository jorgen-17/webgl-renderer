import * as TypeMoq from "typemoq";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Hexagon } from "../../../src/graphics/shapes2d/hexagon";


describe("Hexagon ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = TypeMoq.Mock.ofType<WebGLRenderingContext>(undefined);
        gl.setup(x => x.TRIANGLE_FAN).returns(() => 6);

        it("should initialize basic properties correctly", () =>
        {
            const hexagon = new Hexagon(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl.object);

            expect(color).toBe(hexagon.rgbColor);
            expect(6).toBe(hexagon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl.object);

                expect(36).toEqual(hexagon.verticies.size);

                expect(0.666).toBeCloseTo(hexagon.verticies.arr[0]); // x1
                expect(1).toBeCloseTo(hexagon.verticies.arr[1]); // y1
                expect(0).toBeCloseTo(hexagon.verticies.arr[2]); // z1
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[3]); // r1
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[4]); // g1
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[5]); // b1

                expect(0.83).toBeCloseTo(hexagon.verticies.arr[6]); // x2
                expect(1).toBeCloseTo(hexagon.verticies.arr[7]); // y2
                expect(0).toBeCloseTo(hexagon.verticies.arr[8]); // z2
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[9]); // r2
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[10]); // g2
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[11]); // b2

                expect(1).toBeCloseTo(hexagon.verticies.arr[12]); // x3
                expect(0.75).toBeCloseTo(hexagon.verticies.arr[13]); // y3
                expect(0).toBeCloseTo(hexagon.verticies.arr[14]); // z3
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[15]); // r3
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[16]); // g3
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[17]); // b3

                expect(0.83).toBeCloseTo(hexagon.verticies.arr[18]); // x4
                expect(0.5).toBeCloseTo(hexagon.verticies.arr[19]); // y4
                expect(0).toBeCloseTo(hexagon.verticies.arr[20]); // z4
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[21]); // r4
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[22]); // g4
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[23]); // b4

                expect(0.666).toBeCloseTo(hexagon.verticies.arr[24]); // x5
                expect(0.5).toBeCloseTo(hexagon.verticies.arr[25]); // y5
                expect(0).toBeCloseTo(hexagon.verticies.arr[26]); // z5
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[27]); // r5
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[28]); // g5
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[29]); // b5

                expect(0.5).toBeCloseTo(hexagon.verticies.arr[30]); // x6
                expect(0.75).toBeCloseTo(hexagon.verticies.arr[31]); // y6
                expect(0).toBeCloseTo(hexagon.verticies.arr[32]); // z6
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[33]); // r6
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[34]); // g6
                expect(1.0).toBeCloseTo(hexagon.verticies.arr[35]); // b6
            });
        });
    });

});