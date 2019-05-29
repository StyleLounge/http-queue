import * as debug from "debug";
import { Action } from "redux-actions";
import { takeEvery } from "redux-saga/effects";

import { IManifest } from "../types";
import { storage } from "../utils";
import { ADD } from "../constants/actions";

const dbg: debug.IDebugger = debug("@SL/http-queue:sagas:add");

function* worker(action: Action<IManifest>): any {
    let items = (storage.getData() as object[]) || [];

    items = [...items, action.payload];

    dbg(`Queued item. ${items.length} item(s) in the queue.`);

    storage.setData(items);
}

export function* add(): Iterable<any> {
    yield takeEvery(ADD, worker);
}
