import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { DatabaseProvider } from './context/DatabaseContext';
import { store, persistor } from './services/redux/store';
import {AppNavigation} from './presentations/navigation';
import {name as appName} from '../app.json';

export function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <RealmProvider realm={realm}> */}
        <DatabaseProvider>
          <AppNavigation />
        </DatabaseProvider>
      {/* </PersistGate> */}
      {/* </RealmProvider> */}
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
// if (Platform.OS === 'web') {
//   AppRegistry.runApplication(appName, {
//     rootTag: document.getElementById('root'),
//   });
// }

{/* <RealmProvider realm={realm}>
    <MyComponent />
  </RealmProvider> */}
