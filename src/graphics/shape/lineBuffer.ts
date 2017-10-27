import { ShapeBuffer } from "./shapeBuffer";
import { RGBColor } from "../color/rgbColor";
import { Line } from "./shape2d/line";

export class LineBuffer extends ShapeBuffer<Line>
{
    public addVertex(id: string, newPointSize: number): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            const verticiesCount = shape.numberOfVerticies * shape.numberOfFloatsPerVertex;
            const verticiesIndex = index * verticiesCount;

            this._verticies.overwrite(verticiesIndex, shape.verticies);
            this._trimmedArray = this._verticies.getTrimmedArray();
            this.refreshWebglBuffer();

            return true;
        }

        return false;
    }
}