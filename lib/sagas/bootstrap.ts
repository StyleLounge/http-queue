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

import {put, PutEffect} from 'redux-saga/effects';
import {LOCALSTORAGE_NAMESPACE} from '../constants/localStorage';

import {
    RESTORE
} from '../constants/actions';

function* bootstrap(): any {
    const items: Object[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_NAMESPACE) || '[]');

    if (items) {
        for (let key in items) {
            console.log({type: RESTORE, payload: items[key]});
            yield put({type: RESTORE, payload: items[key]});
        }
    }
}

export default bootstrap;
