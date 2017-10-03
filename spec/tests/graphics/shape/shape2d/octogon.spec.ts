import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Octogon } from "../../../../../src/graphics/shape/shape2d/octogon";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";
import { octogonSnapshots } from "../../../../snapshots/graphics/shape/shape2d/octogon.snapshot";
import { Settings } from "../../../../../src/settings";

describe("octogon:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(octogonSnapshots, "octogon:");
    });

    describe("constructor:", () =>
    {
        it("should initialize basic properties correctly", () =>
        {
            const octogon = new Octogon(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(octogon.rgbColor);
            expect(gl.TRIANGLES).toBe(octogon.glRenderMode);
        });

        it("should default color if not preovided", () =>
        {
            const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl);

            expect(octogon.rgbColor).toEqual(Settings.defaultColor);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1. 0)", () =>
            {
                const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(396).toEqual(octogon.verticies.length);

                expectjs(octogon.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(octogon.verticies).toMatchSnapshot();

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        octogon.rgbColor = newColor;
        expectjs(octogon.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const octogon = new Octogon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(octogon.verticies).toMatchSnapshot();

        const newMat = octogon.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        octogon.modelMatrix = newMat;
        expectjs(octogon.verticies).toMatchSnapshot();
    });
});