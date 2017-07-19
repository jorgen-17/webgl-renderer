import { Mock, Setup } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../src/graphics/precision";
import { RGBColor } from "../../src/graphics/rgbColor";
import { Triangle } from "../../src/graphics/shapes2d/triangle";
import { ShapeFactory } from "../../src/graphics/shapes2d/shapeFactory";
import { Settings, ShaderSettings } from "../../src/settings";
import { ShapeMode } from "../../src/graphics/shapes2d/shapeMode";
import { WebGLRenderer } from "../../src/graphics/webglRenderer";
import { WebglRendererTestHelper } from "../../specHelpers/graphics/webglRenderer.spec.helper";
import { Shape2d } from "../../src/graphics/shapes2d/shape2d";
import { StringDictionary } from "../../src/utils/dictionary";
import { ClassHelper } from "../../specHelpers/classHelper";
import { Line } from "../../src/graphics/shapes2d/line";
import { RenderMode } from "../../src/graphics/renderModeMapper";
import { Camera } from "../../src/graphics/camera";
import { DrawingSettings } from "../../src/graphics/drawingSettings";
import { Point } from "../../src/graphics/shapes2d/point";

describe("webglRenderer:", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    let glSpiesDictionary: StringDictionary<jasmine.Spy>;
    const gl = glMock.Object;
    let renderer: WebGLRenderer;

    beforeEach(() =>
    {
        glSpiesDictionary = WebglRendererTestHelper.setupGlMockFunctions(glMock);
    });

    it("settings are used", () =>
    {
        const trianleMode: RenderMode = "triangles";
        const backgroundColor = new RGBColor(0.666, 0.666, 0.666);
        const pointSize = 15;
        const settings: DrawingSettings = {
            renderMode: trianleMode,
            backgroundColor: backgroundColor,
            pointSize: pointSize
        };

        const eyePosition = new Vec3(1, 1, 1);
        const lookAtPoint = new Vec3(1, 1, -2);
        const upPosition = new Vec3(1, 2, 1);
        const camera = new Camera(eyePosition, lookAtPoint, upPosition);

        renderer = new WebGLRenderer(800, 600, gl, settings, camera);

        expect(trianleMode).toBe(renderer.renderMode);
        expect(backgroundColor).toBe(renderer.backgroundColor);
        expect(pointSize).toBe(renderer.pointSize);
        expect(camera.viewMatrix).toBe(renderer.camera.viewMatrix);
    });

    describe("renderMode:", () =>
    {
        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);
        });

        it("is set-able and get-able", () =>
        {
            const trianleMode: RenderMode = "triangles";
            renderer.renderMode = trianleMode;

            expect(trianleMode).toBe(renderer.renderMode);
        });

        it("determines the default renderMode used when addXYZPointToScene is called", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            renderer.renderMode = "points";
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies);

            const linesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            renderer.renderMode = "lines";
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, linesVerticies);

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            renderer.draw();

            expect(gl.bufferData).toHaveBeenCalledTimes(2);
            expect(gl.drawArrays).toHaveBeenCalledTimes(2);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                pointsVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                linesVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINES,
                0,
                10
            ]);

        });
    });

    describe("backgroundColor:", () =>
    {
        const backgroundColor = new RGBColor(0.666, 0.666, 0.666);

        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);
        });

        it("is set-able and get-able", () =>
        {
            renderer.backgroundColor = backgroundColor;

            expect(backgroundColor).toBe(renderer.backgroundColor);
        });

        it("sets the color that the renderer passes in when calling gl.clearColor", () =>
        {
            renderer.draw();

            const clearColorName = ClassHelper.getMethodName(() => gl.clearColor);
            const clearColorSpy = glSpiesDictionary[clearColorName];

            expect(gl.clearColor).toHaveBeenCalledTimes(1);
            expect(clearColorSpy.calls.all()[0].args).toEqual([
                Settings.defaultBackgroundColor.red,
                Settings.defaultBackgroundColor.green,
                Settings.defaultBackgroundColor.blue,
                Settings.defaultBackgroundAlpha,
            ]);
            clearColorSpy.calls.reset();

            renderer.backgroundColor = backgroundColor;

            renderer.draw();

            expect(gl.clearColor).toHaveBeenCalledTimes(1);
            expect(clearColorSpy.calls.all()[0].args).toEqual([
                backgroundColor.red,
                backgroundColor.green,
                backgroundColor.blue,
                Settings.defaultBackgroundAlpha,
            ]);
        });
    });

    describe("pointSize:", () =>
    {
        const pointSize = 15;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);
        });

        it("is set-able and get-able", () =>
        {
            renderer.pointSize = pointSize;

            expect(pointSize).toBe(renderer.pointSize);
        });

        it("sets the uniform variable u_pointSize", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            renderer.draw();

            const uniform1fName = ClassHelper.getMethodName(() => gl.uniform1f);
            const uniform1fSpy = glSpiesDictionary[uniform1fName];

            expect(gl.uniform1f).toHaveBeenCalledTimes(1);
            expect(uniform1fSpy.calls.all()[0].args).toEqual([
                1,
                Settings.defaultPointSize
            ]);
            uniform1fSpy.calls.reset();

            renderer.pointSize = pointSize;

            renderer.draw();

            expect(gl.uniform1f).toHaveBeenCalledTimes(1);
            expect(uniform1fSpy.calls.all()[0].args).toEqual([
                1,
                pointSize
            ]);
        });
    });

    describe("camera:", () =>
    {
        const eyePosition = new Vec3(1, 1, 1);
        const lookAtPoint = new Vec3(1, 1, -2);
        const upPosition = new Vec3(1, 2, 1);
        const camera = new Camera(eyePosition, lookAtPoint, upPosition);

        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);
        });

        it("is set-able and get-able", () =>
        {
            renderer.camera = camera;

            expect(camera.viewMatrix).toBe(renderer.camera.viewMatrix);
        });

        it("sets the uniform variable u_viewMatrix", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            renderer.draw();

            const uniformMatrix4fvName = ClassHelper.getMethodName(() => gl.uniformMatrix4fv);
            const uniformMatrix4fvNameSpy = glSpiesDictionary[uniformMatrix4fvName];

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                new Camera().viewMatrix
            ]);
            uniformMatrix4fvNameSpy.calls.reset();

            renderer.camera = camera;

            renderer.draw();

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                camera.viewMatrix
            ]);
        });
    });

    describe("verticies:", () =>
    {
        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);
        });

        it("addXYZPointToScene to different vertex buffers sends verticies to webgl", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const linesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, linesVerticies, "lines", gl);

            const lineStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineStripVerticies, "lineStrip", gl);

            const lineLoopVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineLoopVerticies, "lineLoop", gl);

            const trianglesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, trianglesVerticies, "triangles", gl);

            const triangleStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleStripVerticies, "triangleStrip", gl);

            const triangleFanVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleFanVerticies, "triangleFan", gl);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(7);
            expect(gl.drawArrays).toHaveBeenCalledTimes(7);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                pointsVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                linesVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINES,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                lineStripVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                lineLoopVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.LINE_LOOP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[4].args).toEqual([
                gl.ARRAY_BUFFER,
                trianglesVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[4].args).toEqual([
                gl.TRIANGLES,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[5].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleStripVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[5].args).toEqual([
                gl.TRIANGLE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[6].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleFanVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[6].args).toEqual([
                gl.TRIANGLE_FAN,
                0,
                10
            ]);
        });

        it("removeAllVeriticies removes all verticies added as verticies", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const linesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, linesVerticies, "lines", gl);

            const lineStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineStripVerticies, "lineStrip", gl);

            const lineLoopVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, lineLoopVerticies, "lineLoop", gl);

            const trianglesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, trianglesVerticies, "triangles", gl);

            const triangleStripVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleStripVerticies, "triangleStrip", gl);

            const triangleFanVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, triangleFanVerticies, "triangleFan", gl);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(7);
            expect(gl.drawArrays).toHaveBeenCalledTimes(7);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                pointsVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                linesVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINES,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                lineStripVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                lineLoopVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.LINE_LOOP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[4].args).toEqual([
                gl.ARRAY_BUFFER,
                trianglesVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[4].args).toEqual([
                gl.TRIANGLES,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[5].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleStripVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[5].args).toEqual([
                gl.TRIANGLE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[6].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleFanVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[6].args).toEqual([
                gl.TRIANGLE_FAN,
                0,
                10
            ]);
            bufferDataSpy.calls.reset();
            drawArraysSpy.calls.reset();

            renderer.removeAllVeriticies();

            renderer.draw();

            expect(gl.bufferData).toHaveBeenCalledTimes(0);
            expect(gl.drawArrays).toHaveBeenCalledTimes(0);
        });
    });

    describe("shapes:", () =>
    {
        const red = new RGBColor(1.0, 0.0, 0.0);
        const orange = new RGBColor(1.0, 0.271, 0.0);
        const yellow = new RGBColor(1.0, 1.0, 0.0);
        const green = new RGBColor(0.0, 1.0, 0.0);
        const cyan = new RGBColor(0.0, 1.0, 1.0);
        const blue = new RGBColor(0.0, 0.0, 1.0);
        let line: Line;
        let point: Point;
        let redTriangle: Shape2d;
        let orangeSquare: Shape2d;
        let yellowHexagon: Shape2d;
        let greenOctogon: Shape2d;
        let blueEllipse: Shape2d;
        let triangleVerticies: Float32Array;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer(800, 600, gl);

            line = WebglRendererTestHelper.getRandomLine(gl);
            point = WebglRendererTestHelper.getRandomPoint(gl);
            redTriangle = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                "triangles", gl, red);
            orangeSquare = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                "rectangles", gl, orange);
            yellowHexagon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(-1, -1),
                "hexagons", gl, yellow);
            greenOctogon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                "octogons", gl, green);
            blueEllipse = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                "ellipses", gl, blue);

            triangleVerticies = WebglRendererTestHelper.concatMultipleFloat32Arrays([
                redTriangle.verticies,
                orangeSquare.verticies,
                yellowHexagon.verticies,
                greenOctogon.verticies,
                blueEllipse.verticies
            ]);
        });

        it("addShapeToScene sends their verticies to webgl", () =>
        {
            renderer.addShapeToScene(point);
            renderer.addShapeToScene(line);
            renderer.addShapeToScene(redTriangle);
            renderer.addShapeToScene(orangeSquare);
            renderer.addShapeToScene(yellowHexagon);
            renderer.addShapeToScene(greenOctogon);
            renderer.addShapeToScene(blueEllipse);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(3);
            expect(gl.drawArrays).toHaveBeenCalledTimes(3);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                point.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                1
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                line.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLES,
                0,
                1245
            ]);
        });

        it("addShapesToScene sends their verticies to webgl", () =>
        {
            renderer.addShapesToScene([
                line,
                point,
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon,
                blueEllipse
            ]);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(3);
            expect(gl.drawArrays).toHaveBeenCalledTimes(3);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                point.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                1
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                line.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLES,
                0,
                1245
            ]);
        });

        it("removing all verticies, removes all verticies added as shapes", () =>
        {
            renderer.addShapesToScene([
                line,
                point,
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon,
                blueEllipse
            ]);

            renderer.draw();

            const bufferDataName = ClassHelper.getMethodName(() => gl.bufferData);
            const bufferDataSpy = glSpiesDictionary[bufferDataName];
            const drawArraysName = ClassHelper.getMethodName(() => gl.drawArrays);
            const drawArraysSpy = glSpiesDictionary[drawArraysName];

            expect(gl.bufferData).toHaveBeenCalledTimes(3);
            expect(gl.drawArrays).toHaveBeenCalledTimes(3);

            expect(bufferDataSpy.calls.all()[0].args).toEqual([
                gl.ARRAY_BUFFER,
                point.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[0].args).toEqual([
                gl.POINTS,
                0,
                1
            ]);

            expect(bufferDataSpy.calls.all()[1].args).toEqual([
                gl.ARRAY_BUFFER,
                line.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[1].args).toEqual([
                gl.LINE_STRIP,
                0,
                10
            ]);

            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                triangleVerticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLES,
                0,
                1245
            ]);
            bufferDataSpy.calls.reset();
            drawArraysSpy.calls.reset();

            renderer.removeAllVeriticies();

            renderer.draw();

            expect(gl.bufferData).toHaveBeenCalledTimes(0);
            expect(gl.drawArrays).toHaveBeenCalledTimes(0);
        });
    });

    describe("when uniforms not found in shader, " +
        "draw throws and createUniforNotFoundErrorMessage " +
        "generates the correct error message", () =>
    {
        const getUniformLocationName = ClassHelper.getMethodName(() => gl.getUniformLocation);

        it("when u_pointSize is missing and u_viewMatrix is found", () =>
        {
            let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) =>
            {
                if (name === ShaderSettings.pointSizeUniformName)
                {
                    return 0;
                }
                if (name === ShaderSettings.viewMatrixUniformName)
                {
                    return 1;
                }
                return null;
            }).Spy;

            renderer = new WebGLRenderer(800, 600, gl);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 0\n` +
                `\t${ShaderSettings.viewMatrixUniformName}: 1\n`;
            expect(() => renderer.draw()).toThrow(expectedErrorString);
        });

        it("when u_pointSize is found and u_viewMatrix is missing", () =>
        {
            let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) =>
            {
                if (name === ShaderSettings.pointSizeUniformName)
                {
                    return 1;
                }
                if (name === ShaderSettings.viewMatrixUniformName)
                {
                    return 0;
                }
                return null;
            }).Spy;

            renderer = new WebGLRenderer(800, 600, gl);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 1\n` +
                `\t${ShaderSettings.viewMatrixUniformName}: 0\n`;
            expect(() => renderer.draw()).toThrow(expectedErrorString);
        });

        it("when u_pointSize is missing and u_viewMatrix is missing", () =>
        {
            let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) =>
            {
                if (name === ShaderSettings.pointSizeUniformName)
                {
                    return 0;
                }
                if (name === ShaderSettings.viewMatrixUniformName)
                {
                    return 0;
                }
                return null;
            }).Spy;

            renderer = new WebGLRenderer(800, 600, gl);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 0\n` +
                `\t${ShaderSettings.viewMatrixUniformName}: 0\n`;
            expect(() => renderer.draw()).toThrow(expectedErrorString);
        });
    });

    describe("catching gl errors:", () =>
    {
        afterEach(() =>
        {
            const getShaderParameterName = ClassHelper.getMethodName(() => gl.getShaderParameter);
            glSpiesDictionary[getShaderParameterName] = glMock.setup(x => x.getShaderParameter)
                .is((shader: WebGLShader, pName: number) => true).Spy;

            const getProgramParameterName = ClassHelper.getMethodName(() => gl.getProgramParameter);
            glSpiesDictionary[getProgramParameterName] = glMock.setup(x => x.getProgramParameter)
                .is((shader: WebGLShader, pName: number) => true).Spy;

            const createProgramName = ClassHelper.getMethodName(() => gl.createProgram);
            const shaderProgram = new Mock<WebGLProgram>();
            glSpiesDictionary[createProgramName] = glMock.setup(x => x.createProgram)
                .is(() => shaderProgram.Object).Spy;
        });

        it("when shader not able to compile, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.getShaderParameter)
            .is((shader: WebGLShader, pName: number) => false);

            const expectedErrorString =
            "could not compile shader, shader info log: theres some shady shit going on";
            expect(() => renderer = new WebGLRenderer(800, 600, gl))
                .toThrow(expectedErrorString);
        });

        it("when gl.createProgram returns null, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.createProgram).is(() => null);

            const expectedErrorString = "could not create shader program";
            expect(() => renderer = new WebGLRenderer(800, 600, gl))
                .toThrow(expectedErrorString);
        });

        it("when shader program not able to link, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.getProgramParameter)
            .is((shader: WebGLShader, pName: number) => false);

            const expectedErrorString = "could not link shader program";
            expect(() => renderer = new WebGLRenderer(800, 600, gl))
                .toThrow(expectedErrorString);
        });
    });
});