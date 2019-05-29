import { stub, assert } from "sinon";
import { IManifest } from "../types";
import { send } from "./sendBeacon";

declare let global: any;

describe("sendBeacon ", () => {
    const manifest: IManifest = {
        data: {
            mock: "data",
        },
        forceXhr: false,
        id: 1,
        url: "/some-mock-url",
        verb: "POST",
    };

    beforeEach(() => {
        global.Blob = stub();
        global.navigator = { sendBeacon: stub() };
        global.fetch = stub(global, "fetch");
    });

    afterEach(() => {
        global.fetch.restore();
    });

    it("should send request with beacon", async () => {
        global.navigator.sendBeacon.returns(true);
        await send(manifest);
        assert.calledOnce(global.navigator.sendBeacon);
        assert.notCalled(global.fetch);
    });

    it("should send request with fetch when sendBeacon returns false", async () => {
        global.navigator.sendBeacon.returns(false);
        await send(manifest);
        assert.calledOnce(global.fetch);
        assert.calledOnce(global.navigator.sendBeacon);
    });

    it("should send request with fetch when sendBeacon throws exception.", async () => {
        global.navigator.sendBeacon.throws();
        await send(manifest);
        assert.calledOnce(global.fetch);
        assert.calledOnce(global.navigator.sendBeacon);
    });

    it("should send request with fetch when forceXhr is set to true.", async () => {
        await send({ ...manifest, forceXhr: true });
        assert.calledOnce(global.fetch);
        assert.notCalled(global.navigator.sendBeacon);
    });
});
