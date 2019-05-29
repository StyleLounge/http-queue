import * as debug from "debug";
import { Action } from "redux-actions";
import { takeEvery } from "redux-saga/effects";

import { IManifest } from "../types";
import { storage } from "../utils";
import { REMOVE } from "../constants/actions";

const dbg: debug.IDebugger = debug("@SL/http-queue:sagas:remove");

function* worker(action: Action<number>): any {
    let items = storage.getData() as object[];

    const { payload: id } = action;

    items = items.filter((item: IManifest) => item.id !== id);

    dbg(`Done with item "${id}". ${items.length} item(s) left.`);

    storage.setData(items);
}

export function* remove(): any {
    yield takeEvery(REMOVE, worker);
}
