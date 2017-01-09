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

const sendHttp = (manifest: IManifest): Promise<any> =>
    new Promise((resolve, reject) => {
        const {createFetch, accept, json, method} = http;

        const fetch = createFetch(
            method(manifest.verb.toUpperCase()),
            accept("application/json"),
            json(manifest.data || {})
        );

        dbg(`Sending data via "XHR".`);

        fetch(manifest.url);

        resolve();
    });

const sendBeacon = (manifest: IManifest) => {
    const nav: any = navigator as any;

    if (nav.sendBeacon) {
        const blob = new Blob([JSON.stringify(manifest.data || {})], { type: "application/json; charset=UTF-8" });

        dbg(`Sending data via "sendBeacon" (size: ${blob.size}).`);

        return nav.sendBeacon(manifest.url, blob);
    }

    return false;
};

const send = (manifest: IManifest): Promise<any> =>
    new Promise((resolve, reject) => {
        if (!sendBeacon(manifest)) {
            dbg(`Okay, seems like "sendBeacon" failed. Will retry with "XHR".`);

            sendHttp(manifest);
        }

        return resolve();
    });

export default send;
