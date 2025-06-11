import { Mock } from "ts-mocks";
import { Vec3, Vec2 } from "cuon-matrix-ts";

import { Ellipse } from "../../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../../src/graphics/precision";
import { RGBColor } from "../../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../../src/graphics/shape/shape2d/triangle";
import { ShapeFactory2d } from "../../../../src/graphics/shape/shapeFactory2d";
import { Constants } from "../../../../src/constants";
import { ShapeMode } from "../../../../src/graphics/shape/shapeMode";
import { Point } from "../../../../src/graphics/shape/shape2d/point";
import { Settings } from "../../../../src/settings";

describe("shapeFactory3d:", () =>
{
    const point1 = new Vec2(0.5, 0.5);
    const point2 = new Vec2(1, 1);

    const color = new RGBColor(1.0, 1.0, 1.0);
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    let shapeFactory = new ShapeFactory2d();

    beforeAll(() =>
    {
        glMock.setup(x => x.POINTS).is(0x0000);
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);

        glMock.setup(x => x.createBuffer).is(() => {
            const buffer = new Mock<WebGLBuffer>();
            return buffer.Object;
        });
    });

    describe("createPoint", () =>
    {
        it("creates a point", () =>
        {
            const pointSize = 16;
            const point = shapeFactory.createPoint(point1, gl, color, pointSize);
            expect(Constants.floatsPerPointVertex).toBe(point.verticies.length);
            expect(gl.POINTS).toBe(point.glRenderMode);
            expect(color).toBe(point.rgbColor);
            expect(pointSize).toBe(point.pointSize);
        });
        it("uses defaults if they are not passed in", () =>
        {
            const point = shapeFactory.createPoint(point1, gl);
            expect(Constants.floatsPerPointVertex).toBe(point.verticies.length);
            expect(gl.POINTS).toBe(point.glRenderMode);
            expect(Settings.defaultColor).toBe(point.rgbColor);
            expect(Settings.defaultPointSize).toBe(point.pointSize);
        });
    });

    describe("createline", () =>
    {
        it("creates a line", () =>
        {
            const line = shapeFactory.createLine(point1, gl, color);
            expect(Constants.floatsPerPositionColor).toBe(line.verticies.length);
            expect(gl.LINE_STRIP).toBe(line.glRenderMode);
            expect(color).toBe(line.rgbColor);
        });
        it("uses defaults if they are not passed in", () =>
        {
            const line = shapeFactory.createLine(point1, gl, color);
            expect(Constants.floatsPerPositionColor).toBe(line.verticies.length);
            expect(gl.LINE_STRIP).toBe(line.glRenderMode);
            expect(color).toBe(line.rgbColor);
        });
    });

    describe("createShape", () =>
    {
        it("cannot create point", () =>
        {
            const createShape = () =>
            {
                shapeFactory.createShape(point1, point2, ShapeMode.points, gl, color);
            };

            expect(createShape).toThrow(new Error("cannot create a point with this method, please use createPoint"));
        });
        it("cannot create line", () =>
        {
            const createShape = () =>
            {
                shapeFactory.createShape(point1, point2, ShapeMode.lines, gl, color);
            };

            expect(createShape).toThrow(new Error("cannot create a line with this method, please use createLine"));
        });
        it("creates triangle", () =>
        {
            const triangle = shapeFactory.createShape(point1, point2, ShapeMode.triangles, gl, color);
            expect(3 * Constants.floatsPerDynamicVertex).toBe(triangle.verticies.length);
            expect(gl.TRIANGLES).toBe(triangle.glRenderMode);
            expect(color).toBe(triangle.rgbColor);
        });
        it("creates rectangle", () =>
        {
            const rectangle = shapeFactory.createShape(point1, point2, ShapeMode.rectangles, gl, color);
            expect(6 * Constants.floatsPerDynamicVertex).toBe(rectangle.verticies.length);
            expect(gl.TRIANGLES).toBe(rectangle.glRenderMode);
            expect(color).toBe(rectangle.rgbColor);
        });
        it("creates hexagon", () =>
        {
            const hexagon = shapeFactory.createShape(point1, point2, ShapeMode.hexagons, gl, color);
            expect(12 * Constants.floatsPerDynamicVertex).toBe(hexagon.verticies.length);
            expect(gl.TRIANGLES).toBe(hexagon.glRenderMode);
            expect(color).toBe(hexagon.rgbColor);
        });
        it("creates octogon", () =>
        {
            const octogon = shapeFactory.createShape(point1, point2, ShapeMode.octogons, gl, color);
            expect(18 * Constants.floatsPerDynamicVertex).toBe(octogon.verticies.length);
            expect(gl.TRIANGLES).toBe(octogon.glRenderMode);
            expect(color).toBe(octogon.rgbColor);
        });
        it("creates ellipse", () =>
        {
            const ellipse = shapeFactory.createShape(point1, point2, ShapeMode.ellipses, gl, color);
            expect(1206 * Constants.floatsPerDynamicVertex).toBe(ellipse.verticies.length);
            expect(gl.TRIANGLES).toBe(ellipse.glRenderMode);
            expect(color).toBe(ellipse.rgbColor);
        });
        it("cannot create box", () =>
        {
            const createShape = () =>
            {
                shapeFactory.createShape(point1, point2, ShapeMode.box, gl, color);
            };

            expect(createShape).toThrow(new Error("cannot create 3d shape(box), use WebGLRenderer3d instead"));
        });
        it("cannot create unknown shape", () =>
        {
            const createShape = () =>
            {
                const notShape = shapeFactory.createShape(point1, point2, "notShape" as ShapeMode,
                    gl, color);
            };

            expect(createShape).toThrow(new Error("cannot recognize shape type notShape"));
        });
    });
});