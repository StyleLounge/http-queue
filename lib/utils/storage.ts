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

const Basil = require("basil.js");

const NAMESPACE = "@stylelounge/http-queue";
const TTL = (60 * 1000) * 60 * 24 * 2; // 2 days

const storage = new Basil();

export interface IStorage {
    setData(value: Object): void;
    getData(): Object;
}

interface IStorageState {
    ttl: number;
    data: any;
}

function createState(): IStorageState {
    return {
        ttl: Date.now() + TTL,
        data: undefined
    };
}

function setRawData(initialData: Object): void {
    storage.set(NAMESPACE, initialData);
}

function getRawData() {
    return storage.get(NAMESPACE) || {};
}

function getData(): any {
    const state = getRawData();

    return state ? state.data : undefined;
}

function setData(data: Object): void {
    const state = getRawData();

    state.data = data;

    setRawData(state);
}

//
// Check the TTL value while bootstrapping the store.
// If the current stored TTL value is pretty old, discard
// the current state and create a new one.
//
{
    const currentState = getRawData();

    if (!currentState.ttl || currentState.ttl < Date.now()) {
        const state = createState();

        setRawData(state);
    }
}

const api: IStorage {
    setData,
    getData
};

export default api;
