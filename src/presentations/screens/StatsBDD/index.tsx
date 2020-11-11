import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';
import { StackParams } from '../../../presentations/navigation';

import { useMetiersApp } from '../../../services/metiers';
import { SystemState, Parametres } from '../../../services/redux/system/types';
import HeaderComponent from '../../components/NavigationHeader/backHeader';
import ButtonComponent from '../../components/Button';

type NavigationProps = StackNavigationProp<StackParams, 'Parametres'>;

interface IProps {
  navigation: NavigationProps;
  system: SystemState;
  updateParametres: (params: Parametres) => Promise<void>;
}

export const StatsBDDScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation } = props;

  const { counts, selectCounts } = useMetiersApp();
  useEffect(() => {
    selectCounts();
  }, []);

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
          <HeaderComponent
            msg={'Stats sur la BDD'}
            goBack={() => navigation.goBack()}
          />
          <View
            style={{
              flex: 1,
              margin: 20,
            }}>
            {counts.map(({ count, table, last, first }) => {
              return (
                <View>
                  <Text key={table} style={{ fontSize: 16, color: 'black' }}>{table} : {count}</Text>
                  {last && first && <Text key={table} style={{ fontSize: 16, color: 'black' }}>({first} - {last})</Text>}
                </View>
              )
            })}

          </View>
          <View style={{ margin: 10 }}>
            <ButtonComponent
              message="OK"
              onPress={() => navigation.navigate('Parametres')}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const StatsBDD = reduxConnect(StatsBDDScreen);
