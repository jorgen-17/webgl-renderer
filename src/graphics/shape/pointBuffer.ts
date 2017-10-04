import { ShapeBuffer } from "./shapeBuffer";
import { Point } from "./shape2d/point";
import { RGBColor } from "../color/rgbColor";

export class PointBuffer extends ShapeBuffer<Point>
{
    public updatePointSize(id: string, newPointSize: number): boolean
    {
        if (this._shapes.hasOwnProperty(id))
        {
            const shape = this._shapes[id].shape;
            const index = this._shapes[id].index;

            shape.pointSize = newPointSize;

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