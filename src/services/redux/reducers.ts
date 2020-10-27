import { combineReducers } from 'redux';

import { systemReducer } from './system/reducers';
import { produitsReducer } from './produits/reducers';
import { requestsReducer } from './request/reducers';
import { ticketsReducer } from './tickets/reducers';

export const rootReducer = combineReducers({
	log: (payload, action) => {
		console.log({ payload, action });
    // eslint-disable-next-line no-console
		return {};
  },
  system: systemReducer,
  produits: produitsReducer,
  request: requestsReducer,
  tickets: ticketsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
