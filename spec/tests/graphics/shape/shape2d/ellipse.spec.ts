import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { Ellipse } from "../../../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../../../src/graphics/precision";
import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { WebglRendererTestHelper } from "../../../../helpers/graphics/webglRenderer.spec.helper";
import { ellipseSnapshots } from "../../../../snapshots/graphics/shape/shape2d/ellipse.snapshot";
import { Constants } from "../../../../../src/constants";
import { Settings } from "../../../../../src/settings";

describe("ellipse:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(ellipseSnapshots, "ellipse:");
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

        it("should default color if not preovided", () =>
        {
            const ellipse = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                Precision.Low);

            expect(ellipse.rgbColor).toEqual(Settings.defaultColor);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);

                expect(660).toEqual(circle.verticies.length);
                expectjs(circle.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl,
                    Precision.Low, color);
        expectjs(circle.verticies).toMatchSnapshot();


        const newColor = new RGBColor(0.5, 0.5, 0.5);
        circle.rgbColor = newColor;
        expectjs(circle.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, Precision.Low, color);
        expectjs(circle.verticies).toMatchSnapshot();

        const newMat = circle.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        circle.modelMatrix = newMat;
        expectjs(circle.verticies).toMatchSnapshot();
    });
});