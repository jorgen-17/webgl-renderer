//#region: imports
import { Mock, Setup } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../../src/graphics/shape/shape2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../src/graphics/shape/shape2d/triangle";
import { ShapeFactory } from "../../../src/graphics/shape/shapeFactory";
import { Constants } from "../../../src/constants";
import { ShaderSettings } from "../../../src/shaderSettings";
import { ShapeMode } from "../../../src/graphics/shape/shapeMode";
import { WebGLRenderer } from "../../../src/graphics/webglRenderer";
import { WebglRendererTestHelper } from "../../helpers/graphics/webglRenderer.spec.helper";
import { WebGLRenderer3dMock, WebGLRenderer2dMock } from "../../helpers/graphics/webglRendererMock";
import { DynamicShape } from "../../../src/graphics/shape/dynamicShape";
import { StringDictionary } from "../../../src/utils/dictionary";
import { Line } from "../../../src/graphics/shape/shape2d/line";
import { Camera } from "../../../src/graphics/camera";
import { RenderingOptions } from "../../../src/graphics/renderingOptions";
import { Point } from "../../../src/graphics/shape/shape2d/point";
import { Box } from "../../../src/graphics/shape/shape3d/box";
import { Settings } from "../../../src/settings";
import { BrowserHelper } from "../../../src/utils/browserHelper";
//#endregion: imports

