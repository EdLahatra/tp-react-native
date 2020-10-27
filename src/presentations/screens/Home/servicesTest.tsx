import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../navigation';

import { File, Flags } from '../../../interfaces/request';
import { useMetiersApp } from '../../../services/metiers';

import { useCaisseApp } from '../../../services/applicatif/caisses';

import faker from '../../../data/faker';

import { useAppSynchroUp } from '../../../services/applicatif/synchroUp';
import { useAppTickets } from '../../../services/applicatif/tickets';
import { useAppClients } from '../../../services/applicatif/clients';
import { useAppAuth } from '../../../services/applicatif/auth';
import { useAppArticles } from '../../../services/applicatif/articles';
import { useApplicatif } from '../../../services/applicatif';

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
  const { ouvertureCaisse, checkCloture } = useCaisseApp();
  const { synchroUp } = useAppSynchroUp();
  const { insertTickets, getTickets, insertTicketDetails, insertTicketsPaiements } = useAppTickets();
  const { getUsers } = useAppAuth();
  const { getClients } = useAppClients();
  const { getArticles, getArticlesByCodeBarres } = useAppArticles();
  const { getEntityApp } = useApplicatif();

  useEffect(() => {
    initialState();
  }, []);

  async function initialState() {
    console.log('message  =================++>');
    console.log(md5('123456'), md5('shpt'), md5(md5('12345') + 'shpt'));
    // e10adc3949ba59abbe56e057f20f883e 8fb1c0a7415f2ef042ce914dd1e871bb b4efccce5773c4b59a221a2b4356eb8c
    return;
  }

  async function testFunction() {
    // =========================== Utilisateurs ==================================
    const user_query = {
      query: 'a',
      where: ['nom', 'prenom'],
      like: true,
      operator: 'OR',
      limit: 10,
    };
    const users = await getUsers(user_query);
    console.log({ users });

    // =========================== Clients ==================================
    const queryClient = {
      query: 'a',
      where: ['nom', 'prenom'],
      like: true,
      operator: 'OR',
      limit: 10,
    };
    const client = await getClients(queryClient);
    console.log({ client });

    // =========================== synchroUp ==================================
    const sychro = await synchroUp();
    console.log({ sychro });

    // =========================== Caisse ==================================
    const ouv_caisse = await ouvertureCaisse(faker.cloture, faker.ouverturesTiroir);
    console.log({ ouv_caisse });

    const cloture = await checkCloture();
    console.log({ cloture });

    // =========================== Tickets ==================================
    const ticket = await insertTickets(faker.ticket);
    console.log({ ticket });

    const data = {
      query: 1111,
      // table: name,
      // where: ['statut'],
      where: ['numero_ticket'],
      like: true,
      // operator: 'OR',
      limit: 200,
    };
    const tickets = await getTickets(data);
    console.log({ tickets });
    const ticketsDetails = await insertTicketDetails(faker.ticketDetail);
    console.log({ ticketsDetails });

    const paym = {
      numero_ticket: '',
      numero_ligne: '',
      mode_paiement: '',
      montant_paiement: '',
      info_paiement: '',
      encaisse: '',
      user_annulation: '',
      date_annulation: '',
      motif_annulation: '',
    };
    await insertTicketsPaiements(paym);

    // =========================== Articles ==================================
    const article_query = {
      query: '0000002551993',
      where: ['article_code_article'],
      limit: 1,
    };
    const articles = await getArticles(article_query);
    console.log({ articles });
    const article_by_code_query = {
      query: '0000002551993',
      // query: '9',
      where: ['code_barre'],
      // like: true,
      // where: ['code_barre'],
      limit: 1,
    };
    const article = await getArticlesByCodeBarres(article_by_code_query);
    console.log({ article });

    // =========================== getParametres ==================================
    const parametre = {
      tables: 'Parametres',
      query: '07',
      where: ['Caisse'],
      // like: true,
      // operator: 'OR',
      limit: 10,
    };
    const prm = await getEntityApp(parametre);
    console.log({ prm });

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
              title='Test_Func'
              onPress={async () => await testFunction()}
            />
            <View style={{ height: 5 }} />
            <Button
              title='Count'
              onPress={async () => await selectCounts()}
            />
            <View style={{ height: 5 }} />
            <Button
              title='Login'
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
              // onChangeText={(name) => setFileLaste(name)}
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
