import * as TypeMoq from "typemoq";
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

describe("ShapeFactory ", () =>
{
    const gl = TypeMoq.Mock.ofType<WebGLRenderingContext>(undefined);
    WebglRendererTestHelper.setupGlMockFunctions(gl);

    let renderer: WebGLRenderer;

    beforeEach(() =>
    {
        renderer = new WebGLRenderer(800, 600, gl.object);
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

    it("adding shapes sends their verticies to webgl", () =>
    {
        // do the thing
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