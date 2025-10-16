import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { RGBColor } from "../../../../src/graphics/color/rgbColor";
import { Rectangle } from "../../../../src/graphics/shape/rectangle";
import { rectangleSnapshots } from "../../../snapshots/graphics/shape/rectangle.snapshot";
import { Settings } from "../../../../src/settings";

describe("rectangle:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        registerSnapshots(rectangleSnapshots, "rectangle:");
    });

    describe("constructor:", () =>
    {

        it("should initialize basic properties correctly", () =>
        {
            const rectangle = new Rectangle(new Vec3(0, 0), new Vec3(1.0, 1.0), gl, color);

            expect(color).toBe(rectangle.rgbColor);
            expect(gl.TRIANGLES as number).toBe(rectangle.glRenderMode);
        });

        it("should default color if not preovided", () =>
        {
            const square = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl);

            expect(square.rgbColor).toEqual(Settings.defaultColor);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
            {
                const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);

                expect(132).toEqual(rectangle.verticies.length);
                expectjs(rectangle.verticies).toMatchSnapshot();
            });
        });
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(rectangle.verticies).toMatchSnapshot();


        const newColor = new RGBColor(0.5, 0.5, 0.5);
        rectangle.rgbColor = newColor;
        expectjs(rectangle.verticies).toMatchSnapshot();
    });

    it("when modelMatrix is set, it should recalculate verticies", () =>
    {
        const rectangle = new Rectangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, color);
        expectjs(rectangle.verticies).toMatchSnapshot();

        const newMat = rectangle.modelMatrix.rotate(45, -0.4, -0.4, -0.4);
        rectangle.modelMatrix = newMat;
        expectjs(rectangle.verticies).toMatchSnapshot();
    });
});