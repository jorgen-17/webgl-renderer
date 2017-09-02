import { Vec3 } from "cuon-matrix-ts";
import { Mock } from "ts-mocks";

import { Point } from "../../../../src/graphics/shape/shape2d/point";
import { RGBColor } from "../../../../src/graphics/color/rgbColor";

describe("point:", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.POINTS).is(0x0000);
    });

    it("constructor sets up properties correctly", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);

        let point = new Point(location, gl, blue);

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            blue.red,
            blue.green,
            blue.blue
        ]);

        expect(blue).toEqual(point.rgbColor);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });

    it("changing color recalculates verticies", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);
        const green = new RGBColor(0, 1, 0);

        let point = new Point(location, gl, blue);
        point.rgbColor = green;

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            green.red,
            green.green,
            green.blue
        ]);

        expect(green).toEqual(point.rgbColor);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });
});