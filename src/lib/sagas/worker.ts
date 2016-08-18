/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import * as debug from "debug";
import {take, put, actionChannel, call} from "redux-saga/effects";

import {IManifest} from "../reducer";
import {
    ADD,
    RESTORE,
} from "../constants/actions";
import {remove} from "../actions";
import sendBeacon from "../utils/sendBeacon";

const NAMESPACE = "@stylelounge/http-queue:sagas:worker";

const dbg: debug.Debugger = debug(NAMESPACE);

function* worker(): any {
    const channel = yield actionChannel([
        ADD,
        RESTORE,
    ]);

    while (true) {
        const action = yield take(channel);
        const manifest: IManifest = action.payload;

        try {
            yield call(sendBeacon, manifest);

            dbg("Performed HTTP request and everything went fine.");
        } catch (err) {
            console.warn(`${NAMESPACE}: ${err.message} (tried ${manifest.verb} ${manifest.url}).`);
        }

        //
        // Remove the manifest from the queue (even when the request could not be send).
        //
        yield put(remove(manifest.id));
    }
}

export default worker;
