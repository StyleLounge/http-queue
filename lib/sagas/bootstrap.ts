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

import storage from '../utils/storage';
import {restore} from '../actions';

function* bootstrap(): any {
    const items: Object[] = storage.getData() as Object[];

    if (items) {
        for (let key in items) {
            const item = items[key];

            console.log(restore(item));
            yield put(restore(item));
        }
    }
}

export default bootstrap;
