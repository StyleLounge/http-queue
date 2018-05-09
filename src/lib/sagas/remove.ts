/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";
import { Action } from "redux-actions";
import { takeEvery } from "redux-saga";

import { IManifest } from "../types";
import storage from "../utils/storage";

import { REMOVE } from "../constants/actions";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue:sagas:remove");

function* worker(action: Action<number>): any {
    let items = storage.getData() as object[];

    const {payload: id} = action;

    items = items.filter((item: IManifest) => item.id !== id);

    dbg(`Done with item "${id}". ${items.length} item(s) left.`);

    storage.setData(items);
}

function* add(): any {
    yield* takeEvery(REMOVE, worker);
}

export default add;
