/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */
import * as debug from "debug";

import "isomorphic-fetch";
import * as http from "http-client";

import {IManifest} from "../reducer";

const dbg: debug.Debugger = debug("@stylelounge/http-queue:utils:sendBeacon");

const sendBeacon = (manifest: IManifest): Promise<any> => {
    const nav: any = navigator as any;

    if (nav.sendBeacon) {
        return new Promise((resolve, reject) => {
            dbg(`Okay, cool, "sendBeacon" is available for sending ${manifest.url}.`);

            const data = new Blob([JSON.stringify(manifest.data || {})], {type : "application/json; charset=UTF-8"});

            nav.sendBeacon(manifest.url, data);

            return resolve();
        });
    }

    const {createFetch, accept, json, method} = http;

    const fetch = createFetch(
        method(manifest.verb.toUpperCase()),
        accept("application/json"),
        json(manifest.data || {})
    );

    dbg(`"sendBeacon" is NOT available for sending ${manifest.url}. Will fallback to XHR.`);

    return fetch(manifest.url);
};

export default sendBeacon;
