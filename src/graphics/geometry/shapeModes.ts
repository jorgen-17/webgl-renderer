export enum ShapeMode
{
    Points,
    Lines,
    Triangles,
    Rectangles,
    Hexagons,
    Octogons
}

export class ShapeModeMapper
{
    static shapeStringToEnum (shape: string): ShapeMode
    {
        switch(shape) {
            case "Points":
                return ShapeMode.Points;
            case "Lines":
                return ShapeMode.Lines;
            case "Triangles":
                return ShapeMode.Triangles;
            case "Rectangles":
                return ShapeMode.Rectangles;
            case "Hexagons":
                return ShapeMode.Hexagons;
            case "Octogons":
                return ShapeMode.Octogons;
            default: throw Error(`could not find shape named ${shape}`);
        }
    }
}