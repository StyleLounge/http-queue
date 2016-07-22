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

import {assign} from "lodash";

import uuid from "./utils/uuid";

import createStore from "./store";
import sagas from "./sagas";
import reducer from "./reducer";

import {add} from "./actions";

const middlewares = {sagas};

export interface IRequest {
    verb: string;
    url: string;
    data?: Object;
}

const queue = () => {
    const store = createStore({reducer, middlewares});

    const schedule = (manifest: IRequest) =>
        store.dispatch(
            add(assign({}, manifest, {
                id: uuid(),
            }))
        );

    return schedule;
};

export default queue;
