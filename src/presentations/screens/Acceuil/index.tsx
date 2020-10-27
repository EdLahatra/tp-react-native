import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { reduxConnect, Props } from '../../../controllers/Acceuil';
import { styles } from './styles';
import { FlatGrid } from 'react-native-super-grid';

import { useCaisseApp } from '../../../services/applicatif/caisses';
import { toDatetimeDisplay } from '../../../services/utils';
import Popup from '../../components/Popup';
import { STRING } from '../../../data/Constants';

export const cle_serveur = '5DADA245';
export const code_mag = 'HAP1';
export const numero_caisse = '07';

export const encaissement_message = (d1: string, d2: string) => {
  return `La date de l'ouverture de caisse (${d1}) be corespond pas à la date du jour (${d2}).
  Etes-vous sur de vouloir encaisser sur cette date ?`;
}

export const AcceuilScreen: React.FunctionComponent<Props> = function (props) {
  const { navigation, system,route } = props;
  const [isOuvert, setIsOuvert] = useState<boolean>(false);
  const [isOldNoFermer, setOldNoFermer] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');

  const { checkCloture } = useCaisseApp();

  const droit_ouverture = system.user && system.user?.droit_ouverture === '1';
  const droit_fermeture = system.user && system.user?.droit_fermeture === '1';

  useEffect(() => {
    initialState();
  }, []);

  const isCanOuvert = !isOuvert && !isOldNoFermer;

  const userTestStatus: { num: string, color: string }[] = [
    { "num": "Encaissement", "color": isOuvert ? '#6FCF97' : '#D6D7F6' },
    { "num": "Historique tickets", "color": isOuvert ? '#6FCF97' : '#D6D7F6' },
    { "num": "Ouverture caisse", "color": !isOuvert ? '#6FCF97' : '#D6D7F6' },
    { "num": "Clôture caisse", "color": isOuvert ? '#6FCF97' : '#D6D7F6' },
    { "num": "Contrôle caisse", "color": isOuvert ? '#6FCF97' : '#D6D7F6' },
    { "num": "Paramètres caisses", "color": '#6FCF97' },
  ];

  async function initialState() {
    const check = await checkCloture();
    const { date_ouverture, date_fermeture } = check;
    const date_o = toDatetimeDisplay(date_ouverture);
    const date_f = new Date(date_fermeture);
    const g = new Date();
    const r = `${date_o.getDay()}/${date_o.getMonth()}/${date_o.getFullYear()}`;
    const r1 = `${g.getDay()}/${g.getMonth()}/${g.getFullYear()}`;
    setD1(r);
    setD2(r1);
    console.log(date_ouverture, date_fermeture === '');
    setIsOuvert(!(date_ouverture === null || date_fermeture > 0));
    setOldNoFermer(r === r1);
  }

  async function goOuvertureCaisse() {
    if (!isOuvert) {
      navigation.navigate('Login', { id: 0 });
    }
  }

  async function goEncaissement() {
    if(isOuvert) {
      if(d1 !== d2) {
        setModalVisible(true);
      }
      else if(isOuvert) {
        navigation.navigate('Encaissement', { item:route?.params?.item, fromHome:true });
      }
    }
  }

  async function goClotureCaisse() {
    if(isOuvert) {
      navigation.navigate('Login', { id: 1 });
    }
  }

  async function goControleCaisse() {
    if(isOuvert) {
      navigation.navigate('Login', { id: 2 });
    }
  }

  async function okAction() {
    setModalVisible(false);
    if(isOuvert) {
       navigation.navigate('Encaissement', { item:route?.params?.item, fromHome:true });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridView}>
        <FlatGrid
          itemDimension={150}
          data={userTestStatus}
          // staticDimension={300}
          // fixed
          spacing={7}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.color }]} onPress={async () => {
              switch (index) {
                case 0:
                  await goEncaissement();
                  break;
                case 1:
                  navigation.navigate('HistoriqueTicket');
                  break;
                case 2:
                  await goOuvertureCaisse();
                  break;
                case 3:
                  await goClotureCaisse();
                  break;
                case 4:
                  await goControleCaisse();
                  break;
                case 5:
                  navigation.navigate('Parametres');
                  break;
              }
            }}>
              <Text adjustsFontSizeToFit={true} style={styles.itemName}>{item.num}</Text>

            </TouchableOpacity>
          )}
        />
      </View>
      <Popup modalVisible={modalVisible}
        setModalVisible={async () => setModalVisible(false)}
        okAction={() => okAction()}
        cancelButton='Annuler'
        okButton={STRING.OK}
        isTwoButton={true}
        message={encaissement_message(d1, d2)} />

    </View>
  )
}

export const Acceuil = reduxConnect(AcceuilScreen);
