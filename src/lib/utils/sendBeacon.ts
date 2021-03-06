import * as debug from "debug";
import "isomorphic-fetch";

import { IManifest } from "../types";

const dbg: debug.IDebugger = debug("@SL/http-queue:utils:sendBeacon");

const sendHttp = async (manifest: IManifest) => {
    dbg(`Sending data via "XHR".`);
    await fetch(new Request(manifest.url), {
        body: JSON.stringify(manifest.data || {}),
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
        }),
        method: manifest.verb.toUpperCase(),
    });
};

const sendBeacon = (manifest: IManifest): boolean => {
    const nav: Navigator = navigator;

    if (nav.sendBeacon) {
        const blob = new Blob([JSON.stringify(manifest.data || {})], { type: "application/json; charset=UTF-8" });

        dbg(`Sending data via "sendBeacon" (size: ${blob.size}).`);

        try {
            return nav.sendBeacon(manifest.url, blob);
        } catch (e) {
            dbg(`Sending data via "sendBeacon" failed. Reason ${e}).`);
            return false;
        }
    }

    return false;
};

export const send = async (manifest: IManifest) => {
    if (manifest.forceXhr === true) {
        dbg(`Sending data directly with "XHR" because forceXhr is set to true.`);
        await sendHttp(manifest);
        // if sendBeacon fails we will fall back to XHR
    } else if (!sendBeacon(manifest)) {
        dbg(`Okay, seems like "sendBeacon" failed. Will retry with "XHR".`);
        await sendHttp(manifest);
    }
};
