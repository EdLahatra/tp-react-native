import { SystemState, SystemActionTypes } from './types';
import { UPDATE_SESSION } from './constants';

const initialState: SystemState = {
	loggedIn: false,
	session: '',
	userName: '',
};

export function systemReducer(
	state = initialState,
	action: SystemActionTypes
): SystemState {
	switch (action.type) {
		case UPDATE_SESSION: {
			return {
				...state,
				...action.payload,
			}
		}
		default:
			return state;
	};
};
