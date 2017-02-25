import { BoundingRectangle } from "../../../src/graphics/geometry/boundingRectangle";

describe("BoundingRectangle ", () =>
{
    describe("constructor ", () =>
    {
        describe("should initialize points correctly ", () =>
        {
            //topLeft bottomRight
            it("when constructed with point(-0.8, 0.1) and point(-0.1, -0.8)", () =>
            {
                const boundingRect =
                    new BoundingRectangle({x: -0.8, y: 0.1}, {x: -0.1, y: -0.8});
                expect(boundingRect.topLeft).toEqual(jasmine.objectContaining({x: -0.8, y: 0.1}));
                expect(boundingRect.topRight).toEqual(jasmine.objectContaining({x: -0.1, y: 0.1}));
                expect(boundingRect.bottomRight).toEqual(jasmine.objectContaining({x: -0.1, y: -0.8}));
                expect(boundingRect.bottomLeft).toEqual(jasmine.objectContaining({x: -0.8, y: -0.8}));                
            });
            //bottomRight topLeft
            it("when constructed with point(0.8, 0.1) and point(0.1, 0.1)", () =>
            {
                const boundingRect =
                    new BoundingRectangle({x: 0.8, y: 0.1}, {x: 0.1, y: 0.8});
                expect(boundingRect.topLeft).toEqual(jasmine.objectContaining({x: 0.1, y: 0.8}));
                expect(boundingRect.topRight).toEqual(jasmine.objectContaining({x: 0.8, y: 0.8}));
                expect(boundingRect.bottomRight).toEqual(jasmine.objectContaining({x: 0.8, y: 0.1}));                
                expect(boundingRect.bottomLeft).toEqual(jasmine.objectContaining({x: 0.1, y: 0.1}));                
            });
            //bottomLeft topRight
            it("when constructed with point(-0.8, 0.1) and point(-0.1, 0.8)", () =>
            {
                const boundingRect =
                    new BoundingRectangle({x: -0.8, y: 0.1}, {x: -0.1, y: 0.8});
                expect(boundingRect.topLeft).toEqual(jasmine.objectContaining({x: -0.8, y: 0.8}));
                expect(boundingRect.topRight).toEqual(jasmine.objectContaining({x: -0.1, y: 0.8}));
                expect(boundingRect.bottomRight).toEqual(jasmine.objectContaining({x: -0.1, y: 0.1}));
                expect(boundingRect.bottomLeft).toEqual(jasmine.objectContaining({x: -0.8, y: 0.1}));                
            });
            //topRight bottomLeft
            it("when constructed with point(0.8, -0.1) and point(0.1, -0.8)", () =>
            {
                const boundingRect =
                    new BoundingRectangle({x: 0.8, y: -0.1}, {x: 0.1, y: -0.8});
                expect(boundingRect.topLeft).toEqual(jasmine.objectContaining({x: 0.1, y: -0.1}));
                expect(boundingRect.topRight).toEqual(jasmine.objectContaining({x: 0.8, y: -0.1}));
                expect(boundingRect.bottomRight).toEqual(jasmine.objectContaining({x: 0.8, y: -0.8}));
                expect(boundingRect.bottomLeft).toEqual(jasmine.objectContaining({x: 0.1, y: -0.8}));                
            });
        });
    });
});