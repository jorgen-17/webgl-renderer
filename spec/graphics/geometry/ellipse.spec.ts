import { BoundingRectangle } from "../../../src/graphics/geometry/boundingRectangle";
import { HorizontalEllipse } from "../../../src/graphics/geometry/ellipse";
import { ContextWrangler } from "../../../src/utils/contextWrangler";

describe("HorizontalEllipse ", () =>
{
    describe("constructor should initialize points correctly ", () =>
    {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const gl = ContextWrangler.getContext(canvas);
        const numberOfVerticies = 10;

        it("when constructed with point(0.5, 0.5) and point(1.0, 1.0)", () =>
        {
            let boundingRect = new BoundingRectangle({x: 0.5, y: 0.5}, {x: 1.0, y: 1.0});
            let horizontalRadius = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
            let verticalRadius = (boundingRect.topLeft.y - boundingRect.bottomLeft.y) / 2;
            const horizontalEllipse = new HorizontalEllipse(boundingRect, horizontalRadius, verticalRadius, gl, numberOfVerticies);

            expect(20).toEqual(horizontalEllipse.verticies.size);

            expect(0.5).toBeCloseTo(horizontalEllipse.verticies.arr[0]); // x1
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[1]); // y1
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[2]); // x2
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[3]); // y2
            expect(0.7).toBeCloseTo(horizontalEllipse.verticies.arr[4]); // x3
            expect(0.7).toBeCloseTo(horizontalEllipse.verticies.arr[5]); // y3
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[6]); // x4
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[7]); // y4
            expect(0.9).toBeCloseTo(horizontalEllipse.verticies.arr[8]); // x5
            expect(0.9).toBeCloseTo(horizontalEllipse.verticies.arr[9]); // y5
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[10]); // x6
            expect(0.6).toBeCloseTo(horizontalEllipse.verticies.arr[11]); // y6
            expect(0.7).toBeCloseTo(horizontalEllipse.verticies.arr[12]); // x7
            expect(0.7).toBeCloseTo(horizontalEllipse.verticies.arr[13]); // y7
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[14]); // x8
            expect(0.8).toBeCloseTo(horizontalEllipse.verticies.arr[15]); // y8
            expect(0.9).toBeCloseTo(horizontalEllipse.verticies.arr[16]); // x9
            expect(0.9).toBeCloseTo(horizontalEllipse.verticies.arr[17]); // y9
            expect(1.0).toBeCloseTo(horizontalEllipse.verticies.arr[18]); // x10
            expect(0.75).toBeCloseTo(horizontalEllipse.verticies.arr[19]); // y10
        });
    });
});