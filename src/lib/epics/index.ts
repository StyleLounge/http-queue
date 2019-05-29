import { combineEpics } from "redux-observable";
import { addToStorageEpic } from "./add";
import { removeFromStorageEpic } from "./remove";
import { sendMessagesEpic } from "./worker";

export const rootEpic = combineEpics(addToStorageEpic, removeFromStorageEpic, sendMessagesEpic);
