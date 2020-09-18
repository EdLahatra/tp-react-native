import { combineReducers } from 'redux';

import { systemReducer } from './system/reducers';
import { produitsReducer } from './produits/reducers';

export const rootReducer = combineReducers({
	log: (payload, action) => {
		console.log({ payload, action })
    // eslint-disable-next-line no-console
		return {};
  },
  system: systemReducer,
	produits: produitsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
