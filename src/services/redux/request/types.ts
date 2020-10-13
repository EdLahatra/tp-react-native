import { REQUEST_OFF, REQUEST_ON, ADD_FILE, REMOVE_FILE, SET_LAST_FILE } from './constants';
import { File } from '../../../interfaces/request';

interface RequestOnAction {
  type: typeof REQUEST_ON
}

interface RequestOffAction {
	type: typeof REQUEST_OFF
}

interface AddFileAction {
  type: typeof ADD_FILE,
  payload: File[],
}

interface RemoveFileAction {
  type: typeof REMOVE_FILE,
  payload: File,
}

interface SetLastFileAction {
  type: typeof SET_LAST_FILE,
  payload: string,
}

export type RequestActionTypes = SetLastFileAction | RequestOnAction | RequestOffAction | AddFileAction | RemoveFileAction;
