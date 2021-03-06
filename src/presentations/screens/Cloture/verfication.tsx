import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';

import { StackParams } from '../../navigation';

import { STRING } from '../../../data/Constants';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import InputText from '../../components/InputText';
import { SystemState } from '../../../services/redux/system/types';
import { useCaisseApp } from '../../../services/applicatif/caisses';
import HeaderComponent from '../../components/NavigationHeader/backHeader';

const w = Dimensions.get('window').width - 40;

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

interface IProps {
  navigation: NavigationProps;
  system: SystemState;
}

const InputMontent = (value: string, name: string) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text style={{ fontSize: 10, color: '#4F4F4F', marginBottom: 5 }}>{name}</Text>
      <View>
        <TextInput
          value={value}
          style={{
            width: w / 5, borderRadius: 10, borderColor: '#787CC2', borderWidth: 1,
            backgroundColor: '#F2F2F2',
            textAlign: 'center'
          }}
          editable={false}
        />
      </View>
    </View>
  )
}

export const ClotureScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation, route, system: { user: { nom_user } } } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [cb] = useState(route?.params?.cb || '');
  const [montant] = useState(route?.params?.montant || '');
  const [commentaire, setCommentaire] = useState(route?.params?.commentaire || '');
  const { clotureCaisses2 } = useCaisseApp();

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
    const res = await clotureCaisses2(nom_user, cb, montant, commentaire);
    console.log({ res });
    setModalVisible(true);
  }

  async function finCloture() {
    navigation.navigate('Acceuil');
    setModalVisible(false);
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          msg={'Clôturer la caisse'}
          goBack={()=> navigation.goBack()}
        />
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#000000' }}>{STRING.CLOTURE_INFO}</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, textAlign: 'center', color: '#998C7E' }}>{STRING.CLOTURE_INFO_CB}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row', margin: 5 }}>
            {InputMontent(cb, 'CB')}
            {InputMontent(montant, 'Mnt théorique')}
            {InputMontent('1', 'Ecart')}
            <View style={{}}>
              <Text></Text>
              <View
                style={{
                  flex: 1,
                  borderRadius: 50,
                  width: w / 5,
                  backgroundColor: '#27AE60',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>OK</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={{ paddingBottom: 20 }}>
              <InputText
                title={'Commentaire'}
                value={commentaire}
                onChange={(text: string) => setCommentaire(text)}
                multiline
              />
            </View>
          </View>
          <View>
            <Button message='Etape suivante' iscancel={false} onPress={() => goOK()}></Button>
          </View>
        </View>
        <Popup
          modalVisible={modalVisible}
          setModalVisible={(btnx) => finCloture(btnx)}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={false}
          message={'La clôture est maintenat terminée ! Veuiller fermer le tirroir caisse et cliquez ensuite sur OK pour quitter'} >
        </Popup>
      </SafeAreaView>
    </ScrollView>
  );
}

export const ClotureVerfication = reduxConnect(ClotureScreen);
