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
    const glMock = new Mock<WebGLRenderingContext>();
    const gl = glMock.Object;

    beforeAll(() =>
    {
        glMock.setup(x => x.TRIANGLES).is(0x0004);
        glMock.setup(x => x.TRIANGLE_STRIP).is(0x0005);
    });

    beforeEach(() =>
    {
        triangleBuffer = new ShapeBuffer<Triangle>();
    });

    describe("addShape", () =>
    {
        const orangeTriangle = new Triangle(new Vec3(0, 0), new Vec3(0.5, 0.5), gl, orange);
        const greenTriangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(0.75, 0.75), gl, green);
        const blueTriangle = new Triangle(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl, blue);

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
        it("should should return handle to be able to remove shape or change shape color", () =>
        {
            const orangeTriangleId = triangleBuffer.addShape(orangeTriangle);

            expect(triangleBuffer.updateColor(orangeTriangleId, blue)).toBe(true);
            expect(triangleBuffer.removeShape(orangeTriangleId)).toBe(true);
        });

    });
});