import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModeButtonBar } from "./src/ui/reactComponents/modeButtonBar";
import { ShapeModeButton, RenderModeButton } from "./src/ui/reactComponents/modeButton";
import { IWebGLRenderer, WebGLRenderer } from "./src/graphics/webglRenderer";
import { ContextWrangler } from "./src/utils/contextWrangler";
import { ShapeFactory } from "./src/graphics/geometry/shapeFactory";
import { Color } from "./src/graphics/color";
import { CanvasMouseHandler } from "./src/input/canvasMouseHandler"
import { Callbacks } from "./src/utils/callbacks"

document.addEventListener("DOMContentLoaded", () => {
    let canvas:  HTMLCanvasElement;
    let gl: WebGLRenderingContext;
    let renderer: IWebGLRenderer;

    const shapeHandler = (event: React.MouseEvent<HTMLDivElement>) => { Callbacks.changeShape(event, renderer) }
    const renderModeHandler = (event: React.MouseEvent<HTMLDivElement>) => { Callbacks.changeRenderMode(event, renderer) }

    ReactDOM.render(
        <div>
            <ModeButtonBar
                baseId="shape-mode" 
                mainButtonTooltip="Choose a Shape"
                mainButtonBaseId="shape-selector">
                <ShapeModeButton idBase="points-shape" toolTip="Points" mode="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="lines-shape" toolTip="Lines" mode="Lines" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="triangles-shape" toolTip="Triangles" mode="Triangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="rectangles-shape" toolTip="Rectangles" mode="Rectangles" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="hexagon-shape" toolTip="Hexagon" mode="Hexagon" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="octogon-shape" toolTip="Octogon" mode="Octogon" clickHandler={shapeHandler}/>
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

    const canvasMouseHandler = new CanvasMouseHandler(false, 
        (event: MouseEvent) => { Callbacks.clicksToPoints(event, canvas, renderer); });

    canvas.addEventListener("mousedown", canvasMouseHandler.mouseDownHandler, false);
    canvas.addEventListener("mousemove", canvasMouseHandler.mouseMoveHandler, false);
    canvas.addEventListener("mouseup", canvasMouseHandler.mouseUpHandler, false);

    Callbacks.renderLoop(renderer, window);
}, false);