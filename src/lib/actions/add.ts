import { Action, createAction } from "redux-actions";

import { ADD } from "../constants/actions";
import { IManifest } from "../types";

const add = createAction<IManifest>(ADD);

export { Action };
export default add;
