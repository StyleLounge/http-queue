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

import {filter} from 'lodash';

import {takeEvery} from 'redux-saga';
import {Action} from 'redux-actions';

import storage from '../utils/storage';
import {IManifest} from '../reducer';

import {
    REMOVE
} from '../constants/actions';

function * worker(action: Action<number>): any {
    let items = storage.getData() as Object[];

    items = filter(items, (item: IManifest) => item.id !== action.payload);

    console.log('left items', items.length, items);

    storage.setData(items);
}

function * add(): any {
    yield * takeEvery(REMOVE, worker);
}

export default add;
