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
import {take, put, actionChannel, call} from 'redux-saga/effects';

import {IManifest} from '../reducer';
import {ADD,RESTORE} from '../constants/actions';
import {remove} from '../actions';
import sendBeacon from '../utils/sendBeacon';

const dbg = debug('@stylelounge/http-queue:sagas:worker');

function* worker(): any {
    const channel = yield actionChannel([
        ADD,
        RESTORE
    ]);

    while (true) {
        const action = yield take(channel);
        const manifest: IManifest = action.payload;

        try {
            yield call(sendBeacon, manifest);

            dbg('Performed HTTP request and everything went fine.');
        } catch (err) {
            console.warn(err.message);
        }

        //
        // Remove the manifest from the queue (even when the request could not be send).
        //
        yield put(remove(manifest.id));
    }
}

export default worker;
