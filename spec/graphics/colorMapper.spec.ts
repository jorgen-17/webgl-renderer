import { RGBColor } from "../../src/graphics/rgbColor";
import { ColorMapper } from "../../src/graphics/colorMapper";

describe("colorMapper:", () =>
{
    const red = new RGBColor(1.0, 0.0, 0.0);
    const orange = new RGBColor(1.0, 0.271, 0.0);
    const yellow = new RGBColor(1.0, 1.0, 0.0);
    const green = new RGBColor(0.0, 1.0, 0.0);
    const cyan = new RGBColor(0.0, 1.0, 1.0);
    const blue = new RGBColor(0.0, 0.0, 1.0);
    const indigo = new RGBColor(0.294, 0.0, 0.510);
    const fuchsia = new RGBColor(1.0, 0.0, 1.0);
    const white = new RGBColor(1.0, 1.0, 1.0);

    describe("maps color string union to correct RGBColor:", () =>
    {
        it("red", () =>
        {
            expect(red).toEqual(ColorMapper.colorToRGBColor("red"));
        });
        it("orange", () =>
        {
            expect(orange).toEqual(ColorMapper.colorToRGBColor("orange"));
        });
        it("yellow", () =>
        {
            expect(yellow).toEqual(ColorMapper.colorToRGBColor("yellow"));
        });
        it("green", () =>
        {
            expect(green).toEqual(ColorMapper.colorToRGBColor("green"));
        });
        it("cyan", () =>
        {
            expect(cyan).toEqual(ColorMapper.colorToRGBColor("cyan"));
        });
        it("blue", () =>
        {
            expect(blue).toEqual(ColorMapper.colorToRGBColor("blue"));
        });
        it("indigo", () =>
        {
            expect(indigo).toEqual(ColorMapper.colorToRGBColor("indigo"));
        });
        it("fuchsia", () =>
        {
            expect(fuchsia).toEqual(ColorMapper.colorToRGBColor("fuchsia"));
        });
        it("white", () =>
        {
            expect(white).toEqual(ColorMapper.colorToRGBColor("white"));
        });
    });
});