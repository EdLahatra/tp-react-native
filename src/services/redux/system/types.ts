import { UPDATE_SESSION } from './constants';

export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
};

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: SystemState
}

export type SystemActionTypes = UpdateSessionAction;
