import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Box } from "../../../../../src/graphics/shape/shape3d/box";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";
import { boxSnapshots } from "../../../../snapshots/graphics/shape/shape3d/box.snapshot";

describe("box:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(boxSnapshots, "box:");
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

                expectjs(box.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const box = new Box(new Vec3(0.0, 0.0), new Vec3(0.5, 0.25), gl, color);
        expectjs(box.verticies).toMatchSnapshot();

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        box.rgbColor = newColor;
        expectjs(box.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const box = new Box(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(box.verticies).toMatchSnapshot();

        const newMat = box.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        box.modelMatrix = newMat;
        expectjs(box.verticies).toMatchSnapshot();
    });
});