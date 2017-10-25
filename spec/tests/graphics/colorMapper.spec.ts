import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Color, ColorMapper } from "../../../src/graphics/color/colorMapper";

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

    describe("maps color enum to correct RGBColor:", () =>
    {
        it("red", () =>
        {
            expect(red).toEqual(ColorMapper.colorToRGBColor(Color.red));
        });
        it("orange", () =>
        {
            expect(orange).toEqual(ColorMapper.colorToRGBColor(Color.orange));
        });
        it("yellow", () =>
        {
            expect(yellow).toEqual(ColorMapper.colorToRGBColor(Color.yellow));
        });
        it("green", () =>
        {
            expect(green).toEqual(ColorMapper.colorToRGBColor(Color.green));
        });
        it("cyan", () =>
        {
            expect(cyan).toEqual(ColorMapper.colorToRGBColor(Color.cyan));
        });
        it("blue", () =>
        {
            expect(blue).toEqual(ColorMapper.colorToRGBColor(Color.blue));
        });
        it("indigo", () =>
        {
            expect(indigo).toEqual(ColorMapper.colorToRGBColor(Color.indigo));
        });
        it("fuchsia", () =>
        {
            expect(fuchsia).toEqual(ColorMapper.colorToRGBColor(Color.fuchsia));
        });
        it("white", () =>
        {
            expect(white).toEqual(ColorMapper.colorToRGBColor(Color.white));
        });
    });


    describe("maps color string to correct RGBColor:", () =>
    {
        it("red", () =>
        {
            expect(red).toEqual(ColorMapper.colorToRGBColor(Color["red"]));
        });
        it("orange", () =>
        {
            expect(orange).toEqual(ColorMapper.colorToRGBColor(Color["orange"]));
        });
        it("yellow", () =>
        {
            expect(yellow).toEqual(ColorMapper.colorToRGBColor(Color["yellow"]));
        });
        it("green", () =>
        {
            expect(green).toEqual(ColorMapper.colorToRGBColor(Color["green"]));
        });
        it("cyan", () =>
        {
            expect(cyan).toEqual(ColorMapper.colorToRGBColor(Color["cyan"]));
        });
        it("blue", () =>
        {
            expect(blue).toEqual(ColorMapper.colorToRGBColor(Color["blue"]));
        });
        it("indigo", () =>
        {
            expect(indigo).toEqual(ColorMapper.colorToRGBColor(Color["indigo"]));
        });
        it("fuchsia", () =>
        {
            expect(fuchsia).toEqual(ColorMapper.colorToRGBColor(Color["fuchsia"]));
        });
        it("white", () =>
        {
            expect(white).toEqual(ColorMapper.colorToRGBColor(Color["white"]));
        });
    });


    describe("maps color string casted to enum to correct RGBColor:", () =>
    {
        it("red", () =>
        {
            expect(red).toEqual(ColorMapper.colorToRGBColor("red" as Color));
        });
        it("orange", () =>
        {
            expect(orange).toEqual(ColorMapper.colorToRGBColor("orange" as Color));
        });
        it("yellow", () =>
        {
            expect(yellow).toEqual(ColorMapper.colorToRGBColor("yellow" as Color));
        });
        it("green", () =>
        {
            expect(green).toEqual(ColorMapper.colorToRGBColor("green" as Color));
        });
        it("cyan", () =>
        {
            expect(cyan).toEqual(ColorMapper.colorToRGBColor("cyan" as Color));
        });
        it("blue", () =>
        {
            expect(blue).toEqual(ColorMapper.colorToRGBColor("blue" as Color));
        });
        it("indigo", () =>
        {
            expect(indigo).toEqual(ColorMapper.colorToRGBColor("indigo" as Color));
        });
        it("fuchsia", () =>
        {
            expect(fuchsia).toEqual(ColorMapper.colorToRGBColor("fuchsia" as Color));
        });
        it("white", () =>
        {
            expect(white).toEqual(ColorMapper.colorToRGBColor("white" as Color));
        });
    });

    it("throws if unexpected Color string", () =>
    {
        const expectedErrorString = "could not find color undefined";
        expect(() => ColorMapper.colorToRGBColor(Color["black"]))
            .toThrow(expectedErrorString);
    });

    it("throws if unexpected color", () =>
    {
        const expectedErrorString = "could not find color black";
        expect(() => ColorMapper.colorToRGBColor("black" as Color))
            .toThrow(expectedErrorString);
    });
});