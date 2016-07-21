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

import {takeEvery} from 'redux-saga';
import {Action} from 'redux-actions';

import {IManifest} from '../reducer';

import {LOCALSTORAGE_NAMESPACE} from '../constants/localStorage';

import {
    ADD
} from '../constants/actions';

function * worker(action: Action<IManifest>): any {
    let items = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_NAMESPACE) || '[]');

    items = [...items, action.payload];

    window.localStorage.setItem(LOCALSTORAGE_NAMESPACE, JSON.stringify(items));
}

function * add(): any {
    yield * takeEvery(ADD, worker);
}

export default add;
