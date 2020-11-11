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
import HeaderComponent from '../../components/NavigationHeader/backHeader';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
}

export const B = ({ children }) => <Text style={{fontWeight: 'bold'}}>{children}</Text>

export const ClotureScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation } = props;

  const [cb, setCB] = useState('0');
  const [montant, setMontant] = useState('0');
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
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          msg={'Clôturer la caisse'}
          goBack={()=> navigation.goBack()}
        />
        <View style={{
          padding: 20, flex: 1, justifyContent: 'space-around',
          flexDirection: 'column', backgroundColor: 'white' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#000000' }}>{STRING.CLOTURE_INFO}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, textAlign: 'center', color: '#998C7E' }}>{STRING.CLOTURE_INFO_CB}</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'CB'}
              value={cb}
              onChange={(text: string) => setCB(text)}
              multiline={false}
              keyboardType='numeric'
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <InputText
              title={'Montant'}
              value={montant}
              onChange={(text: string) => setMontant(text)}
              multiline={false}
              keyboardType='numeric'
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
          message={''} >
            <View>
              <Text style={{ textAlign: 'center', fontSize: 16 }}>Vous avez indiqué un <B>nombre de {cb}</B> et <B>un montant de {montant} €</B> pour les paiements 
              'Carte Bleue'.</Text>
              <Text style={{ textAlign: 'center', fontSize: 16, margin: 15 }}>Vouler-vous continuer ?</Text>
            </View>
        </Popup>
      </SafeAreaView>
    </ScrollView>
  );
}

export const Cloture = reduxConnect(ClotureScreen);
export const ClotureVerfications = reduxConnect(ClotureVerfication);
