import { WebGLRenderer } from "../../../src/graphics/webglRenderer";

export class WebGLRendererMock extends WebGLRenderer
{
    public mockDraw()
    {
        super.draw();
    }
}