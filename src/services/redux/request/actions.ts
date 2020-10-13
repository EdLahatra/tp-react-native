import { RequestActionTypes } from './types';
import { File } from '../../../interfaces/request';

import { REQUEST_OFF, REQUEST_ON, ADD_FILE, REMOVE_FILE, SET_LAST_FILE } from './constants';

export const setRequestOn = (): RequestActionTypes => ({
	type: REQUEST_ON,
});

export const setRequestOff = (): RequestActionTypes => ({
	type: REQUEST_OFF,
});

export const addFile = (payload: File[]): RequestActionTypes => ({
  type: ADD_FILE,
  payload,
});

export const removeFile = (payload: File): RequestActionTypes => ({
  type: REMOVE_FILE,
  payload,
});

export const setLastFile = (payload: string): RequestActionTypes => ({
  type: SET_LAST_FILE,
  payload,
});

