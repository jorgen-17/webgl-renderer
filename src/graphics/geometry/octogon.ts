import { Shape } from "./shape";
import { ShapeMode } from "./shapeModes";
import { Point2d } from "./point2d";
import { Float32Vector } from "../../utils/vector";

export class Octogon implements Shape
{
    verticies: Float32Vector;
    vertexSize: number;
    numberOfVerticies: number;
    glRenderMode: number;
    shapeMode: ShapeMode;

    constructor(topLeft: Point2d, topRight: Point2d, bottomLeft: Point2d, bottomRight: Point2d, gl: WebGLRenderingContext)
    {
        //todo interpret these points as an octogon
        this.verticies = new Float32Vector(new Float32Array([topLeft.x, topLeft.y,
        topRight.x, topRight.y,
        bottomLeft.x, bottomLeft.y,
        bottomRight.x, bottomRight.y]));
        this.vertexSize = 2;
        this.numberOfVerticies = 8;
        this.glRenderMode = gl.TRIANGLE_STRIP;
        this.shapeMode = ShapeMode.Octogons;
    }
}