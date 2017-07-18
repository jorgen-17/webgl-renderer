import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../src/graphics/rgbColor";
import { Hexagon } from "../../../src/graphics/shapes2d/hexagon";


describe("hexagon:", () =>
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
            const hexagon = new Hexagon(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(hexagon.rgbColor);
            expect(gl.TRIANGLES).toBe(hexagon.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(72).toEqual(hexagon.verticies.length);

                const expectedVerticies = new Float32Array([
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 1
                    0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 2
                    0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 3
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 4
                    0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 5
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 6
                    0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 7
                    0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 8
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 9
                    0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 10
                    0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 11
                    1, 0.75, 0, color.red, color.green, color.blue, // vertex 12
                ]);

                expect(expectedVerticies).toEqual(hexagon.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

        expect(72).toEqual(hexagon.verticies.length);

        let expectedVerticies = new Float32Array([
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 1
            0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 2
            0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 3
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 4
            0.6666666865348816, 0.5, 0, color.red, color.green, color.blue, // vertex 5
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 6
            0.6666666865348816, 1, 0, color.red, color.green, color.blue, // vertex 7
            0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 8
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 9
            0.8333333730697632, 1, 0, color.red, color.green, color.blue, // vertex 10
            0.8333333730697632, 0.5, 0, color.red, color.green, color.blue, // vertex 11
            1, 0.75, 0, color.red, color.green, color.blue, // vertex 12
        ]);

        expect(expectedVerticies).toEqual(hexagon.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        hexagon.rgbColor = newColor;

        expect(72).toEqual(hexagon.verticies.length);

        expectedVerticies = new Float32Array([
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 1
            0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 2
            0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 3
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 4
            0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 5
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 6
            0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 7
            0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 8
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 9
            0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue, // vertex 10
            0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue, // vertex 11
            1, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 12
        ]);

        expect(expectedVerticies).toEqual(hexagon.verticies);
    });
});