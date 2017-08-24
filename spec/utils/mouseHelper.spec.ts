import { Mock } from "ts-mocks";

import { MouseHelper } from "../../src/utils/mouseHelper";


describe("MouseHelper:", () =>
{
    const clientRectMock = new Mock<ClientRect>();
    const clientRect = clientRectMock.Object;
    const canvasMock = new Mock<HTMLCanvasElement>();
    const canvas = canvasMock.Object;
    const mouseEventMock = new Mock<MouseEvent>();
    const mouseEvent = mouseEventMock.Object;

    beforeEach(() =>
    {
        clientRectMock.setup(cr => cr.top).is(0);
        clientRectMock.setup(cr => cr.left).is(0);

        canvasMock.setup(c => c.width).is(800);
        canvasMock.setup(c => c.height).is(600);
        canvasMock.setup(c => c.getBoundingClientRect).is(() => clientRect);

        mouseEventMock.setup(me => me.clientX).is(100);
        mouseEventMock.setup(me => me.clientY).is(100);
    });

    it("mouseEventToWebGlPoints maps mouse x and y to correct webGl coordinates", () =>
    {
        const actualWebGlPoint = MouseHelper.mouseEventToWebGlPoints(mouseEvent, canvas);
        expect(actualWebGlPoint.x).toBe(-0.75);
        expect(actualWebGlPoint.y).toBe(0.6666666865348816);
        expect(actualWebGlPoint.z).toBe(0);
    });
});