import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';
import { StackParams } from '../../../presentations/navigation';

import { useMetiersApp } from '../../../services/metiers';
import { useApplicatif } from '../../../services/applicatif';
import { useAppSynchroDown } from '../../../services/applicatif/synchroDown';
import { useAppSynchroUp } from '../../../services/applicatif/synchroUp';
import { useAppClients } from '../../../services/applicatif/clients';
import { SystemState, Parametres } from '../../../services/redux/system/types';

type NavigationProps = StackNavigationProp<StackParams, 'Parametres'>;

interface IProps {
  navigation: NavigationProps;
  system: SystemState;
  updateParametres: (params: Parametres) => Promise<void>;
}

interface ItemParametresScreenProps {
  onChange: (value: React.SetStateAction<string>) => void;
  value: string;
  title: string;
}


export const ItemParametresScreen: React.FunctionComponent<ItemParametresScreenProps> = function (
  { onChange, value, title }) {
  return (
    <View>
      <Text style={{ fontSize: 18 }}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={(name) => onChange(name)}
        style={{
          // height: 25,
          width: Dimensions.get('window').width - 40, fontSize: 18,
          color: 'black',
          textAlign: 'center',
          borderBottomWidth: 1,
          borderColor: 'red',
          borderRadius: 10,
        }}
      />
    </View>
  )
}

export const ParametresScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation, system, updateParametres } = props;

  const [code_mag, setCode_mag] = useState('HAP1');
  const [numero_mag, setNumero_mag] = useState('04');
  const [numero_caisse, setNumero_caisse] = useState('05');
  const [cle_serveur, setCle_serveur] = useState('5DADA245');
  const [code_enseigne, setCode_enseigne] = useState('5D');
  const [last_file, setLast_file] = useState('');
  const [numero_enseigne, setNumero_enseigne] = useState('');
  
  const { getEntityApp } = useApplicatif();
  const { goToSynchroDown, getLastFile, lastFile } = useAppSynchroDown();
  const { counts, selectCounts, lastFileName } = useMetiersApp();
  const { synchroUp } = useAppSynchroUp();
  const { getClients } = useAppClients();

  useEffect(() => {
    initialState();
    selectCounts();
  }, [lastFile]);

  async function initialState() {
    console.log('initialState  =================++> ParametresScreen');
    const cl = await getClients({});
    console.log({ cl });
    const last_f = await getLastFile();
    const { params: { numero_caisse, numero_enseigne, numero_mag, cle_serveur, code_enseigne, code_mag,  } } = system;
    setCode_enseigne(code_enseigne);
    setLast_file(last_f);
    setNumero_caisse(numero_caisse);
    setCode_mag(code_mag);
    setNumero_mag(code_mag);
    setCle_serveur(cle_serveur);
    setNumero_mag(numero_mag);
    setNumero_enseigne(numero_enseigne);
    return await testFunction();
  }

  async function testFunction() {
    const params = {
      limit: 100,
      table: 'Tickets',
    };
    const param = await getEntityApp(params);
    console.log({ param });
  }

  async function updateParams() {
    const params = {
      code_mag,
      numero_caisse,
      code_enseigne,
      last_file,
      cle_serveur,
      numero_mag,
      numero_enseigne,
    };
    updateParametres(params);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              width: Dimensions.get('window').width - 100,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <ItemParametresScreen
                value={numero_caisse}
                onChange={(name) => setNumero_caisse(name)}
                title={'Numero Caisse'}
              />
              <ItemParametresScreen
                value={code_enseigne}
                onChange={(name) => setCode_enseigne(name)}
                title={'Code enseigne'}
              />
              <ItemParametresScreen
                value={code_mag}
                onChange={(name) => setCode_mag(name)}
                title={'Code mag'}
              />
              <ItemParametresScreen
                value={numero_mag}
                onChange={(name) => setNumero_mag(name)}
                title={'Numero mag'}
              />
              <ItemParametresScreen
                value={numero_enseigne}
                onChange={(name) => setNumero_enseigne(name)}
                title={'Numero enseigne'}
              />
              <ItemParametresScreen
                value={cle_serveur}
                onChange={(name) => setCle_serveur(name)}
                title={'Cle serveur'}
              />
              <ItemParametresScreen
                value={last_file}
                onChange={(name) => setLast_file(name)}
                title={'Last file'}
              />
            {/* <TextInput
              value={lastFileName}
              // onChangeText={(name) => setFileLaste(name)}
              style={{
                // height: 25,
                width: Dimensions.get('window').width - 40, fontSize: 18,
                color: 'black',
                textAlign: 'center',
                borderBottomWidth: 1,
                borderColor: 'red',
                borderRadius: 10,
              }}
            /> */}
            <View style={{ padding: 20, flex: 1 }}>
              <Button
                title='Modifier'
                onPress={async () => await updateParams()}
              />
              <View style={{ height: 5 }} />
              <Button
                title='Go To Synchro Down'
                onPress={async () => await goToSynchroDown(last_file)}
              />
              <View style={{ height: 5 }} />
              <Button
                title='Go To Synchro Up'
                onPress={async () => await synchroUp()}
              />
            </View>
            {counts.map(({ count, table }) => <Text key={table} style={{ fontSize: 20, color: 'black' }}>{table} : {count}</Text>)}

          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const ParametresScreens = reduxConnect(ParametresScreen);
