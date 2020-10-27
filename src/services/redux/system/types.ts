import { UPDATE_SESSION, GO_SYNCHRO_DOWN, GO_SYNCHRO_UP, LOGIN_USER, UPDATE_PARAMETRE } from './constants';
import { FormatData } from '../../../interfaces';

export interface SynchroDown {
	name: string | undefined
	size: number | undefined
};
	
export interface Parametres {
	code_mag: string
	numero_caisse: string
	code_enseigne: string
	last_file: string
	cle_serveur: string
	numero_mag: string
	numero_enseigne: string
};

export interface Users {
  id: number,
  nom: string,
  nom_user: string,
  passwd: string,
  prenom: string
}

export interface SystemState {
  loggedIn: boolean
  session: string
	userName: string
	synchroUp: boolean,
	synchroDown: SynchroDown,
	user: Users ,
	params: Parametres,
};

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: SystemState
}

interface UpdateParametres {
  type: typeof UPDATE_PARAMETRE
  payload: Parametres
}

interface GoSynchroUp {
  type: typeof GO_SYNCHRO_UP
  payload: boolean
}

interface GoSynchroDown {
  type: typeof GO_SYNCHRO_DOWN
  payload: SynchroDown
}

interface LoginUser {
  type: typeof LOGIN_USER
  payload: Users,
}

export type SystemActionTypes = UpdateSessionAction | GoSynchroUp | GoSynchroDown | LoginUser | UpdateParametres;
