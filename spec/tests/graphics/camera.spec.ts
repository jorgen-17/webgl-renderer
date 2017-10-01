import { Vec3, Mat4 } from "cuon-matrix-ts";
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
    const defaultViewMatrix = new Mat4().setLookAt(
        Settings.defaultEyePosition.x,
        Settings.defaultEyePosition.y,
        Settings.defaultEyePosition.z,
        Settings.defaultLookAtPoint.x,
        Settings.defaultLookAtPoint.y,
        Settings.defaultLookAtPoint.z,
        Settings.defaultUpPosition.x,
        Settings.defaultUpPosition.y,
        Settings.defaultUpPosition.z
    );
    const defaultProjectionMatrix = new Mat4().setPerspective(
        Settings.defaultFieldOfView,
        aspectRatio,
        Settings.defaultNear,
        Settings.defaultFar
    );
    const defaultVpMatrix = new Mat4().setIdentity();
    defaultVpMatrix.multiply(defaultProjectionMatrix);
    defaultVpMatrix.multiply(defaultViewMatrix);

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

            expect(camera.viewMatrix.elements).toEqual(defaultViewMatrix.elements);
            expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
            expect(camera.vpMatrix.elements).toEqual(defaultVpMatrix.elements);
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

    describe("aspectRatio:", () =>
    {
        const newAspectRatio = 1920 / 1080;

        it("is get-able and set-able", () =>
        {
            camera.aspectRatio = newAspectRatio;
            expect(camera.aspectRatio).toEqual(newAspectRatio);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.aspectRatio = newAspectRatio;

            expect(camera.viewMatrix.elements).toEqual(defaultViewMatrix.elements);
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("field of view:", () =>
    {
        const newFieldOfView = 72;

        it("is get-able and set-able", () =>
        {
            camera.fieldOfView = newFieldOfView;
            expect(camera.fieldOfView).toEqual(newFieldOfView);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.fieldOfView = newFieldOfView;

            expect(camera.viewMatrix.elements).toEqual(defaultViewMatrix.elements);
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("near:", () =>
    {
        const newNear = 0.000001;

        it("is get-able and set-able", () =>
        {
            camera.near = newNear;
            expect(camera.near).toEqual(newNear);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.fieldOfView = newNear;

            expect(camera.viewMatrix.elements).toEqual(defaultViewMatrix.elements);
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("far:", () =>
    {
        const newFar = 9001;

        it("is get-able and set-able", () =>
        {
            camera.far = newFar;
            expect(camera.far).toEqual(newFar);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.fieldOfView = newFar;

            expect(camera.viewMatrix.elements).toEqual(defaultViewMatrix.elements);
            expectjs(camera.projectionMatrix.elements).toMatchSnapshot();
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("eye position:", () =>
    {
        const newEyePosition = new Vec3(-0.5, -0.5, -0.5);

        it("is get-able and set-able", () =>
        {
            camera.eyePosition = newEyePosition;
            expect(camera.eyePosition).toEqual(newEyePosition);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.eyePosition = newEyePosition;

            expectjs(camera.viewMatrix.elements).toMatchSnapshot();
            expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("look at point:", () =>
    {
        const newLookAtPoint = new Vec3(0.75, 0.75, 0.75);

        it("is get-able and set-able", () =>
        {
            camera.lookAtPoint = newLookAtPoint;
            expect(camera.lookAtPoint).toEqual(newLookAtPoint);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.lookAtPoint = newLookAtPoint;

            expectjs(camera.viewMatrix.elements).toMatchSnapshot();
            expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    describe("up position:", () =>
    {
        const newUpPosition = new Vec3(1, 1, 1);

        it("is get-able and set-able", () =>
        {
            camera.upPosition = newUpPosition;
            expect(camera.upPosition).toEqual(newUpPosition);
        });

        it("sets the perspective and vpmatricies", () =>
        {
            camera.upPosition = newUpPosition;

            expectjs(camera.viewMatrix.elements).toMatchSnapshot();
            expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
            expectjs(camera.vpMatrix.elements).toMatchSnapshot();
        });
    });

    it("panX sets the correct properties", () =>
    {
        camera.panX(0.5);

        expectjs(camera.viewMatrix.elements).toMatchSnapshot();
        expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
        expectjs(camera.vpMatrix.elements).toMatchSnapshot();
    });

    it("panY sets the correct properties", () =>
    {
        camera.panY(-0.5);

        expectjs(camera.viewMatrix.elements).toMatchSnapshot();
        expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
        expectjs(camera.vpMatrix.elements).toMatchSnapshot();
    });

    it("zoomIn sets the correct properties", () =>
    {
        camera.zoomIn();

        expectjs(camera.viewMatrix.elements).toMatchSnapshot();
        expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
        expectjs(camera.vpMatrix.elements).toMatchSnapshot();
    });

    it("zoomOut sets the correct properties", () =>
    {
        camera.zoomOut();

        expectjs(camera.viewMatrix.elements).toMatchSnapshot();
        expect(camera.projectionMatrix.elements).toEqual(defaultProjectionMatrix.elements);
        expectjs(camera.vpMatrix.elements).toMatchSnapshot();
    });
});