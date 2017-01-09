/**
 *
 * stylelounge.de
 *
 * Copyright (C) SNM Style Net Media GmbH
 * MIT Licensed
 */

import { createAction } from "redux-actions";

import { REMOVE } from "../constants/actions";

const remove = createAction<number>(REMOVE);

export default remove;
