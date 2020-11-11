import { Utilisateurs } from '../../../interfaces';
import { UPDATE_SESSION, GO_SYNCHRO_DOWN, GO_SYNCHRO_UP, LOGIN_USER, UPDATE_PARAMETRE, OLD_USER } from './constants';

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
  timer: number,
  urlWS: string,
  urlZip: string,
  urlUp: string,
};

/*export interface Users {
  id: number,
  nom: string,
  nom_user: string,
  passwd: string,
  prenom: string
}*/

export interface SystemState {
  loggedIn: boolean
  session: string
	userName: string
	synchroUp: boolean,
	synchroDown: SynchroDown,
  user: Utilisateurs,
  oldUser: Utilisateurs,
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
  payload: Utilisateurs,
}

interface LoginOldUser {
  type: typeof OLD_USER
  payload: Utilisateurs,
}

export type SystemActionTypes = UpdateSessionAction | GoSynchroUp | GoSynchroDown | LoginUser | UpdateParametres | LoginOldUser;
