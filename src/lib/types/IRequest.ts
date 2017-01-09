/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

interface IRequest {
    verb: string;
    url: string;
    data?: Object;
}

export default IRequest;
