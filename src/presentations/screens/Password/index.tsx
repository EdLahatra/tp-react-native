import React, { useEffect, useState } from 'react';
import { Props, reduxConnect } from '../../../controllers/Password';
import { View } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components';
import { Keyboard } from '../../components';
import Popup from '../../components/Popup';
import { STRING } from '../../../data/Constants';
import faker from '../../../data/faker';
import { useCaisseApp } from '../../../services/applicatif/caisses';
import passwordOk from '../../../services/utils/cryptage';

// cle_serveur: "5DADA245"
// code_enseigne: "5D"
// code_mag: "HAP1"
// last_file: ""
// numero_caisse: "07"
// numero_enseigne: "07"
// numero_mag: "07"

export const generate_id_cloture = (code_mag: string, numero_caisse: string) => {
   // codeMag + numCaisse + type
  const g = new Date();
  const year = g.getFullYear().toString()
  const date = `${g.getMinutes()}${g.getHours()}${g.getDay()}${g.getMonth()}${year[2]}${year[3]}`;
  return code_mag  + numero_caisse + '02' + (date).toString();
}

export const PasswordScreen: React.FunctionComponent<Props> = function (props) {

  const { navigation, route, loginUser, system: { user: { nom_user }, params: { code_mag, numero_caisse } } } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const { ouvertureCaisse } = useCaisseApp();

  useEffect(() => {
    console.log({ nom_user, code_mag });
  });

  async function goTo(pwd: number) {
    const user = route?.params?.user;
    const mdp = await passwordOk(pwd);
    const isMatch = user && user?.passwd === mdp;
    console.log(mdp, user);
    if (isMatch) {
      loginUser(user);
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
          navigation.navigate('ControleCaisse');
          break;
        default:
          navigation.navigate('Acceuil',{item:route?.params?.user});
      }
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
    navigation.navigate('Acceuil');
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

  return (

    <View style={styles.body}>
      <Header title={route?.params?.user.nom+' '+route?.params?.user.prenom} nom="Mot de passe" ispass />
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
export const Password = reduxConnect(PasswordScreen);
