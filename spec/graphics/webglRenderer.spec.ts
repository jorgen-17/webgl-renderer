import { Mock, Setup } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../src/graphics/precision";
import { RGBColor } from "../../src/graphics/rgbColor";
import { Triangle } from "../../src/graphics/shapes2d/triangle";
import { ShapeFactory } from "../../src/graphics/shapes2d/shapeFactory";
import { Settings } from "../../src/settings";
import { ShapeMode } from "../../src/graphics/shapes2d/shapeMode";
import { WebGLRenderer } from "../../src/graphics/webglRenderer";
import { WebglRendererTestHelper } from "../../specHelpers/graphics/webglRenderer.spec.helper";
import { Shape2d } from "../../src/graphics/shapes2d/shape2d";
import { StringDictionary } from "../../src/utils/dictionary";
import { ClassHelper } from "../../src/utils/classHelper";
import { Line } from "../../src/graphics/shapes2d/line";

describe("ShapeFactory ", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    let glSpiesDictionary: StringDictionary<jasmine.Spy>;
    let gl: WebGLRenderingContext;
    let renderer: WebGLRenderer;

    beforeEach(() =>
    {
        glSpiesDictionary = WebglRendererTestHelper.setupGlMockFunctions(glMock);
        gl = glMock.Object;
        renderer = new WebGLRenderer(800, 600, gl);
    });

    xit("camera can be passed in and is used", () =>
    {
        // do the thing
    });

    xit("settings are used", () =>
    {
        // do the thing
    });

    it("adding verticies to different vertex buffers sends them to webgl", () =>
    {
        const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "points";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies);

        const linesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "lines";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, linesVerticies);

        const lineStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "lineStrip";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineStripVerticies);

        const lineLoopVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "lineLoop";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineLoopVerticies);

        const trianglesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "triangles";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, trianglesVerticies);

        const triangleStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "triangleStrip";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleStripVerticies);

        const triangleFanVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
        renderer.renderMode = "triangleFan";
        WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleFanVerticies);

        renderer.draw();

        const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
        const bufferDataSpy = glSpiesDictionary[bufferDataName];
        const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
        const drawArraysSpy = glSpiesDictionary[drawArraysName];

        expect(gl.bufferData).toHaveBeenCalledTimes(7);
        expect(gl.drawArrays).toHaveBeenCalledTimes(7);

        // expect(bufferDataSpy.calls.all()[0].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     pointsVerticies,
        //     gl.STATIC_DRAW
        // ]);
        expect(drawArraysSpy.calls.all()[0].args).toEqual([
            gl.POINTS,
            0,
            10
        ]);

        // expect(bufferDataSpy.calls.all()[1].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     linesVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[1].args).toEqual([
        //     gl.LINES,
        //     0,
        //     10
        // ]);

        // expect(bufferDataSpy.calls.all()[2].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     lineStripVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[2].args).toEqual([
        //     gl.LINE_STRIP,
        //     0,
        //     10
        // ]);

        // expect(bufferDataSpy.calls.all()[3].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     lineLoopVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[3].args).toEqual([
        //     gl.LINE_LOOP,
        //     0,
        //     10
        // ]);

        // expect(bufferDataSpy.calls.all()[4].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     trianglesVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[4].args).toEqual([
        //     gl.TRIANGLES,
        //     0,
        //     10
        // ]);

        // expect(bufferDataSpy.calls.all()[5].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     triangleStripVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[5].args).toEqual([
        //     gl.TRIANGLE_STRIP,
        //     0,
        //     10
        // ]);

        // expect(bufferDataSpy.calls.all()[6].args).toEqual([
        //     gl.ARRAY_BUFFER,
        //     triangleFanVerticies,
        //     gl.STATIC_DRAW
        // ]);
        // expect(drawArraysSpy.calls.all()[6].args).toEqual([
        //     gl.TRIANGLE_FAN,
        //     0,
        //     10
        // ]);
    });

    describe("shapes", () =>
    {
        const red = new RGBColor(1.0, 0.0, 0.0);
        const orange = new RGBColor(1.0, 0.271, 0.0);
        const yellow = new RGBColor(1.0, 1.0, 0.0);
        const green = new RGBColor(0.0, 1.0, 0.0);
        const cyan = new RGBColor(0.0, 1.0, 1.0);
        let line: Line;
        let redTriangle: Shape2d;
        let orangeSquare: Shape2d;
        let yellowHexagon: Shape2d;
        let greenOctogon: Shape2d;
        let expectedTrianglesStripVertexBuffer: Float32Array;

        beforeEach(() =>
        {
            line = WebglRendererTestHelper.getRandomLine(gl);
            redTriangle = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                "triangles", red, gl);
            orangeSquare = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                "rectangles", orange, gl);
            yellowHexagon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(-1, -1),
                "hexagons", yellow, gl);
            greenOctogon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                "octogons", green, gl);

            let yellowHexVerts = yellowHexagon.verticies;
            let greenOctoVerts = greenOctogon.verticies;
            expectedTrianglesStripVertexBuffer = new Float32Array(yellowHexVerts.length + greenOctoVerts.length);
            expectedTrianglesStripVertexBuffer.set(yellowHexVerts);
            expectedTrianglesStripVertexBuffer.set(greenOctoVerts, yellowHexVerts.length);
        });

        it("addShapeToScene sends their verticies to webgl", () =>
        {
            renderer.addShapeToScene(line);
            renderer.addShapeToScene(redTriangle);
            renderer.addShapeToScene(orangeSquare);
            renderer.addShapeToScene(yellowHexagon);
            renderer.addShapeToScene(greenOctogon);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(4);
            expect(gl.drawArrays).toHaveBeenCalledTimes(4);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                line.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);
            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                redTriangle.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.TRIANGLES,
                0,
                3
            ]);
            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                orangeSquare.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLE_STRIP,
                0,
                4
            ]);
            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                expectedTrianglesStripVertexBuffer,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.TRIANGLE_FAN,
                0,
                14
            ]);
        });

        it("addShapesToScene sends their verticies to webgl", () =>
        {
            renderer.addShapesToScene([
                line,
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon
            ]);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(4);
            expect(gl.drawArrays).toHaveBeenCalledTimes(4);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                line.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);
            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                redTriangle.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.TRIANGLES,
                0,
                3
            ]);
            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                orangeSquare.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLE_STRIP,
                0,
                4
            ]);
            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                expectedTrianglesStripVertexBuffer,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.TRIANGLE_FAN,
                0,
                14
            ]);
        });
    });

    xit("changing point size gets passed into webgl", () =>
    {
        // do the thing
    });

    xit("removing all verticies, removes all verticies", () =>
    {
        // do the thing
    });
});