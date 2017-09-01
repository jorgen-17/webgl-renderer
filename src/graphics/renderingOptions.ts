import { ShapeMode } from "./shapes2d/shapeMode";
import { RenderMode } from "./renderModeMapper";
import { DrawingMode } from "./drawingMode";
import { RGBColor } from "./rgbColor";
import { Camera } from "./camera";
import { BrowserHelper } from "../utils/browserHelper";
import { WebGLRenderer } from "./webglRenderer";

export interface RenderingOptions
{
    browserHelper?: BrowserHelper;
    renderMode?: RenderMode;
    pointSize?: number;
    backgroundColor?: RGBColor;
    camera?: Camera;
    window?: Window;
    fullscreen?: boolean;
    resizeCallback?: (canvas: HTMLCanvasElement, window: Window,
        renderer: WebGLRenderer) => void;
    // if true, we trim vertexBuffer(at the expense of CPU cycles) to send less data to the GPU
    // if false sends extraneous data to the GPU but avoids the CPU hit of looping through vertexBuffer
    gpuMemoryEffeciency?: boolean;
}