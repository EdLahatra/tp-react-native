import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Button, TextInput, Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../../presentations/navigation';


type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
}

export const ScanScreen: React.FunctionComponent<IProps> = function (props) {

  useEffect(() => {
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
         
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const Home = reduxConnect(ScanScreen);
