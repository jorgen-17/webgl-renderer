import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModeButtonBar } from "./src/ui/reactComponents/modeButtonBar";
import { ShapeModeButton, RenderModeButton } from "./src/ui/reactComponents/modeButton";
import { IWebGLRenderer, WebGLRenderer } from "./src/graphics/webglRenderer";
import { ContextWrangler } from "./src/utils/contextWrangler";
import { CanvasMouseHandler } from "./src/input/canvasMouseHandler";
import { RenderModeMouseHandler } from "./src/input/renderModeMouseHandlers";
import { BasicShapeModeMouseHandler } from "./src/input/basicShapeModeMouseHandler";
import { Callbacks } from "./src/utils/callbacks";

document.addEventListener("DOMContentLoaded", () => {
    let canvas:  HTMLCanvasElement;
    let gl: WebGLRenderingContext;
    let renderer: IWebGLRenderer;
    let canvasMouseHandler: CanvasMouseHandler;

    const renderModeMouseHandler = new RenderModeMouseHandler();
    const basicShapeModeMouseHandler = new BasicShapeModeMouseHandler();
    const shapeHandler = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setShape(elem.attributes["data-mode"].nodeValue);
        canvasMouseHandler.mouseHandler = basicShapeModeMouseHandler;
    };
    const renderModeHandler = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setRenderMode(elem.attributes["data-mode"].nodeValue);
        canvasMouseHandler.mouseHandler = renderModeMouseHandler;
    };

    ReactDOM.render(
        <div>
            <ModeButtonBar
                baseId="shape-mode"
                mainButtonTooltip="Choose a Shape"
                mainButtonBaseId="shape-selector">
                <ShapeModeButton idBase="points-shape" toolTip="Points" mode="Points" clickHandler={renderModeHandler}/>
                <ShapeModeButton idBase="lines-shape" toolTip="Lines" mode="Lines" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="triangles-shape" toolTip="Triangles" mode="Triangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="rectangles-shape" toolTip="Rectangles" mode="Rectangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="hexagon-shape" toolTip="Hexagon" mode="Hexagons" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="octogon-shape" toolTip="Octogon" mode="Octogons" clickHandler={shapeHandler}/>
            </ModeButtonBar>
            <ModeButtonBar
                baseId="render-mode"
                mainButtonTooltip="Add Points To Render Mode"
                mainButtonBaseId="render-mode-selector">
                <RenderModeButton idBase="points-mode" toolTip="Points" mode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="lines-mode" toolTip="Lines" mode="Lines" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="line-strip-mode" toolTip="Line Strip" mode="LineStrip" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="line-loop-mode" toolTip="Line Loop" mode="LineLoop" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles-mode" toolTip="Triangles" mode="Triangles" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles-strip-mode" toolTip="Triangle Strip" mode="TriangleStrip" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles-fan-mode" toolTip="Triangle Fan" mode="TriangleFan" clickHandler={renderModeHandler}/>
            </ModeButtonBar>
        </div>
        , document.getElementById("main")
    );

    canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    gl = ContextWrangler.getContext(canvas);
    renderer = new WebGLRenderer(canvas.width, canvas.height, gl);

    window.addEventListener("resize", () => { Callbacks.resizeCanvas(window, renderer, canvas); }, false);
    Callbacks.resizeCanvas(window, renderer, canvas);

    canvasMouseHandler = new CanvasMouseHandler(canvas, renderer, renderModeMouseHandler);

    canvas.addEventListener("mousedown", (event: MouseEvent) => { canvasMouseHandler.mouseDown(event); } , false);
    canvas.addEventListener("mousemove", (event: MouseEvent) => { canvasMouseHandler.mouseMove(event); }, false);
    canvas.addEventListener("mouseup", (event: MouseEvent) => { canvasMouseHandler.mouseUp(event); }, false);

    Callbacks.renderLoop(renderer, window);
}, false);