/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import {createStore, applyMiddleware, compose, Store} from "redux";
import createSagaMiddleware from "redux-saga";

export interface IMiddlewares {
    sagas: Function[];
    enhancers?: Object;
}

export interface IOptions {
    middlewares: IMiddlewares;
    reducer: any;
    initialState?: Object;
}

function configureStore (options: IOptions): Store<any> {
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
