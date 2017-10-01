import { Midpoint, ThirdPoints } from "../../../../src/graphics/shape/midpoint";
import { Vec3 } from "cuon-matrix-ts";

describe("Midpoint ", () =>
{
    describe("between ", () =>
    {
        it("point(0.8, 0.8) and point(-0.4, -0.4)", () =>
        {
            let midpoint = Midpoint.between(new Vec3(0.8, 0.8), new Vec3(-0.4, -0.4));
            expect(midpoint.x).toBeCloseTo(0.2, 7);
            expect(midpoint.y).toBeCloseTo(0.2, 7);
        });
        it("point(-0.8, -0.8) and point(-0.4, -0.4)", () =>
        {
            let midpoint = Midpoint.between(new Vec3(-0.8, -0.8), new Vec3(-0.4, -0.4));
            expect(midpoint.x).toBeCloseTo(-0.6, 7);
            expect(midpoint.y).toBeCloseTo(-0.6, 7);
        });
        it("point(0.8, 0.8) and point(0.4, 0.4)", () =>
        {
            let midpoint = Midpoint.between(new Vec3(0.8, 0.8), new Vec3(0.4, 0.4));
            expect(midpoint.x).toBeCloseTo(0.6, 7);
            expect(midpoint.y).toBeCloseTo(0.6, 7);
        });
        it("point(-0.8, -0.8) and point(0.4, 0.4)", () =>
        {
            let midpoint = Midpoint.between(new Vec3(-0.8, -0.8), new Vec3(0.4, 0.4));
            expect(midpoint.x).toBeCloseTo(-0.2, 7);
            expect(midpoint.y).toBeCloseTo(-0.2, 7);
        });
    });
});

describe("ThirdPoints ", () =>
{
    describe("between ", () =>
    {
        it("point(0.9, 0.9) and point(-0.9, -0.9)", () =>
        {
            let { first , second } = ThirdPoints.between(new Vec3(0.9, 0.9), new Vec3(-0.9, -0.9));
            expect(first.x).toBeCloseTo(-0.3, 7);
            expect(first.y).toBeCloseTo(-0.3, 7);
            expect(second.x).toBeCloseTo(0.3, 7);
            expect(second.y).toBeCloseTo(0.3, 7);
        });
        it("point(-0.9, -0.9) and point(-0.6, -0.6)", () =>
        {
            let { first , second } = ThirdPoints.between(new Vec3(-0.9, -0.9), new Vec3(-0.6, -0.6));
            expect(first.x).toBeCloseTo(-0.8, 7);
            expect(first.y).toBeCloseTo(-0.8, 7);
            expect(second.x).toBeCloseTo(-0.7, 7);
            expect(second.y).toBeCloseTo(-0.7, 7);
        });
        it("point(0.9, 0.9) and point(0.6, 0.6)", () =>
        {
            let { first , second } = ThirdPoints.between(new Vec3(0.9, 0.9), new Vec3(0.6, 0.6));
            expect(first.x).toBeCloseTo(0.7, 7);
            expect(first.y).toBeCloseTo(0.7, 7);
            expect(second.x).toBeCloseTo(0.8, 7);
            expect(second.y).toBeCloseTo(0.8, 7);
        });
        it("point(-0.9, -0.9) and point(0.9, 0.9)", () =>
        {
            let { first , second } = ThirdPoints.between(new Vec3(-0.9, -0.9), new Vec3(0.9, 0.9));
            expect(first.x).toBeCloseTo(-0.3, 7);
            expect(first.y).toBeCloseTo(-0.3, 7);
            expect(second.x).toBeCloseTo(0.3, 7);
            expect(second.y).toBeCloseTo(0.3, 7);
        });
    });
});