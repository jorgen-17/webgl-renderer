import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { RGBColor } from "../../../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../../../src/graphics/shape/shape2d/triangle";
import { Line } from "../../../../../src/graphics/shape/shape2d/line";


describe("line:", () =>
{
    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.LINE_STRIP).is(0x0003);
    });

    it("constructor should initialize correctly", () =>
    {
        const point = new Vec3(0, 0);

        const line = new Line(point, gl, color);

        expect(color).toBe(line.rgbColor);
        expect(gl.LINE_STRIP).toBe(line.glRenderMode);

        const expectedVerticies = new Float32Array(
            [point.x, point.y, point.z,
            color.red, color.green, color.blue]);

        expect(expectedVerticies).toEqual(line.verticies);
    });

    it("can addVertex", () =>
    {
        const point1 = new Vec3(0, 0);
        const point2 = new Vec3(0.5, 0.5);

        const line = new Line(point1, gl, color);
        line.addVertex(point2);

        const expectedVerticies = new Float32Array(
            [point1.x, point1.y, point1.z,
            color.red, color.green, color.blue,
            point2.x, point2.y, point2.z,
            color.red, color.green, color.blue]);

        expect(expectedVerticies).toEqual(line.verticies);
    });

    it("when color is set, it should recalculate verticies", () =>
    {
        const point1 = new Vec3(0, 0);
        const point2 = new Vec3(0.5, 0.5);

        const line = new Line(point1, gl, color);
        line.addVertex(point2);

        const expectedVerticies = new Float32Array(
            [point1.x, point1.y, point1.z,
            color.red, color.green, color.blue,
            point2.x, point2.y, point2.z,
            color.red, color.green, color.blue]);

        expect(expectedVerticies).toEqual(line.verticies);

        const color2 = new RGBColor(0.75, 0.75, 0.75);

        const expectedVerticiesColor2 = new Float32Array(
            [point1.x, point1.y, point1.z,
            color2.red, color2.green, color2.blue,
            point2.x, point2.y, point2.z,
            color2.red, color2.green, color2.blue]);

        expect(expectedVerticies).toEqual(line.verticies);
    });
});