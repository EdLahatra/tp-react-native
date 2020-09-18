import { SystemState, SystemActionTypes } from './types'
import { UPDATE_SESSION } from './constants';

export function updateSession(newSession: SystemState): SystemActionTypes {
	return {
		type: UPDATE_SESSION,
		payload: newSession
	}
};
