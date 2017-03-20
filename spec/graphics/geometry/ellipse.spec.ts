import { BoundingRectangle } from "../../../src/graphics/geometry/boundingRectangle";
import { HorizontalEllipse } from "../../../src/graphics/geometry/ellipse";

describe("HorizontalEllipse ", () =>
{
    describe("constructor should initialize points correctly ", () =>
    {
        const numberOfVerticies = 10;

        it("when constructed with point(-0.8, 0.1) and point(-0.1, -0.8)", () =>
        {
            let boundingRect = new BoundingRectangle({x: -0.8, y: 0.1}, {x: -0.1, y: -0.8});
            let horizontalRadius = boundingRect.topRight.x - boundingRect.topLeft.x / 2;
            let verticalRadius = boundingRect.topLeft.y - boundingRect.bottomLeft.y / 2;
            const horizontalEllipse = new HorizontalEllipse(boundingRect, horizontalRadius, verticalRadius, gl, numberOfVerticies)

            // expect(boundingRect.bottomLeft).toEqual(jasmine.objectContaining({x: 0.1, y: -0.8}));
        });
    });
});