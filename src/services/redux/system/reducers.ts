import { SystemState, SystemActionTypes } from './types';
import { UPDATE_SESSION, GO_SYNCHRO_DOWN, GO_SYNCHRO_UP, LOGIN_USER, UPDATE_PARAMETRE } from './constants';

const initialState: SystemState = {
	loggedIn: false,
	session: '',
	userName: '',
	synchroUp: false,
	synchroDown: {
		name: undefined,
		size: undefined
	},
	user: {
    id: 0,
    nom: '',
    nom_user: '',
    passwd: '',
    prenom: ''
  },
	params: {
		code_mag: 'HAP1',
		numero_mag: '18',
		numero_caisse: '07',
		code_enseigne: '5D',
		last_file: '',
		cle_serveur: '5DADA245',
		numero_enseigne: '04'
	}
};

export function systemReducer(
	state = initialState,
	action: SystemActionTypes
): SystemState {
	switch (action.type) {
		case LOGIN_USER: {
			return {
				...state,
				user: action.payload,
			}
		}
		case UPDATE_SESSION: {
			return {
				...state,
				...action.payload,
			}
    }
    case UPDATE_PARAMETRE: {
			return {
				...state,
				params: action.payload,
			}
		}
		case GO_SYNCHRO_DOWN: {
			return {
				...state,
				synchroDown: action.payload,
			}
		}
		case GO_SYNCHRO_UP: {
			return {
				...state,
				synchroUp: action.payload,
			}
		}
		default:
			return state;
	};
};
