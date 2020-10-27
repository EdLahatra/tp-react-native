import { SystemState, SystemActionTypes, SynchroDown, Parametres } from './types'
import { UPDATE_SESSION, GO_SYNCHRO_UP, GO_SYNCHRO_DOWN, LOGIN_USER, UPDATE_PARAMETRE } from './constants';
import { FormatData } from '../../../interfaces';

export function updateSession(newSession: SystemState): SystemActionTypes {
	return {
		type: UPDATE_SESSION,
		payload: newSession
	}
};

export function updateParametres(payload: Parametres): SystemActionTypes {
	return {
		type: UPDATE_PARAMETRE,
		payload,
	}
};

export function goSychroUp(payload: boolean): SystemActionTypes {
	return {
		type: GO_SYNCHRO_UP,
		payload,
	}
};

export function goSychroDown(payload: SynchroDown): SystemActionTypes {
	return {
		type: GO_SYNCHRO_DOWN,
		payload,
	}
};

export function loginUser(payload: FormatData | null): SystemActionTypes {
	return {
		type: LOGIN_USER,
		payload,
	}
};
