import { Action, handleActions, ReducerMap } from "redux-actions";

import {
    ADD,
    REMOVE,
    RESTORE,
} from "../constants/actions";

import { IManifest, IState } from "../types";

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
