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
import { WebGLRenderer3dMock } from "../../helpers/graphics/webglRendererMock";
import { DynamicShape } from "../../../src/graphics/shape/dynamicShape";
import { StringDictionary } from "../../../src/utils/dictionary";
import { Line } from "../../../src/graphics/shape/shape2d/line";
import { Camera } from "../../../src/graphics/camera";
import { RenderingOptions } from "../../../src/graphics/renderingOptions";
import { Point } from "../../../src/graphics/shape/shape2d/point";
import { Settings } from "../../../src/settings";
import { BrowserHelper } from "../../../src/utils/browserHelper";
//#endregion: imports

describe("webglRenderer:", () =>
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
        return 10;
    };
    const calcWidthSpy = jasmine.createSpy("calcWidth");
    const calcWidth = (newWidth: number) =>
    {
        calcWidthSpy(newWidth);
        return 10;
    };

    const defaultOptions: RenderingOptions = {
        browserHelper: browserHelper,
        window: leWindow
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

    describe("constructor:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();

            calcHeightSpy.calls.reset();
            calcWidthSpy.calls.reset();
        });
        it("settings are used when passed in", () =>
        {
            const backgroundColor = new RGBColor(0.666, 0.666, 0.666);
            const pointSize = 15;
            const isFullScreen = true;
            const gpuMemoryEffeciency = true;
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                backgroundColor: backgroundColor,
                window: leWindow,
                fullscreen: isFullScreen,
                calcWidth: calcWidth,
                calcHeight: calcHeight,
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(backgroundColor).toEqual(renderer.backgroundColor);
            expect(isFullScreen).toEqual(renderer.isFullscreen);

            expect(calcWidthSpy).toHaveBeenCalledTimes(2);
            expect(calcHeightSpy).toHaveBeenCalledTimes(2);
        });
        it("defaults are used when settings not passed in", () =>
        {
            const defaultCamera = new Camera(aspectRatio);

            let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

            expect(Settings.defaultBackgroundColor).toEqual(renderer.backgroundColor);

        });
        it("camera aspectRatioused when passed in", () =>
        {
            const eyePosition = new Vec3(1, 1, 1);
            const lookAtPoint = new Vec3(1, 1, -2);
            const upPosition = new Vec3(1, 2, 1);
            const camera = new Camera(aspectRatio);

            const options: RenderingOptions = {
                browserHelper: browserHelper,
                camera: camera,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(camera.vpMatrix.elements).toEqual(renderer.camera.vpMatrix.elements);
        });
        it("defaults camera used when camera not passed in", () =>
        {
            const defaultCamera = new Camera(aspectRatio);

            let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

            expect(defaultCamera.vpMatrix.elements).toEqual(renderer.camera.vpMatrix.elements);
        });
        it("passing in fullScreen as true sets resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            // once in super ctor, another when setting the postResizeCallback
            expect(leWindow.addEventListener).toHaveBeenCalledTimes(2);
            expect("resize").toEqual(windowAddEventListenerSpy.calls.all()[0].args[0]);
            expect("function").toEqual(typeof windowAddEventListenerSpy.calls.all()[0].args[1]);
            expect(false).toEqual(windowAddEventListenerSpy.calls.all()[0].args[2]);
            expect("resize").toEqual(windowAddEventListenerSpy.calls.all()[1].args[0]);
            expect("function").toEqual(typeof windowAddEventListenerSpy.calls.all()[1].args[1]);
            expect(false).toEqual(windowAddEventListenerSpy.calls.all()[1].args[2]);
        });
        it("passing in resizeCallback adds it as resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                calcHeight: calcHeight,
                calcWidth: calcWidth,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(calcHeightSpy).toHaveBeenCalledTimes(2);
            expect(calcWidthSpy).toHaveBeenCalledTimes(2);
        });
        it("not passing in calcWidth and calcHeight does not add it as resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(calcWidthSpy).toHaveBeenCalledTimes(0);
            expect(calcHeightSpy).toHaveBeenCalledTimes(0);
        });
    });

    describe("getContext:", () =>
    {
        describe("returns the gl context from canvas.getContext", () =>
        {
            beforeEach(() =>
            {
                browserHelperMock.setup(bh => bh.isIE).is(() => false);
                browserHelperMock.setup(bh => bh.isEdge).is(() => false);

                getContextSpy.calls.reset();
            });

            it("when IE, uses experimental-webgl as contextId", () =>
            {
                browserHelperMock.setup(bh => bh.isIE).is(() => true);

                let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(browserHelper.isIE).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: true
                    });
            });

            it("when Edge, uses experimental-webgl as contextId", () =>
            {
                browserHelperMock.setup(bh => bh.isEdge).is(() => true);

                let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(browserHelper.isEdge).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: true
                    });
            });

            it("when not IE or Edge, uses webgl as contextId", () =>
            {
                let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: true
                    });
            });
        });

        it("canvas throws when getting context", () =>
        {
            canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                            contextAttributes?: WebGLContextAttributes)
                            => WebGLRenderingContext | null>(c => c.getContext)
                .is((contextName: string, contextAttributes: {}) =>
                    { throw "something is fucky-fucky-one-dolla"; });

            const expectedErrorMessage =
                "error creating webgl context!: something is fucky-fucky-one-dolla";
            let renderer: WebGLRenderer3dMock;
            expect(() => renderer = new WebGLRenderer3dMock(canvas, defaultOptions))
                .toThrow(expectedErrorMessage);
        });

        it("canvas throws when getting context", () =>
        {
            canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                            contextAttributes?: WebGLContextAttributes)
                            => WebGLRenderingContext | null>(c => c.getContext)
                .is((contextName: string, contextAttributes: {}) => null);

            const expectedErrorMessage = "error creating webgl context!, gl === null";
            let renderer: WebGLRenderer3dMock;
            expect(() => renderer = new WebGLRenderer3dMock(canvas, defaultOptions))
                .toThrow(expectedErrorMessage);
        });
    });

    it("canvas lost/restored handled", () =>
    {
        let realCanvas = document.createElement("canvas");
        // "mocking" out real canvas method
        const getContextMock = (contextId: "webgl" | "experimental-webgl",
            contextAttributes?: WebGLContextAttributes): WebGLRenderingContext | null =>
        {
            return gl;
        };
        (realCanvas as any).getContext = getContextMock;

        const options: RenderingOptions = {
            window: leWindow
        };

        let renderer = new WebGLRenderer3dMock(realCanvas, options);
        renderer.start();

        // confirm render loop terminated
        windowCancelAnimationFrameSpy.calls.reset();
        realCanvas.dispatchEvent(new CustomEvent("webglcontextlost"));
        expect(leWindow.cancelAnimationFrame).toHaveBeenCalledTimes(1);
        expect(leWindow.cancelAnimationFrame).toHaveBeenCalledWith(animationFrameRequestId);

        // confirm resources are setup again, and render loop started up again
        const glViewPortSpy = glSpiesDictionary["viewport"];
        const glCreateProgramSpy = glSpiesDictionary["createProgram"];
        glViewPortSpy.calls.reset();
        glCreateProgramSpy.calls.reset();
        windowRequestAnimationFrameSpy.calls.reset();
        realCanvas.dispatchEvent(new CustomEvent("webglcontextrestored"));
        expect(gl.viewport).toHaveBeenCalledTimes(1);
        expect(gl.createProgram).toHaveBeenCalledTimes(3);
        expect(windowRequestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    });

    it("start/stop", () =>
    {
        let renderer = new WebGLRenderer3dMock(canvas, defaultOptions);
        renderer.start();

        // randomly picked a gl function from the draw meothod to make sure it was getting called
        expect(gl.clearColor).toHaveBeenCalledTimes(1);
        expect(leWindow.requestAnimationFrame).toHaveBeenCalledTimes(1);

        renderer.stop();

        expect(leWindow.cancelAnimationFrame).toHaveBeenCalledTimes(1);
        expect(leWindow.cancelAnimationFrame).toHaveBeenCalledWith(animationFrameRequestId);

        renderer.start();
        expect(gl.clearColor).toHaveBeenCalledTimes(2);
        expect(leWindow.requestAnimationFrame).toHaveBeenCalledTimes(2);
    });

    describe("isFullscreen:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();

        });

        it("is set-able and get-able", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: false,
                calcHeight: calcHeight,
                calcWidth: calcWidth,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(Settings.defaultIsFullScreen).toBe(renderer.isFullscreen);

            const isFullScreen = true;

            renderer.isFullscreen = isFullScreen;

            expect(isFullScreen).toBe(renderer.isFullscreen);
        });

        it("setting fullscreen to true ", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: false,
                calcHeight: calcHeight,
                calcWidth: calcWidth,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            expect(leWindow.addEventListener).toHaveBeenCalledTimes(0);

            renderer.isFullscreen = true;

            expect(leWindow.addEventListener).toHaveBeenCalledTimes(1);
            expect("resize").toEqual(windowAddEventListenerSpy.calls.all()[0].args[0]);
            expect("function").toEqual(typeof windowAddEventListenerSpy.calls.all()[0].args[1]);
            expect(false).toEqual(windowAddEventListenerSpy.calls.all()[0].args[2]);

            expect(calcHeightSpy).toHaveBeenCalledTimes(2);
            expect(calcWidthSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("backgroundColor:", () =>
    {
        const backgroundColor = new RGBColor(0.666, 0.666, 0.666);
        let renderer: WebGLRenderer3dMock;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer3dMock(canvas, defaultOptions);
        });

        it("is set-able and get-able", () =>
        {
            renderer.backgroundColor = backgroundColor;

            expect(backgroundColor).toBe(renderer.backgroundColor);
        });

        it("sets the color that the renderer passes in when calling gl.clearColor", () =>
        {
            const clearColorSpy = glSpiesDictionary["clearColor"];
            clearColorSpy.calls.reset();

            renderer.mockDraw();

            expect(gl.clearColor).toHaveBeenCalledTimes(1);
            expect(clearColorSpy.calls.all()[0].args).toEqual([
                Settings.defaultBackgroundColor.red,
                Settings.defaultBackgroundColor.green,
                Settings.defaultBackgroundColor.blue,
                Settings.defaultBackgroundAlpha,
            ]);
            clearColorSpy.calls.reset();

            renderer.backgroundColor = backgroundColor;

            renderer.mockDraw();

            expect(gl.clearColor).toHaveBeenCalledTimes(1);
            expect(clearColorSpy.calls.all()[0].args).toEqual([
                backgroundColor.red,
                backgroundColor.green,
                backgroundColor.blue,
                Settings.defaultBackgroundAlpha,
            ]);
        });
    });

    describe("calcWidth:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();
        });

        it("is set-able and get-able", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                calcWidth: calcWidth,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            calcWidthSpy.calls.reset();
            let calcWidthCB = renderer.calcWidth;
            calcWidthCB(5);
            expect(calcWidthSpy).toHaveBeenCalledTimes(1);
            expect(calcWidthSpy).toHaveBeenCalledWith(5);
            calcWidthSpy.calls.reset();

            const calcWidthCBSpy2 = jasmine.createSpy("calcWidthCB2");
            const calcWidthCB2 = (newWidth: number) =>
            {
                calcWidthCBSpy2(newWidth);
                return 0;
            };

            renderer.calcWidth = calcWidthCB2;

            expect(calcWidthSpy).toHaveBeenCalledTimes(0);
            expect(calcWidthCBSpy2).toHaveBeenCalledTimes(1);
        });

        it("is actually called when window resize event is fired", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                calcWidth: calcWidth
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            calcWidthSpy.calls.reset();
            window.dispatchEvent(new CustomEvent("resize"));
            expect(calcWidthSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("calcHeight:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();
        });

        it("is set-able and get-able", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                calcHeight: calcHeight,
                window: leWindow
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            calcHeightSpy.calls.reset();
            let calcHeightCB = renderer.calcHeight;
            calcHeightCB(5);
            expect(calcHeightSpy).toHaveBeenCalledTimes(1);
            expect(calcHeightSpy).toHaveBeenCalledWith(5);
            calcHeightSpy.calls.reset();

            const calcHeightCBSpy2 = jasmine.createSpy("calcHeightCB2");
            const calcHeightCB2 = (newHeight: number) =>
            {
                calcHeightCBSpy2(newHeight);
                return 0;
            };

            renderer.calcHeight = calcHeightCB2;

            expect(calcHeightSpy).toHaveBeenCalledTimes(0);
            expect(calcHeightCBSpy2).toHaveBeenCalledTimes(1);
        });

        it("is actually called when window resize event is fired", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                calcHeight: calcHeight
            };

            let renderer = new WebGLRenderer3dMock(canvas, options);

            calcHeightSpy.calls.reset();
            window.dispatchEvent(new CustomEvent("resize"));
            expect(calcHeightSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("camera:", () =>
    {
        const eyePosition = new Vec3(1, 1, 1);
        const lookAtPoint = new Vec3(1, 1, -2);
        const upPosition = new Vec3(1, 2, 1);
        const camera = new Camera(aspectRatio, 45, 0.25, 5,
            new Vec3(0.5, 0.5, 0.5),
            new Vec3(0.25, 0.25, 0.25),
            new Vec3(0.5, 1, 0.5));
        let renderer: WebGLRenderer3dMock;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer3dMock(canvas, defaultOptions);
        });

        it("is set-able and get-able", () =>
        {
            renderer.camera = camera;

            expect(camera.vpMatrix.elements).toBe(renderer.camera.vpMatrix.elements);
        });

        it("sets the uniform variable u_viewMatrix", () =>
        {
            const redTriangle = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                ShapeMode.triangles, gl, new RGBColor(1.0, 0.0, 0.0));
            renderer.addShapeToScene(redTriangle);

            renderer.mockDraw();

            const uniformMatrix4fvNameSpy = glSpiesDictionary["uniformMatrix4fv"];

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                new Camera(aspectRatio).vpMatrix.elements
            ]);
            uniformMatrix4fvNameSpy.calls.reset();

            renderer.camera = camera;

            renderer.mockDraw();

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                camera.vpMatrix.elements
            ]);
        });
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
            orangePoint = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, orange);
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
            cyanBox = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
                ShapeMode.box, gl, cyan);
        });

        it("addHeterogenoeusShapesArrayToScene sends their verticies to webgl", () =>
        {
            renderer.addHeterogenoeusShapesArrayToScene([
                orangePoint,
                redTriangle,
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon,
                blueEllipse,
                cyanBox
            ]);

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

        it("removeAllShapes, removes all shapes", () =>
        {
            renderer.addHeterogenoeusShapesArrayToScene([
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon,
                blueEllipse,
                cyanBox
            ]);
             renderer.mockDraw();
             const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];
             expect(gl.bufferData).toHaveBeenCalledTimes(6);
            expect(gl.drawArrays).toHaveBeenCalledTimes(6);
            bufferDataSpy.calls.reset();
            drawArraysSpy.calls.reset();
             renderer.removeAllShapes();
             renderer.mockDraw();
             expect(gl.bufferData).toHaveBeenCalledTimes(0);
            expect(gl.drawArrays).toHaveBeenCalledTimes(0);
        });

        describe("updatePointSize:", () =>
        {
            it("if found, returns true and updates pointSize", () =>
            {
                const point4 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 4);
                const point16 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 16);
                const point10 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 10);

                const ids = renderer.addHeterogenoeusShapesArrayToScene([
                    point4,
                    point16,
                    point10
                ]);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        point4.verticies,
                        point16.verticies,
                        point10.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    3
                ]);

                renderer.updatePointSize(ids[1], 25);

                const point25 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 25);

                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();

                renderer.mockDraw();

                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        point4.verticies,
                        point25.verticies,
                        point10.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    3
                ]);
            });
            it("if not found, returns false and doesnt update pointSize", () =>
            {
                const point4 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 4);
                const point16 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 16);
                const point10 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 10);

                const ids = renderer.addHeterogenoeusShapesArrayToScene([
                    point4,
                    point16,
                    point10
                ]);

                renderer.mockDraw();

                const bufferDataSpy = glSpiesDictionary["bufferData"];
                const drawArraysSpy = glSpiesDictionary["drawArrays"];

                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        point4.verticies,
                        point16.verticies,
                        point10.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    3
                ]);

                renderer.updatePointSize("notId", 25);

                const point25 = renderer.shapeFactory.createPoint(new Vec3(0, 0), gl, green, 25);

                bufferDataSpy.calls.reset();
                drawArraysSpy.calls.reset();

                renderer.mockDraw();

                expect(gl.bufferData).toHaveBeenCalledTimes(1);
                expect(gl.drawArrays).toHaveBeenCalledTimes(1);

                // points drawn
                expect(bufferDataSpy.calls.all()[0].args).toEqual([
                    gl.ARRAY_BUFFER,
                    WebglRendererTestHelper.concatFloat32Arrays([
                        point4.verticies,
                        point16.verticies,
                        point10.verticies
                    ]),
                    gl.STATIC_DRAW
                ]);
                expect(drawArraysSpy.calls.all()[0].args).toEqual([
                    gl.POINTS,
                    0,
                    3
                ]);
            });
        });
    });

    describe("when uniforms not found in shader, " +
        "draw throws and createUniforNotFoundErrorMessage " +
        "generates the correct error message", () =>
    {
        let renderer: WebGLRenderer3dMock;

        beforeEach(() =>
        {
            renderer = new WebGLRenderer3dMock(canvas, defaultOptions);
        });

        describe("and when drawing points", () =>
        {
            let point: Point;

            beforeEach(() =>
            {
                point = renderer.shapeFactory.createPoint(new Vec3(0.5, 0.5), gl);
            });

            it("when u_vpMatrix is missing", () =>
            {
                let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
                .is((shader: WebGLShader, name: string) =>
                {
                    if (name === ShaderSettings.vpMatrixUniformName)
                    {
                        return 0;
                    }
                    return null;
                }).Spy;

                renderer.addShapeToScene(point);

                const expectedErrorString =
                `cannot find uniform in shader program\n` +
                `potential culprits:\n` +
                    `\t${ShaderSettings.vpMatrixUniformName}: 0\n`;
                expect(() => renderer.mockDraw()).toThrow(expectedErrorString);
            });
        });

        describe("and when drawing dynamic shapes", () =>
        {
            let redTriangle: DynamicShape;

            beforeEach(() =>
            {
                redTriangle = renderer.shapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
                ShapeMode.triangles, gl, new RGBColor(1.0, 0.0, 0.0));
            });

            it("when u_vpMatrix is missing", () =>
            {
                let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
                .is((shader: WebGLShader, name: string) =>
                {
                    if (name === ShaderSettings.vpMatrixUniformName)
                    {
                        return 0;
                    }
                    return null;
                }).Spy;

                renderer.addShapeToScene(redTriangle);

                const expectedErrorString =
                `cannot find uniform in shader program\n` +
                `potential culprits:\n` +
                    `\t${ShaderSettings.vpMatrixUniformName}: 0\n`;
                expect(() => renderer.mockDraw()).toThrow(expectedErrorString);
            });
        });
    });

    describe("catching gl errors:", () =>
    {
        afterEach(() =>
        {
            glSpiesDictionary["getShaderParameter"] = glMock.setup(x => x.getShaderParameter)
                .is((shader: WebGLShader, pName: number) => true).Spy;

            glSpiesDictionary["getProgramParameter"] = glMock.setup(x => x.getProgramParameter)
                .is((shader: WebGLShader, pName: number) => true).Spy;

            const shaderProgram = new Mock<WebGLProgram>();
            glSpiesDictionary["createProgram"] = glMock.setup(x => x.createProgram)
                .is(() => shaderProgram.Object).Spy;
        });

        it("when shader not able to compile, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.getShaderParameter)
            .is((shader: WebGLShader, pName: number) => false);

            const expectedErrorString =
            "could not compile shader, shader info log: theres some shady shit going on";
            let renderer: WebGLRenderer3dMock;
            expect(() => renderer = new WebGLRenderer3dMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });

        it("when gl.createProgram returns null, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.createProgram).is(() => null);

            const expectedErrorString = "could not create shader program";
            let renderer: WebGLRenderer3dMock;
            expect(() => renderer = new WebGLRenderer3dMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });

        it("when shader program not able to link, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.getProgramParameter)
            .is((shader: WebGLShader, pName: number) => false);

            const expectedErrorString = "could not link shader program";
            let renderer: WebGLRenderer3dMock;
            expect(() => renderer = new WebGLRenderer3dMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });
    });
    //#endregion: tests
});