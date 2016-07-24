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

import * as debug from 'debug';

import * as Basil from 'basil.js';

const dbg: debug.Debugger = debug('@stylelounge/http-queue:storage');

const NAMESPACE = "@stylelounge/http-queue";
const TTL = 10000; /// (60 * 1000) * 60 * 24 * 2; // 2 days

interface IStorageState {
    ttl: number;
    data: any;
}

export class StorageAbstraction {

    private storage = new Basil();

    constructor() {
        //
        // Check the TTL value while bootstrapping the store.
        // If the current stored TTL value is pretty old, discard
        // the current state and create a new one.
        //
        const currentState = this.getRawData();

        if (!currentState.ttl || currentState.ttl < Date.now()) {
            dbg('Okay, state does not exist or seems pretty old. Create new one ...');

            const state = this.createState();

            this.setRawData(state);
        }
    }

    private createState(): IStorageState {
        return {
            ttl: Date.now() + TTL,
            data: undefined
        };
    }

    private setRawData(data: Object): void {
        this.storage.set(NAMESPACE, data);
    }

    private getRawData() {
        return this.storage.get(NAMESPACE) || {};
    }

    public getData(): any {
        const state = this.getRawData();

        return state ? state.data : undefined;
    }

    public setData(data: Object): void {
        const state = this.getRawData();

        state.data = data;

        this.setRawData(state);
    }
}

export default new StorageAbstraction();
