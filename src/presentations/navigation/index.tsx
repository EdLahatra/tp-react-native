import './GestureHandler';
import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import RNFS from 'react-native-fs';

import {Home, Produits,Login,Password,Acceuil,Encaissement, Client, FicheClient, HistoriqueTicket} from '../screens';
import TpeScreen from '../screens/Tpe';
import { Keyboard } from '../components/Keyboard';

import { AppState, StyleSheet, SafeAreaView, AppStateStatus } from 'react-native';

import { synchroOneToOne, getFileToString } from '../../services/utils';

import { useMetiersApp } from '../../services/metiers';

// const CryptoJS = require("crypto-js");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ';';

let appState: AppStateStatus;

export const AppNavigation: React.FunctionComponent = function() {
  // Initialize state
  const [fileLast, setFileLast] = useState('');
  const [loadingText, setLoadingText] = useState("Loading...");

  const { insertSynchroOneToOne, insertLastFileDown, getInsertLastFileDown } = useMetiersApp();

  appState = AppState.currentState;

  // Set up a callback to fire when AppState changes (when the app goes to/from the background)
  useEffect(function() {
    // The app is currently active, so the 'change' event will not fire and we need to
    // call appIsNowRunningInForeground ourselves.
    appIsNowRunningInForeground();
    appState = 'active';
    // Listen for app state changes
    // AppState.addEventListener('change', handleAppStateChange);

    return function() {
      // Cleanup function
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  // Handle the app going from foreground to background, and vice versa.
  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has moved from the background (or inactive) into the foreground
      appIsNowRunningInForeground();
    }
    appState = nextAppState;
  }

  // Function to run when the app is brought to the foreground
  async function appIsNowRunningInForeground() {
    console.log('App is now running in the foreground!');

    // Sync the database with Dropbox
    // const syncDatabase = useDatabaseSync(prepareForDatabaseUpdate);
    // syncDatabase();

    // const where = `WHERE prenom LIKE '%${'Ben'}%' OR nom LIKE '%${'Ben'}%'`;
    // const list = await selectTable('Utilisateurs', [], 1, where);
    // console.log({ list });

    // console.log('===============++>')
    // console.log(CryptoJS.HmacSHA1("Message", "shpt"));

    const last = await getInsertLastFileDown();
    setFileLast(last);
    console.log({ last });
    await recurciveGetFile(last || '20200121_155515_hap');
    
  }

  async function recurciveInsert(transform: Function, lines: string[]) {
    const currentLine = lines[0].split(defaultFieldDelimiter);
    const currentTable = transform(currentLine);
    if (currentTable && currentTable.requete && currentTable.values) {
      const { requete, values } = currentTable;
      // console.log({ requete, values  });
      await insertSynchroOneToOne(requete, values);
      // const res = await insertSynchroOneToOne(requete, values);
      // console.log({ res });
    }
    const newLines = lines.splice(1);
    // console.log({ newLines });
    if(newLines && newLines.length > 1) {
      await recurciveInsert(transform, newLines);
    }
  }

  async function recurciveGetFile(lastFile: string) {
    if(!lastFile) {
      return;
    }

    const { zip_name, files } = await synchroOneToOne(lastFile);
    console.log('===================================================> ', {lastFile});
    
    if (zip_name && zip_name !== 'no update' && zip_name !== fileLast) {
      const date = Math.ceil(new Date().getTime() / 1000);
      // setLastFile(zip_name);
      // setFileLaste(zip_name);
      insertLastFileDown(zip_name, 2, date);
      setFileLast(zip_name);
    }
    // console.log({ files });
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file) {
          const { path, transform } = file;
          const fileString = await getFileToString(path);
          const lines = fileString.split(newLine);
          if (lines && lines.length > 0) {
            await recurciveInsert(transform, lines);
          }
          const unlink = await RNFS.unlink(path);
          console.log({ unlink });
        }
        // const dataString = await getFileToString(path);
      }
    }
    if (zip_name === 'no update') {
      // return setLoading(false);
      return;
    }
    await recurciveGetFile(zip_name);
  }

  // Function to call right before a DB update begins
  // async function prepareForDatabaseUpdate() {
  //   setIsLoading(true);
  //   setLoadingText('Downloading database...');
  // }

  // function isReady() {
  //   return isLoading === false;
  // }

    return (
      <SafeAreaView style={styles.container}>
        {/* <DatabaseProvider> */}
          <Navigation />
        {/* </DatabaseProvider> */}
      </SafeAreaView>
    );
  // if (isReady()) {
  //   // Once the database is ready, render the Lists
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <DatabaseProvider>
  //         <AllLists />
  //       </DatabaseProvider>
  //     </SafeAreaView>
  //   );
  // } else {
  //   // Else, show a loading screen
  //   return <LoadingScreen text={loadingText} />;
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export type StackParams = {
  Login: undefined;
  Tpe: undefined;
  Home: undefined;
  Produits: { data: string } | undefined;
  Password: undefined;
  Acceuil: undefined;
  Keyboard: undefined;
  Encaissement: undefined;
  Client: undefined;
  FicheClient: undefined;
  HistoriqueTicket: undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Tpe' component={TpeScreen} />
        <Stack.Screen name='Produits' component={Produits} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='Acceuil' component={Acceuil} />
        <Stack.Screen name='Keyboard' component={Keyboard} />
        <Stack.Screen name='Encaissement' component={Encaissement} />
        <Stack.Screen name="Client" component={Client} />
        <Stack.Screen name="FicheClient" component={FicheClient} />
        <Stack.Screen name="HistoriqueTicket" component={HistoriqueTicket} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
