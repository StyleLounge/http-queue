/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";
import {filter} from "lodash";
import {takeEvery} from "redux-saga";
import {Action} from "redux-actions";

import storage from "../utils/storage";
import {IManifest} from "../reducer";

import {
    REMOVE,
} from "../constants/actions";

const dbg: debug.Debugger  = debug("@stylelounge/http-queue:sagas:remove");

function * worker(action: Action<number>): any {
    let items = storage.getData() as Object[];

    const {payload: id} = action;

    items = filter(items, (item: IManifest) => item.id !== id);

    dbg(`Done with item "${id}". ${items.length} item(s) left.`);

    storage.setData(items);
}

function * add(): any {
    yield * takeEvery(REMOVE, worker);
}

export default add;
