import * as debug from "debug";

import reducer from "./reducer";
import { rootEpic } from "./epics";
import { configureStore } from "./store";
import { add } from "./actions";
import { IRequest } from "./types";
import { numericRandomId } from "./utils";

const dbg = debug("@SL/http-queue");

const middlewares = { rootEpic };

export interface IHttpQueue {
    schedule: (manifest: IRequest) => void;
    drain: (timeout?: number) => Promise<void>;
}

export const createHttpQueue = (forceXhr: boolean): IHttpQueue => {
    const store = configureStore({ reducer, middlewares });

    /**
     * Schedules a HTTP request.
     */
    const schedule = (manifest: IRequest) => {
        store.dispatch(
            add({
                forceXhr,
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
            await new Promise(resolve => setTimeout(resolve, NAP_TIME));

            actualCatNaps = actualCatNaps + 1;

            drained = actualCatNaps >= allowedCatNaps || store.getState().manifests.length === 0;
        } while (!drained);

        // tslint:disable-next-line
        dbg(`Drained queue. Some stats: allowed naps: ${allowedCatNaps}, actual naps: ${actualCatNaps}, drained? ${drained} (configured timeout: ${timeout})`);
    };

    return { drain, schedule };
};
