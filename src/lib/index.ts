/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import {assign} from "lodash";

import uuid from "./utils/uuid";

import createStore from "./store";
import sagas from "./sagas";
import reducer from "./reducer";

import {add} from "./actions";

const middlewares = { sagas };

export interface IRequest {
    verb: string;
    url: string;
    data?: Object;
}

const queue = () => {
    const store = createStore({ reducer, middlewares });

    const schedule = (manifest: IRequest) => {
        store.dispatch(
            add(assign({}, manifest, {
                id: uuid(),
            }))
        );
    };

    return schedule;
};

export default queue;
