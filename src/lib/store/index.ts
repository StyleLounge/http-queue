import { applyMiddleware, compose, createStore, Store, Action, Reducer } from "redux";

import { IState } from "../types";
import { bootstrap } from "./bootstrap";
import { createEpicMiddleware, Epic } from "redux-observable";

export interface IMiddlewares {
    rootEpic: Epic;
    enhancers?: object;
}

export interface IOptions {
    middlewares: IMiddlewares;
    reducer: Reducer<IState, Action>;
    initialState?: IState;
}

export function configureStore(options: IOptions): Store<IState, Action> {
    const epicMiddleWare = createEpicMiddleware();
    const { reducer, initialState } = options;

    const store = createStore<IState, Action, {}, {}>(reducer, initialState, compose(applyMiddleware(epicMiddleWare)));

    // kicks of store by: 1. running all epics and bootstrapping the store w/ previous data
    epicMiddleWare.run(options.middlewares.rootEpic);
    bootstrap(store);
    return store;
}
