import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Hexagon } from "../../../../../src/graphics/shape/shape2d/hexagon";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";
import { hexagonSnapshots } from "../../../../snapshots/graphics/shape/shape2d/hexagon.snapshot";

describe("hexagon:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(hexagonSnapshots, "hexagon:");
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
                expectjs(hexagon.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(hexagon.verticies).toMatchSnapshot();

        const newColor = new RGBColor(0.5, 0.5, 0.5);
        hexagon.rgbColor = newColor;
        expectjs(hexagon.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const hexagon = new Hexagon(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(hexagon.verticies).toMatchSnapshot();

        const newMat = hexagon.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        hexagon.modelMatrix = newMat;
        expectjs(hexagon.verticies).toMatchSnapshot();
    });
});