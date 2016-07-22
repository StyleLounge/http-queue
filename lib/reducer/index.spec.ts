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

import {expect} from "chai";

import {add, remove, restore} from "../actions";

import reducer, {IManifest, IState} from "./";

describe("The reducer", function() {
    it("should be able to handle 'ADD'", function(done) {
        const manifest: IManifest = {
            id: 1,
            verb: "GET",
            url: "http://stylelounge.de",
            data: {foo: "bar"}
        };

        const before: IState = {
            manifests: []
        };

        const after: IState = {
            manifests: [
                manifest
            ]
        };

        const action = add(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });

    it("should be able to handle 'REMOVE'", function(done) {
        const manifest: IManifest = {
            id: 1,
            verb: "GET",
            url: "http://stylelounge.de",
            data: {foo: "bar"}
        };

        const before: IState = {
            manifests: [manifest]
        };

        const after: IState = {
            manifests: []
        };

        const action = remove(1);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });

    it("should be able to handle 'RESTORE'", function(done) {
        const manifest: IManifest = {
            id: 1,
            verb: "GET",
            url: "http://stylelounge.de",
            data: {foo: "bar"}
        };

        const before: IState = {
            manifests: []
        };

        const after: IState = {
            manifests: [
                manifest
            ]
        };

        const action = restore(manifest);

        const result: IState = reducer(before, action);

        expect(result).to.eql(after);

        done();
    });
});
