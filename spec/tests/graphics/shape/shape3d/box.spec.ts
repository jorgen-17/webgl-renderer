import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Box } from "../../../../../src/graphics/shape/shape3d/box";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";


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

                expect(792).toEqual(box.verticies.length);

                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    // triangle 1
                    new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 2
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 3
                    new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 4
                    new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 5
                    new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 6
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 7
                    new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 8
                    new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 9
                    new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 10
                    new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 11
                    new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 12
                    new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);

                expect(expectedVerticies).toEqual(box.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const box = new Box(new Vec3(0.0, 0.0), new Vec3(0.5, 0.25), gl, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 7
            new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 8
            new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 9
            new Float32Array([0, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 10
            new Float32Array([0, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 11
            new Float32Array([0, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 12
            new Float32Array([0, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(box.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        box.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.5, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 7
            new Float32Array([0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 8
            new Float32Array([0, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 9
            new Float32Array([0, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 10
            new Float32Array([0, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.25, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 11
            new Float32Array([0, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 12
            new Float32Array([0, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0.25, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(box.verticies);
    });
});