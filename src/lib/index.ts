/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";

import uuid from "./utils/uuid";

import createStore from "./store";
import sagas from "./sagas";
import reducer from "./reducer";

import { IRequest } from "./types";
import { add } from "./actions";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue");

const middlewares = { sagas };

type HttpQueue = {
    schedule: (manifest: IRequest) => void,
    drain: (timeout?: number) => Promise<void>
};

const createHttpQueue = (): HttpQueue => {
    const store = createStore({ reducer, middlewares });

    /**
     * Schedules a HTTP request.
     *
     * @param {IRequest} request The request definition
     * @returns void
     *
     */
    const schedule = (manifest: IRequest) => {
        store.dispatch(
            add({
                id: Number(uuid()),
                ...manifest,
            })
        );
    };

    /**
     * Drains the queue and resolves when the queue is empty OR a
     * given timeout is exceeded.
     *
     * @param {number} timeout Resolves the promise after timeout has exceeded
     *
     * @returns {Promise<void>}
     *
     */
    const drain = async (timeout: number = 3000) => {
        dbg(`Drain requested (timeout: ${timeout})`);

        const NAP_TIME = 50;
        const allowedCatNaps = Math.round(timeout / NAP_TIME);

        let actualCatNaps = 0;
        let drained = false;

        do {
            await new Promise(resolve => setTimeout(resolve, NAP_TIME));

            actualCatNaps = actualCatNaps + 1;

            drained = actualCatNaps >= allowedCatNaps || store.getState().manifests.length === 0;
        } while (!drained);

        // tslint:disable-next-line
        dbg(`Drained queue. Some stats: allowed naps: ${allowedCatNaps}, actual naps: ${actualCatNaps}, drained? ${drained} (configured timeout: ${timeout})`);
    };

    return { drain, schedule };
};

export default createHttpQueue;
export { HttpQueue };
