
import { Mock } from "ts-mocks";
import { ContextWrangler } from "../../src/utils/contextWrangler";
import { BrowserHelper } from "../../src/utils/browserHelper";


describe("contextWrangler:", () =>
{
    const canvasMock = new Mock<HTMLCanvasElement>();
    const canvas = canvasMock.Object;
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;
    const browserHelperMock = new Mock<BrowserHelper>();
    const browserHelper = browserHelperMock.Object;

    let getContextSpy: jasmine.Spy;

    beforeEach(() =>
    {
        getContextSpy = canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                        contextAttributes?: WebGLContextAttributes)
                        => WebGLRenderingContext | null>(c => c.getContext)
            .is((contextName: string, contextAttributes: {}) => gl).Spy;

        browserHelperMock.setup(bh => bh.isIE).is(() => false);
        browserHelperMock.setup(bh => bh.isEdge).is(() => false);
    });

    describe("getContext returns the gl context from canvas.getContext", () =>
    {
        beforeEach(() =>
        {
            browserHelperMock.setup(bh => bh.isIE).is(() => false);
            browserHelperMock.setup(bh => bh.isEdge).is(() => false);

            getContextSpy.calls.reset();
        });

        it("when IE, uses experimental-webgl as contextId", () =>
        {
            browserHelperMock.setup(bh => bh.isIE).is(() => true);

            expect(gl).toEqual(ContextWrangler.getContext(canvas, browserHelper));
            expect(browserHelper.isIE).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });
        });

        it("when Edge, uses experimental-webgl as contextId", () =>
        {
            browserHelperMock.setup(bh => bh.isEdge).is(() => true);

            expect(gl).toEqual(ContextWrangler.getContext(canvas, browserHelper));
            expect(browserHelper.isEdge).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledWith("experimental-webgl",
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });
        });

        it("when not IE or Edge, uses webgl as contextId", () =>
        {
            expect(gl).toEqual(ContextWrangler.getContext(canvas, browserHelper));
            expect(canvas.getContext).toHaveBeenCalledTimes(1);
            expect(canvas.getContext).toHaveBeenCalledWith("webgl",
                {
                    alpha: false,
                    antialias: false,
                    depth: false
                });
        });
    });

    it("canvas throws when getting context", () =>
    {
        canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                        contextAttributes?: WebGLContextAttributes)
                        => WebGLRenderingContext | null>(c => c.getContext)
            .is((contextName: string, contextAttributes: {}) =>
                { throw "something is fucky-fucky-one-dolla"; });

        const expectedErrorMessage =
            "error creating webgl context!: something is fucky-fucky-one-dolla";
        expect(() => ContextWrangler.getContext(canvas)).toThrow(expectedErrorMessage);
    });

    it("canvas throws when getting context", () =>
    {
        canvasMock.setup<(contextId: "webgl" | "experimental-webgl",
                        contextAttributes?: WebGLContextAttributes)
                        => WebGLRenderingContext | null>(c => c.getContext)
            .is((contextName: string, contextAttributes: {}) => null);

        const expectedErrorMessage = "error creating webgl context!, gl === null";
        expect(() => ContextWrangler.getContext(canvas)).toThrow(expectedErrorMessage);
    });
});