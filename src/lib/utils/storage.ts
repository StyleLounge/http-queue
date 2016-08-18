/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import * as debug from "debug";

import * as Basil from "basil.js";

const dbg: debug.Debugger = debug("@stylelounge/http-queue:storage");

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
            dbg("Okay, state does not exist or seems pretty old. Create new one ...");

            const state = this.createState();

            this.setRawData(state);
        }
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

    private createState(): IStorageState {
        return {
            data: undefined,
            ttl: Date.now() + TTL,
        };
    }

    private setRawData(data: Object): void {
        this.storage.set(NAMESPACE, data);
    }

    private getRawData() {
        return this.storage.get(NAMESPACE) || {};
    }
}

export default new StorageAbstraction();
