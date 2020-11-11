import { createStore, compose, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  PersistConfig
} from 'redux-persist';
import storage from '@react-native-community/async-storage';

import { rootReducer, RootState } from './reducers';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['navigation'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = createStore<any,any,any,any>(
//   persistedReducer,
//   compose(
//     applyMiddleware(thunk as ThunkMiddleware<any, any>),
//   )
// );

export const store = createStore<any,any,any,any>(
  rootReducer,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<any, any>),
  )
);


export const persistor = persistStore(store)
