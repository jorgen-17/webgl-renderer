import { Colors } from "./colorsEnum";
import { Color } from "./color";

export class ColorMapper
{
    public static shapeStringToEnum (color: string): Colors
    {
        switch (color) {
            case "Red":
                return Colors.Red;
            case "Orange":
                return Colors.Orange;
            case "Yellow":
                return Colors.Yellow;
            case "Green":
                return Colors.Green;
            case "Cyan":
                return Colors.Cyan;
            case "Blue":
                return Colors.Blue;
            case "Indigo":
                return Colors.Indigo;
            case "Fuscia":
                return Colors.Fuscia;
            case "White":
                return Colors.Fuscia;
            default: throw Error(`could not find color named ${color}`);
        }
    }

    public static colorEnumToColor (colorEnum: Colors): Color
    {
        switch (colorEnum) {
            case Colors.Red:
                return new Color(1.0, 0.0, 0.0);
            case Colors.Orange:
                return new Color(1.0, 0.271, 0.0);
            case Colors.Yellow:
                return new Color(1.0, 1.0, 0.0);
            case Colors.Green:
                return new Color(0.0, 1.0, 0.0);
            case Colors.Cyan:
                return new Color(0.0, 1.0, 1.0);
            case Colors.Blue:
                return new Color(0.0, 0.0, 1.0);
            case Colors.Indigo:
                return new Color(0.294, 0.0, 0.510);
            case Colors.Fuchsia:
                return new Color(1.0, 0.0, 1.0);
            case Colors.White:
                return new Color(1.0, 1.0, 1.0);
            default: throw Error(`could not find color ${colorEnum}`);
        }
    }
}