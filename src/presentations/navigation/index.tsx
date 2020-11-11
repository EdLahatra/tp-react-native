import './GestureHandler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserInactivity from 'react-native-user-inactivity';
import BackgroundTimer from 'react-native-background-timer';
import { AppState, StyleSheet, SafeAreaView, AppStateStatus, NativeModules } from 'react-native';

import { reduxConnect, IProps } from '../../controllers/Home';

import {
  Home,
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
  AuthSupervisor,
  ChoixMotifRemise,
  StatsBDD,
  MontantRemise,
  Montant,
 
  Pourcent
} from '../screens';
import TpeScreen from '../screens/Tpe';
import { Keyboard } from '../components/Keyboard';

import { useAppSynchroDown } from '../../services/applicatif/synchroDown';
import { ClientI } from '../../interfaces';
import { initialUser } from '../../data/config';
import { Tickets } from '../../interfaces/tickets';
import { readStream } from './RNFetchBlobReadStream';

let appState: AppStateStatus;

// YellowBox.ignoreWarnings(['Setting a timer']);

export const checkModulo = (n: number) => n % 51 === 0

export const AppScreen: React.FunctionComponent<IProps> = function (props) {
  const { system: { user, params: { timer } }, loginUser } = props;

  // Initialize state

  // const { insertSynchroOneToOne, insertSynchroDownFileCSV, getInsertSynchroDownFileCSV, updateSynchroDownFileCSV } = useMetiersApp();
  const { goToSynchroDown, goToSynchroDownNew } = useAppSynchroDown();

  appState = AppState.currentState;

  // Set up a callback to fire when AppState changes (when the app goes to/from the background)
  useEffect(function () {
    // The app is currently active, so the 'change' event will not fire and we need to
    // call appIsNowRunningInForeground ourselves.
    console.log('Call goToSynchroDown()=============++>', appState);
    initialState();
    // 20200923_110249_hap
    goToSynchroDownNew('20200812_163412_hap');
    // goToSynchroDownNew(undefined);
    appState = 'active';
    // Listen for app state changes
    // AppState.addEventListener('change', handleAppStateChange);
    // ToastModule.addEventListener('data', (res: any) => console.log(res));
    return function () {
      // Cleanup function
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  async function initialState() {
    console.log('message  =================++>');
    // csvTocsv();
    
    // const ifstream = await readStream('csvFilePath', 'utf8');
    // ifstream.open();
    // ifstream.onData(async (chunk: string) => {
    //   console.log('================================+ chunk chunk ================================+', chunk);
    // });

    // ifstream.onError((err: any) => {
    //   console.log('================================+ err err ================================+', err);
    //   return 0;
    // });

    // ifstream.onEnd(async () => {
    //   console.log('================================+ onEnd onEnd ================================+');
    // });
    // console.log('================================+ FIN ================================+');
  }

  // const navigation = useNavigation();

  const isLogin = user && user.passwd && user.passwd.length > 2 && user.nom_user.length > 2 ? true : false;
  console.log({ timer, isLogin });

  return (
    <SafeAreaView style={styles.container}>
      <UserInactivity
        isActive={isLogin}
        timeForInactivity={Number(timer) * 1000 * 60}
        // timeForInactivity={this.TIMER}
        timeoutHandler={BackgroundTimer}
        onAction={(isActive) => {
          !isActive && loginUser(initialUser);
          // !isActive && navigation.navigate('Login');
        }}
        style={{ flex: 1 }}
      >
        {isLogin ? <Navigation /> : <Users />}
        {/* <Users /> */}
      </UserInactivity>
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
  StatsBDD: undefined;
  Tpe: undefined;
  Home: undefined;
  Password: { id: number, user: any } | undefined;
  Acceuil: { item: any } | undefined;
  Keyboard: undefined;
  Encaissement: { articleTotal: number, item: any, clientI: ClientI, fromHome: boolean, fromFinish: boolean, fromHistoAttente:boolean,tickets:Tickets} | undefined;
  Client: undefined;
  FicheClient: any | undefined;
  HistoriqueTicket: undefined;
  Paiement: { articleTotal: any, clientI: ClientI, iscodechoisi: boolean, montantregle: number, item: any, newTicketsASauver: any } | undefined;
  PaiementCash: { montant: any } | undefined;
  SpecialArticle: undefined;
  PaiementMode: { montant: any } | undefined;
  PaiementAvoir: undefined;
  PaiementCadeau: undefined;
  Parametres: undefined;
  Cloture: undefined;
  ControleCaisse: { id: number } | undefined;
  ControleCaisseVerfications: { cb: string } | undefined;
  ClotureVerfications: { id: number } | undefined;
  AuthSupervisor: { id: string,numeroTicket:string } | undefined;
  ChoixMotifRemise: undefined;
  MontantRemise:undefined;
  Montant:undefined;
  Pourcent:undefined
  
};

const Stack = createStackNavigator<StackParams>();

export const Navigation: React.FunctionComponent = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Acceuil'}
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen name='Acceuil' component={Acceuil} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Tpe' component={TpeScreen} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='Keyboard' component={Keyboard} />
        <Stack.Screen name='Encaissement' component={Encaissement} />
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
        <Stack.Screen name='StatsBDD' component={StatsBDD} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Cloture' component={Cloture} />
        <Stack.Screen name='ControleCaisse' component={ControleCaisse} />
        <Stack.Screen name='ControleCaisseVerfications' component={ControleCaisseVerfications} />
        <Stack.Screen name='ClotureVerfications' component={ClotureVerfications} />
        <Stack.Screen name='AuthSupervisor' component={AuthSupervisor} />
        <Stack.Screen name='ChoixMotifRemise' component={ChoixMotifRemise} />
        <Stack.Screen name='MontantRemise' component={MontantRemise} />
        <Stack.Screen name='Montant' component={Montant} />
        <Stack.Screen name='Pourcent' component={Pourcent} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const Users: React.FunctionComponent = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Parametres" component={ParametresScreens} />
        <Stack.Screen name='StatsBDD' component={StatsBDD} /> */}
        {/* <Stack.Screen name="HistoriqueTicket" component={HistoriqueTicket} /> */}
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Password' component={Password} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const AppNavigation = reduxConnect(AppScreen);
