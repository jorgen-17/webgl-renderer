import { Mock, Setup } from "ts-mocks";
import { Vec3 } from "cuon-matrix-ts";

import { Ellipse } from "../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../src/graphics/precision";
import { RGBColor } from "../../src/graphics/rgbColor";
import { Triangle } from "../../src/graphics/shapes2d/triangle";
import { ShapeFactory } from "../../src/graphics/shapes2d/shapeFactory";
import { Constants } from "../../src/constants";
import { ShaderSettings } from "../../src/shaderSettings";
import { ShapeMode } from "../../src/graphics/shapes2d/shapeMode";
import { WebGLRenderer } from "../../src/graphics/webglRenderer";
import { WebglRendererTestHelper } from "../../specHelpers/graphics/webglRenderer.spec.helper";
import { Shape2d } from "../../src/graphics/shapes2d/shape2d";
import { StringDictionary } from "../../src/utils/dictionary";
import { Line } from "../../src/graphics/shapes2d/line";
import { RenderMode } from "../../src/graphics/renderModeMapper";
import { Camera } from "../../src/graphics/camera";
import { RenderingOptions } from "../../src/graphics/renderingOptions";
import { Point } from "../../src/graphics/shapes2d/point";
import { Settings } from "../../src/settings";
import { BrowserHelper } from "../../src/utils/browserHelper";
import { WebGLRendererMock } from "../../specHelpers/graphics/webglRendererMock";

