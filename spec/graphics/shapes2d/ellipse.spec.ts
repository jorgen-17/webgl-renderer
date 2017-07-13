import { Mock } from "ts-mocks";

import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "cuon-matrix-ts";


describe("HorizontalEllipse ", () =>
{
    describe("constructor should initialize points correctly ", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);
        const gl = new Mock<WebGLRenderingContext>();

        beforeAll(() =>
        {
            gl.setup(x => x.TRIANGLE_FAN).is(0x0006);
        });

        it("should initialize basic properties correctly", () =>
        {
            const ellipse = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object,
                Precision.Low, color);

            expect(color).toBe(ellipse.rgbColor);
            expect(6).toBe(ellipse.glRenderMode);
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
            it("when constructed with point(0.5, 0.5) and point(1.0, 1.0) AKA its actually a circle", () =>
            {
                const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), gl.Object,
                    Precision.Low, color);

                expect(66).toEqual(circle.verticies.length);

                expect(0.5).toBeCloseTo(circle.verticies[0]); // x1
                expect(0.75).toBeCloseTo(circle.verticies[1]); // y1
                expect(0.6).toBeCloseTo(circle.verticies[6]); // x2
                expect(0.95).toBeCloseTo(circle.verticies[7]); // y2
                expect(0.7).toBeCloseTo(circle.verticies[12]); // x3
                expect(0.99494).toBeCloseTo(circle.verticies[13]); // y3
                expect(0.8).toBeCloseTo(circle.verticies[18]); // x4
                expect(0.99494).toBeCloseTo(circle.verticies[19]); // y4
                expect(0.9).toBeCloseTo(circle.verticies[24]); // x5
                expect(0.95).toBeCloseTo(circle.verticies[25]); // y5
                expect(1.0).toBeCloseTo(circle.verticies[30]); // x6
                expect(0.75).toBeCloseTo(circle.verticies[31]); // y6
                expect(0.6).toBeCloseTo(circle.verticies[36]); // x7
                expect(0.55).toBeCloseTo(circle.verticies[37]); // y7
                expect(0.7).toBeCloseTo(circle.verticies[42]); // x8
                expect(0.50505).toBeCloseTo(circle.verticies[43]); // y8
                expect(0.8).toBeCloseTo(circle.verticies[48]); // x9
                expect(0.50505).toBeCloseTo(circle.verticies[49]); // y9
                expect(0.9).toBeCloseTo(circle.verticies[54]); // x10
                expect(0.55).toBeCloseTo(circle.verticies[55]); // y10
                expect(1.0).toBeCloseTo(circle.verticies[60]); // x11
                expect(0.75).toBeCloseTo(circle.verticies[61]); // y11
            });

            it("when constructed with point(0.0, 0.5) and point(1.0, 1.0) AKA its a real horizontal ellipse", () =>
            {
                const horizontalEllipse = new Ellipse(new Vec3(0.0, 0.5), new Vec3(1.0, 1.0), gl.Object,
                    Precision.Low, color);

                expect(66).toEqual(horizontalEllipse.verticies.length);

                expect(0.0).toBeCloseTo(horizontalEllipse.verticies[0]); // x1
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[1]); // y1
                expect(0.2).toBeCloseTo(horizontalEllipse.verticies[6]); // x2
                expect(0.95).toBeCloseTo(horizontalEllipse.verticies[7]); // y2
                expect(0.4).toBeCloseTo(horizontalEllipse.verticies[12]); // x3
                expect(0.99494).toBeCloseTo(horizontalEllipse.verticies[13]); // y3
                expect(0.6).toBeCloseTo(horizontalEllipse.verticies[18]); // x4
                expect(0.99494).toBeCloseTo(horizontalEllipse.verticies[19]); // y4
                expect(0.8).toBeCloseTo(horizontalEllipse.verticies[24]); // x5
                expect(0.95).toBeCloseTo(horizontalEllipse.verticies[25]); // y5
                expect(1.0).toBeCloseTo(horizontalEllipse.verticies[30]); // x6
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[31]); // y6
                expect(0.2).toBeCloseTo(horizontalEllipse.verticies[36]); // x7
                expect(0.55).toBeCloseTo(horizontalEllipse.verticies[37]); // y7
                expect(0.4).toBeCloseTo(horizontalEllipse.verticies[42]); // x8
                expect(0.50505).toBeCloseTo(horizontalEllipse.verticies[43]); // y8
                expect(0.6).toBeCloseTo(horizontalEllipse.verticies[48]); // x9
                expect(0.50505).toBeCloseTo(horizontalEllipse.verticies[49]); // y9
                expect(0.8).toBeCloseTo(horizontalEllipse.verticies[54]); // x10
                expect(0.55).toBeCloseTo(horizontalEllipse.verticies[55]); // y10
                expect(1.0).toBeCloseTo(horizontalEllipse.verticies[60]); // x11
                expect(0.75).toBeCloseTo(horizontalEllipse.verticies[61]); // y11
            });

            it("when constructed with point(0.0, 0.0) and point(0.5, 1.0) AKA its vertical ellipse", () =>
            {
                const verticalEllipse = new Ellipse(new Vec3(0.0, 0.0), new Vec3(0.5, 1.0), gl.Object,
                    Precision.Low, color);

                expect(66).toEqual(verticalEllipse.verticies.length);

                expect(0.0).toBeCloseTo(verticalEllipse.verticies[0]); // x1
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[1]); // y1
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[6]); // x2
                expect(0.9).toBeCloseTo(verticalEllipse.verticies[7]); // y2
                expect(0.2).toBeCloseTo(verticalEllipse.verticies[12]); // x3
                expect(0.98989).toBeCloseTo(verticalEllipse.verticies[13]); // y3
                expect(0.3).toBeCloseTo(verticalEllipse.verticies[18]); // x4
                expect(0.98989).toBeCloseTo(verticalEllipse.verticies[19]); // y4
                expect(0.4).toBeCloseTo(verticalEllipse.verticies[24]); // x5
                expect(0.9).toBeCloseTo(verticalEllipse.verticies[25]); // y5
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[30]); // x6
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[31]); // y6
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[36]); // x7
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[37]); // y7
                expect(0.2).toBeCloseTo(verticalEllipse.verticies[42]); // x8
                expect(0.0101).toBeCloseTo(verticalEllipse.verticies[43]); // y8
                expect(0.3).toBeCloseTo(verticalEllipse.verticies[48]); // x9
                expect(0.0101).toBeCloseTo(verticalEllipse.verticies[49]); // y9
                expect(0.4).toBeCloseTo(verticalEllipse.verticies[54]); // x10
                expect(0.1).toBeCloseTo(verticalEllipse.verticies[55]); // y10
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[60]); // x11
                expect(0.5).toBeCloseTo(verticalEllipse.verticies[61]); // y11
            });
        });
    });
});