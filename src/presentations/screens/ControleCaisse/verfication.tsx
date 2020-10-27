import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../navigation';

import { STRING } from '../../../data/Constants';
import Button from '../../components/Button';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
}

export const ControleCaisseScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation } = props;

  useEffect(() => {
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Acceuil')}
        >
          <Image style={{ width: 40, height: 40 }} source={require("../../resources/images/flash.png")}/>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#787CC2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: 'CONTRÔLE CAISSE',
    });
  }, [navigation]);

  async function goOK() {
    navigation.navigate('Acceuil');
  }

  const g = new Date();
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{STRING.CONTROLE_VERFICATION}</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Date : {`${g.getDay()}/${g.getMonth()}/${g.getFullYear()}`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Salarié sortant: METRO Benjamin</Text>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Salarié entrent: Kole théorique</Text>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Nombre de Carte bleue théorique : 3</Text>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Nombre de Carte bleue théorique : 0</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text>Le contrôle de caisse est maintenant terminé. Merci !</Text>
          </View>
          <View>
            <Button message='OK' iscancel={false} onPress={() => goOK()}></Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export const ControleCaisseVerfication = reduxConnect(ControleCaisseScreen);
