import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Color, ColorMapper } from "../../../src/graphics/color/colorMapper";
import { RenderMode, RenderModeMapper } from "../../../src/graphics/renderModeMapper";

describe("renderModeMapper:", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    describe("maps RenderMode as string to glRenderMode:", () =>
    {
        it("points", () =>
        {
            expect(gl.POINTS).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["points"], gl));
        });
        it("lines", () =>
        {
            expect(gl.LINES).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["lines"], gl));
        });
        it("lineStrip", () =>
        {
            expect(gl.LINE_STRIP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["lineStrip"], gl));
        });
        it("lineLoop", () =>
        {
            expect(gl.LINE_LOOP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["lineLoop"], gl));
        });
        it("triangles", () =>
        {
            expect(gl.TRIANGLES).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["triangles"], gl));
        });
        it("triangleStrip", () =>
        {
            expect(gl.TRIANGLE_STRIP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["triangleStrip"], gl));
        });
        it("triangleFan", () =>
        {
            expect(gl.TRIANGLE_FAN).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode["triangleFan"], gl));
        });
    });

    describe("maps RenderMode enum to glRenderMode:", () =>
    {
        it("points", () =>
        {
            expect(gl.POINTS).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.points, gl));
        });
        it("lines", () =>
        {
            expect(gl.LINES).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.lines, gl));
        });
        it("lineStrip", () =>
        {
            expect(gl.LINE_STRIP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.lineStrip, gl));
        });
        it("lineLoop", () =>
        {
            expect(gl.LINE_LOOP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.lineLoop, gl));
        });
        it("triangles", () =>
        {
            expect(gl.TRIANGLES).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.triangles, gl));
        });
        it("triangleStrip", () =>
        {
            expect(gl.TRIANGLE_STRIP).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.triangleStrip, gl));
        });
        it("triangleFan", () =>
        {
            expect(gl.TRIANGLE_FAN).toEqual(RenderModeMapper.renderModeToWebGlConstant(RenderMode.triangleFan, gl));
        });
    });

    it("throws if unexpected renderMode string", () =>
    {
        const expectedErrorString = "could not find renderMode named undefined";
        expect(() => RenderModeMapper.renderModeToWebGlConstant(RenderMode["triangleLoop"], gl))
            .toThrow(expectedErrorString);
    });

    it("throws if unexpected renderMode", () =>
    {
        const expectedErrorString = "could not find renderMode named triangleLoop";
        expect(() => RenderModeMapper.renderModeToWebGlConstant("triangleLoop" as RenderMode, gl))
            .toThrow(expectedErrorString);
    });
});