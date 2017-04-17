import { Ellipse } from "../../../src/graphics/geometry/ellipse";
import { ContextWrangler } from "../../../src/utils/contextWrangler";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";

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
            const circle = new Ellipse({x: 0.5, y: 0.5}, {x: 1.0, y: 1.0}, color, gl, Precision.Low);

            expect(55).toEqual(circle.verticies.size);

            expect(0.5).toBeCloseTo(circle.verticies.arr[0]); // x1
            expect(0.75).toBeCloseTo(circle.verticies.arr[1]); // y1
            expect(0.6).toBeCloseTo(circle.verticies.arr[5]); // x2
            expect(0.95).toBeCloseTo(circle.verticies.arr[6]); // y2
            expect(0.7).toBeCloseTo(circle.verticies.arr[10]); // x3
            expect(0.99494).toBeCloseTo(circle.verticies.arr[11]); // y3
            expect(0.8).toBeCloseTo(circle.verticies.arr[15]); // x4
            expect(0.99494).toBeCloseTo(circle.verticies.arr[16]); // y4
            expect(0.9).toBeCloseTo(circle.verticies.arr[20]); // x5
            expect(0.95).toBeCloseTo(circle.verticies.arr[21]); // y5
            expect(1.0).toBeCloseTo(circle.verticies.arr[25]); // x6
            expect(0.75).toBeCloseTo(circle.verticies.arr[26]); // y6
            expect(0.6).toBeCloseTo(circle.verticies.arr[30]); // x7
            expect(0.55).toBeCloseTo(circle.verticies.arr[31]); // y7
            expect(0.7).toBeCloseTo(circle.verticies.arr[35]); // x8
            expect(0.50505).toBeCloseTo(circle.verticies.arr[36]); // y8
            expect(0.8).toBeCloseTo(circle.verticies.arr[40]); // x9
            expect(0.50505).toBeCloseTo(circle.verticies.arr[41]); // y9
            expect(0.9).toBeCloseTo(circle.verticies.arr[45]); // x10
            expect(0.55).toBeCloseTo(circle.verticies.arr[46]); // y10
            expect(1.0).toBeCloseTo(circle.verticies.arr[50]); // x11
            expect(0.75).toBeCloseTo(circle.verticies.arr[51]); // y11
        });

        xit("when constructed with point(0.0, 0.5) and point(1.0, 1.0) AKA its a real horizontal ellipse", () =>
        {
            const horizontalEllipse = new Ellipse({x: 0.0, y: 0.5}, {x: 1.0, y: 1.0}, color, gl, Precision.Low);

            expect(22).toEqual(horizontalEllipse.verticies.size);

            expect(0.0).toBeCloseTo(horizontalEllipse.verticies.arr[0]); // x1
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[1]); // y1
            expect(0.2).toBeCloseTo(horizontalEllipse.verticies.arr[2]); // x2
            expect(0.95).toBeCloseTo(horizontalEllipse.verticies.arr[3]); // y2
            expect(0.4).toBeCloseTo(horizontalEllipse.verticies.arr[4]); // x3
            expect(0.99494).toBeCloseTo(horizontalEllipse.verticies.arr[5]); // y3
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[6]); // x4
            expect(0.99494).toBeCloseTo(horizontalEllipse.verticies.arr[7]); // y4
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[8]); // x5
            expect(0.95).toBeCloseTo(horizontalEllipse.verticies.arr[9]); // y5
            expect(1.0).toBeCloseTo(horizontalEllipse.verticies.arr[10]); // x6
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[11]); // y6
            expect(0.2).toBeCloseTo(horizontalEllipse.verticies.arr[12]); // x7
            expect(0.55).toBeCloseTo(horizontalEllipse.verticies.arr[13]); // y7
            expect(0.4).toBeCloseTo(horizontalEllipse.verticies.arr[14]); // x8
            expect(0.50505).toBeCloseTo(horizontalEllipse.verticies.arr[15]); // y8
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[16]); // x9
            expect(0.50505).toBeCloseTo(horizontalEllipse.verticies.arr[17]); // y9
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[18]); // x10
            expect(0.55).toBeCloseTo(horizontalEllipse.verticies.arr[19]); // y10
            expect(1.0).toBeCloseTo(horizontalEllipse.verticies.arr[20]); // x11
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[21]); // y11
        });

        xit("when constructed with point(0.0, 0.0) and point(0.5, 1.0) AKA its vertical ellipse", () =>
        {
            const verticalEllipse = new Ellipse({x: 0.0, y: 0.0}, {x: 0.5, y: 1.0}, color, gl, Precision.Low);

            expect(22).toEqual(verticalEllipse.verticies.size);

            expect(0.0).toBeCloseTo(verticalEllipse.verticies.arr[0]); // x1
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[1]); // y1
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[2]); // x2
            expect(0.9).toBeCloseTo(verticalEllipse.verticies.arr[3]); // y2
            expect(0.2).toBeCloseTo(verticalEllipse.verticies.arr[4]); // x3
            expect(0.98989).toBeCloseTo(verticalEllipse.verticies.arr[5]); // y3
            expect(0.3).toBeCloseTo(verticalEllipse.verticies.arr[6]); // x4
            expect(0.98989).toBeCloseTo(verticalEllipse.verticies.arr[7]); // y4
            expect(0.4).toBeCloseTo(verticalEllipse.verticies.arr[8]); // x5
            expect(0.9).toBeCloseTo(verticalEllipse.verticies.arr[9]); // y5
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[10]); // x6
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[11]); // y6
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[12]); // x7
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[13]); // y7
            expect(0.2).toBeCloseTo(verticalEllipse.verticies.arr[14]); // x8
            expect(0.0101).toBeCloseTo(verticalEllipse.verticies.arr[15]); // y8
            expect(0.3).toBeCloseTo(verticalEllipse.verticies.arr[16]); // x9
            expect(0.0101).toBeCloseTo(verticalEllipse.verticies.arr[17]); // y9
            expect(0.4).toBeCloseTo(verticalEllipse.verticies.arr[18]); // x10
            expect(0.1).toBeCloseTo(verticalEllipse.verticies.arr[19]); // y10
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[20]); // x11
            expect(0.5).toBeCloseTo(verticalEllipse.verticies.arr[21]); // y11
        });
    });
});