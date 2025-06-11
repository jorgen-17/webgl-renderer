import { WebGLRenderer3d } from "../../../src/graphics/webglRenderer3d";
import { WebGLRenderer2d } from "../../../src/graphics/webglRenderer2d";

export class WebGLRenderer3dMock extends WebGLRenderer3d
{
    public mockDraw()
    {
        super.draw();
    }
}

export class WebGLRenderer2dMock extends WebGLRenderer2d
{
    public mockDraw()
    {
        super.draw();
    }
}