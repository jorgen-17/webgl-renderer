import { Vec3 } from "cuon-matrix-ts";

import { Camera } from "../../src/graphics/camera";
import { Settings } from "../../src/settings";

describe("camera:", () =>
{
    let camera: Camera;
    const width = 800;
    const height = 600;
    const aspectRatio = (width / height);

    beforeEach(() =>
    {
        camera = new Camera(aspectRatio);
    });

    it("constructor intializes properties correctly", () =>
    {
        camera = new Camera(aspectRatio);

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.vpMatrix.elements);
    });


    it("translateX sets the correct properties", () =>
    {
        camera.panX(0.5);

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.5, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("translateY sets the correct properties", () =>
    {
        camera.panY(-0.5);

        const expectedModelMatrix = new Float32Array(
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.5, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("zoomIn sets the correct properties", () =>
    {
        camera.zoomIn();

        const expectedModelMatrix = new Float32Array(
            [1.0499999523162842, 0, 0, 0, 0, 1.0499999523162842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("zoomOut sets the correct properties", () =>
    {
        camera.zoomOut();

        const expectedModelMatrix = new Float32Array(
            [0.949999988079071, 0, 0, 0, 0, 0.949999988079071, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

        expect(expectedModelMatrix).toEqual(camera.vpMatrix.elements);
    });
});