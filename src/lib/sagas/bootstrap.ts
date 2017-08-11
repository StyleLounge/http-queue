/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";
import { put } from "redux-saga/effects";

import storage from "../utils/storage";
import { restore } from "../actions";
import IManifest from "../types/IManifest";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue:sagas:bootstrap");

function* bootstrap(): any {
    dbg("Check if we can restore an existing queue.");

    const items: IManifest[] = storage.getData() as IManifest[];

    if (items) {
        dbg(`Found ${items.length} item(s) to restore.`);

        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const item = items[key];

                yield put(restore(item));
            }
        }
    } else {
        dbg("Found no items to restore. Waiting for new items ...");
    }
}

export default bootstrap;
