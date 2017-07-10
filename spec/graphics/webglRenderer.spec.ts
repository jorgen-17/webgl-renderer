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

describe("ShapeFactory ", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    let glSpiesDictionary: StringDictionary<jasmine.Spy>;
    let gl: WebGLRenderingContext;
    let renderer: WebGLRenderer;
    const red = new RGBColor(1.0, 0.0, 0.0);
    const orange = new RGBColor(1.0, 0.271, 0.0);
    const yellow = new RGBColor(1.0, 1.0, 0.0);
    const green = new RGBColor(0.0, 1.0, 0.0);
    const cyan = new RGBColor(0.0, 1.0, 1.0);
    let redTriangle: Shape2d;
    let orangeSquare: Shape2d;
    let yellowHexagon: Shape2d;
    let greenOctogon: Shape2d;
    let expectedTrianglesStripVertexBuffer: Float32Array;


    beforeEach(() =>
    {
        glSpiesDictionary = WebglRendererTestHelper.setupGlMockFunctions(glMock);
        gl = glMock.Object;
        renderer = new WebGLRenderer(800, 600, gl);

        redTriangle = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, 1),
            "triangles", red, gl);
        orangeSquare = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
            "rectangles", orange, gl);
        yellowHexagon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(-1, -1),
            "hexagons", yellow, gl);
        greenOctogon = ShapeFactory.createShape(new Vec3(0, 0), new Vec3(1, -1),
            "octogons", green, gl);

        let yellowHexVerts = yellowHexagon.verticies.arr;
        let greenOctoVerts = greenOctogon.verticies.arr;
        expectedTrianglesStripVertexBuffer = new Float32Array(yellowHexVerts.length + greenOctoVerts.length);
        expectedTrianglesStripVertexBuffer.set(yellowHexVerts);
        expectedTrianglesStripVertexBuffer.set(greenOctoVerts, yellowHexVerts.length);
    });

    xit("camera can be passed in and is used", () =>
    {
        // do the thing
    });

    xit("settings are used", () =>
    {
        // do the thing
    });

    xdescribe("adding verticies to different vertex buffers sends them to webgl", () =>
    {
        // do the thing
    });

    it("addShapeToScene sends their verticies to webgl", () =>
    {
        renderer.addShapeToScene(redTriangle);
        renderer.addShapeToScene(orangeSquare);
        renderer.addShapeToScene(yellowHexagon);
        renderer.addShapeToScene(greenOctogon);

        renderer.draw();

        expect(gl.bufferData).toHaveBeenCalledTimes(3);
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                redTriangle.verticies.arr,
                gl.STATIC_DRAW
            );
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                orangeSquare.verticies.arr,
                gl.STATIC_DRAW
            );
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                expectedTrianglesStripVertexBuffer,
                gl.STATIC_DRAW
            );
    });

    it("addShapesToScene sends their verticies to webgl", () =>
    {
        renderer.addShapesToScene([
            redTriangle,
            orangeSquare,
            yellowHexagon,
            greenOctogon
        ]);

        renderer.draw();

        expect(gl.bufferData).toHaveBeenCalledTimes(3);
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                redTriangle.verticies.arr,
                gl.STATIC_DRAW
            );
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                orangeSquare.verticies.arr,
                gl.STATIC_DRAW
            );
        expect(gl.bufferData).
            toHaveBeenCalledWith(
                gl.ARRAY_BUFFER,
                expectedTrianglesStripVertexBuffer,
                gl.STATIC_DRAW
            );
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