describe("webglRenderer3d:", () =>
{
    //#region: member variables
    const instancedArrayExtensionMock = new Mock<ANGLE_instanced_arrays>();
    const instancedArrayExtension = instancedArrayExtensionMock.Object;
    let instancedArraysSpiesDictionary: StringDictionary<jasmine.Spy>;

    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;
    let glSpiesDictionary: StringDictionary<jasmine.Spy>;

    const canvasMock = new Mock<HTMLCanvasElement>();
    const canvas = canvasMock.Object;
    const width = 800;
    const height = 600;
    const aspectRatio = (width / height);
    let getContextSpy: jasmine.Spy;
    let canvasAddEventListenerSpy: jasmine.Spy;

    const browserHelperMock = new Mock<BrowserHelper>();
    const browserHelper = browserHelperMock.Object;

    const windowMock = new Mock<Window>();
    const leWindow = windowMock.Object;
    const animationFrameRequestId = 666;
    let windowRequestAnimationFrameSpy: jasmine.Spy;
    let windowCancelAnimationFrameSpy: jasmine.Spy;
    let windowAddEventListenerSpy: jasmine.Spy;

    const calcHeightSpy = jasmine.createSpy("calcHeight");
    const calcHeight = (newHeight: number) =>
    {
        calcHeightSpy(newHeight);
        return 0;
    };
    const calcWidthSpy = jasmine.createSpy("calcWidth");
    const calcWidth = (newWidth: number) =>
    {
        calcWidthSpy(newWidth);
        return 0;
    };

    const defaultOptions: RenderingOptions = {
        browserHelper: browserHelper,
        window: leWindow,
        calcHeight: calcHeight,
        calcWidth: calcWidth
    };
    //#endregion: member variables

    //#region: tests
    beforeEach(() =>
    {
        instancedArraysSpiesDictionary =
            WebglRendererTestHelper.setupInstancedArrayMocks(instancedArrayExtensionMock);

        glSpiesDictionary = WebglRendererTestHelper.setupGlMockFunctions(glMock, instancedArrayExtension);

        canvasMock.setup(c => c.width).is(800);
        canvasMock.setup(c => c.height).is(600);
        getContextSpy = canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                        contextAttributes?: WebGLContextAttributes)
                        => WebGLRenderingContext | null>(c => c.getContext)
            .is((contextName: string, contextAttributes: {}) => gl).Spy;
        canvasAddEventListenerSpy = canvasMock.setup(c => c.addEventListener)
            .is((eventName: string) => { /* no-op */ }).Spy;

        browserHelperMock.setup(bh => bh.isIE).is(() => false);
        browserHelperMock.setup(bh => bh.isEdge).is(() => false);

        windowRequestAnimationFrameSpy = windowMock.setup(win => win.requestAnimationFrame)
            .is(() => animationFrameRequestId).Spy;
        windowCancelAnimationFrameSpy = windowMock.setup(win => win.cancelAnimationFrame)
            .is((requestId: number) => { /* no-op */ }).Spy;
        windowAddEventListenerSpy = windowMock.setup(win => win.addEventListener)
            .is((eventName: string) => { /* no-op */ }).Spy;
    });

    describe("shapes:", () =>
    {
        let renderer: WebGLRenderer3dMock;
        const red = new RGBColor(1.0, 0.0, 0.0);
        const orange = new RGBColor(1.0, 0.271, 0.0);
        const yellow = new RGBColor(1.0, 1.0, 0.0);
        const green = new RGBColor(0.0, 1.0, 0.0);
        const cyan = new RGBColor(0.0, 1.0, 1.0);
        const blue = new RGBColor(0.0, 0.0, 1.0);
        let line: Line;
        let orangePoint: Point;
        let redTriangle: DynamicShape;
        let orangeSquare: DynamicShape;
        let yellowHexagon: DynamicShape;
        let greenOctogon: DynamicShape;
        let blueEllipse: DynamicShape;
        let cyanBox: DynamicShape;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

            line = WebglRendererTestHelper.getRandomLine(gl);
            orangePoint = renderer.shapeFactory.createPoint(new Vec3(0.25, 0.25), gl, orange, 4);
            redTriangle = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                ShapeMode.triangles, gl, red);
            orangeSquare = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                ShapeMode.rectangles, gl, orange);
            yellowHexagon = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(-1, -1),
                ShapeMode.hexagons, gl, yellow);
            greenOctogon = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                ShapeMode.octogons, gl, green);
            blueEllipse = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                ShapeMode.ellipses, gl, blue);
            cyanBox = new Box(new Vec3(0, 0), new Vec3(1, -1), gl, cyan);
        });

        describe("addShapeToScene:", () =>
        {
            it("with shapes sends their verticies to webgl", () =>
            {
                renderer.addShapeToScene(orangePoint);
                renderer.addShapeToScene(redTriangle);
                renderer.addShapeToScene(orangeSquare);
                renderer.addShapeToScene(yellowHexagon);
                renderer.addShapeToScene(greenOctogon);
                renderer.addShapeToScene(blueEllipse);
                renderer.addShapeToScene(cyanBox);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(7);
                expect(gl.drawArrays).toHaveBeenCalledTimes(7);

                // orangePoint drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    orangePoint.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    1
                ]);

                // redTriangle drawn
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

                // orangeSquare drawn
                expect(bufferDataSpy.calls.all()[2].args).toEqual([
                    gl.ARRAY_BUFFER,
                    orangeSquare.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[2].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    6
                ]);

                // yellowHexagon drawn
                expect(bufferDataSpy.calls.all()[3].args).toEqual([
                    gl.ARRAY_BUFFER,
                    yellowHexagon.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[3].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    12
                ]);

                // greenOctogon drawn
                expect(bufferDataSpy.calls.all()[4].args).toEqual([
                    gl.ARRAY_BUFFER,
                    greenOctogon.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[4].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    18
                ]);

                // blueEllipse drawn
                expect(bufferDataSpy.calls.all()[5].args).toEqual([
                    gl.ARRAY_BUFFER,
                    blueEllipse.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[5].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    1206
                ]);

                // cyanBox drawn
                expect(bufferDataSpy.calls.all()[6].args).toEqual([
                    gl.ARRAY_BUFFER,
                    cyanBox.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[6].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    36
                ]);
            });
            it("with unrecognized shapemode doesnt draw anything", () =>
            {
                redTriangle.shapeMode = "notShape" as ShapeMode;
                const id = renderer.addShapeToScene(redTriangle);
                expect(id).toEqual("");

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
        });

        describe("addHeterogenoeusShapesArrayToScene:", () =>
        {
            it("with shapes sends their verticies to webgl", () =>
            {
                renderer.addHomogenoeusShapesArrayToScene([
                    orangePoint,
                    orangePoint
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    redTriangle,
                    redTriangle
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    orangeSquare,
                    orangeSquare,
                    orangeSquare
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    yellowHexagon,
                    yellowHexagon
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    greenOctogon
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    blueEllipse,
                    blueEllipse
                ]);
                renderer.addHomogenoeusShapesArrayToScene([
                    cyanBox,
                    cyanBox,
                    cyanBox,
                    cyanBox
                ]);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(7);
                expect(gl.drawArrays).toHaveBeenCalledTimes(7);


                // orangePoints drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangePoint.verticies,
                        orangePoint.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    2
                ]);

                // redTriangle drawn
                expect(bufferDataSpy.calls.all()[1].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        redTriangle.verticies,
                        redTriangle.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[1].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    6
                ]);

                // orangeSquare drawn
                expect(bufferDataSpy.calls.all()[2].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangeSquare.verticies,
                        orangeSquare.verticies,
                        orangeSquare.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[2].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    18
                ]);

                // yellowHexagon drawn
                expect(bufferDataSpy.calls.all()[3].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        yellowHexagon.verticies,
                        yellowHexagon.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[3].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    24
                ]);

                // greenOctogon drawn
                expect(bufferDataSpy.calls.all()[4].args).toEqual([
                    gl.ARRAY_BUFFER,
                    greenOctogon.verticies,
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[4].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    18
                ]);

                // blueEllipse drawn
                expect(bufferDataSpy.calls.all()[5].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        blueEllipse.verticies,
                        blueEllipse.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[5].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    2412
                ]);

                // cyanBox drawn
                expect(bufferDataSpy.calls.all()[6].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        cyanBox.verticies,
                        cyanBox.verticies,
                        cyanBox.verticies,
                        cyanBox.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[6].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    144
                ]);
            });
            it("with unrecognized shapemode doesnt draw anything", () =>
            {
                redTriangle.shapeMode = "notShape" as ShapeMode;
                const id = renderer.addHomogenoeusShapesArrayToScene([redTriangle]);
                expect(id).toEqual([]);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
            it("with empty array doesnt draw anything", () =>
            {
                const id = renderer.addHomogenoeusShapesArrayToScene([]);
                expect(id).toEqual([]);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
        });

        describe("removeShape:", () =>
        {
            it("with shapeMode makes sure it doesnt get drawn", () =>
            {
                let shapeIds: Array<string> = renderer.addHeterogenoeusShapesArrayToScene([
                    orangePoint,
                    redTriangle,
                    orangeSquare,
                    yellowHexagon,
                    greenOctogon,
                ]);
                renderer.mockDraw();
                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];
                expect(gl.bufferData).toHaveBeenCalledTimes(5);
                expect(gl.drawArrays).toHaveBeenCalledTimes(5);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeIds[0], orangePoint.shapeMode);
                renderer.removeShape(shapeIds[1], redTriangle.shapeMode);
                renderer.removeShape(shapeIds[2], orangeSquare.shapeMode);
                renderer.removeShape(shapeIds[3], yellowHexagon.shapeMode);
                renderer.removeShape(shapeIds[4], greenOctogon.shapeMode);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);

                shapeIds = renderer.addHomogenoeusShapesArrayToScene([
                    blueEllipse
                ]);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeIds[0], blueEllipse.shapeMode);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);

                let shapeId = renderer.addShapeToScene(cyanBox);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeId, cyanBox.shapeMode);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
            it("without shapeMode makes sure it doesnt get drawn", () =>
            {
                let shapeIds: Array<string> = renderer.addHeterogenoeusShapesArrayToScene([
                    orangePoint,
                    redTriangle,
                    orangeSquare,
                    yellowHexagon,
                    greenOctogon,
                ]);
                renderer.mockDraw();
                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];
                expect(gl.bufferData).toHaveBeenCalledTimes(5);
                expect(gl.drawArrays).toHaveBeenCalledTimes(5);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeIds[0]);
                renderer.removeShape(shapeIds[1]);
                renderer.removeShape(shapeIds[2]);
                renderer.removeShape(shapeIds[3]);
                renderer.removeShape(shapeIds[4]);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);

                shapeIds = renderer.addHomogenoeusShapesArrayToScene([
                    blueEllipse
                ]);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeIds[0]);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);

                let shapeId = renderer.addShapeToScene(cyanBox);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                renderer.removeShape(shapeId);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
            it("with wrong id returns false, but true if successful", () =>
            {
                let id = renderer.addShapeToScene(redTriangle);
                renderer.mockDraw();
                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);
                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                let wasRemoved = renderer.removeShape("someOtherId");
                expect(wasRemoved).toBe(false);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);

                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();
                wasRemoved = renderer.removeShape(id);
                expect(wasRemoved).toBe(true);
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(0);
                expect(gl.drawArrays).toHaveBeenCalledTimes(0);
            });
        });

        describe("updateShapeColor:", () =>
        {
            let orangePoint2: Point;
            let redTriangle2: DynamicShape;
            let orangeSquare2: DynamicShape;
            let yellowHexagon2: DynamicShape;
            let greenOctogon2: DynamicShape;
            let blueEllipse2: DynamicShape;
            let cyanBox2: DynamicShape;

            let greenPoint: Point;
            let blueTriangle: DynamicShape;
            let redSquare: DynamicShape;
            let greenHexagon: DynamicShape;
            let cyanOctogon: DynamicShape;
            let orangeEllipse: DynamicShape;
            let yellowBox: DynamicShape;

            beforeAll(() =>
            {
                orangePoint2 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, orange);
                redTriangle2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.triangles, gl, red);
                orangeSquare2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.rectangles, gl, orange);
                yellowHexagon2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.hexagons, gl, yellow);
                greenOctogon2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.octogons, gl, green);
                blueEllipse2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.ellipses, gl, blue);
                cyanBox2 = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.box, gl, cyan);

                greenPoint = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green);
                blueTriangle = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.triangles, gl, blue);
                redSquare = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.rectangles, gl, red);
                greenHexagon = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.hexagons, gl, green);
                cyanOctogon = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.octogons, gl, cyan);
                orangeEllipse = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.ellipses, gl, orange);
                yellowBox = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                    ShapeMode.box, gl, yellow);
            });

            let ids: Array<string> = [];

            beforeEach(() =>
            {
                renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

                ids = renderer.addHeterogenoeusShapesArrayToScene([
                    orangePoint,
                    orangePoint2,
                    redTriangle,
                    redTriangle2,
                    orangeSquare,
                    orangeSquare2,
                    yellowHexagon,
                    yellowHexagon2,
                    greenOctogon,
                    greenOctogon2,
                    blueEllipse,
                    blueEllipse2,
                    cyanBox,
                    cyanBox2
                ]);
            });

            it("with shapeMode changes the color of the shape drawn", () =>
            {
                renderer.updateShapeColor(ids[1], green, orangePoint2.shapeMode);
                renderer.updateShapeColor(ids[3], blue, redTriangle2.shapeMode);
                renderer.updateShapeColor(ids[5], red, orangeSquare2.shapeMode);
                renderer.updateShapeColor(ids[7], green, yellowHexagon2.shapeMode);
                renderer.updateShapeColor(ids[9], cyan, greenOctogon2.shapeMode);
                renderer.updateShapeColor(ids[11], orange, blueEllipse2.shapeMode);
                renderer.updateShapeColor(ids[13], yellow, cyanBox2.shapeMode);

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(7);
                expect(gl.drawArrays).toHaveBeenCalledTimes(7);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangePoint.verticies,
                        greenPoint.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    2
                ]);

                // triangles drawn
                expect(bufferDataSpy.calls.all()[1].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        redTriangle.verticies,
                        blueTriangle.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[1].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    6
                ]);

                // rectangles drawn
                expect(bufferDataSpy.calls.all()[2].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangeSquare.verticies,
                        redSquare.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[2].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    12
                ]);

                // hexagons drawn
                expect(bufferDataSpy.calls.all()[3].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        yellowHexagon.verticies,
                        greenHexagon.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[3].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    24
                ]);

                // octogons drawn
                expect(bufferDataSpy.calls.all()[4].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        greenOctogon.verticies,
                        cyanOctogon.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[4].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    36
                ]);

                // ellipses drawn
                expect(bufferDataSpy.calls.all()[5].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        blueEllipse.verticies,
                        orangeEllipse.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[5].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    2412
                ]);


                // boxes drawn
                expect(bufferDataSpy.calls.all()[6].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        cyanBox.verticies,
                        yellowBox.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[6].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    72
                ]);
            });
            it("without shapeMode changes the color of the shape drawn", () =>
            {
                renderer.updateShapeColor(ids[1], green);
                renderer.updateShapeColor(ids[3], blue);
                renderer.updateShapeColor(ids[5], red);
                renderer.updateShapeColor(ids[7], green);
                renderer.updateShapeColor(ids[9], cyan);
                renderer.updateShapeColor(ids[11], orange);
                renderer.updateShapeColor(ids[13], yellow);

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];
                renderer.mockDraw();
                expect(gl.bufferData).toHaveBeenCalledTimes(7);
                expect(gl.drawArrays).toHaveBeenCalledTimes(7);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangePoint.verticies,
                        greenPoint.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    2
                ]);

                // triangles drawn
                expect(bufferDataSpy.calls.all()[1].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        redTriangle.verticies,
                        blueTriangle.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[1].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    6
                ]);

                // rectangles drawn
                expect(bufferDataSpy.calls.all()[2].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        orangeSquare.verticies,
                        redSquare.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[2].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    12
                ]);

                // hexagons drawn
                expect(bufferDataSpy.calls.all()[3].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        yellowHexagon.verticies,
                        greenHexagon.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[3].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    24
                ]);

                // octogons drawn
                expect(bufferDataSpy.calls.all()[4].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        greenOctogon.verticies,
                        cyanOctogon.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[4].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    36
                ]);

                // ellipses drawn
                expect(bufferDataSpy.calls.all()[5].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        blueEllipse.verticies,
                        orangeEllipse.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[5].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    2412
                ]);

                // boxes drawn
                expect(bufferDataSpy.calls.all()[6].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        cyanBox.verticies,
                        yellowBox.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[6].args).toEqual([
                    gl.TRIANGLES,
                    0,
                    72
                ]);
            });
            it("with wrong id returns false, but true if successful", () =>
            {
                let id = renderer.addShapeToScene(redTriangle);
                let wasRemoved = renderer.updateShapeColor("someOtherId", blue);
                expect(wasRemoved).toBe(false);
                wasRemoved = renderer.updateShapeColor(id, blue);
                expect(wasRemoved).toBe(true);
            });
        });
    });
    //#endregion: tests
});