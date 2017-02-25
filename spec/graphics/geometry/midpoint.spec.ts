import { Midpoint } from "../../../src/graphics/geometry/midpoint";


describe("Midpoint ", () =>
{
    describe("between ", () =>
    {
        it("point(0.8, 0.8) and point(-0.4, -0.4)", () =>
        {
            let midpoint = Midpoint.between({x: 0.8, y: 0.8}, {x: -0.4, y: -0.4});
            expect(midpoint.x).toBeCloseTo(0.2, 10);
            expect(midpoint.y).toBeCloseTo(0.2, 10);
        });
        it("point(-0.8, -0.8) and point(-0.4, -0.4)", () =>
        {
            let midpoint = Midpoint.between({x: -0.8, y: -0.8}, {x: -0.4, y: -0.4});
            expect(midpoint.x).toBeCloseTo(-0.6, 10);
            expect(midpoint.y).toBeCloseTo(-0.6, 10);
        });
        it("point(0.8, 0.8) and point(0.4, 0.4)", () =>
        {
            let midpoint = Midpoint.between({x: 0.8, y: 0.8}, {x: 0.4, y: 0.4});
            expect(midpoint.x).toBeCloseTo(0.6, 10);
            expect(midpoint.y).toBeCloseTo(0.6, 10);
        });
        it("point(-0.8, -0.8) and point(0.4, 0.4)", () =>
        {
            let midpoint = Midpoint.between({x: -0.8, y: -0.8}, {x: 0.4, y: 0.4});
            expect(midpoint.x).toBeCloseTo(-0.2, 10);
            expect(midpoint.y).toBeCloseTo(-0.2, 10);
        });
    });
});