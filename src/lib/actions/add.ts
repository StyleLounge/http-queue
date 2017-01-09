/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { createAction } from "redux-actions";

import { IManifest } from "../types";
import { ADD } from "../constants/actions";

const add = createAction<IManifest>(ADD);

export default add;
