import * as debug from "debug";
import { Action } from "redux-actions";

import { IManifest } from "../types";
import { storage } from "../utils";
import { REMOVE } from "../constants/actions";
import { tap, ignoreElements } from "rxjs/operators";
import { Epic } from "redux-observable";

const dbg = debug("@SL/http-queue:epics:remove");

export const removeFromStorageEpic: Epic<Action<number>, never> = action$ =>
    action$.ofType(REMOVE).pipe(
        tap(action => {
            let items = storage.getData() as object[];

            const { payload: id } = action;

            items = items.filter((item: IManifest) => item.id !== id);

            dbg(`Done with item "${id}". ${items.length} item(s) left.`);

            storage.setData(items);
        }),
        ignoreElements(),
    );
