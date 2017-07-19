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
        camera = new Camera(Settings.defaultEyePosition,
            Settings.defaultLookAtPoint, Settings.defaultUpPosition);

        expect(Settings.defaultEyePosition).toEqual(camera.eyePosition);
        expect(Settings.defaultLookAtPoint).toEqual(camera.lookAtPoint);
        expect(Settings.defaultUpPosition).toEqual(camera.upPosition);

        const expectedViewMatrix = new Float32Array(
            [1, 0, -0, 0, -0, 1, -0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        expect(expectedViewMatrix).toEqual(camera.viewMatrix);
    });


    it("constructor uses defaults from settings object", () =>
    {
        expect(Settings.defaultEyePosition).toEqual(camera.eyePosition);
        expect(Settings.defaultLookAtPoint).toEqual(camera.lookAtPoint);
        expect(Settings.defaultUpPosition).toEqual(camera.upPosition);
    });

    it("setCameraView sets the correct properties", () =>
    {
        let newEyePosition = new Vec3(5, 5, 5);
        let newLookAtPoint = new Vec3(7, 7, 7);
        let newUpPosition = new Vec3(5, 7, 3);

        camera.setCameraView(newEyePosition, newLookAtPoint, newUpPosition);

        expect(newEyePosition).toEqual(camera.eyePosition);
        expect(newLookAtPoint).toEqual(camera.lookAtPoint);
        expect(newUpPosition).toEqual(camera.upPosition);

        const expectedViewMatrix = new Float32Array(
            [
                -0.8164966106414795,
                0,
                -0.5773502588272095,
                0,
                0.40824830532073975,
                0.7071067690849304,
                -0.5773502588272095,
                0,
                0.40824830532073975,
                -0.7071067690849304,
                -0.5773502588272095,
                0,
                0,
                0,
                8.660253524780273,
                1
            ]);

        expect(expectedViewMatrix).toEqual(camera.viewMatrix);
    });

    it("translateEyePosition sets the correct properties", () =>
    {
        let newEyePosition = new Vec3(1, 1, 5);

        camera.translateEyePosition(newEyePosition);

        const expectedNewLookAtPoint = new Vec3(newEyePosition.x, newEyePosition.y,
            newEyePosition.z - 1);
        const expectedNewUpPosition = new Vec3(newEyePosition.x, newEyePosition.y + 1,
            newEyePosition.z);

        expect(newEyePosition).toEqual(camera.eyePosition);
        expect(expectedNewLookAtPoint).toEqual(camera.lookAtPoint);
        expect(expectedNewUpPosition).toEqual(camera.upPosition);

        const expectedViewMatrix = new Float32Array(
            [
                0.8944271802902222,
                0.4472135901451111,
                -0,
                0,
                -0.4472135901451111,
                0.8944271802902222,
                -0,
                0,
                0,
                0,
                1,
                0,
                -0.4472135901451111,
                -1.3416407108306885,
                -5,
                1
            ]);

        expect(expectedViewMatrix).toEqual(camera.viewMatrix);
    });
});