import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { ContextWrangler } from "../../../src/utils/contextWrangler";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "../../../src/math/vec3";

describe("HorizontalEllipse ", () =>
{
    describe("constructor should initialize points correctly ", () =>
    {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const gl = ContextWrangler.getContext(canvas);
        const color = new RGBColor(1.0, 1.0, 1.0);

        it("when constructed with point(0.5, 0.5) and point(1.0, 1.0) AKA its actually a circle", () =>
        {
            const circle = new Ellipse(new Vec3(0.5, 0.5), new Vec3(1.0, 1.0), color, gl, Precision.Low);

            expect(66).toEqual(circle.verticies.size);

            expect(0.5).toBeCloseTo(circle.verticies.arr[0]); // x1
            expect(0.75).toBeCloseTo(circle.verticies.arr[1]); // y1
            expect(0.6).toBeCloseTo(circle.verticies.arr[6]); // x2
            expect(0.95).toBeCloseTo(circle.verticies.arr[7]); // y2
            expect(0.7).toBeCloseTo(circle.verticies.arr[12]); // x3
            expect(0.99494).toBeCloseTo(circle.verticies.arr[13]); // y3
            expect(0.8).toBeCloseTo(circle.verticies.arr[18]); // x4
            expect(0.99494).toBeCloseTo(circle.verticies.arr[19]); // y4
            expect(0.9).toBeCloseTo(circle.verticies.arr[24]); // x5
            expect(0.95).toBeCloseTo(circle.verticies.arr[25]); // y5
            expect(1.0).toBeCloseTo(circle.verticies.arr[30]); // x6
            expect(0.75).toBeCloseTo(circle.verticies.arr[31]); // y6
            expect(0.6).toBeCloseTo(circle.verticies.arr[36]); // x7
            expect(0.55).toBeCloseTo(circle.verticies.arr[37]); // y7
            expect(0.7).toBeCloseTo(circle.verticies.arr[42]); // x8
            expect(0.50505).toBeCloseTo(circle.verticies.arr[43]); // y8
            expect(0.8).toBeCloseTo(circle.verticies.arr[48]); // x9
            expect(0.50505).toBeCloseTo(circle.verticies.arr[49]); // y9
            expect(0.9).toBeCloseTo(circle.verticies.arr[54]); // x10
            expect(0.55).toBeCloseTo(circle.verticies.arr[55]); // y10
            expect(1.0).toBeCloseTo(circle.verticies.arr[60]); // x11
            expect(0.75).toBeCloseTo(circle.verticies.arr[61]); // y11
        });

        it("when constructed with point(0.0, 0.5) and point(1.0, 1.0) AKA its a real horizontal ellipse", () =>
        {
            const horizontalEllipse = new Ellipse(new Vec3(0.0, 0.5), new Vec3(1.0, 1.0), color, gl, Precision.Low);

            expect(66).toEqual(horizontalEllipse.verticies.size);

            expect(0.0).toBeCloseTo(horizontalEllipse.verticies.arr[0]); // x1
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[1]); // y1
            expect(0.2).toBeCloseTo(horizontalEllipse.verticies.arr[6]); // x2
            expect(0.95).toBeCloseTo(horizontalEllipse.verticies.arr[7]); // y2
            expect(0.4).toBeCloseTo(horizontalEllipse.verticies.arr[12]); // x3
            expect(0.99494).toBeCloseTo(horizontalEllipse.verticies.arr[13]); // y3
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[18]); // x4
            expect(0.99494).toBeCloseTo(horizontalEllipse.verticies.arr[19]); // y4
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[24]); // x5
            expect(0.95).toBeCloseTo(horizontalEllipse.verticies.arr[25]); // y5
            expect(1.0).toBeCloseTo(horizontalEllipse.verticies.arr[30]); // x6
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[31]); // y6
            expect(0.2).toBeCloseTo(horizontalEllipse.verticies.arr[36]); // x7
            expect(0.55).toBeCloseTo(horizontalEllipse.verticies.arr[37]); // y7
            expect(0.4).toBeCloseTo(horizontalEllipse.verticies.arr[42]); // x8
            expect(0.50505).toBeCloseTo(horizontalEllipse.verticies.arr[43]); // y8
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[48]); // x9
            expect(0.50505).toBeCloseTo(horizontalEllipse.verticies.arr[49]); // y9
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[54]); // x10
            expect(0.55).toBeCloseTo(horizontalEllipse.verticies.arr[55]); // y10
            expect(1.0).toBeCloseTo(horizontalEllipse.verticies.arr[60]); // x11
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[61]); // y11
        });

        it("when constructed with point(0.0, 0.0) and point(0.5, 1.0) AKA its vertical ellipse", () =>
        {
            const verticalEllipse = new Ellipse(new Vec3(0.0, 0.0), new Vec3(0.5, 1.0), color, gl, Precision.Low);

            expect(66).toEqual(verticalEllipse.verticies.size);

            expect(0.0).toBeCloseTo(verticalEllipse.verticies.arr[0]); // x1
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[1]); // y1
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[6]); // x2
            expect(0.9).toBeCloseTo(verticalEllipse.verticies.arr[7]); // y2
            expect(0.2).toBeCloseTo(verticalEllipse.verticies.arr[12]); // x3
            expect(0.98989).toBeCloseTo(verticalEllipse.verticies.arr[13]); // y3
            expect(0.3).toBeCloseTo(verticalEllipse.verticies.arr[18]); // x4
            expect(0.98989).toBeCloseTo(verticalEllipse.verticies.arr[19]); // y4
            expect(0.4).toBeCloseTo(verticalEllipse.verticies.arr[24]); // x5
            expect(0.9).toBeCloseTo(verticalEllipse.verticies.arr[25]); // y5
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[30]); // x6
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[31]); // y6
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[36]); // x7
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[37]); // y7
            expect(0.2).toBeCloseTo(verticalEllipse.verticies.arr[42]); // x8
            expect(0.0101).toBeCloseTo(verticalEllipse.verticies.arr[43]); // y8
            expect(0.3).toBeCloseTo(verticalEllipse.verticies.arr[48]); // x9
            expect(0.0101).toBeCloseTo(verticalEllipse.verticies.arr[49]); // y9
            expect(0.4).toBeCloseTo(verticalEllipse.verticies.arr[54]); // x10
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[55]); // y10
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[60]); // x11
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[61]); // y11
        });
    });
});