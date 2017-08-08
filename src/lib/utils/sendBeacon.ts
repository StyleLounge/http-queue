/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import * as debug from "debug";

import "isomorphic-fetch";

import { IManifest } from "../types";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue:utils:sendBeacon");

const sendHttp = async (manifest: IManifest) => {
    dbg(`Sending data via "XHR".`);
    await window.fetch(new Request(manifest.url), {
        body: JSON.stringify(manifest.data || {}),
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
        }),
        method: manifest.verb.toUpperCase(),
    });
};

const sendBeacon = async (manifest: IManifest): Promise<boolean> => {
    const nav: any = navigator as any;

    if (nav.sendBeacon) {
        const blob = new Blob([JSON.stringify(manifest.data || {})], { type: "application/json; charset=UTF-8" });

        dbg(`Sending data via "sendBeacon" (size: ${blob.size}).`);

        try {
            nav.sendBeacon(manifest.url, blob);
            return true;
        } catch (e) {
            dbg(`Sending data via "sendBeacon" failed. Reason ${e}).`);
            return false;
        }
    }

    return false;
};

const send = async (manifest: IManifest) => {
    if (!(await sendBeacon(manifest))) {
        dbg(`Okay, seems like "sendBeacon" failed. Will retry with "XHR".`);

        await sendHttp(manifest);
    }
};

export default send;
