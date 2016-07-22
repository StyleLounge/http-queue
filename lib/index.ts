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

export interface IRequest {
    verb: string;
    url: string;
    data?: Object;
}

import createStore from "./store";
import sagas from "./sagas";
import reducer from "./reducer";

import {
    ADD,
} from "./constants/actions";

const middlewares = {sagas};

const queue = () => {
    const store = createStore({reducer, middlewares});

    return (manifest: IRequest) =>
        store.dispatch({payload: assign({}, manifest, {
            id: uuid(),
        }), type: ADD});
};

export default queue;
