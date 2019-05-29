import * as debug from "debug";

import { restore } from "../actions";
import { IManifest } from "../types";
import { storage } from "../utils";
import { Store } from "redux";

const dbg = debug("@SL/http-queue:bootstrap");

export function bootstrap(store: Store): any {
    dbg("Check if we can restore an existing queue.");

    const items: IManifest[] = storage.getData() as IManifest[];

    if (items) {
        dbg(`Found ${items.length} item(s) to restore.`);

        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const item = items[key];
                store.dispatch(restore(item));
            }
        }
    } else {
        dbg("Found no items to restore. Waiting for new items ...");
    }
}
