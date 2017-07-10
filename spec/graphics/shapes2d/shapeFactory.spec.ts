import { Mock } from "ts-mocks";

import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";
import { Triangle } from "../../../src/graphics/shapes2d/triangle";
import { ShapeFactory } from "../../../src/graphics/shapes2d/shapeFactory";
import { Settings } from "../../../src/settings";
import { ShapeMode } from "../../../src/graphics/shapes2d/shapeMode";

describe("ShapeFactory ", () =>
{
    const point1 = new Vec3(0.5, 0.5);
    const point2 = new Vec3(1, 1);

    const color = new RGBColor(1.0, 1.0, 1.0);
    const gl = new Mock<WebGLRenderingContext>();

    beforeAll(() =>
    {
        gl.setup(x => x.TRIANGLES).is(0x0004);
        gl.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        gl.setup(x => x.TRIANGLE_FAN).is(0x0006);
    });

    it("creates triangle", () =>
    {
        const triangle = ShapeFactory.createShape(point1, point2, "triangles", color, gl.Object);
        expect(3 * Settings.floatsPerVertex).toBe(triangle.verticies.length);
        expect(4).toBe(triangle.glRenderMode);
        expect(color).toBe(triangle.rgbColor);
    });
    it("creates rectangle", () =>
    {
        const rectangle = ShapeFactory.createShape(point1, point2, "rectangles", color, gl.Object);
        expect(4 * Settings.floatsPerVertex).toBe(rectangle.verticies.length);
        expect(5).toBe(rectangle.glRenderMode);
        expect(color).toBe(rectangle.rgbColor);
    });
    it("creates hexagon", () =>
    {
        const hexagon = ShapeFactory.createShape(point1, point2, "hexagons", color, gl.Object);
        expect(6 * Settings.floatsPerVertex).toBe(hexagon.verticies.length);
        expect(6).toBe(hexagon.glRenderMode);
        expect(color).toBe(hexagon.rgbColor);
    });
    it("creates octogon", () =>
    {
        const octogon = ShapeFactory.createShape(point1, point2, "octogons", color, gl.Object);
        expect(8 * Settings.floatsPerVertex).toBe(octogon.verticies.length);
        expect(6).toBe(octogon.glRenderMode);
        expect(color).toBe(octogon.rgbColor);
    });
    it("creates ellipse", () =>
    {
        const ellipse = ShapeFactory.createShape(point1, point2, "ellipses", color, gl.Object);
        expect(403 * Settings.floatsPerVertex).toBe(ellipse.verticies.length);
        expect(6).toBe(ellipse.glRenderMode);
        expect(color).toBe(ellipse.rgbColor);
    });
    it("creates unknown shape", () =>
    {
        const createShape = () =>
        {
            const notShape = ShapeFactory.createShape(point1, point2, "notShape" as ShapeMode, color, gl.Object);
        };

        expect(createShape).toThrow(new Error("cannot recognize shape type notShape"));
    });
});