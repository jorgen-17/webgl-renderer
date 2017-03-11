import { Point2d } from "../graphics/geometry/point2d";

export class MouseHelper
{
    public static clicksToPoints (event: MouseEvent, canvas: HTMLCanvasElement): Point2d
    {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        x = ((x - rect.left) - canvasWidth / 2) / (canvasWidth / 2);
        y = (canvasHeight / 2 - (y - rect.top)) / (canvasHeight / 2);

        return {x: x, y: y};
    }
}