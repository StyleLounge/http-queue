/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { handleActions, Action, ReducerMap } from "redux-actions";

import {
    ADD,
    RESTORE,
    REMOVE,
} from "../constants/actions";

import { IState, IManifest } from "../types";

const createState = (): IState => ({
    manifests: [],
});

const handlers: ReducerMap<IState, IManifest | number> = {
    [ADD]: (state: IState, action: Action<IManifest>): IState => ({
        ...state,
        manifests: [...state.manifests, action.payload],
    }),
    [RESTORE]: (state: IState, action: Action<IManifest>): IState => ({
        ...state,
        manifests: [...state.manifests, action.payload],
    }),
    [REMOVE]: (state: IState, action: Action<number>): IState => ({
        ...state,
        manifests: state.manifests.filter((manifest: IManifest) => manifest.id !== action.payload),
    }),
};

export default handleActions<IState, IManifest | number>(handlers, createState());
