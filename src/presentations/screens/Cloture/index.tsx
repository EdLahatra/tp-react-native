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
import { ClotureVerfication } from './verfication';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
}

export const ClotureScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation } = props;

  const [cb, setCB] = useState('');
  const [montant, setMontant] = useState('');
  const [commentaire, setCommentaire] = useState('');
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
      title: 'CLÔTURER LA CAISSE',
    });
  }, [navigation]);

  async function clotureCaisse(btnx: boolean) {
    console.log('clotureCaisse ========++>');
    setModalVisible(false);
    if (btnx) {
      navigation.navigate('ClotureVerfications', { cb, montant, commentaire });
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{STRING.CLOTURE_INFO}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>{STRING.CLOTURE_INFO_CB}</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'CB'}
              value={cb}
              onChange={(text: string) => setCB(text)}
              multiline={false}
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'Montant'}
              value={montant}
              onChange={(text: string) => setMontant(text)}
              multiline={false}
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'Commentaire'}
              value={commentaire}
              onChange={(text: string) => setCommentaire(text)}
              multiline
            />
          </View>
          <View>
            <Button message='Valider' iscancel={false} onPress={() => setModalVisible(true)}></Button>
          </View>
        </View>
        <Popup
          modalVisible={modalVisible}
          okAction={() => clotureCaisse(true)}
          setModalVisible={(btnx) => clotureCaisse(btnx)}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={true}
          message={'Vouler-vous continuer ?'} >
          <Text>Vous avez indiqué in nombre de {cb} et un montant de {montant} € pour les paiements 
          'Carte Bleue'.</Text>
        </Popup>
      </SafeAreaView>
    </ScrollView>
  );
}

export const Cloture = reduxConnect(ClotureScreen);
export const ClotureVerfications = reduxConnect(ClotureVerfication);
