import React, { useEffect, useState } from 'react';
import { Props, reduxConnect } from '../../../controllers/Password';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components';
import { Keyboard } from '../../components';
import Popup from '../../components/Popup';
import { STRING } from '../../../data/Constants';
import faker from '../../../data/faker';
import { useCaisseApp } from '../../../services/applicatif/caisses';
import passwordOk from '../../../services/utils/cryptage';
import BackHeader from '../../components/NavigationHeader/backHeader';

export const generate_id_cloture = (code_mag: string, numero_caisse: string) => {
  // codeMag + numCaisse + type
  const g = new Date();
  const year = g.getFullYear().toString()
  const date = `${g.getMinutes()}${g.getHours()}${g.getDay()}${g.getMonth()}${year[2]}${year[3]}`;
  return code_mag + numero_caisse + '02' + (date).toString();
}

export const PasswordScreen: React.FunctionComponent<Props> = function (props) {

  const { navigation, route, loginUser, loginOldUser ,system: { user: { nom_user }, params: { code_mag, numero_caisse } } } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const { ouvertureCaisse } = useCaisseApp();
  const [titleHeader, setHeadTitle] = useState('');

  useEffect(() => {
    console.log({ nom_user, code_mag });
    switch (route?.params?.id) {

      case 8:
        setHeadTitle('Authentification superviseur');
        break;
    }
  });

  async function goTo(pwd: number) {
    console.log(pwd);
    const user = route?.params?.user;
    const mdp = await passwordOk(pwd);
    const isMatch = user && user?.passwd === mdp;
    console.log(mdp, user);
    if (isMatch) {
      loginUser(user);
      // if(route?.params?.id) {
      switch (route?.params?.id) {
        case 0:
          await goOuvertureCaisse();
          setModalVisible(true);
          // navigation.navigate('Acceuil');
          break;
        case 1:
          navigation.navigate('Cloture');
          break;
        case 2:
          loginOldUser(user);
          navigation.navigate('Login', { id: 3 });
          break;
        case 3:
          navigation.navigate('ControleCaisse');
          break;
        case 8:
          navigation.navigate('ChoixMotifRemise');

          break;

        default:
        // navigation.navigate('Acceuil', { item:route?.params?.user });
      }
      // }
      return true;
    } else {
      return false;
    }

  }

  function checkMessage(): string {
    switch (route?.params?.id) {
      case 0:
        return STRING.OUVERTURE_CAISSE_SUCCES;
      case 1:
      default:
        return STRING.OUVERTURE_CAISSE_SUCCES;
    }
  }

  function modaleOuvertureCaisse() {
    console.log('modaleOuvertureCaisse =======+>')
    setModalVisible(false);
    navigation.navigate('Encaissement', { item: route?.params?.item, fromHome: true });
  }

  async function goOuvertureCaisse() {
    const ouverture = {
      ...faker.cloture,
      // id_cloture: 'HAP1070250191920',
      id_cloture: generate_id_cloture(code_mag, numero_caisse),
      usr_ouverture: nom_user,
    };
    console.log({ ouverture });
    const ouv_caisse = await ouvertureCaisse(ouverture, faker.ouverturesTiroir);
    console.log({ ouv_caisse });
  }
  if (route?.params?.id == 8) {
    return (

      <View style={styles.body}>
        <BackHeader msg={titleHeader} goBack={() => navigation.goBack()} />
        <View style={styles.viewhead}>
          <Text style={styles.txtstyleNormal}>BIENVENUE </Text>
          <Text style={styles.txtstyle}>{route?.params?.user.nom + ' ' + route?.params?.user.prenom}</Text>
        </View>
        <View style={styles.autocompleteContainer}>
          <Keyboard goto={async (pwd: number) => await goTo(pwd)} />
        </View>
        <Popup modalVisible={modalVisible}
          setModalVisible={async () => modaleOuvertureCaisse()}
          okAction={() => modaleOuvertureCaisse()}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={false}
          message={checkMessage()} >

        </Popup>
      </View>
    )
  } else {
    return (
      <View style={styles.body}>
        <Header title={route?.params?.user.nom + ' ' + route?.params?.user.prenom} nom="Mot de passe" ispass />

        <View style={styles.autocompleteContainer}>
          <Keyboard goto={async (pwd: number) => await goTo(pwd)} />
        </View>
        <Popup modalVisible={modalVisible}
          setModalVisible={async () => modaleOuvertureCaisse()}
          okAction={() => modaleOuvertureCaisse()}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={false}
          message={checkMessage()} >

        </Popup>
      </View>
    )
  }

}
export const Password = reduxConnect(PasswordScreen);
