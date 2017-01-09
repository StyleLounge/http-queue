/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { createAction } from "redux-actions";

import { IManifest } from "../types";
import { RESTORE } from "../constants/actions";

const restore = createAction<IManifest>(RESTORE);

export default restore;
