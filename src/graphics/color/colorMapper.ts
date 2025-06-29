import { RGBColor } from "../color/rgbColor";

export enum Color
{
    red = "red",
    orange = "orange",
    yellow = "yellow",
    green = "green",
    cyan = "cyan",
    blue = "blue",
    indigo = "indigo",
    fuchsia = "fuchsia",
    white = "white"
}

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
            default: throw `could not find color ${color}`;
        }
    }
}