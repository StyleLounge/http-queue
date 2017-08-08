/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import * as debug from "debug";

const http = require("http-client");

import "isomorphic-fetch";

import { IManifest } from "../types";

const dbg: debug.IDebugger = debug("@stylelounge/http-queue:utils:sendBeacon");

const sendHttp = async (manifest: IManifest) => {
    const {createFetch, accept, json, method} = http;

    const post = createFetch(
        method(manifest.verb.toUpperCase()),
        accept("application/json"),
        json(manifest.data || {})
    );

    dbg(`Sending data via "XHR".`);

    await post(manifest.url);
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
