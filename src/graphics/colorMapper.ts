import { RGBColor } from "./rgbColor";

export type Color = "red" |
                    "orange" |
                    "yellow" |
                    "green" |
                    "cyan" |
                    "blue" |
                    "indigo" |
                    "fuchsia" |
                    "white";

export class ColorMapper
{
    public static colorToRGBColor (color: Color): RGBColor
    {
        switch (color) {
            case "red":
                return new RGBColor(1.0, 0.0, 0.0);
            case "orange":
                return new RGBColor(1.0, 0.271, 0.0);
            case "yellow":
                return new RGBColor(1.0, 1.0, 0.0);
            case "green":
                return new RGBColor(0.0, 1.0, 0.0);
            case "cyan":
                return new RGBColor(0.0, 1.0, 1.0);
            case "blue":
                return new RGBColor(0.0, 0.0, 1.0);
            case "indigo":
                return new RGBColor(0.294, 0.0, 0.510);
            case "fuchsia":
                return new RGBColor(1.0, 0.0, 1.0);
            case "white":
                return new RGBColor(1.0, 1.0, 1.0);
            default: throw Error(`could not find color ${color}`);
        }
    }
}