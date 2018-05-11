import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";

import { IState } from "../types";

export interface IMiddlewares {
    sagas: Array<() => void>;
    enhancers?: object;
}

export interface IOptions {
    middlewares: IMiddlewares;
    reducer: any;
    initialState?: IState;
}

function configureStore(options: IOptions): Store<IState> {
    const sagaMiddleware = createSagaMiddleware();
    const {reducer, initialState} = options;

    const store = createStore<IState>(
        reducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
        ),
    );

    options.middlewares.sagas.forEach(saga => sagaMiddleware.run(saga as any));

    return store;
}

export default configureStore;
