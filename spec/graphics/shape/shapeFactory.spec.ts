import { Mock } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../src/graphics/shape/shape2d/triangle";
import { ShapeFactory } from "../../../src/graphics/shape/shapeFactory";
import { Constants } from "../../../src/constants";
import { Shape2dMode } from "../../../src/graphics/shape/shape2d/shape2dMode";
import { Shape3dMode } from "../../../src/graphics/shape/shape3d/shape3dMode";

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

    describe("createShape2d", () =>
    {
        it("creates triangle", () =>
        {
            const triangle = ShapeFactory.createShape2d(point1, point2, "triangles", gl, color);
            expect(3 * Constants.floatsPerVertex).toBe(triangle.verticies.length);
            expect(gl.TRIANGLES).toBe(triangle.glRenderMode);
            expect(color).toBe(triangle.rgbColor);
        });
        it("creates rectangle", () =>
        {
            const rectangle = ShapeFactory.createShape2d(point1, point2, "rectangles", gl, color);
            expect(6 * Constants.floatsPerVertex).toBe(rectangle.verticies.length);
            expect(gl.TRIANGLES).toBe(rectangle.glRenderMode);
            expect(color).toBe(rectangle.rgbColor);
        });
        it("creates hexagon", () =>
        {
            const hexagon = ShapeFactory.createShape2d(point1, point2, "hexagons", gl, color);
            expect(12 * Constants.floatsPerVertex).toBe(hexagon.verticies.length);
            expect(gl.TRIANGLES).toBe(hexagon.glRenderMode);
            expect(color).toBe(hexagon.rgbColor);
        });
        it("creates octogon", () =>
        {
            const octogon = ShapeFactory.createShape2d(point1, point2, "octogons", gl, color);
            expect(18 * Constants.floatsPerVertex).toBe(octogon.verticies.length);
            expect(gl.TRIANGLES).toBe(octogon.glRenderMode);
            expect(color).toBe(octogon.rgbColor);
        });
        it("creates ellipse", () =>
        {
            const ellipse = ShapeFactory.createShape2d(point1, point2, "ellipses", gl, color);
            expect(1206 * Constants.floatsPerVertex).toBe(ellipse.verticies.length);
            expect(gl.TRIANGLES).toBe(ellipse.glRenderMode);
            expect(color).toBe(ellipse.rgbColor);
        });
        it("creates unknown shape2d", () =>
        {
            const createShape = () =>
            {
                const notShape = ShapeFactory.createShape2d(point1, point2, "notShape2d" as Shape2dMode,
                    gl, color);
            };

            expect(createShape).toThrow(new Error("cannot recognize 2d shape type notShape2d"));
        });
    });

    describe("createShape3d", () =>
    {
        it("creates box", () =>
        {
            const box = ShapeFactory.createShape3d(point1, point2, "box", gl, color);
            expect(36 * Constants.floatsPerVertex).toBe(box.verticies.length);
            expect(gl.TRIANGLES).toBe(box.glRenderMode);
            expect(color).toBe(box.rgbColor);
        });
        it("creates unknown shape3d", () =>
        {
            const createShape = () =>
            {
                const notShape = ShapeFactory.createShape3d(point1, point2, "notShape3d" as Shape3dMode,
                    gl, color);
            };

            expect(createShape).toThrow(new Error("cannot recognize 3d shape type notShape3d"));
        });
    });

});