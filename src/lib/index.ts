/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";

import reducer from "./reducer";
import sagas from "./sagas";
import createStore from "./store";

import { add } from "./actions";
import { IRequest } from "./types";
import numericRandomId from "./utils/numericRandomId";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue");

const middlewares = { sagas };

interface IHttpQueue {
    schedule: (manifest: IRequest) => void;
    drain: (timeout?: number) => Promise<void>;
}

const createHttpQueue = (forceXHR: boolean): IHttpQueue => {
    const store = createStore({ reducer, middlewares });

    /**
     * Schedules a HTTP request.
     */
    const schedule = (manifest: IRequest) => {
        store.dispatch(
            add({
                forceXHR,
                id: numericRandomId(),
                ...manifest,
            }),
        );
    };

    /**
     * Drains the queue and resolves when the queue is empty OR a given timeout is exceeded.
     */
    const drain = async (timeout: number = 3000) => {
        dbg(`Drain requested (timeout: ${timeout})`);

        const NAP_TIME = 50;
        const allowedCatNaps = Math.round(timeout / NAP_TIME);

        let actualCatNaps = 0;
        let drained = false;

        do {
            await new Promise((resolve) => setTimeout(resolve, NAP_TIME));

            actualCatNaps = actualCatNaps + 1;

            drained = actualCatNaps >= allowedCatNaps || store.getState().manifests.length === 0;
        } while (!drained);

        // tslint:disable-next-line
        dbg(`Drained queue. Some stats: allowed naps: ${allowedCatNaps}, actual naps: ${actualCatNaps}, drained? ${drained} (configured timeout: ${timeout})`);
    };

    return { drain, schedule };
};

export { IHttpQueue };
export default createHttpQueue;
