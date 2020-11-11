import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import { reduxConnect, IProps } from '../../../controllers/Home';
import { STRING } from '../../../data/Constants';
import Button from '../../components/Button';
import HeaderComponent from '../../components/NavigationHeader';
import { StackParams } from '../../navigation';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { useCaisseApp } from '../../../services/applicatif/caisses';
import { toDatetime } from '../../../services/utils';

type Route = RouteProp<StackParams, 'ControleCaisseVerfications'>;

export interface Props extends IProps {
  route: Route;
}

export const ControleCaisseScreen: React.FunctionComponent<Props> = function (props) {
  const { route, navigation, system: { user: { nom, prenom, nom_user }, oldUser } } = props;
  const [id_cloture, setId_cloture] = useState<string>('');

  const { insertControlesCaisseApp } = useCaisseApp();

  const { checkCloture } = useCaisseApp();

  const isFocused = useIsFocused();

  useEffect(() => {
    initialState();
  }, [isFocused]);


  async function initialState() {
    console.log('============+> initialState ControleCaisseScreen')
    const check = await checkCloture();
    const { id_cloture } = check;
    id_cloture && setId_cloture(id_cloture);
    return check;
  }

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
    const controle = {
      id_cloture,
      user_sortant: oldUser.nom_user,
      user_entrant: nom_user,
      date_debut: toDatetime(new Date()),
      date_fin: toDatetime(new Date()),
      ecart: 0,
      synchro_up: 0,
    }
    const c = await insertControlesCaisseApp(controle);
    console.log({ c });
    navigation.navigate('Acceuil');
  }

  const g = new Date();
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          title={'contrôle caisse'}
          goToLeft={()=> navigation.navigate('Acceuil')}
          goToRight={()=> {}}
          rigth={false}
        />
        <View style={{ padding: 20, flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#000000' }}>{STRING.CONTROLE_VERFICATION}</Text>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontSize: 14, color: '#000000', lineHeight: 20 }}>Date : {`${g.getDate()}/${g.getMonth()}/${g.getFullYear()}`}</Text>
            <Text style={{ fontSize: 14, color: '#000000', lineHeight: 20 }}>Salarié sortant: {oldUser.nom} {oldUser.prenom}</Text>
            <Text style={{ fontSize: 14, color: '#000000', lineHeight: 20 }}>Salarié entrent: {nom} {prenom}</Text>
            <Text style={{ fontSize: 14, color: '#000000', lineHeight: 20 }}>Nombre de Carte bleue théorique : {route?.params?.cb}</Text>
            <Text style={{ fontSize: 14, color: '#000000', lineHeight: 20 }}>Nombre de Carte bleue théorique : 0</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#998C7E', fontSize: 16, textAlign: 'center' }}>Le contrôle de caisse est maintenant terminé. Merci !</Text>
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
