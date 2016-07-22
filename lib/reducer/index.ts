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

import {assign, filter} from 'lodash';
import {handleActions, Action, ReducerMap} from 'redux-actions';

import {
    ADD,
    RESTORE,
    REMOVE
} from '../constants/actions';

export interface IManifest {
    id: number;
    verb: string;
    url: string;
    data?: Object;
}

export interface IState {
    manifests: IManifest[]
}

function createState(): IState {
    const manifests: IManifest[] = [];

    return {
        manifests
    };
};

const handlers: ReducerMap<IState, IManifest | number> = {
    [ADD]: (state: IState, action: Action<IManifest>): IState =>
        assign({}, state, {
            manifests: [...state.manifests, action.payload]
        }) as IState,
    [RESTORE]: (state: IState, action: Action<IManifest>): IState =>
        assign({}, state, {
            manifests: [...state.manifests, action.payload]
        }) as IState,
    [REMOVE]: (state: IState, action: Action<number>): IState =>
        assign({}, state, {
            manifests: filter(state.manifests, (manifest: IManifest) => manifest.id !== action.payload)
        }) as IState
};

export default handleActions<IState, IManifest>(handlers, createState());
