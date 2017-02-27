import { Color } from "../color";
import { ShapeMode } from "./shapeModes";
import { Float32Vector } from "../../utils/vector";

export interface Shape {
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    glRenderMode: number;
    shapeMode: ShapeMode;
}
