import { WebGL3dRenderer } from "../../../src/graphics/webgl3dRenderer";

export class WebGL3dRendererMock extends WebGL3dRenderer
{
    public mockDraw()
    {
        super.draw();
    }
}