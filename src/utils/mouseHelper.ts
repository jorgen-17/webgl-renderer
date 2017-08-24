import { Vec3 } from "cuon-matrix-ts";

export class MouseHelper
{
    public static mouseEventToWebGlPoints (event: MouseEvent, canvas: HTMLCanvasElement): Vec3
    {
        let x = event.clientX;
        let y = event.clientY;
        let rect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        x = ((x - rect.left) - canvasWidth / 2) / (canvasWidth / 2);
        y = (canvasHeight / 2 - (y - rect.top)) / (canvasHeight / 2);

        return new Vec3(x, y);
    }
}