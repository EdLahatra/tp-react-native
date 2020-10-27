import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../../presentations/navigation/main';

import { File, Flags } from '../../../interfaces/request';
import { useMetiersApp } from '../../../services/metiers';

import { useCaisseApp } from '../../../services/applicatif/caisses';

import faker from '../../../data/faker';
import { useAppSynchroUp } from '../../../services/applicatif/synchroUp';
import { useAppTickets } from '../../../services/applicatif/tickets';
import { useAppClients } from '../../../services/applicatif/clients';
import { useAppAuth } from '../../../services/applicatif/auth';
import { useAppArticles } from '../../../services/applicatif/articles';

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

function string2Bin(str: string) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}

function decimalToHexString(number: any) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

const toMd5 = (text: string) => {
  const array = string2Bin(text); // [49, 50, 51, 52, 53]
  console.log({ array });
  const arrayToMd5 = md5(array);
  console.log({ md5array: md5(text) });
  let res = '';
  for (let i = 0; i < arrayToMd5.length; i++) {
    let hex = arrayToMd5[i].toString(16);
    console.log(arrayToMd5[i] + ' === ' + hex);
    res = res.concat(hex)
  }
  return res;
}

export const ScanScreen: React.FunctionComponent<IProps> = function (props) {
  const { request, navigation } = props;
  const { counts, selectCounts, lastFileName, linesInsert } = useMetiersApp();

  const { getArticlesByCodeBarres } = useAppArticles();

  useEffect(() => {
    initialState();
  }, []);

  async function initialState() {
    console.log('message  =================++>');
    // console.log(toMd5('12345'));
    console.log(toMd5(toMd5('12345') + 'shpt'));
    // 73CD690B5A73807FA4D33540D3323CC5 b4efccce5773c4b59a221a2b4356eb8c F2915457AAC19FDAEDB6AB41DA051D1E
    // toMd5('12345');
    return;
  }

  async function testFunction() {
    // =========================== Articles ==================================
    const article_by_code_query = {
      // query: '0',
      // // query: '9',
      // where: ['code_barre'],
      // like: true,
      // // where: ['code_barre'],
      limit: 100,
    };
    const article = await getArticlesByCodeBarres(article_by_code_query);
    console.log({ article });

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
