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
describe("sendBeacon ", () => {
    let manifest: IManifest;
    before(() => {
        manifest = {
            data: {
                mock: "data",
            },
            id: 1,
            url: "/some-mock-url",
            verb: "POST",
        };
    });
    beforeEach(() => {
        global.navigator = sinon.stub(global, "navigator");
        global.navigator.sendBeacon = sinon.stub(global.navigator, "sendBeacon");
        global.Blob = sinon.stub(global, "Blob");
        global.fetch = sinon.stub(global, "fetch");
    });
    afterEach(() => {
        global.navigator.sendBeacon.restore();
        global.navigator.restore();
        global.fetch.restore();
        global.Blob.restore();
    })
    it("should send request with beacon", async (done) => {
        global.navigator.sendBeacon.resolves(true);
        await send(manifest);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
        sinon.assert.notCalled(global.fetch);
        done();
    });
    it("should send request with fetch when sendBeacon returns false", async (done) => {
        global.navigator.sendBeacon.resolves(false);
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
        done();
    });
    it("should send request with fetch when sendBeacon throws exception.", async (done) => {
        global.navigator.sendBeacon.throws();
        await send(manifest);
        sinon.assert.calledOnce(global.fetch);
        sinon.assert.calledOnce(global.navigator.sendBeacon);
        done();
    });
});
