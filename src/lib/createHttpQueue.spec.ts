import { stub, assert, SinonStub } from "sinon";

import { createHttpQueue } from "./createHttpQueue";
import { IRequest } from "./types";
import { deepEqual } from "assert";

declare let global: any;

export const createRequest = (verb: string, url: string, data?: object): IRequest => ({
    verb,
    url,
    data,
});

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

describe("createHttpQueue", () => {
    beforeEach(() => {
        global.Blob = stub();
        global.navigator = { sendBeacon: stub().returns(true) };
        global.fetch = stub(global, "fetch").resolves();
    });

    afterEach(() => {
        global.fetch.restore();
    });

    it("schedules items and send the full buffer whenever drain() is called", async () => {
        const queue = createHttpQueue(false);

        const req1 = createRequest("POST", "foo/bar", { mock: "data" });
        const req2 = createRequest("POST", "foo2/bar");
        queue.schedule(req1);
        queue.schedule(req2);

        await sleep(50); // sleep until some ticks later in order to process all reqs
        assert.notCalled(global.fetch);
        const sentMessages = (global.navigator.sendBeacon as SinonStub).getCalls().map(call => call.args[0]);
        deepEqual(sentMessages, ["foo/bar", "foo2/bar"]);
    });

    it("optionally operates in xhr-mode", async () => {
        const queue = createHttpQueue(true);

        const req1 = createRequest("POST", "foo/bar", { mock: "data" });
        const req2 = createRequest("POST", "foo2/bar");
        queue.schedule(req1);
        queue.schedule(req2);

        await sleep(50); // sleep until some ticks later in order to process all reqs
        assert.notCalled(global.navigator.sendBeacon);
        const sentMessages = (global.fetch as SinonStub).getCalls().map(call => (call.args[0] as Request).url);
        deepEqual(sentMessages, ["foo/bar", "foo2/bar"]);
    });
});
