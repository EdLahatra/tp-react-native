import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { useClients } from "../../../hooks/home";

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../../presentations/navigation/main';

import { File, Flags } from '../../../interfaces/request';
import { useMetiersApp } from '../../../services/metiers';
import { useCaisseApp } from '../../../services/applicatif/caisses';

import data from '../../../data/faker';
import { useAppSynchroUp } from '../../../services/applicatif/synchroUp';
import { useAppTickets } from '../../../services/applicatif/tickets';

var md5 = require('md5');

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  setRequestOff: () => Promise<void>;
  setRequestOn: () => Promise<void>;
  addFile: (files: File[]) => Promise<void>;
  removeFile: (files: File) => Promise<void>;
  setLastFile: (name: string) => Promise<void>;
  navigation: NavigationProps;
  request: Flags;
}


export const ScanScreen: React.FunctionComponent<IProps> = function (props) {
  const { request, navigation } = props;

  const { counts, selectCounts, lastFileName, linesInsert } = useMetiersApp();
  // const { ouvertureCaisse, checkCloture } = useCaisseApp();
  // const { synchroUp } = useAppSynchroUp();
  const { insertTickets, getTickets } = useAppTickets();

  const { getInsertLastFileDown } = useClients();
  const [] = useState(false);

  const [fileLaste, setFileLaste] = useState('');

  useEffect(() => {
    initialState();
  }, []);

  async function initialState() {
    console.log('message  =================++>');
    console.log(md5('123456'), md5('shpt'), md5(md5('12345') + 'shpt'));
    // e10adc3949ba59abbe56e057f20f883e 8fb1c0a7415f2ef042ce914dd1e871bb b4efccce5773c4b59a221a2b4356eb8c
    const name = await getInsertLastFileDown();
    return setFileLaste(name);
  }

  async function testFunction() {
    // console.log('testFunction  =================++>');
    // const ouv_caisse = await ouvertureCaisse(data.cloture, data.ouverturesTiroir);
    // console.log({ ouv_caisse });
    // return ouv_caisse;

    // const sychro = await synchroUp();
    // console.log({ sychro });
    // return sychro;

    // const cloture = await checkCloture();
    // console.log({ cloture });
    // return cloture;

    // Tickets ==================================
    // const ticket = await insertTickets(data.ticket);
    // console.log({ ticket });
    // // return ticket;
    // const tickets = await getTickets(0);
    // console.log({ tickets });
    // return ticket;
  }

  console.log({ request: request.flag });

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
          <View style={{ padding: 20 }}>
            <Button
              title="Test_Func"
              onPress={async () => await testFunction()}
            />
            <View style={{ height: 5 }} />
            <Button
              title="Count"
              onPress={async () => await selectCounts()}
            />
            <View style={{ height: 5 }} />
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
            <View style={{ height: 5 }} />
          </View>
          <View
            style={{
              flex: 1,
              width: Dimensions.get('window').width - 100,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
            <Text key={'table'} style={{ fontSize: 20, color: 'black' }}>{'lines'} : {linesInsert}</Text>
            <TextInput
              value={lastFileName}
              onChangeText={(name) => setFileLaste(name)}
              style={{
                // height: 25,
                width: Dimensions.get('window').width - 40, fontSize: 25,
                color: 'black',
                textAlign: 'center',
                borderBottomWidth: 1,
                borderColor: 'red',
                borderRadius: 10,
              }}
            />
            {counts.map(({ count, table }) => <Text key={table} style={{ fontSize: 20, color: 'black' }}>{table} : {count}</Text>)}
            
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const Home = reduxConnect(ScanScreen);
