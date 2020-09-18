import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './services/redux/store';
import {Navigation} from './presentations/navigation';
import {name as appName} from '../app.json';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
// if (Platform.OS === 'web') {
//   AppRegistry.runApplication(appName, {
//     rootTag: document.getElementById('root'),
//   });
// }
