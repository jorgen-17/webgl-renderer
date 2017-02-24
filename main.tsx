import * as React from "react";
import * as ReactDOM from "react-dom";
import { ModeButtonBar } from "./src/ui/reactComponents/modeButtonBar";
import { ShapeModeButton, RenderModeButton } from "./src/ui/reactComponents/modeButton";

import { IWebGLRenderer, WebGLRenderer } from "./src/graphics/webglRenderer";
import { ContextWrangler } from "./src/utils/contextWrangler";
import { ShapeFactory } from "./src/graphics/shapes/shapeFactory";
import { Color } from "./src/graphics/color";
import { CanvasMouseHandler } from "./src/input/canvasMouseHandler"
import { Callbacks } from "./src/utils/callbacks"

/*
                    */

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
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
                <ShapeModeButton idBase="points-shape" toolTip="Points" shape="Points" clickHandler={shapeHandler}/>
            </ModeButtonBar>
            <ModeButtonBar
                baseId="shape-mode" 
                mainButtonTooltip="Choose a Shape"
                mainButtonBaseId="shape-selector">
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
                <RenderModeButton idBase="points-shape" toolTip="Points" renderMode="Points" clickHandler={renderModeHandler}/>
            </ModeButtonBar>
        </div>
        , document.getElementById("main")
    );

    canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    gl = ContextWrangler.getContext(canvas);
    renderer = new WebGLRenderer(canvas.width, canvas.height, gl);

    window.addEventListener("resize", () => { Callbacks.resizeCanvas(window, renderer, canvas); }, false);
    Callbacks.resizeCanvas(window, renderer, canvas);

    const renderModeButtons = document.getElementsByClassName("render-mode-button");
    let numberOfModes = renderModeButtons.length;
    for(let i = 0; i < numberOfModes; i++)
    {
        const button = renderModeButtons[i];
        button.addEventListener("click", (event: MouseEvent) => { Callbacks.changeRenderMode(event, renderer); }, false);
    }

    const shapeButtons = document.getElementsByClassName("shape-button");
    let numberOfShapes = shapeButtons.length;
    for(let i = 0; i < numberOfShapes; i++)
    {
        const button = shapeButtons[i];
        button.addEventListener("click", (event: MouseEvent) => { Callbacks.changeShape(event, renderer); }, false);
    }

    const canvasMouseHandler = new CanvasMouseHandler(false, 
        (event: MouseEvent) => { Callbacks.clicksToPoints(event, canvas, renderer); });

    canvas.addEventListener("mousedown", canvasMouseHandler.mouseDownHandler, false);
    canvas.addEventListener("mousemove", canvasMouseHandler.mouseMoveHandler, false);
    canvas.addEventListener("mouseup", canvasMouseHandler.mouseUpHandler, false);

    Callbacks.renderLoop(renderer, window);
}, false);