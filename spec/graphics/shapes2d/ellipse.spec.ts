import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";

describe("ellipse:", () =>
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
            const ellipse = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                Precision.Low, color);

            expect(color).toBe(ellipse.rgbColor);
            expect(gl.TRIANGLES).toBe(ellipse.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

                expect(180).toEqual(circle.verticies.length);

                const expectedVerticies = new Float32Array([
                    // triangle 1
                    0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 1
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 2
                    0.6, 0.95, 0, color.red, color.green, color.blue, // vertex 3
                    // triangle 2
                    0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 4
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 5
                    0.6, 0.55, 0, color.red, color.green, color.blue, // vertex 6
                    // triangle 3
                    0.6, 0.95, 0, color.red, color.green, color.blue, // vertex 7
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 8
                    0.7, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 9
                    // triangle 4
                    0.6, 0.55, 0, color.red, color.green, color.blue, // vertex 10
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 11
                    0.7, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 12
                    // triangle 5
                    0.7, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 13
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 14
                    0.8, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 15
                    // triangle 6
                    0.7, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 16
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 17
                    0.8, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 18
                    // triangle 7
                    0.8, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 19
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 20
                    0.9, 0.95, 0, color.red, color.green, color.blue, // vertex 21
                    // triangle 8
                    0.8, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 22
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 23
                    0.9, 0.55, 0, color.red, color.green, color.blue, // vertex 24
                    // triangle 9
                    0.9, 0.95, 0, color.red, color.green, color.blue, // vertex 25
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 26
                    1, 0.75, 0, color.red, color.green, color.blue, // vertex 27
                    // triangle 10
                    0.9, 0.55, 0, color.red, color.green, color.blue, // vertex 28
                    0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 29
                    1, 0.75, 0, color.red, color.green, color.blue, // vertex 30
                ]);

                expect(expectedVerticies).toEqual(circle.verticies.slice(0, expectedVerticies.length));
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

        expect(180).toEqual(circle.verticies.length);

        let expectedVerticies = new Float32Array([
            // triangle 1
            0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 1
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 2
            0.6, 0.95, 0, color.red, color.green, color.blue, // vertex 3
            // triangle 2
            0.5, 0.75, 0, color.red, color.green, color.blue, // vertex 4
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 5
            0.6, 0.55, 0, color.red, color.green, color.blue, // vertex 6
            // triangle 3
            0.6, 0.95, 0, color.red, color.green, color.blue, // vertex 7
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 8
            0.7, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 9
            // triangle 4
            0.6, 0.55, 0, color.red, color.green, color.blue, // vertex 10
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 11
            0.7, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 12
            // triangle 5
            0.7, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 13
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 14
            0.8, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 15
            // triangle 6
            0.7, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 16
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 17
            0.8, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 18
            // triangle 7
            0.8, 0.994948983192443, 0, color.red, color.green, color.blue, // vertex 19
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 20
            0.9, 0.95, 0, color.red, color.green, color.blue, // vertex 21
            // triangle 8
            0.8, 0.5050510168075562, 0, color.red, color.green, color.blue, // vertex 22
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 23
            0.9, 0.55, 0, color.red, color.green, color.blue, // vertex 24
            // triangle 9
            0.9, 0.95, 0, color.red, color.green, color.blue, // vertex 25
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 26
            1, 0.75, 0, color.red, color.green, color.blue, // vertex 27
            // triangle 10
            0.9, 0.55, 0, color.red, color.green, color.blue, // vertex 28
            0.75, 0.75, 0, color.red, color.green, color.blue, // vertex 29
            1, 0.75, 0, color.red, color.green, color.blue, // vertex 30
        ]);

        expect(expectedVerticies).toEqual(circle.verticies.slice(0, expectedVerticies.length));

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        circle.rgbColor = newColor;

        expect(180).toEqual(circle.verticies.length);

        expectedVerticies = new Float32Array([
            // triangle 1
            0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 1
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 2
            0.6, 0.95, 0, newColor.red, newColor.green, newColor.blue, // vertex 3
            // triangle 2
            0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 4
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 5
            0.6, 0.55, 0, newColor.red, newColor.green, newColor.blue, // vertex 6
            // triangle 3
            0.6, 0.95, 0, newColor.red, newColor.green, newColor.blue, // vertex 7
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 8
            0.7, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue, // vertex 9
            // triangle 4
            0.6, 0.55, 0, newColor.red, newColor.green, newColor.blue, // vertex 10
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 11
            0.7, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue, // vertex 12
            // triangle 5
            0.7, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue, // vertex 13
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 14
            0.8, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue, // vertex 15
            // triangle 6
            0.7, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue, // vertex 16
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 17
            0.8, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue, // vertex 18
            // triangle 7
            0.8, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue, // vertex 19
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 20
            0.9, 0.95, 0, newColor.red, newColor.green, newColor.blue, // vertex 21
            // triangle 8
            0.8, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue, // vertex 22
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 23
            0.9, 0.55, 0, newColor.red, newColor.green, newColor.blue, // vertex 24
            // triangle 9
            0.9, 0.95, 0, newColor.red, newColor.green, newColor.blue, // vertex 25
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 26
            1, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 27
            // triangle 10
            0.9, 0.55, 0, newColor.red, newColor.green, newColor.blue, // vertex 28
            0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 29
            1, 0.75, 0, newColor.red, newColor.green, newColor.blue, // vertex 30
        ]);

        expect(expectedVerticies).toEqual(circle.verticies.slice(0, expectedVerticies.length));
    });
});