import { Vec3 } from "cuon-matrix-ts";
import { expectjs, registerSnapshots } from "jasmine-snapshot";

import { Camera } from "../../../src/graphics/camera";
import { Settings } from "../../../src/settings";
import { cameraSnapshots } from "../../snapshots/graphics/camera.snapshot";

describe("camera:", () =>
{
    let camera: Camera;
    const width = 800;
    const height = 600;
    const aspectRatio = (width / height);

    beforeAll(() =>
    {
        registerSnapshots(cameraSnapshots, "camera:");
    });

    beforeEach(() =>
    {
        camera = new Camera(aspectRatio);
    });

    describe("constructor:", () =>
    {
        it("intializes properties to defaults if no parameters passed in", () =>
        {
            camera = new Camera(aspectRatio);

            expect(camera.aspectRatio).toEqual(aspectRatio);
            expect(camera.fieldOfView).toEqual(Settings.defaultFieldOfView);
            expect(camera.near).toEqual(Settings.defaultNear);
            expect(camera.far).toEqual(Settings.defaultFar);
            expect(camera.eyePosition).toEqual(Settings.defaultEyePosition);
            expect(camera.lookAtPoint).toEqual(Settings.defaultLookAtPoint);
            expect(camera.upPosition).toEqual(Settings.defaultUpPosition);

            expectjs(camera.viewMatrix.elements).toMatchSnapshot();
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
        it("uses perspective and view settings when passed in", () =>
        {
            camera = new Camera(aspectRatio, 45, 0.25, 5,
                new Vec3(0.5, 0.5, 0.5),
                new Vec3(0.25, 0.25, 0.25),
                new Vec3(0.5, 1, 0.5)
            );

            expectjs(camera.viewMatrix.elements).toMatchSnapshot();
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    it("panX sets the correct properties", () =>
    {
        camera.panX(0.5);

        const expectedVpMatrix = new Float32Array([
            1.299038052558899,
            0,
            0,
            0,
            0,
            1.7320507764816284,
            0,
            0,
            0,
            0,
            -1.0100502967834473,
            -1,
            -0.6495190262794495,
            0,
            0.8889447450637817,
            0.8999999761581421
        ]);

        expect(expectedVpMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("panX sets the correct properties", () =>
    {
        camera.panX(0.5);

        const expectedVpMatrix = new Float32Array([
            1.299038052558899,
            0,
            0,
            0,
            0,
            1.7320507764816284,
            0,
            0,
            0,
            0,
            -1.0100502967834473,
            -1,
            -0.6495190262794495,
            0,
            0.8889447450637817,
            0.8999999761581421
        ]);

        expect(expectedVpMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("panY sets the correct properties", () =>
    {
        camera.panY(-0.5);

        const expectedVpMatrix = new Float32Array([
            1.299038052558899,
            0,
            0,
            0,
            0,
            1.7320507764816284,
            0,
            0,
            0,
            0,
            -1.0100502967834473,
            -1,
            0,
            0.8660253882408142,
            0.8889447450637817,
            0.8999999761581421
        ]);

        expect(expectedVpMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("zoomIn sets the correct properties", () =>
    {
        camera.zoomIn();

        const expectedVpMatrix = new Float32Array([
            1.299038052558899,
            0,
            0,
            0,
            0,
            1.7320507764816284,
            0,
            0,
            0,
            0,
            -1.0100502967834473,
            -1,
            0,
            0,
            0.8788442611694336,
            0.8899999856948853
        ]);

        expect(expectedVpMatrix).toEqual(camera.vpMatrix.elements);
    });

    it("zoomOut sets the correct properties", () =>
    {
        camera.zoomOut();

        const expectedVpMatrix = new Float32Array([
            1.299038052558899,
            0,
            0,
            0,
            0,
            1.7320507764816284,
            0,
            0,
            0,
            0,
            -1.0100502967834473,
            -1,
            0,
            0,
            0.8990452289581299,
            0.9099999666213989
        ]);

        expect(expectedVpMatrix).toEqual(camera.vpMatrix.elements);
    });
});