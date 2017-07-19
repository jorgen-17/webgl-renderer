import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Octogon } from "../../../src/graphics/shapes2d/octogon";


describe("octogon:", () =>
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
            const octogon = new Octogon(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(octogon.rgbColor);
            expect(gl.TRIANGLES).toBe(octogon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1. 0)", () =>
            {
                const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(108).toEqual(octogon.verticies.length);

                const expectedVerticies = new Float32Array([
                    // triangle 1
                    0.5, 0.8333333730697632, 0, color.red, color.green, color.blue, // vertex 1
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 2
                    0.5, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 3
                    // triangle 2
                    0.5, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 4
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 5
                    0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 6
                    // triangle 3
                    0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 7
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 8
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 9
                    // triangle 4
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 10
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 11
                    0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 12
                    // triangle 5
                    0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 13
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 14
                    1, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 15
                    // triangle 6
                    0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 16
                    1, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 17
                    1, 0.8333333730697632, 0, color.red, color.green, color.blue, // vertex 18
                ]);

                expect(expectedVerticies).toEqual(octogon.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

        expect(108).toEqual(octogon.verticies.length);

        let expectedVerticies = new Float32Array([
            // triangle 1
            0.5, 0.8333333730697632, 0, color.red, color.green, color.blue, // vertex 1
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 2
            0.5, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 3
            // triangle 2
            0.5, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 4
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 5
            0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 6
            // triangle 3
            0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 7
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 8
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 9
            // triangle 4
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 10
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 11
            0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 12
            // triangle 5
            0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 13
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 14
            1, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 15
            // triangle 6
            0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 16
            1, 0.6666666865348816, 0, color.red, color.green, color.blue, // vertex 17
            1, 0.8333333730697632, 0, color.red, color.green, color.blue, // vertex 18
        ]);

        expect(expectedVerticies).toEqual(octogon.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        octogon.rgbColor = newColor;

        expect(108).toEqual(octogon.verticies.length);

        expectedVerticies = new Float32Array([
            // triangle 1
            0.5, 0.8333333730697632, 0, newColor.red, newColor.green, newColor.blue, // vertex 1
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 2
            0.5, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue, // vertex 3
            // triangle 2
            0.5, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue, // vertex 4
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 5
            0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 6
            // triangle 3
            0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 7
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 8
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 9
            // triangle 4
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 10
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 11
            0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 12
            // triangle 5
            0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 13
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 14
            1, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue, // vertex 15
            // triangle 6
            0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 16
            1, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue, // vertex 17
            1, 0.8333333730697632, 0, newColor.red, newColor.green, newColor.blue, // vertex 18
        ]);

        expect(expectedVerticies).toEqual(octogon.verticies);
    });
});