import { Vec3 } from "cuon-matrix-ts";

import { Camera } from "../../src/graphics/camera";
import { Settings } from "../../src/settings";

describe("camera:", () =>
{
    let camera: Camera;

    beforeEach(() =>
    {
        camera = new Camera();
    });

    it("constructor intializes properties correctly", () =>
    {
        camera = new Camera();

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.modelMatrix);
    });


    it("translateX sets the correct properties", () =>
    {
        camera.translateX(0.5);

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.5, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.modelMatrix);
    });

    it("translateY sets the correct properties", () =>
    {
        camera.translateY(-0.5);

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.5, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.modelMatrix);
    });

    it("zoomIn sets the correct properties", () =>
    {
        camera.zoomIn();

        const expectedModelMatrix = new Float32Array(
            [1.0499999523162842, 0, 0, 0, 0, 1.0499999523162842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.modelMatrix);
    });

    it("zoomOut sets the correct properties", () =>
    {
        camera.zoomOut();

        const expectedModelMatrix = new Float32Array(
            [0.949999988079071, 0, 0, 0, 0, 0.949999988079071, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.modelMatrix);
    });
});