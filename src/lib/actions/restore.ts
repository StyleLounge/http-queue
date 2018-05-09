/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { createAction } from "redux-actions";

import { RESTORE } from "../constants/actions";
import { IManifest } from "../types";

const restore = createAction<IManifest>(RESTORE);

export default restore;
