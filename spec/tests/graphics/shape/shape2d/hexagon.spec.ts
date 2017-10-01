import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Hexagon } from "../../../../../src/graphics/shape/shape2d/hexagon";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";


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

                expect(264).toEqual(hexagon.verticies.length);

                const expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                    // triangle 1
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 2
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 3
                    new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    // triangle 4
                    new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements,
                    new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
                    new Mat4().setIdentity().elements
                ]);
                expect(expectedVerticies).toEqual(hexagon.verticies);
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6666666865348816, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.8333333730697632, 1, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, color.red, color.green, color.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(hexagon.verticies);

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        hexagon.rgbColor = newColor;
        expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
            // triangle 1
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.5, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 2
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.6666666865348816, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 3
            new Float32Array([0.6666666865348816, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            // triangle 4
            new Float32Array([0.8333333730697632, 1, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([0.8333333730697632, 0.5, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements,
            new Float32Array([1, 0.75, 0, newColor.red, newColor.green, newColor.blue]),
            new Mat4().setIdentity().elements
        ]);
        expect(expectedVerticies).toEqual(hexagon.verticies);
    });
});