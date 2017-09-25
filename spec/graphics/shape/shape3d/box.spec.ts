import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../src/graphics/color/rgbColor";
import { Box } from "../../../../src/graphics/shape/shape3d/box";


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
            const box = new Box(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(box.rgbColor);
            expect(gl.TRIANGLES).toBe(box.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.0, 0.0) and point(0.5, 0.25)", () =>
            {
                const box = new Box(new Vec3(0.0, 0.0), new Vec3(0.5, 0.25), gl, color);

                expect(216).toEqual(box.verticies.length);

                const expectedVerticies = new Float32Array([
                    // front face
                    0, 0.25, 0, color.red, color.green, color.blue, // vertex 1
                    0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 2
                    0, 0, 0, color.red, color.green, color.blue, // vertex 3
                    0, 0, 0, color.red, color.green, color.blue, // vertex 4
                    0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 5
                    0.5, 0, 0, color.red, color.green, color.blue, // vertex 6
                    // right face
                    0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 7
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 8
                    0.5, 0, 0, color.red, color.green, color.blue, // vertex 9
                    0.5, 0, 0, color.red, color.green, color.blue, // vertex 10
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 11
                    0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 12
                    // left face
                    0, 0.25, 0, color.red, color.green, color.blue, // vertex 13
                    0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 14
                    0, 0, 0, color.red, color.green, color.blue, // vertex 15
                    0, 0, 0, color.red, color.green, color.blue, // vertex 16
                    0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 17
                    0, 0, 0.25, color.red, color.green, color.blue, // vertex 18
                    // back face
                    0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 19
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 20
                    0, 0, 0.25, color.red, color.green, color.blue, // vertex 21
                    0, 0, 0.25, color.red, color.green, color.blue, // vertex 22
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 23
                    0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 24
                    // top face
                    0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 25
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 26
                    0, 0.25, 0, color.red, color.green, color.blue, // vertex 27
                    0, 0.25, 0, color.red, color.green, color.blue, // vertex 28
                    0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 29
                    0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 30
                    // bottom face
                    0, 0, 0.25, color.red, color.green, color.blue, // vertex 31
                    0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 32
                    0, 0, 0, color.red, color.green, color.blue, // vertex 33
                    0, 0, 0, color.red, color.green, color.blue, // vertex 34
                    0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 35
                    0.5, 0, 0, color.red, color.green, color.blue, // vertex 36
                ]);

                expect(expectedVerticies).toEqual(box.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const box = new Box(new Vec3(0.0, 0.0), new Vec3(0.5, 0.25), gl, color);

        expect(216).toEqual(box.verticies.length);

        let expectedVerticies = new Float32Array([
            // front face
            0, 0.25, 0, color.red, color.green, color.blue, // vertex 1
            0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 2
            0, 0, 0, color.red, color.green, color.blue, // vertex 3
            0, 0, 0, color.red, color.green, color.blue, // vertex 4
            0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 5
            0.5, 0, 0, color.red, color.green, color.blue, // vertex 6
            // right face
            0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 7
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 8
            0.5, 0, 0, color.red, color.green, color.blue, // vertex 9
            0.5, 0, 0, color.red, color.green, color.blue, // vertex 10
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 11
            0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 12
            // left face
            0, 0.25, 0, color.red, color.green, color.blue, // vertex 13
            0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 14
            0, 0, 0, color.red, color.green, color.blue, // vertex 15
            0, 0, 0, color.red, color.green, color.blue, // vertex 16
            0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 17
            0, 0, 0.25, color.red, color.green, color.blue, // vertex 18
            // back face
            0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 19
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 20
            0, 0, 0.25, color.red, color.green, color.blue, // vertex 21
            0, 0, 0.25, color.red, color.green, color.blue, // vertex 22
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 23
            0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 24
            // top face
            0, 0.25, 0.25, color.red, color.green, color.blue, // vertex 25
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 26
            0, 0.25, 0, color.red, color.green, color.blue, // vertex 27
            0, 0.25, 0, color.red, color.green, color.blue, // vertex 28
            0.5, 0.25, 0.25, color.red, color.green, color.blue, // vertex 29
            0.5, 0.25, 0, color.red, color.green, color.blue, // vertex 30
            // bottom face
            0, 0, 0.25, color.red, color.green, color.blue, // vertex 31
            0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 32
            0, 0, 0, color.red, color.green, color.blue, // vertex 33
            0, 0, 0, color.red, color.green, color.blue, // vertex 34
            0.5, 0, 0.25, color.red, color.green, color.blue, // vertex 35
            0.5, 0, 0, color.red, color.green, color.blue, // vertex 36
        ]);

        expect(expectedVerticies).toEqual(box.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);

        box.rgbColor = newColor;

        expect(216).toEqual(box.verticies.length);

        expectedVerticies = new Float32Array([
            // front face
            0, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 1
            0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 2
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 3
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 4
            0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 5
            0.5, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 6
            // right face
            0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 7
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 8
            0.5, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 9
            0.5, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 10
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 11
            0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 12
            // left face
            0, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 13
            0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 14
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 15
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 16
            0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 17
            0, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 18
            // back face
            0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 19
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 20
            0, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 21
            0, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 22
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 23
            0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 24
            // top face
            0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 25
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 26
            0, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 27
            0, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 28
            0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 29
            0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue, // vertex 30
            // bottom face
            0, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 31
            0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 32
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 33
            0, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 34
            0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue, // vertex 35
            0.5, 0, 0, newColor.red, newColor.green, newColor.blue, // vertex 36
        ]);

        expect(expectedVerticies).toEqual(box.verticies);
    });
});