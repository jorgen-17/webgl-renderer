import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Octogon } from "../../../../../src/graphics/shape/shape2d/octogon";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";

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

                expect(396).toEqual(octogon.verticies.length);

                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    // triangle 1
                    new Float32Array([0.5, 0.8333333730697632, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.6666666865348816, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 2
                    new Float32Array([0.5, 0.6666666865348816, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 3
                    new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 4
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 5
                    new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.6666666865348816, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 6
                    new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.6666666865348816, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.8333333730697632, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);

                expect(expectedVerticies).toEqual(octogon.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 0.8333333730697632, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.6666666865348816, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.6666666865348816, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.6666666865348816, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.6666666865348816, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.8333333730697632, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(octogon.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        octogon.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.5, 0.8333333730697632, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.5, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 5
            new Float32Array([0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 6
            new Float32Array([0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.6666666865348816, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.8333333730697632, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(octogon.verticies);
    });
});