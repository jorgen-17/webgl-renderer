import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Rectangle } from "../../../../../src/graphics/shape/shape2d/rectangle";
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
            const rectangle = new Rectangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(rectangle.rgbColor);
            expect(gl.TRIANGLES).toBe(rectangle.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(132).toEqual(rectangle.verticies.length);
                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    // triangle 1
                    new Float32Array([0.5, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 2
                    new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);
                expect(expectedVerticies).toEqual(rectangle.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(rectangle.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        rectangle.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(rectangle.verticies);
    });
});