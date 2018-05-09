/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import * as sinon from "sinon";
import IManifest from "../types/IManifest";
import {default as send} from "./sendBeacon";

declare let global: any;

describe("sendBeacon ", () => {
    const manifest: IManifest = {
        data: {
            mock: "data",
        },
        forceXHR: false,
        id: 1,
        url: "/some-mock-url",
        verb: "POST",
    };
    // tslint:disable-next-line:only-arrow-functions
    beforeEach(function() {
        global.navigator = sinon.stub(global, "navigator");
        global.navigator.sendBeacon = sinon.stub(global.navigator, "sendBeacon");
        global.Blob = sinon.stub(global, "Blob");
        global.fetch = sinon.stub(global, "fetch");
    });

    // tslint:disable-next-line:only-arrow-functions
    afterEach(function() {
        global.navigator.sendBeacon.restore();
        global.navigator.restore();
        global.fetch.restore();
        global.Blob.restore();
    });

    it("should send request with beacon", async () => {
        global.navigator.sendBeacon.returns(true);
        await send(manifest);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
        sinon.assert.notCalled(global.fetch);
    });

    it("should send request with fetch when sendBeacon returns false", async () => {
        global.navigator.sendBeacon.returns(false);
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
    });

    it("should send request with fetch when sendBeacon throws exception.", async () => {
        global.navigator.sendBeacon.throws();
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
    });

    it("should send request with fetch when forceXHR is set to true.", async () => {
        await send({ ...manifest, forceXHR: true });
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.notCalled(global.navigator.sendBeacon);
    });
});
