/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { expect } from "chai";

import { add, remove, restore } from "../actions";

import { IManifest } from "../types";

import reducer, { IState } from "./";

describe("The reducer", function () {
    it("should be able to handle 'ADD'", function (done) {
        const manifest: IManifest = {
            data: { foo: "bar" },
            id: 1,
            url: "http://stylelounge.de",
            verb: "GET",
        };

        const before: IState = {
            manifests: [],
        };

        const after: IState = {
            manifests: [
                manifest,
            ],
        };

        const action = add(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });

    it("should be able to handle 'REMOVE'", function (done) {
        const manifest: IManifest = {
            data: { foo: "bar" },
            id: 1,
            url: "http://stylelounge.de",
            verb: "GET",
        };

        const before: IState = {
            manifests: [manifest],
        };

        const after: IState = {
            manifests: [],
        };

        const action = remove(1);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });

    it("should be able to handle 'RESTORE'", function (done) {
        const manifest: IManifest = {
            data: { foo: "bar" },
            id: 1,
            url: "http://stylelounge.de",
            verb: "GET",
        };

        const before: IState = {
            manifests: [],
        };

        const after: IState = {
            manifests: [
                manifest,
            ],
        };

        const action = restore(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });
});
