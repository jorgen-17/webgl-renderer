import { Mock } from "ts-mocks";
import { Vec3, Mat4 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../../../src/graphics/shape/shape2d/triangle";
import { WebglRendererTestHelper } from "../../../../../spec/helpers/graphics/webglRenderer.spec.helper";
import { triangleSnapshots } from "../../../../snapshots/graphics/shape/shape2d/triangle.snapshot";


describe("triangle:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(triangleSnapshots, "triangle:");
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

                expectjs(triangle.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(triangle.verticies).toMatchSnapshot();


        const newColor = new RGBColor(0.5, 0.5, 0.5);
        triangle.rgbColor = newColor;
        expectjs(triangle.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const triangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(triangle.verticies).toMatchSnapshot();

        const newMat = triangle.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        triangle.modelMatrix = newMat;
        expectjs(triangle.verticies).toMatchSnapshot();
    });
});