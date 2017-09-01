import { Mock } from "ts-mocks";
import { VertexBuffer } from "../../src/graphics/vertexBuffer";
import { Constants } from "../../src/constants";
import { WebglRendererTestHelper } from "../../specHelpers/graphics/webglRenderer.spec.helper";

describe("vertexBuffer:", () =>
{
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;
    let vb: VertexBuffer;

    beforeAll(() =>
    {
        glMock.setup(x => x.POINTS).is(0x0000);
        glMock.setup(x => x.LINES).is(0x0001);
        glMock.setup(x => x.LINE_LOOP).is(0x0002);
        glMock.setup(x => x.LINE_STRIP).is(0x0003);
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        glMock.setup(x => x.TRIANGLE_FAN).is(0x0006);
    });

    describe("constructor:", () =>
    {
        describe("with valid gl renderMode:", () =>
        {
            it("points", () =>
            {
                vb = new VertexBuffer(gl.POINTS, gl);
                expect(gl.POINTS).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("lines ", () =>
            {
                vb = new VertexBuffer(gl.LINES, gl);
                expect(gl.LINES).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("lineStrip", () =>
            {
                vb = new VertexBuffer(gl.LINE_STRIP, gl);
                expect(gl.LINE_STRIP).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("lineLoop", () =>
            {
                vb = new VertexBuffer(gl.LINE_LOOP, gl);
                expect(gl.LINE_LOOP).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("triangles", () =>
            {
                vb = new VertexBuffer(gl.TRIANGLES, gl);
                expect(gl.TRIANGLES).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("triangleStrip", () =>
            {
                vb = new VertexBuffer(gl.TRIANGLE_STRIP, gl);
                expect(gl.TRIANGLE_STRIP).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
            it("triangleFan", () =>
            {
                vb = new VertexBuffer(gl.TRIANGLE_FAN, gl);
                expect(gl.TRIANGLE_FAN).toEqual(vb.glRenderMode);
                expect(1).toEqual(vb.verticiesStack.length);
                expect(0).toEqual(vb.verticiesStack[0].size);
            });
        });

        it("without valid gl renderMode", () =>
        {
            const expectedErrorMessage =
                "cannot initialize vertex buffer of unrecognized gl render mode";
            expect(() => vb = new VertexBuffer(0x00007, gl))
                .toThrow(expectedErrorMessage);
        });
    });

    describe("addVertex:", () =>
    {
        beforeEach(() =>
        {
            vb = new VertexBuffer(gl.POINTS, gl);
        });

        it("add incorrect number of floats", () =>
        {
            let vertexToAdd = new Float32Array([1, 2, 3, 4, 5]);
            let expectedErrorMessage =
                `cannot add vertex repersented by ${vertexToAdd.length} floats, ` +
                `we only accept verticies of ${Constants.floatsPerVertex} floats ` +
                `(x, y, z, r, g, b)`;
            expect(() => vb.addVertex(vertexToAdd)).toThrow(expectedErrorMessage);

            vertexToAdd = new Float32Array([1, 2, 3, 4, 5, 6, 7]);
            expectedErrorMessage =
                `cannot add vertex repersented by ${vertexToAdd.length} floats, ` +
                `we only accept verticies of ${Constants.floatsPerVertex} floats ` +
                `(x, y, z, r, g, b)`;
            expect(() => vb.addVertex(vertexToAdd)).toThrow(expectedErrorMessage);
        });

        it("add more vertexLimit should create " +
            "new float32Vector and push old one on stack", () =>
        {
            vb = new VertexBuffer(gl.POINTS, gl, 18);

            let verticies = WebglRendererTestHelper.getRandomVerticies(gl, 2);

            WebglRendererTestHelper.addVerticiesToVertexBuffer(vb, verticies);

            expect(1).toEqual(vb.verticiesStack.length);
            expect(12).toEqual(vb.verticiesStack[0].size);
            expect(verticies).toEqual(vb.verticiesStack[0].getTrimmedArray());

            let finalVertex = new Float32Array([1, 2, 3, 4, 5, 6]);

            vb.addVertex(finalVertex);

            expect(1).toEqual(vb.verticiesStack.length);
            expect(18).toEqual(vb.verticiesStack[0].size);
            expect(finalVertex[0]).toEqual(vb.verticiesStack[0].getTrimmedArray()[12]);
            expect(finalVertex[1]).toEqual(vb.verticiesStack[0].getTrimmedArray()[13]);
            expect(finalVertex[2]).toEqual(vb.verticiesStack[0].getTrimmedArray()[14]);
            expect(finalVertex[3]).toEqual(vb.verticiesStack[0].getTrimmedArray()[15]);
            expect(finalVertex[4]).toEqual(vb.verticiesStack[0].getTrimmedArray()[16]);
            expect(finalVertex[5]).toEqual(vb.verticiesStack[0].getTrimmedArray()[17]);

            let newVertex = new Float32Array([6, 5, 4, 3, 2, 1]);

            vb.addVertex(newVertex);

            expect(2).toEqual(vb.verticiesStack.length);
            expect(18).toEqual(vb.verticiesStack[0].size);
            expect(6).toEqual(vb.verticiesStack[1].size);
            expect(newVertex[0]).toEqual(vb.verticiesStack[1].getTrimmedArray()[0]);
            expect(newVertex[1]).toEqual(vb.verticiesStack[1].getTrimmedArray()[1]);
            expect(newVertex[2]).toEqual(vb.verticiesStack[1].getTrimmedArray()[2]);
            expect(newVertex[3]).toEqual(vb.verticiesStack[1].getTrimmedArray()[3]);
            expect(newVertex[4]).toEqual(vb.verticiesStack[1].getTrimmedArray()[4]);
            expect(newVertex[5]).toEqual(vb.verticiesStack[1].getTrimmedArray()[5]);
        });
    });

});