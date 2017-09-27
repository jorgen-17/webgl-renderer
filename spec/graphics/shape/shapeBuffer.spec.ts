import { Vec3, Mat4 } from "cuon-matrix-ts";
import { Mock } from "ts-mocks";

import { RGBColor } from "../../../src/graphics/color/rgbColor";
import { Triangle } from "../../../src/graphics/shape/shape2d/triangle";
import { ShapeBuffer } from "../../../src/graphics/shape/shapeBuffer";
import { WebglRendererTestHelper } from "../../../specHelpers/graphics/webglRenderer.spec.helper";

describe("shapeFactory:", () =>
{
    let triangleBuffer: ShapeBuffer<Triangle>;

    const point1 = new Vec3(0.5, 0.5);
    const point2 = new Vec3(1, 1);

    const orange = new RGBColor(1.0, 0.271, 0.0);
    const green = new RGBColor(0.0, 1.0, 0.0);
    const blue = new RGBColor(0.0, 0.0, 1.0);
    let orangeTriangle: Triangle;
    let greenTriangle: Triangle;
    let blueTriangle: Triangle;

    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);
        glMock.setup(x => x.createBuffer)
        .is(() => 1);
        glMock.setup(x => x.deleteBuffer)
        .is((buffer: WebGLBuffer) => { /* noop */ });
    });

    beforeEach(() =>
    {
        triangleBuffer = new ShapeBuffer<Triangle>(gl);
        orangeTriangle = new Triangle(new Vec3(0, 0), new Vec3(0.5, 0.5), gl, orange);
        greenTriangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(0.75, 0.75), gl, green);
        blueTriangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, blue);
    });

    describe("addShape", () =>
    {
        it("should append verticies to verticies array", () =>
        {
            expect(triangleBuffer.verticies).toEqual(new Float32Array(0));

            triangleBuffer.addShape(orangeTriangle);

            expect(orangeTriangle.verticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.addShape(greenTriangle);

            let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                greenTriangle.verticies
            ]);

            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.addShape(blueTriangle);

            expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                greenTriangle.verticies,
                blueTriangle.verticies
            ]);

            expect(expectedVerticies).toEqual(triangleBuffer.verticies);
        });
        it("should increment shape count", () =>
        {
            expect(triangleBuffer.count).toEqual(0);

            triangleBuffer.addShape(orangeTriangle);
            expect(triangleBuffer.count).toEqual(1);

            triangleBuffer.addShape(greenTriangle);
            expect(triangleBuffer.count).toEqual(2);

            triangleBuffer.addShape(blueTriangle);
            expect(triangleBuffer.count).toEqual(3);
        });
        it("should return handle to be able to remove shape or change shape color", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);

            expect(triangleBuffer.updateColor(orangeTriangleId, blue)).toBe(true);
            expect(triangleBuffer.removeShape(orangeTriangleId)).toBe(true);
        });
    });

    describe("deleteShape", () =>
    {
        it("should append verticies to verticies array", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);
            const greenTriangleId = triangleBuffer.addShape(greenTriangle);
            const blueTriangleId = triangleBuffer.addShape(blueTriangle);

            let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                greenTriangle.verticies,
                blueTriangle.verticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.removeShape(greenTriangleId);
            expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                blueTriangle.verticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.removeShape(blueTriangleId);
            expect(orangeTriangle.verticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.removeShape(orangeTriangleId);
            expect(new Float32Array(0)).toEqual(triangleBuffer.verticies);
        });
        it("should decrement shape count", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);
            const greenTriangleId = triangleBuffer.addShape(greenTriangle);
            const blueTriangleId = triangleBuffer.addShape(blueTriangle);
            expect(triangleBuffer.count).toEqual(3);

            triangleBuffer.removeShape(greenTriangleId);
            expect(triangleBuffer.count).toEqual(2);

            triangleBuffer.removeShape(orangeTriangleId);
            expect(triangleBuffer.count).toEqual(1);

            triangleBuffer.removeShape(blueTriangleId);
            expect(triangleBuffer.count).toEqual(0);
        });
        it("should return true if found and deleted object, otherwise retuns false", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);

            expect(triangleBuffer.removeShape("someId")).toBe(false);
            expect(triangleBuffer.removeShape(orangeTriangleId)).toBe(true);
        });
    });

    describe("deleteShape", () =>
    {
        it("should append verticies to verticies array", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);
            const greenTriangleId = triangleBuffer.addShape(greenTriangle);
            const blueTriangleId = triangleBuffer.addShape(blueTriangle);

            let expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                greenTriangle.verticies,
                blueTriangle.verticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.updateColor(greenTriangleId, blue);
            const expectedGreenTriangleVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                new Float32Array([0.5, 0.5, 0, blue.red, blue.green, blue.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([0.625, 0.75, 0, blue.red, blue.green, blue.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([0.75, 0.5, 0, blue.red, blue.green, blue.blue]),
                new Mat4().setIdentity().elements,
            ]);
            expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                expectedGreenTriangleVerticies,
                blueTriangle.verticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.updateColor(blueTriangleId, orange);
            const expectedBlueTriangleVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                new Float32Array([0.5, 0.5, 0, orange.red, orange.green, orange.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([0.75, 1, 0, orange.red, orange.green, orange.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([1, 0.5, 0, orange.red, orange.green, orange.blue]),
                new Mat4().setIdentity().elements,
            ]);
            expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                orangeTriangle.verticies,
                expectedGreenTriangleVerticies,
                expectedBlueTriangleVerticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);

            triangleBuffer.updateColor(orangeTriangleId, green);
            const expectedOrangeTriangleVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                new Float32Array([0, 0, 0, green.red, green.green, green.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([0.25, 0.5, 0, green.red, green.green, green.blue]),
                new Mat4().setIdentity().elements,
                new Float32Array([0.5, 0, 0, green.red, green.green, green.blue]),
                new Mat4().setIdentity().elements,
            ]);
            expectedVerticies = WebglRendererTestHelper.concatFloat32Arrays([
                expectedOrangeTriangleVerticies,
                expectedGreenTriangleVerticies,
                expectedBlueTriangleVerticies
            ]);
            expect(expectedVerticies).toEqual(triangleBuffer.verticies);
        });
        it("should return true if found and updated the color, otherwise retuns false", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);

            expect(triangleBuffer.updateColor("someId", green)).toBe(false);
            expect(triangleBuffer.updateColor(orangeTriangleId, green)).toBe(true);
        });
    });
});