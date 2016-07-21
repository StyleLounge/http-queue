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

import {createStore, combineReducers, applyMiddleware, compose, ReducersMapObject, Store, Action} from 'redux';
import createSagaMiddleware from 'redux-saga';

export interface IMiddlewares {
    sagas: Function[],
    enhancers?: Object
}

export interface IOptions {
    middlewares: IMiddlewares,
    reducer: any,
    initialState?: Object
}

function configureStore (options: IOptions) {
    const sagaMiddleware = createSagaMiddleware();
    const {reducer, initialState} = options;

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware)
        )
    );

    options.middlewares.sagas.forEach(saga => sagaMiddleware.run(saga as any));

    return store;
};

export default configureStore;
