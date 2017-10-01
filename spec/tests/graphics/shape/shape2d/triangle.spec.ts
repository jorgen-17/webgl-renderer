import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../../../src/graphics/shape/shape2d/triangle";
import { WebglRendererTestHelper } from "../../../../../spec/helpers/graphics/webglRenderer.spec.helper";


describe("triangle:", () =>
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
            const triangle = new Triangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(triangle.rgbColor);
            expect(gl.TRIANGLES).toBe(triangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(66).toEqual(triangle.verticies.length);

                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);

                expect(expectedVerticies).toEqual(triangle.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(triangle.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        triangle.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            new Float32Array([0.5, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(triangle.verticies);
    });
});