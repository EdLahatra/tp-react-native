import { RequestActionTypes } from './types';
import { Flags } from '../../../interfaces/request';
import { REQUEST_OFF, REQUEST_ON, ADD_FILE, REMOVE_FILE, SET_LAST_FILE } from './constants';

const initialState: Flags = {
  flag: false,
  files: [],
  lastFile: 'no%20file',
};

export const requestsReducer = (state = initialState, action: RequestActionTypes): Flags => {
  switch (action.type) {
    case SET_LAST_FILE:
      return {
      ...state,
      lastFile: action.payload,
    };
    case REQUEST_OFF:
      return {
        ...state,
        flag: false,
      };
    case REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter(({ path }) => path !== action.payload.path),
      };
    case REQUEST_ON:
      return {
        ...state,
        flag: true,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };
    default:
      return state;
  }
};
