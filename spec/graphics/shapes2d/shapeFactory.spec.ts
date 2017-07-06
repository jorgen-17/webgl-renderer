import * as TypeMoq from "typemoq";

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
    const gl = TypeMoq.Mock.ofType<WebGLRenderingContext>(undefined);
    gl.setup(x => x.TRIANGLES).returns(() => 4);
    gl.setup(x => x.TRIANGLE_STRIP).returns(() => 5);
    gl.setup(x => x.TRIANGLE_FAN).returns(() => 6);

    it("creates triangle", () =>
    {
        const triangle = ShapeFactory.createShape(point1, point2, "triangles", color, gl.object);
        expect(3 * Settings.floatsPerVertex).toBe(triangle.verticies.size);
        expect(4).toBe(triangle.glRenderMode);
        expect(color).toBe(triangle.rgbColor);
    });
    it("creates rectangle", () =>
    {
        const rectangle = ShapeFactory.createShape(point1, point2, "rectangles", color, gl.object);
        expect(4 * Settings.floatsPerVertex).toBe(rectangle.verticies.size);
        expect(5).toBe(rectangle.glRenderMode);
        expect(color).toBe(rectangle.rgbColor);
    });
    it("creates hexagon", () =>
    {
        const hexagon = ShapeFactory.createShape(point1, point2, "hexagons", color, gl.object);
        expect(6 * Settings.floatsPerVertex).toBe(hexagon.verticies.size);
        expect(6).toBe(hexagon.glRenderMode);
        expect(color).toBe(hexagon.rgbColor);
    });
    it("creates octogon", () =>
    {
        const octogon = ShapeFactory.createShape(point1, point2, "octogons", color, gl.object);
        expect(8 * Settings.floatsPerVertex).toBe(octogon.verticies.size);
        expect(6).toBe(octogon.glRenderMode);
        expect(color).toBe(octogon.rgbColor);
    });
    it("creates ellipse", () =>
    {
        const ellipse = ShapeFactory.createShape(point1, point2, "ellipses", color, gl.object);
        expect(403 * Settings.floatsPerVertex).toBe(ellipse.verticies.size);
        expect(6).toBe(ellipse.glRenderMode);
        expect(color).toBe(ellipse.rgbColor);
    });
    it("creates unknown shape", () =>
    {
        const createShape = () =>
        {
            const notShape = ShapeFactory.createShape(point1, point2, "notShape" as ShapeMode, color, gl.object);
        };

        expect(createShape).toThrow(new Error("cannot recognize shape type notShape"));
    });
});