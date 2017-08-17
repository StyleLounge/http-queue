/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import {default as send} from "./sendBeacon";
import * as sinon from "sinon";
import IManifest from "../types/IManifest";
declare let global: any;
describe("sendBeacon ", function () {
    const manifest: IManifest = {
        data: {
            mock: "data",
        },
        id: 1,
        url: "/some-mock-url",
        verb: "POST",
    };
    beforeEach(function () {
        global.navigator = sinon.stub(global, "navigator");
        global.navigator.sendBeacon = sinon.stub(global.navigator, "sendBeacon");
        global.Blob = sinon.stub(global, "Blob");
        global.fetch = sinon.stub(global, "fetch");
    });
    afterEach(function () {
        global.navigator.sendBeacon.restore();
        global.navigator.restore();
        global.fetch.restore();
        global.Blob.restore();
    });
    it("should send request with beacon", async function () {
        global.navigator.sendBeacon.returns(true);
        await send(manifest);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
        sinon.assert.notCalled(global.fetch);
    });
    it("should send request with fetch when sendBeacon returns false", async function () {
        global.navigator.sendBeacon.returns(false);
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
    });
    it("should send request with fetch when sendBeacon throws exception.", async function () {
        global.navigator.sendBeacon.throws();
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
    });
});
