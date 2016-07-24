/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of SNM Style Net Media GmbH and its suppliers,
 * if any. The intellectual and technical concepts contained
 * herein are proprietary to SNM Style Net Media GmbH and its
 * suppliers and may be covered by patents, patents in process,
 * and are protected by trade secret or copyright law. Dissemination
 * of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from
 * SNM Style Net Media GmbH.
 *
 */
import * as debug from 'debug';

import 'isomorphic-fetch';
import * as http from 'http-client';

import {IManifest} from '../reducer';

const dbg: debug.Debugger = debug('@stylelounge/http-queue:utils:sendBeacon');

const sendBeacon = (manifest: IManifest): Promise<any> => {
    const nav: any = navigator as any;

    if (nav.sendBeacon) {
        return new Promise((resolve, reject) => {
            dbg(`Okay, cool, 'sendBeacon' is available for sending ${manifest.url}.`);

            const data = new Blob([JSON.stringify(manifest.data || {})], {type : 'application/json; charset=UTF-8'});

            nav.sendBeacon(manifest.url, data);

            return resolve();
        });
    }

    const {createFetch, accept, json, method} = http;

    const fetch = createFetch(
        method(manifest.verb.toUpperCase()),
        accept('application/json'),
        json(manifest.data || {})
    );

    dbg(`'sendBeacon' is NOT available for sending ${manifest.url}. Will fallback to XHR.`);

    return fetch(manifest.url);
};

export default sendBeacon;
