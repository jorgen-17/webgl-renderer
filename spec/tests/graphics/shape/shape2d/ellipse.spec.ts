import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { Ellipse } from "../../../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../../../src/graphics/precision";
import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";

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

                expect(660).toEqual(circle.verticies.length);

                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    // triangle 1
                    new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6, 0.95, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 2
                    new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6, 0.55, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 3
                    new Float32Array([0.6, 0.95, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.7, 0.994948983192443, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 4
                    new Float32Array([0.6, 0.55, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.7, 0.5050510168075562, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 5
                    new Float32Array([0.7, 0.994948983192443, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8, 0.994948983192443, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 6
                    new Float32Array([0.7, 0.5050510168075562, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8, 0.5050510168075562, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 7
                    new Float32Array([0.8, 0.994948983192443, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.9, 0.95, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 8
                    new Float32Array([0.8, 0.5050510168075562, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.9, 0.55, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 9
                    new Float32Array([0.9, 0.95, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 10
                    new Float32Array([0.9, 0.55, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);

                expect(expectedVerticies).toEqual(circle.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6, 0.95, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6, 0.55, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6, 0.95, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.7, 0.994948983192443, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.6, 0.55, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.7, 0.5050510168075562, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0.7, 0.994948983192443, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8, 0.994948983192443, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0.7, 0.5050510168075562, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8, 0.5050510168075562, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 7
            new Float32Array([0.8, 0.994948983192443, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.9, 0.95, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 8
            new Float32Array([0.8, 0.5050510168075562, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.9, 0.55, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 9
            new Float32Array([0.9, 0.95, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 10
            new Float32Array([0.9, 0.55, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(circle.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        circle.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6, 0.95, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6, 0.55, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6, 0.95, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.7, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.6, 0.55, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.7, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0.7, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0.7, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 7
            new Float32Array([0.8, 0.994948983192443, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.9, 0.95, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 8
            new Float32Array([0.8, 0.5050510168075562, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.9, 0.55, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 9
            new Float32Array([0.9, 0.95, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 10
            new Float32Array([0.9, 0.55, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.75, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(circle.verticies);
    });
});