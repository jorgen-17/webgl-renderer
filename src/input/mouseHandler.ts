export interface IMouseHandler
{
    mouseIsDown: boolean;
    mouseDownHandler?: (event: MouseEvent) => void;
    mouseMoveHandler?: (event: MouseEvent) => void;
    mouseUpHandler?: (event: MouseEvent) => void;
    clickHandler?: (event: MouseEvent) => void;
}