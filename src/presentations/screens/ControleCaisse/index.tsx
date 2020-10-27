import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../../presentations/navigation';

import { STRING } from '../../../data/Constants';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import { ControleCaisseVerfication } from './verfication';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
}

export const ControleCaisseScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation } = props;

  const [cb, setCB] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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

  async function clotureCaisse(btnx: boolean) {
    setModalVisible(false);
    if(btnx) {
      navigation.navigate('ControleCaisseVerfications');
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{STRING.CONTROLE_INFO}</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'CB'}
              value={cb}
              onChange={(text: string) => setCB(text)}
              multiline={false}
            />
          </View>
          <View>
            <Button message='Valider' iscancel={false} onPress={() => setModalVisible(true)}></Button>
          </View>
        </View>
        <Popup
          okAction={() => clotureCaisse(true)}
          modalVisible={modalVisible}
          setModalVisible={(btnx) => clotureCaisse(btnx)}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={true}
          message={'Vouler-vous continuer ?'} >
          <Text>Vous avez indiqué in nombre de {cb} pour les paiements 'Carte Bleue'.</Text>
        </Popup>
      </SafeAreaView>
    </ScrollView>
  );
}

export const ControleCaisse = reduxConnect(ControleCaisseScreen);

export const ControleCaisseVerfications = ControleCaisseVerfication;
