import * as debug from "debug";
import { actionChannel, call, put, take } from "redux-saga/effects";

import { IManifest } from "../types";
import { remove } from "../actions";
import { ADD, RESTORE } from "../constants/actions";
import { send } from "../utils";

const NAMESPACE = "@SL/http-queue:sagas:worker";

const dbg: debug.IDebugger = debug(NAMESPACE);

export function* worker(): any {
    const channel = yield actionChannel([ADD, RESTORE]);

    while (true) {
        const action = yield take(channel);
        const manifest: IManifest = action.payload;

        try {
            yield call(send, manifest);

            dbg("Performed HTTP request and everything went fine.");
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.warn(`${NAMESPACE}: ${err.message} (tried ${manifest.verb} ${manifest.url}).`);
        }

        //
        // Remove the manifest from the queue (even when the request could not be send).
        //
        yield put(remove(manifest.id));
    }
}
