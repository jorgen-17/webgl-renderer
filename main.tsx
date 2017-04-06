import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModeButtonBar } from "./src/ui/reactComponents/modeButtonBar";
import { ShapeModeButton } from "./src/ui/reactComponents/shapeModeButton";
import { RenderModeButton } from "./src/ui/reactComponents/renderModeButton";
import { ColorModeButton } from "./src/ui/reactComponents/colorModeButton";
import { IWebGLRenderer, WebGLRenderer } from "./src/graphics/webglRenderer";
import { ContextWrangler } from "./src/utils/contextWrangler";
import { CanvasMouseHandler } from "./src/input/canvasMouseHandler";
import { RenderModeMouseHandler } from "./src/input/renderModeMouseHandlers";
import { BasicShapeModeMouseHandler } from "./src/input/basicShapeModeMouseHandler";
import { Callbacks } from "./src/utils/callbacks";
import { LineMouseHandler } from "./src/input/lineMouseHandler";

document.addEventListener("DOMContentLoaded", () => {
    let canvas:  HTMLCanvasElement;
    let gl: WebGLRenderingContext;
    let renderer: IWebGLRenderer;
    let canvasMouseHandler: CanvasMouseHandler;

    const renderModeMouseHandler = new RenderModeMouseHandler();
    const basicShapeModeMouseHandler = new BasicShapeModeMouseHandler();
    const lineMouseHandler = new LineMouseHandler();
    const shapeHandler = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setShape(elem.attributes["data-mode"].nodeValue);
        canvasMouseHandler.mouseHandler = basicShapeModeMouseHandler;
    };
    const lineHandler = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        const elem = event.currentTarget;
        if (elem === null) { return; }
        renderer.setShape(elem.attributes["data-mode"].nodeValue);
        canvasMouseHandler.mouseHandler = lineMouseHandler;
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
                baseId="color-mode"
                mainButtonTooltip="Choose a Color"
                mainButtonBaseId="color-selector">
                <ColorModeButton idBase="red" toolTip="Red" mode="Red" clickHandler={renderModeHandler}/>
                <ColorModeButton idBase="orange" toolTip="Orange" mode="Orange" clickHandler={lineHandler}/>
                <ColorModeButton idBase="yellow" toolTip="Yellow" mode="Yellow" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="green" toolTip="Green" mode="Green" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="cyan" toolTip="Cyan" mode="Cyan" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="blue" toolTip="Blue" mode="Blue" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="indigo" toolTip="Indigo" mode="Indigo" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="fuscia" toolTip="Fuscia" mode="Fuscia" clickHandler={shapeHandler}/>
                <ColorModeButton idBase="white" toolTip="White" mode="White" clickHandler={shapeHandler}/>
            </ModeButtonBar>
            <ModeButtonBar
                baseId="shape-mode"
                mainButtonTooltip="Choose a Shape"
                mainButtonBaseId="shape-selector">
                <ShapeModeButton idBase="points" toolTip="Points" mode="Points" clickHandler={renderModeHandler}/>
                <ShapeModeButton idBase="lines" toolTip="Lines" mode="Lines" clickHandler={lineHandler}/>
                <ShapeModeButton idBase="ellipses" toolTip="Ellipses" mode="Ellipses" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="triangles" toolTip="Triangles" mode="Triangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="rectangles" toolTip="Rectangles" mode="Rectangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="hexagon" toolTip="Hexagon" mode="Hexagons" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="octogon" toolTip="Octogon" mode="Octogons" clickHandler={shapeHandler}/>
            </ModeButtonBar>
            <ModeButtonBar
                baseId="render-mode"
                mainButtonTooltip="Add Points To Render Mode"
                mainButtonBaseId="render-mode-selector">
                <RenderModeButton idBase="points" toolTip="Points" mode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="lines" toolTip="Lines" mode="Lines" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="line-strip" toolTip="Line Strip" mode="LineStrip" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="line-loop" toolTip="Line Loop" mode="LineLoop" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles" toolTip="Triangles" mode="Triangles" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles-strip" toolTip="Triangle Strip" mode="TriangleStrip" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="triangles-fan" toolTip="Triangle Fan" mode="TriangleFan" clickHandler={renderModeHandler}/>
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