import * as debug from "debug";
import { Epic } from "redux-observable";
import { map, concatMap } from "rxjs/operators";
import { Action } from "redux-actions";

import { IManifest } from "../types";
import { remove } from "../actions";
import { ADD, RESTORE } from "../constants/actions";
import { send } from "../utils";

const NAMESPACE = "@SL/http-queue:epics:send";

const dbg = debug(NAMESPACE);

export const sendMessagesEpic: Epic<Action<any>, Action<number>> = action$ =>
    action$.ofType(ADD, RESTORE).pipe(
        concatMap(async action => {
            const manifest: IManifest = action.payload;

            try {
                await send(manifest);

                dbg("Performed HTTP request and everything went fine.");
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.warn(`${NAMESPACE}: ${err.message} (tried ${manifest.verb} ${manifest.url}).`);
            }
            return manifest;
        }),
        map(manifest => remove(manifest.id)),
    );
