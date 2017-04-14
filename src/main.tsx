import * as React from "react";
import * as ReactDOM from "react-dom";
import { IWebGLRenderer, WebGLRenderer } from "./graphics/webglRenderer";
import { ContextWrangler } from "./utils/contextWrangler";
import { CanvasMouseHandler } from "./input/canvasMouseHandler";
import { RenderModeMouseHandler } from "./input/renderModeMouseHandlers";
import { BasicShapeModeMouseHandler } from "./input/basicShapeModeMouseHandler";
import { Callbacks } from "./utils/callbacks";
import { LineMouseHandler } from "./input/lineMouseHandler";
import { Menu } from "./ui/reactComponents/menu";
import { Dispatcher } from "./simpledux";
import * as Events from "./events";
class App extends React.Component<{}, {}>
{
    private canvas:  HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private renderer: IWebGLRenderer;
    private canvasMouseHandler: CanvasMouseHandler;

    constructor()
    {
        super();

        const renderModeMouseHandler = new RenderModeMouseHandler();
        const basicShapeModeMouseHandler = new BasicShapeModeMouseHandler();
        const lineMouseHandler = new LineMouseHandler();

        Dispatcher.addCallback("colorChanged", (colorPayload: Events.ColorChangeEvent) => {
            this.renderer.color = colorPayload.newColor;
            this.setState({});
        });

        Dispatcher.addCallback("shapeChanged", (shapePayload: Events.ShapeChangeEvent) => {
            this.renderer.shape = shapePayload.newShape;
            this.canvasMouseHandler.mouseHandler = basicShapeModeMouseHandler;
        });

        Dispatcher.addCallback("drawingLines", (colorPayload: Events.DrawingLinesEvent) => {
            this.renderer.shape = "lines";
            this.canvasMouseHandler.mouseHandler = lineMouseHandler;
        });

        Dispatcher.addCallback("renderModeChanged", (renderModePayload: Events.RenderModeChangeEvent) => {
            this.renderer.renderMode = renderModePayload.newRenderMode;
            this.canvasMouseHandler.mouseHandler = renderModeMouseHandler;
        });

        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
        this.gl = ContextWrangler.getContext(this.canvas);
        this.renderer = new WebGLRenderer(this.canvas.width, this.canvas.height, this.gl);

        window.addEventListener("resize", () => { Callbacks.resizeCanvas(window, this.renderer, this.canvas); }, false);
        Callbacks.resizeCanvas(window, this.renderer, this.canvas);

        this.canvasMouseHandler = new CanvasMouseHandler(this.canvas, this.renderer, renderModeMouseHandler);

        this.canvas.addEventListener("mousedown", (event: MouseEvent) => { this.canvasMouseHandler.mouseDown(event); } , false);
        this.canvas.addEventListener("mousemove", (event: MouseEvent) => { this.canvasMouseHandler.mouseMove(event); }, false);
        this.canvas.addEventListener("mouseup", (event: MouseEvent) => { this.canvasMouseHandler.mouseUp(event); }, false);

        Callbacks.renderLoop(this.renderer, window);
    }

    public render()
    {
        return (
            <Menu
                currentColor={this.renderer.color}/>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.getElementById("main"));
}, false);