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

import {take, put, actionChannel, call} from 'redux-saga/effects';

import {
    ADD,
    REMOVE,
    RESTORE
} from '../constants/actions';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function* worker(): any {
    const channel = yield actionChannel([
        ADD,
        RESTORE
    ]);

    while (true) {
        const {payload} = yield take(channel);

        console.log('HANDLE REQUEST', payload);

        yield delay(1000);

        yield put({type: REMOVE, payload: payload.id});
    }
}

export default worker;
