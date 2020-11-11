import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';

import { reduxConnect } from '../../../controllers/Home';
import { StackParams } from '../../../presentations/navigation';

import { useMetiersApp } from '../../../services/metiers';
import { useApplicatif } from '../../../services/applicatif';
import { useAppSynchroDown } from '../../../services/applicatif/synchroDown';
import { useAppSynchroUp } from '../../../services/applicatif/synchroUp';
import { SystemState, Parametres } from '../../../services/redux/system/types';
import { useAppArticles } from '../../../services/applicatif/articles';
import HeaderComponent from '../../components/NavigationHeader';
import InputText from '../../components/InputText';
import ButtonComponent from '../../components/Button';
import CheckBoxComponent from '../../components/CheckBox';
import { STRING } from '../../../data/Constants';
import Popup from '../../components/Popup';

export const devicesHeight = Dimensions.get('window').height;

type NavigationProps = StackNavigationProp<StackParams, 'Parametres'>;

interface IProps {
  navigation: NavigationProps;
  system: SystemState;
  updateParametres: (params: Parametres) => Promise<void>;
}

export const ParametresScreen: React.FunctionComponent<IProps> = function (props) {
  const { navigation, system, updateParametres } = props;

  const [isSynchroniseur, setSynchroniseur] = useState(false);
  const [isTPE, setTPE] = useState(false);
  const [modeStandAlone, setModeStandAlone] = useState(false);
  const [ecouteReseau, setEcouteReseau] = useState(false);
  const [timer, setTimer] = useState(1);
  const [urlWS, setUrlWS] = useState('');
  const [v_avoir, setAvoir] = useState('60');
  const [nb_avoir, setNbAvoir] = useState('1');
  const [v_carte_cadeau, setCarte_cadeau] = useState('365');
  const [modele_avoir, setModele_avoir] = useState('1MMCC#######');
  const [modele_carte_cadeau, setModeleCarteCadeau] = useState('100#######');
  const [nb_carte_cadeau, setNbCarteCadeau] = useState('999');
  const [port_serie, setPortSerie] = useState('COM4');
  const [ip_afficheur, setIPAfficher] = useState('');
  const [urlZip, setUrlZip] = useState('');
  const [urlUp, setUrlUp] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [mdp_admin, setMDP_admin] = useState('');
  const [code_mag, setCode_mag] = useState('');
  const [numero_mag, setNumero_mag] = useState('');
  const [numero_caisse, setNumero_caisse] = useState('');
  const [cle_serveur, setCle_serveur] = useState('');
  const [code_enseigne, setCode_enseigne] = useState('');
  const [last_file, setLast_file] = useState('');
  const [numero_enseigne, setNumero_enseigne] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOK, setModalVisibleOK] = useState(false);
  const [flag, setFlag] = useState('synchro');

  const { getEntityApp } = useApplicatif();
  const { getLastFile, lastFile } = useAppSynchroDown();
  const { selectCounts } = useMetiersApp();
  const { synchroUp } = useAppSynchroUp();
  const { getArticles } = useAppArticles();

  useEffect(() => {
    initialState();
    selectCounts();
  }, [lastFile]);

  async function initialState() {
    console.log('initialState  =================++> ParametresScreen');
    const cl = await getArticles({});
    console.log({ cl });
    const last_f = await getLastFile();

    const { params: {
      urlUp, timer, numero_caisse, numero_enseigne, numero_mag, cle_serveur, code_enseigne, code_mag, urlWS, urlZip
    } } = system;

    setTimer(timer);
    setCode_enseigne(code_enseigne);
    setLast_file(last_f);
    setNumero_caisse(numero_caisse);
    setCode_mag(code_mag);
    setNumero_mag(code_mag);
    setCle_serveur(cle_serveur);
    setNumero_mag(numero_mag);
    setNumero_enseigne(numero_enseigne);
    setUrlWS(urlWS);
    setUrlZip(urlZip);
    setUrlUp(urlUp);

    return await testFunction();
  }

  async function testFunction() {
    const params = {
      limit: 100,
      table: 'Tickets',
    };
    const param = await getEntityApp(params);
    console.log({ param });
  }

  async function updateParams() {
    const params = {
      code_mag,
      numero_caisse,
      code_enseigne,
      last_file,
      cle_serveur,
      numero_mag,
      numero_enseigne,
      timer,
      urlZip,
      urlWS,
      urlUp,
    };
    updateParametres(params);
  }

  async function goToSynchroUp() {
    setLoading(true);
    await synchroUp();
    setLoading(false);
    await setModalVisibleOK(true);
  }

  async function clotureCaisse(btnx: boolean) {
    console.log('clotureCaisse ========++>');
    setModalVisible(false);
    setModalVisibleOK(btnx);
    if (btnx && flag === 'synchro') {
      await goToSynchroUp();
    }
  }

  async function clotureCaisseOK() {
    console.log('clotureCaisseOK ========++>');
    clotureCaisseOK();
  }

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
          <HeaderComponent
            title={'Paramètres caisses'}
            goToLeft={() => navigation.navigate('Acceuil')}
            goToRight={() => { }}
            rigth={false}
          />
          <View style={{ margin: 16 }}>
            <InputText
              title={'Adresse du serveur synchro'}
              value={urlWS}
              onChange={(text: string) => setUrlWS(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Adresse du serveur de mises à jour'}
              value={urlZip}
              onChange={(text: string) => setUrlZip(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Adresse du serveur Avoir / KDO'}
              value={urlUp}
              onChange={(text: string) => setUrlUp(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Validité Avoir (en jours)'}
              value={v_avoir}
              onChange={(text: string) => setAvoir(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Validité carte cadeau (en jours)'}
              value={v_carte_cadeau}
              onChange={(text: string) => setCarte_cadeau(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Nombre utilisations Avoir'}
              value={nb_avoir}
              onChange={(text: string) => setNbAvoir(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Nombre utilisations carte cadeau'}
              value={nb_carte_cadeau}
              onChange={(text: string) => setNbCarteCadeau(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Modèle numérisation Avoir'}
              value={modele_avoir}
              onChange={(text: string) => setModele_avoir(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Modèle numérisation carte cadeau'}
              value={modele_carte_cadeau}
              onChange={(text: string) => setModeleCarteCadeau(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />

            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <CheckBoxComponent
                title='Activation du synchroniseur'
                checked={isSynchroniseur}
                setChecked={() => setSynchroniseur(!isSynchroniseur)}
              />
              <CheckBoxComponent
                title='Activation du TPE'
                checked={isTPE}
                setChecked={() => setTPE(!isTPE)}
              />
            </View>

            <InputText
              title={'Port série du TPE'}
              value={port_serie}
              onChange={(text: string) => setPortSerie(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Adresse IP de l’afficheur'}
              value={ip_afficheur}
              onChange={(text: string) => setIPAfficher(text)}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />

            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <CheckBoxComponent
                title='Mode stand Alone (impression)'
                checked={modeStandAlone}
                setChecked={() => setModeStandAlone(!modeStandAlone)}
              />
              <CheckBoxComponent
                title='Ecoute réseau (colis, impression...'
                checked={ecouteReseau}
                setChecked={() => setEcouteReseau(!ecouteReseau)}
              />
            </View>

            <InputText
              title={'Numero Caisse'}
              value={numero_caisse}
              onChange={(text: string) => setNumero_caisse(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              title={'Code enseigne'}
              value={code_enseigne}
              onChange={(text: string) => setCode_enseigne(text)}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              value={code_mag}
              onChange={(name) => setCode_mag(name)}
              title={'Code mag'}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              value={numero_mag}
              onChange={(name) => setNumero_mag(name)}
              title={'Numero mag'}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              value={numero_enseigne}
              onChange={(name) => setNumero_enseigne(name)}
              title={'Numero enseigne'}
              multiline={false}
            />
            <InputText
              value={cle_serveur}
              onChange={(name) => setCle_serveur(name)}
              title={'Cle serveur'}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              value={last_file}
              onChange={(name) => setLast_file(name)}
              title={'Last file'}
              multiline={false}
              onLongPress
              onEndEditing={async () => await updateParams()}
            />
            <InputText
              value={timer.toString()}
              onChange={(name: string) => setTimer(Number(name))}
              title={'Timer'}
              multiline={false}
              keyboardType='numeric'
              onLongPress
              onEndEditing={async () => await updateParams()}
            />

            <ButtonComponent
              message="Réouvrir la cloture du jour"
              onPress={async () => {
                await setFlag('cloture');
                setModalVisible(true)
              }}
            />
            {loading ? <ActivityIndicator size='large' color={'red'} /> : <ButtonComponent
              message="Resynchro cloture ou ticket"
              onPress={async () => {
                await setFlag('synchro');
                setModalVisible(true)
              }}
            />}
            <ButtonComponent
              message="Stats sur la BDD"
              onPress={() => navigation.navigate('StatsBDD')}
            />
          </View>
        </View>
        <Popup
          modalVisible={modalVisible}
          okAction={() => clotureCaisse(true)}
          setModalVisible={(btnx) => clotureCaisse(btnx)}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={true}
          message={flag === 'synchro' ? STRING.SYNCHRO_UP : STRING.CLOTURE_CHECKED}>
          <View style={{ height: 70, flex: 1, marginBottom: 10, marginTop: 10 }}>
            <InputText
              value={flag === 'synchro' ? date : mdp_admin}
              onChange={(name) => flag === 'synchro' ? setDate(name) : setMDP_admin(name)}
              title={flag === 'synchro' ? 'Date' : 'Mot de passe'}
              multiline={false}
              placeholder={flag === 'synchro' ? '01-11-2020' : 'Mot de passe'}
            />
          </View>
        </Popup>
        <Popup
          modalVisible={modalVisibleOK}
          okAction={() => clotureCaisseOK()}
          setModalVisible={() => setModalVisibleOK(false)}
          cancelButton='Annuler'
          okButton={STRING.OK}
          isTwoButton={false}
          message={flag === 'synchro' ? STRING.OPERATION_TERMINE : STRING.REOUVERTURE_CAISSE_SUCCES}>
        </Popup>
      </SafeAreaView>
    </ScrollView>
  );
}

export const ParametresScreens = reduxConnect(ParametresScreen);
