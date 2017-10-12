import { WebGL3dRenderer } from "../../../src/graphics/webgl3dRenderer";
import { WebGL2dRenderer } from "../../../src/graphics/webgl2dRenderer";

export class WebGL3dRendererMock extends WebGL3dRenderer
{
    public mockDraw()
    {
        super.draw();
    }
}

export class WebGL2dRendererMock extends WebGL2dRenderer
{
    public mockDraw()
    {
        super.draw();
    }
}