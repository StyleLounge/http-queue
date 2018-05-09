/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

interface IManifest {
    id: number;
    forceXHR: boolean;
    verb: string;
    url: string;
    data?: object;
}

export default IManifest;
