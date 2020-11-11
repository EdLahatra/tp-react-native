import { SystemState, SystemActionTypes } from './types';
import { UPDATE_SESSION, GO_SYNCHRO_DOWN, GO_SYNCHRO_UP, LOGIN_USER, UPDATE_PARAMETRE, OLD_USER } from './constants';
import config from '../../../data/config';

const {
  urlUp, numero_mag, cle_serveur, code_mag, numero_caisse, last_file, code_enseigne, numero_enseigne, urlWS, urlZip
} = config;

const initialParams = {
  code_mag,
  numero_mag,
  numero_caisse,
  code_enseigne,
  last_file,
  cle_serveur,
  numero_enseigne,
  timer: 5,
  urlWS,
  urlZip,
  urlUp,
};

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
  oldUser: {
    id: 0,
    nom: '',
    nom_user: '',
    passwd: '',
    prenom: ''
  },
	params: initialParams,
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
    case OLD_USER: {
			return {
				...state,
				oldUser: action.payload,
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