describe("webglRenderer:", () =>
{
// region: member variables
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;
    let glSpiesDictionary: StringDictionary<jasmine.Spy>;

    const canvasMock = new Mock<HTMLCanvasElement>();
    const canvas = canvasMock.Object;
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

    const resizeCallbackSpy = jasmine.createSpy("resizeCallback");
    const resizeCallback = (canvasCB: HTMLCanvasElement, windowCB: Window,
        rendererCB: WebGLRenderer) =>
    {
        resizeCallbackSpy(canvasCB, windowCB, rendererCB);
    };

    const defaultOptions: RenderingOptions = {
        browserHelper: browserHelper,
        window: leWindow
    };
// end_region: member variables

// region: tests
    beforeEach(() =>
    {
        glSpiesDictionary = WebglRendererTestHelper.setupGlMockFunctions(glMock);

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

            resizeCallbackSpy.calls.reset();
        });
        it("settings are used when passed in", () =>
        {
            const trianleMode: RenderMode = "triangles";
            const backgroundColor = new RGBColor(0.666, 0.666, 0.666);
            const pointSize = 15;
            const isFullScreen = true;
            const gpuMemoryEffeciency = true;
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                renderMode: trianleMode,
                backgroundColor: backgroundColor,
                pointSize: pointSize,
                window: leWindow,
                fullscreen: isFullScreen,
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(trianleMode).toEqual(renderer.renderMode);
            expect(backgroundColor).toEqual(renderer.backgroundColor);
            expect(pointSize).toEqual(renderer.pointSize);
            expect(isFullScreen).toEqual(renderer.isFullscreen);
        });
        it("defaults are used when settings not passed in", () =>
        {
            const defaultCamera = new Camera();

            let renderer = new WebGLRendererMock(canvas, defaultOptions);

            expect(Settings.defaultRendereMode).toEqual(renderer.renderMode);
            expect(Settings.defaultBackgroundColor).toEqual(renderer.backgroundColor);
            expect(Settings.defaultPointSize).toEqual(renderer.pointSize);

        });
        it("camera used when passed in", () =>
        {
            const eyePosition = new Vec3(1, 1, 1);
            const lookAtPoint = new Vec3(1, 1, -2);
            const upPosition = new Vec3(1, 2, 1);
            const camera = new Camera();

            const options: RenderingOptions = {
                browserHelper: browserHelper,
                camera: camera,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(camera.modelMatrix).toEqual(renderer.camera.modelMatrix);
        });
        it("defaults camera used when camera not passed in", () =>
        {
            const defaultCamera = new Camera();

            let renderer = new WebGLRendererMock(canvas, defaultOptions);

            expect(defaultCamera.modelMatrix).toEqual(renderer.camera.modelMatrix);
        });
        it("passing in fullScreen as true sets resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(leWindow.addEventListener).toHaveBeenCalledTimes(1);
            expect("resize").toEqual(windowAddEventListenerSpy.calls.all()[0].args[0]);
            expect("function").toEqual(typeof windowAddEventListenerSpy.calls.all()[0].args[1]);
            expect(false).toEqual(windowAddEventListenerSpy.calls.all()[0].args[2]);
        });
        it("passing in resizeCallback adds it as resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                resizeCallback: resizeCallback,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(resizeCallbackSpy).toHaveBeenCalledTimes(1);
        });
        it("not passing in resizeCallback does not add it as resize event handler on window", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(resizeCallbackSpy).toHaveBeenCalledTimes(0);
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

                let renderer = new WebGLRendererMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(browserHelper.isIE).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: false
                    });
            });

            it("when Edge, uses experimental-webgl as contextId", () =>
            {
                browserHelperMock.setup(bh => bh.isEdge).is(() => true);

                let renderer = new WebGLRendererMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(browserHelper.isEdge).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: false
                    });
            });

            it("when not IE or Edge, uses webgl as contextId", () =>
            {
                let renderer = new WebGLRendererMock(canvas, defaultOptions);

                expect(gl).toEqual(renderer.gl);
                expect(canvas.getContext).toHaveBeenCalledTimes(1);
                expect(canvas.getContext).toHaveBeenCalledWith("webgl",
                    {
                        alpha: false,
                        antialias: false,
                        depth: false
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
            let renderer: WebGLRendererMock;
            expect(() => renderer = new WebGLRendererMock(canvas, defaultOptions))
                .toThrow(expectedErrorMessage);
        });

        it("canvas throws when getting context", () =>
        {
            canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                            contextAttributes?: WebGLContextAttributes)
                            => WebGLRenderingContext | null>(c => c.getContext)
                .is((contextName: string, contextAttributes: {}) => null);

            const expectedErrorMessage = "error creating webgl context!, gl === null";
            let renderer: WebGLRendererMock;
            expect(() => renderer = new WebGLRendererMock(canvas, defaultOptions))
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

        let renderer = new WebGLRendererMock(realCanvas, options);
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
        expect(gl.createProgram).toHaveBeenCalledTimes(1);
        expect(windowRequestAnimationFrameSpy).toHaveBeenCalledTimes(1);
    });

    it("start/stop", () =>
    {
        let renderer = new WebGLRendererMock(canvas, defaultOptions);
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

    describe("renderMode:", () =>
    {
        let renderer: WebGLRendererMock;

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);
        });

        it("is set-able and get-able", () =>
        {
            const triangleMode: RenderMode = "triangles";
            renderer.renderMode = triangleMode;

            expect(triangleMode).toEqual(renderer.renderMode);
        });

        it("determines the default renderMode used when addXYZPointToScene is called", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            renderer.renderMode = "points";
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies);

            const linesVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            renderer.renderMode = "lines";
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, linesVerticies);

            const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];

            renderer.mockDraw();

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
        let renderer: WebGLRendererMock;

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);
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

    describe("pointSize:", () =>
    {
        const pointSize = 15;
        let renderer: WebGLRendererMock;

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);
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

            renderer.mockDraw();

            const uniform1fSpy = glSpiesDictionary["uniform1f"];

            expect(gl.uniform1f).toHaveBeenCalledTimes(1);
            expect(uniform1fSpy.calls.all()[0].args).toEqual([
                1,
                Settings.defaultPointSize
            ]);
            uniform1fSpy.calls.reset();

            renderer.pointSize = pointSize;

            renderer.mockDraw();

            expect(gl.uniform1f).toHaveBeenCalledTimes(1);
            expect(uniform1fSpy.calls.all()[0].args).toEqual([
                1,
                pointSize
            ]);
        });
    });

    describe("isFullscreen:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();

            resizeCallbackSpy.calls.reset();
        });

        it("is set-able and get-able", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: false,
                resizeCallback: resizeCallback,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

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
                resizeCallback: resizeCallback,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            expect(leWindow.addEventListener).toHaveBeenCalledTimes(0);

            renderer.isFullscreen = true;

            expect(leWindow.addEventListener).toHaveBeenCalledTimes(1);
            expect("resize").toEqual(windowAddEventListenerSpy.calls.all()[0].args[0]);
            expect("function").toEqual(typeof windowAddEventListenerSpy.calls.all()[0].args[1]);
            expect(false).toEqual(windowAddEventListenerSpy.calls.all()[0].args[2]);

            expect(resizeCallbackSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("resizeCallback:", () =>
    {
        beforeEach(() =>
        {
            windowAddEventListenerSpy.calls.reset();

            resizeCallbackSpy.calls.reset();
        });

        it("is set-able and get-able", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                resizeCallback: resizeCallback,
                window: leWindow
            };

            let renderer = new WebGLRendererMock(canvas, options);

            resizeCallbackSpy.calls.reset();

            let resizeCB = renderer.resizeCallback;
            resizeCB(canvas, leWindow, renderer);
            expect(resizeCallbackSpy).toHaveBeenCalledTimes(1);
            resizeCallbackSpy.calls.reset();

            const resizeCallbackSpy2 = jasmine.createSpy("resizeCallback2");
            const resizeCallback2 = (canvasCB: HTMLCanvasElement, windowCB: Window,
                rendererCB: WebGLRenderer) =>
            {
                resizeCallbackSpy2(canvasCB, windowCB, rendererCB);
            };

            renderer.resizeCallback = resizeCallback2;

            expect(resizeCallbackSpy).toHaveBeenCalledTimes(0);
            expect(resizeCallbackSpy2).toHaveBeenCalledTimes(1);
        });

        it("is actually called when window resize event is fired", () =>
        {
            const options: RenderingOptions = {
                browserHelper: browserHelper,
                fullscreen: true,
                resizeCallback: resizeCallback
            };

            let renderer = new WebGLRendererMock(canvas, options);

            resizeCallbackSpy.calls.reset();
            window.dispatchEvent(new CustomEvent("resize"));
            expect(resizeCallbackSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("camera:", () =>
    {
        const eyePosition = new Vec3(1, 1, 1);
        const lookAtPoint = new Vec3(1, 1, -2);
        const upPosition = new Vec3(1, 2, 1);
        const camera = new Camera();
        let renderer: WebGLRendererMock;

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);
        });

        it("is set-able and get-able", () =>
        {
            renderer.camera = camera;

            expect(camera.modelMatrix).toBe(renderer.camera.modelMatrix);
        });

        it("sets the uniform variable u_viewMatrix", () =>
        {
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            renderer.mockDraw();

            const uniformMatrix4fvNameSpy = glSpiesDictionary["uniformMatrix4fv"];

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                new Camera().modelMatrix
            ]);
            uniformMatrix4fvNameSpy.calls.reset();

            renderer.camera = camera;

            renderer.mockDraw();

            expect(gl.uniformMatrix4fv).toHaveBeenCalledTimes(1);
            expect(uniformMatrix4fvNameSpy.calls.all()[0].args).toEqual([
                1,
                false,
                camera.modelMatrix
            ]);
        });
    });

    describe("verticies:", () =>
    {
        let renderer: WebGLRendererMock;

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);
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

            renderer.mockDraw();

            const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];

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

            renderer.mockDraw();

            const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];

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

            renderer.mockDraw();

            expect(gl.bufferData).toHaveBeenCalledTimes(0);
            expect(gl.drawArrays).toHaveBeenCalledTimes(0);
        });
    });

    describe("shapes:", () =>
    {
        let renderer: WebGLRendererMock;
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

        beforeEach(() =>
        {
            renderer = new WebGLRendererMock(canvas, defaultOptions);

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

            renderer.mockDraw();

            const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];

            expect(gl.bufferData).toHaveBeenCalledTimes(7);
            expect(gl.drawArrays).toHaveBeenCalledTimes(7);

            // point drawn
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

            // line drawn
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

            // redTriangle drawn
            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                redTriangle.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLES,
                0,
                3
            ]);

            // orangeSquare drawn
            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                orangeSquare.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.TRIANGLES,
                0,
                6
            ]);

            // yellowHexagon drawn
            expect(bufferDataSpy.calls.all()[4].args).toEqual([
                gl.ARRAY_BUFFER,
                yellowHexagon.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[4].args).toEqual([
                gl.TRIANGLES,
                0,
                12
            ]);

            // greenOctogon drawn
            expect(bufferDataSpy.calls.all()[5].args).toEqual([
                gl.ARRAY_BUFFER,
                greenOctogon.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[5].args).toEqual([
                gl.TRIANGLES,
                0,
                18
            ]);

            // blueEllipse drawn
            expect(bufferDataSpy.calls.all()[6].args).toEqual([
                gl.ARRAY_BUFFER,
                blueEllipse.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[6].args).toEqual([
                gl.TRIANGLES,
                0,
                1206
            ]);
        });

        it("removeAllShapes, removes all shapes", () =>
        {
            renderer.addShapesToScene([
                point,
                line,
                redTriangle,
                orangeSquare,
                yellowHexagon,
                greenOctogon,
                blueEllipse
            ]);

            renderer.mockDraw();

            const bufferDataSpy = glSpiesDictionary["bufferData"];
            const drawArraysSpy = glSpiesDictionary["drawArrays"];

            expect(gl.bufferData).toHaveBeenCalledTimes(7);
            expect(gl.drawArrays).toHaveBeenCalledTimes(7);

            // point drawn
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

            // line drawn
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

            // redTriangle drawn
            expect(bufferDataSpy.calls.all()[2].args).toEqual([
                gl.ARRAY_BUFFER,
                redTriangle.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[2].args).toEqual([
                gl.TRIANGLES,
                0,
                3
            ]);

            // orangeSquare drawn
            expect(bufferDataSpy.calls.all()[3].args).toEqual([
                gl.ARRAY_BUFFER,
                orangeSquare.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[3].args).toEqual([
                gl.TRIANGLES,
                0,
                6
            ]);

            // yellowHexagon drawn
            expect(bufferDataSpy.calls.all()[4].args).toEqual([
                gl.ARRAY_BUFFER,
                yellowHexagon.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[4].args).toEqual([
                gl.TRIANGLES,
                0,
                12
            ]);

            // greenOctogon drawn
            expect(bufferDataSpy.calls.all()[5].args).toEqual([
                gl.ARRAY_BUFFER,
                greenOctogon.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[5].args).toEqual([
                gl.TRIANGLES,
                0,
                18
            ]);

            // blueEllipse drawn
            expect(bufferDataSpy.calls.all()[6].args).toEqual([
                gl.ARRAY_BUFFER,
                blueEllipse.verticies,
                gl.STATIC_DRAW
            ]);
            expect(drawArraysSpy.calls.all()[6].args).toEqual([
                gl.TRIANGLES,
                0,
                1206
            ]);
            bufferDataSpy.calls.reset();
            drawArraysSpy.calls.reset();

            renderer.removeAllShapes();

            renderer.mockDraw();

            expect(gl.bufferData).toHaveBeenCalledTimes(0);
            expect(gl.drawArrays).toHaveBeenCalledTimes(0);
        });
    });

    describe("when uniforms not found in shader, " +
        "draw throws and createUniforNotFoundErrorMessage " +
        "generates the correct error message", () =>
    {
        it("when u_pointSize is missing and u_viewMatrix is found", () =>
        {
            let getUniformLocationSpy = glMock.setup(x => x.getUniformLocation)
            .is((shader: WebGLShader, name: string) =>
            {
                if (name === ShaderSettings.pointSizeUniformName)
                {
                    return 0;
                }
                if (name === ShaderSettings.modelMatrixUniformName)
                {
                    return 1;
                }
                return null;
            }).Spy;

            let renderer = new WebGLRendererMock(canvas, defaultOptions);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 0\n` +
                `\t${ShaderSettings.modelMatrixUniformName}: 1\n`;
            expect(() => renderer.mockDraw()).toThrow(expectedErrorString);
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
                if (name === ShaderSettings.modelMatrixUniformName)
                {
                    return 0;
                }
                return null;
            }).Spy;

            let renderer = new WebGLRendererMock(canvas, defaultOptions);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 1\n` +
                `\t${ShaderSettings.modelMatrixUniformName}: 0\n`;
            expect(() => renderer.mockDraw()).toThrow(expectedErrorString);
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
                if (name === ShaderSettings.modelMatrixUniformName)
                {
                    return 0;
                }
                return null;
            }).Spy;

            let renderer = new WebGLRendererMock(canvas, defaultOptions);
            const pointsVerticies = WebglRendererTestHelper.getRandomVerticies(gl);
            WebglRendererTestHelper.addVerticiesToRenderer(renderer, pointsVerticies, "points", gl);

            const expectedErrorString =
            `cannot find uniform in shader program\n` +
            `potential culprits:\n` +
                `\t${ShaderSettings.pointSizeUniformName}: 0\n` +
                `\t${ShaderSettings.modelMatrixUniformName}: 0\n`;
            expect(() => renderer.mockDraw()).toThrow(expectedErrorString);
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
            let renderer: WebGLRendererMock;
            expect(() => renderer = new WebGLRendererMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });

        it("when gl.createProgram returns null, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.createProgram).is(() => null);

            const expectedErrorString = "could not create shader program";
            let renderer: WebGLRendererMock;
            expect(() => renderer = new WebGLRendererMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });

        it("when shader program not able to link, " +
            "constructor should throw correct error message", () =>
        {
            glMock.setup(x => x.getProgramParameter)
            .is((shader: WebGLShader, pName: number) => false);

            const expectedErrorString = "could not link shader program";
            let renderer: WebGLRendererMock;
            expect(() => renderer = new WebGLRendererMock(canvas, defaultOptions))
                .toThrow(expectedErrorString);
        });
    });
// end_region: tests
});