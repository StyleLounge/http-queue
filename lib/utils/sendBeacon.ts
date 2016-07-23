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
import * as request from 'request';

import {IManifest} from '../reducer';

const dbg = debug('@stylelounge/http-queue:utils:sendBeacon');

const sendBeacon = (manifest: IManifest) =>
    new Promise((resolve, reject) => {

        const nav: any = navigator as any;

        if (nav.sendBeacon) {
            dbg(`Okay, cool, 'sendBeacon' is available for sending ${manifest.url}.`);

            const data = new Blob([JSON.stringify(manifest.data)], {type : 'application/json; charset=UTF-8'});

            nav.sendBeacon(manifest.url, data);

            return resolve();
        }

        const options: request.OptionsWithUrl = {
            url: manifest.url,
            method: manifest.verb,
            json: true,
            body: manifest.data
        };

        dbg(`'sendBeacon' is NOT available for sending ${manifest.url}. Will fallback to XHR.`);

        request(options, (err: Error, res: any, body: any) => {
            if (err) {
                return reject(new Error(`Unable to send HTTP request: ${manifest.verb} ${manifest.url}: ${err.message} - ${err.message}`));
            }

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`Got an invalid response. Server sent a HTTP ${res.statusCode}.`));
            }

            resolve();
        });
    });

export default sendBeacon;
