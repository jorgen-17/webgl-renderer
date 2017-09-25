import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../src/graphics/shape/shape2d/triangle";
import { ShapeFactory } from "../../../src/graphics/shape/shapeFactory";
import { Constants } from "../../../src/constants";
import { ShapeMode } from "../../../src/graphics/shape/shapeMode";

describe("shapeFactory:", () =>
{
    const point1 = new Vec3(0.5, 0.5);
    const point2 = new Vec3(1, 1);

    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);
    });

    describe("createShape", () =>
    {
        it("creates triangle", () =>
        {
            const triangle = ShapeFactory.createShape(point1, point2, "triangles", gl, color);
            expect(3 * Constants.floatsPerPoint).toBe(triangle.verticies.length);
            expect(gl.TRIANGLES).toBe(triangle.glRenderMode);
            expect(color).toBe(triangle.rgbColor);
        });
        it("creates rectangle", () =>
        {
            const rectangle = ShapeFactory.createShape(point1, point2, "rectangles", gl, color);
            expect(6 * Constants.floatsPerPoint).toBe(rectangle.verticies.length);
            expect(gl.TRIANGLES).toBe(rectangle.glRenderMode);
            expect(color).toBe(rectangle.rgbColor);
        });
        it("creates hexagon", () =>
        {
            const hexagon = ShapeFactory.createShape(point1, point2, "hexagons", gl, color);
            expect(12 * Constants.floatsPerPoint).toBe(hexagon.verticies.length);
            expect(gl.TRIANGLES).toBe(hexagon.glRenderMode);
            expect(color).toBe(hexagon.rgbColor);
        });
        it("creates octogon", () =>
        {
            const octogon = ShapeFactory.createShape(point1, point2, "octogons", gl, color);
            expect(18 * Constants.floatsPerPoint).toBe(octogon.verticies.length);
            expect(gl.TRIANGLES).toBe(octogon.glRenderMode);
            expect(color).toBe(octogon.rgbColor);
        });
        it("creates ellipse", () =>
        {
            const ellipse = ShapeFactory.createShape(point1, point2, "ellipses", gl, color);
            expect(1206 * Constants.floatsPerPoint).toBe(ellipse.verticies.length);
            expect(gl.TRIANGLES).toBe(ellipse.glRenderMode);
            expect(color).toBe(ellipse.rgbColor);
        });
        it("creates box", () =>
        {
            const box = ShapeFactory.createShape(point1, point2, "box", gl, color);
            expect(36 * Constants.floatsPerPoint).toBe(box.verticies.length);
            expect(gl.TRIANGLES).toBe(box.glRenderMode);
            expect(color).toBe(box.rgbColor);
        });
        it("creates unknown shape", () =>
        {
            const createShape = () =>
            {
                const notShape = ShapeFactory.createShape(point1, point2, "notShape" as ShapeMode,
                    gl, color);
            };

            expect(createShape).toThrow(new Error("cannot recognize shape type notShape"));
        });
    });
});