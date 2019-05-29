import { expect } from "chai";

import { add, remove, restore } from "../actions";
import { IManifest, IState } from "../types";

import reducer from "./";

describe("The reducer", () => {
    it("should be able to handle 'ADD'", done => {
        const manifest: IManifest = {
            data: { foo: "bar" },
            forceXhr: false,
            id: 1,
            url: "http://stylelounge.de",
            verb: "GET",
        };

        const before: IState = {
            manifests: [],
        };

        const after: IState = {
            manifests: [manifest],
        };

        const action = add(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });

    it("should be able to handle 'REMOVE'", done => {
        const manifest: IManifest = {
            data: { foo: "bar" },
            forceXhr: false,
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

    it("should be able to handle 'RESTORE'", done => {
        const manifest: IManifest = {
            data: { foo: "bar" },
            forceXhr: false,
            id: 1,
            url: "http://stylelounge.de",
            verb: "GET",
        };

        const before: IState = {
            manifests: [],
        };

        const after: IState = {
            manifests: [manifest],
        };

        const action = restore(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });
});
