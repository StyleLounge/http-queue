/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";
import { takeEvery } from "redux-saga";
import { Action } from "redux-actions";

import { IManifest } from "../types";
import storage from "../utils/storage";

import {
    ADD,
} from "../constants/actions";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue:sagas:add");

function* worker(action: Action<IManifest>): any {
    let items = storage.getData() as Object[] || [];

    items = [...items, action.payload];

    dbg(`Queued item. ${items.length} item(s) in the queue.`);

    storage.setData(items);
}

function* add(): any {
    yield* takeEvery(ADD, worker);
}

export default add;
