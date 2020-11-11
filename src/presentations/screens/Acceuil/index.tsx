import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';

import { reduxConnect, Props } from '../../../controllers/Acceuil';
import { styles } from './styles';

import { useCaisseApp } from '../../../services/applicatif/caisses';
import { toDatetimeDisplay } from '../../../services/utils';
import Popup from '../../components/Popup';
import { STRING } from '../../../data/Constants';
import { initialUser } from '../../../data/config';
import { B } from '../Cloture';

export const encaissement_message = (d1: string, d2: string) => {
  return <Text>La date de l'ouverture de caisse <B>({d1})</B> ne corespond pas à la date du jour <B>({d2})</B>. Etes-vous sur de vouloir encaisser sur cette date ?</Text>;
}

export const AcceuilScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation, route, loginUser } = props;
  const [isOuvert, setIsOuvert] = useState<boolean>(false);
  const [] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [flag, setFlag] = useState('cloture');

  const { checkCloture } = useCaisseApp();

  const isFocused = useIsFocused();

  useEffect(() => {
    initialState();
  }, [isFocused]);

  const userTestStatus: { num: string, color: string, enable: boolean, icon: ImageSourcePropType }[] = [
    { 'num': 'Encaissement', 'color': isOuvert ? '#E0C298' : '#F2F2F2', enable: isOuvert, icon: require('../../resources/images/Buy.png') },
    { 'num': 'Historique tickets', 'color': isOuvert ? '#E0C298' : '#F2F2F2', enable: isOuvert, icon: require('../../resources/images/Document.png') },
    { 'num': 'Ouverture caisse', 'color': !isOuvert ? '#E0C298' : '#F2F2F2', enable: !isOuvert, icon: require('../../resources/images/Login.png') },
    { 'num': 'Clôture caisse', 'color': isOuvert ? '#E0C298' : '#F2F2F2', enable: isOuvert, icon: require('../../resources/images/Cloture.png') },
    { 'num': 'Contrôle caisse', 'color': isOuvert ? '#E0C298' : '#F2F2F2', enable: isOuvert, icon: require('../../resources/images/Tick_Square.png') },
    { 'num': 'Paramètres caisses', 'color': '#E0C298', enable: true, icon: require('../../resources/images/Setting.png') },
  ];

  async function initialState() {
    const check = await checkCloture();
    console.log('============+> initialState', check)
    const { date_ouverture, date_fermeture } = check;
    const date_o = toDatetimeDisplay(date_ouverture);

    const g = new Date();
    const r = `${date_o.getDay()}/${date_o.getMonth()}/${date_o.getFullYear()}`;
    const r1 = `${g.getDay()}/${g.getMonth()}/${g.getFullYear()}`;
    setD1(r);
    setD2(r1);

    setIsOuvert(!(date_ouverture === null || date_fermeture > 0));
  }

  async function goOuvertureCaisse() {
    if (!isOuvert) {
      navigation.navigate('Login', { id: 0 });
    }
  }

  async function goEncaissement() {
    if (isOuvert) {
      if (d1 !== d2) {
        setModalVisible(true);
      }
      else if (isOuvert) {
        navigation.navigate('Encaissement', { item: route?.params?.item, fromHome: true });
      }
    }
  }

  async function goClotureCaisse() {
    if (isOuvert) {
      navigation.navigate('Login', { id: 1 });
    }
  }

  async function goControleCaisse() {
    if (isOuvert) {
      navigation.navigate('Login', { id: 2 });
    }
  }

  async function okAction() {
    setModalVisible(false);
    if (flag === 'cloture') {
      return await goClotureCaisse();
    }
    if (isOuvert) {
      navigation.navigate('Encaissement', { item: route?.params?.item, fromHome: true });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{
        justifyContent: 'space-between', flexDirection: 'row', margin: 15, marginTop: 70, marginBottom: 70
      }}>
        <View style={{ width: 50, height: 50 }} />
        <View>
          <Image style={{ height: 56 }} source={require('../../resources/images/g_logoheader.png')} />
        </View>
        <TouchableOpacity onPress={() => loginUser(initialUser)}>
          <View
            style={{
              width: 50, height: 50, borderRadius: 40, backgroundColor: '#998C7E',
              justifyContent: 'center', alignItems: 'center'
            }}
          >
            <Image
              style={{ height: 20, width: 20, tintColor: 'white' }}
              source={require('../../resources/images/logout.png')} />
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.gridView}>
        <FlatGrid
          // itemDimension={160}
          data={userTestStatus}
          // staticDimension={300}
          // fixed
          spacing={20}
          // style={{ backgroundColor: 'orange' }}
          renderItem={({ item: { color, num, enable, icon }, index }) => {

            return (
              <TouchableOpacity
                activeOpacity={enable ? 0 : 1}
                style={{ backgroundColor: color, borderRadius: 5 }}
                onPress={async () => {
                  if(!enable) {
                    return;
                  }
                  switch (index) {
                    case 0:
                      await setFlag('encaissement');
                      await goEncaissement();
                      break;
                    case 1:
                      navigation.navigate('HistoriqueTicket');
                      break;
                    case 2:
                      await goOuvertureCaisse();
                      break;
                    case 3:
                      await setFlag('cloture');
                      await setModalVisible(true);
                      // await goClotureCaisse();
                      break;
                    case 4:
                      await goControleCaisse();
                      break;
                    case 5:
                      navigation.navigate('Parametres');
                      break;
                  }
                }}>
                <View style={[styles.itemContainer, {}]}>
                  <Text adjustsFontSizeToFit={true} style={[styles.itemName, { color: !enable ? '#BDBDBD' : 'white' }]}>{num}</Text>
                </View>
                {enable && icon && <Image
                  style={{ height: 80, marginTop: -78, opacity: 0.3 }}
                  source={icon} />}
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <Popup
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        okAction={async () => await okAction()}
        cancelButton='Annuler'
        okButton={STRING.OK}
        isTwoButton={true}
        message={flag === 'cloture' ? STRING.CLOTURE_CONFIMATION : encaissement_message(d1, d2)}
      ></Popup>
    </View>
  )
}

export const Acceuil = reduxConnect(AcceuilScreen);
