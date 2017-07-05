import { Ellipse } from "../../../src/graphics/shapes2d/ellipse";
import { ContextWrangler } from "../../../src/utils/contextWrangler";
import { Precision } from "../../../src/graphics/precision";
import { RGBColor } from "../../../src/graphics/rgbColor";
import { Vec3 } from "../../../src/math/vec3";
import { Triangle } from "../../../src/graphics/shapes2d/triangle";

import * as gl from "headless-gl";

describe("Triangle ", () =>
{
    describe("constructor", () =>
    {
        const color = new RGBColor(1.0, 1.0, 1.0);

        it("should initialize basic properties correctly", () =>
        {
            const triangle = new Triangle(new Vec3(0, 0), new Vec3(1.0, 1.0), color, gl);

            triangle.rgbColor = color;

            // expect()
        });

        describe("should initialize vertex positions and color correctly ", () =>
        {
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
        });
    });

});