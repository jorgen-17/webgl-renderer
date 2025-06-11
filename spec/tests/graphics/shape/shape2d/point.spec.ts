import { Vec3 } from "cuon-matrix-ts";
import { Mock } from "ts-mocks";

import { Point } from "../../../../../src/graphics/shape/shape2d/point";
import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Constants } from "../../../../../src/constants";
import { Settings } from "../../../../../src/settings";

describe("point:", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;
    const pointSize = 10;

    beforeAll(() =>
    {
        glMock.setup(x => x.POINTS).is(0x0000);
    });

    it("constructor sets up properties correctly", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);

        let point = new Point(location, gl, blue, pointSize);

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            blue.red,
            blue.green,
            blue.blue,
            pointSize
        ]);

        expect(blue).toEqual(point.rgbColor);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });

    it("constructor uses defaults if parameters not passed in", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);

        let point = new Point(location, gl);

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            Settings.defaultColor.red,
            Settings.defaultColor.green,
            Settings.defaultColor.blue,
            Settings.defaultPointSize
        ]);

        expect(Settings.defaultColor).toEqual(point.rgbColor);
        expect(Settings.defaultPointSize).toEqual(point.pointSize);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });

    it("changing color recalculates verticies", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);
        const green = new RGBColor(0, 1, 0);

        let point = new Point(location, gl, blue, pointSize);
        point.rgbColor = green;

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            green.red,
            green.green,
            green.blue,
            pointSize
        ]);

        expect(green).toEqual(point.rgbColor);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });

    it("changing pointSize recalculates verticies", () =>
    {
        const location = new Vec3(0, 0);
        const blue = new RGBColor(0, 0, 1);
        const newPointSize = 15;

        let point = new Point(location, gl, blue, pointSize);
        point.pointSize = newPointSize;

        const expectedVertex = new Float32Array([
            location.x,
            location.y,
            location.z,
            blue.red,
            blue.green,
            blue.blue,
            newPointSize
        ]);

        expect(newPointSize).toEqual(point.pointSize);
        expect(expectedVertex).toEqual(point.verticies);
        expect(gl.POINTS).toEqual(point.glRenderMode);
    });
});