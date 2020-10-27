import './GestureHandler';
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {
  Home,
  Produits,
  Login,
  Password,
  Acceuil,
  Encaissement,
  Client,
  FicheClient,
  HistoriqueTicket,
  Paiement,
  PaiementCash,
  SpecialArticle,
  PaiementMode,
  PaiementAvoir,
  PaiementCadeau,
  ParametresScreens,
  Cloture,
  ControleCaisse,
  ControleCaisseVerfications,
  ClotureVerfications,
} from '../screens';
import TpeScreen from '../screens/Tpe';
import { Keyboard } from '../components/Keyboard';

import { AppState, StyleSheet, SafeAreaView, AppStateStatus } from 'react-native';

import { useAppSynchroDown } from '../../services/applicatif/synchroDown';
import { ClientI, FormatData } from '../../interfaces';

let appState: AppStateStatus;

export const checkModulo = (n: number) => n % 51 === 0

const md5 = require('js-md5');

function string2Bin(text: string) {
  var result = [];
  for (var i = 0; i < text.length; i++) {
    result.push(text.charCodeAt(i));
  }
  return result;
}

const toMd5 = (text: string) => {
  const array = string2Bin(text); // [49, 50, 51, 52, 53]
  const arrayToMd5 = md5.array(array); // [225, 10, 220, 57, 73, 186, 89, 171, 190, 86, 224, 87, 242, 15, 136, 62]
  let res = '';
  for (let i = 0; i < arrayToMd5.length; i++) {
    const hex = arrayToMd5[i].toString(16).toUpperCase();
    res = res.concat(hex.length === 1 ? `0${hex}` : hex)
  }
  return res;
}

export const AppNavigation: React.FunctionComponent = function() {
  // Initialize state

  // const { insertSynchroOneToOne, insertSynchroDownFileCSV, getInsertSynchroDownFileCSV, updateSynchroDownFileCSV } = useMetiersApp();
  const { goToSynchroDown } = useAppSynchroDown();

  appState = AppState.currentState;

  // Set up a callback to fire when AppState changes (when the app goes to/from the background)
  useEffect(function() {
    // The app is currently active, so the 'change' event will not fire and we need to
    // call appIsNowRunningInForeground ourselves.
    console.log('Call goToSynchroDown()=============++>', appState);
    initialState();
    goToSynchroDown();
    appState = 'active';
    // Listen for app state changes
    // AppState.addEventListener('change', handleAppStateChange);

    return function() {
      // Cleanup function
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  async function initialState() {
    console.log('message  =================++>');
    console.log(toMd5('123456'));
    console.log(toMd5(toMd5('123456') + 'shpt'));
    // 73CD690B5A73807FA4D33540D3323CC5 b4efccce5773c4b59a221a2b4356eb8c 73CD690B5A73807FA4D33540D3323CC5
    // toMd5('12345');
    return;
  }

  // Handle the app going from foreground to background, and vice versa.
  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has moved from the background (or inactive) into the foreground
      goToSynchroDown();
    }
    appState = nextAppState;
  }

    return (
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export type StackParams = {
  Login: { id: number } | undefined;
  Tpe: undefined;
  Home: undefined;
  Produits: { data: string } | undefined;
  Password:  { id: number,user:any } | undefined;
  Acceuil: {item:any} | undefined;
  Keyboard: undefined;
  Encaissement: { articleTotal: number,item:any,clientI:ClientI , fromHome:boolean, fromFinish:boolean} | undefined;
  Client: undefined;
  FicheClient: any | undefined;
  HistoriqueTicket: undefined;
  Paiement: { articleTotal: any ,clientI:ClientI, iscodechoisi:boolean,montantregle:number,item:any,newTicketsASauver:any} | undefined;
  PaiementCash:{montant:any} | undefined;
  SpecialArticle:undefined;
  PaiementMode:{montant:any} | undefined;
  PaiementAvoir:undefined;
  PaiementCadeau:undefined;
  Parametres: undefined;
  Cloture: undefined;
  ControleCaisse: { id: number } | undefined;
  ControleCaisseVerfications: { id: number } | undefined;
  ClotureVerfications: { id: number } | undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Tpe' component={TpeScreen} />
        <Stack.Screen name='Produits' component={Produits} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='Acceuil' component={Acceuil} />
        <Stack.Screen name='Keyboard' component={Keyboard} />
        <Stack.Screen name='Encaissement' 
          component={Encaissement}  />
        <Stack.Screen name="Client" component={Client} />
        <Stack.Screen name="FicheClient" component={FicheClient} />
        <Stack.Screen name="HistoriqueTicket" component={HistoriqueTicket} />
        <Stack.Screen name="Paiement" component={Paiement} />
        <Stack.Screen name="PaiementCash" component={PaiementCash} />
        <Stack.Screen name="SpecialArticle" component={SpecialArticle} />
        <Stack.Screen name="PaiementMode" component={PaiementMode} />
        <Stack.Screen name="PaiementAvoir" component={PaiementAvoir} />
        <Stack.Screen name="PaiementCadeau" component={PaiementCadeau} />
        <Stack.Screen name="Parametres" component={ParametresScreens} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Cloture' component={Cloture} />
        <Stack.Screen name='ControleCaisse' component={ControleCaisse} />
        <Stack.Screen name='ControleCaisseVerfications' component={ControleCaisseVerfications} />
        <Stack.Screen name='ClotureVerfications' component={ClotureVerfications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
