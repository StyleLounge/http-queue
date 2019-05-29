import * as debug from "debug";
import { Action } from "redux-actions";
import { Epic } from "redux-observable";
import { tap, ignoreElements } from "rxjs/operators";

import { IManifest } from "../types";
import { storage } from "../utils";
import { ADD } from "../constants/actions";

const dbg: debug.IDebugger = debug("@SL/http-queue:epics:add");

export const addToStorageEpic: Epic<Action<IManifest>, never> = action$ =>
    action$.ofType(ADD).pipe(
        tap(action => {
            let items = (storage.getData() as object[]) || [];
            items = [...items, action.payload];

            dbg(`Queued item. ${items.length} item(s) in the queue.`);

            storage.setData(items);
        }),
        ignoreElements(),
    );
