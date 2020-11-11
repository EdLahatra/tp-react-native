import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { reduxConnect } from '../../../controllers/Encaissement';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';
import { StackParams } from '../../navigation';
import HeaderComponent from '../../components/NavigationHeader/backHeader';

type NavigationProps = StackNavigationProp<StackParams, 'PaiementCash'>;
type Route = RouteProp<StackParams, 'PaiementCash'>;

interface Props {
  navigation: NavigationProps;
  route: Route;
}

export const SpecialArticleScreen: React.FunctionComponent<Props> = function (props) {

  const { navigation } = props;
  const [articleSpecial, setArticleSpecial] = useState(['']);
  useEffect(() => {

    let values: string[] = [
      'Carte cadeau', 'Carte cadeau', 'Nouvelle carte 5e', 'Nouvelle carte 2 e', 'carte offerte'
    ];
    setArticleSpecial(values);
  }, []);

  return (

    <View style={styles.body}>
      <HeaderComponent
        msg={'Articles spéciaux'}
        goBack={() => navigation.goBack()}
      />
      <Text style={styles.txtTitle}>Veuillez sélectionner l’article </Text>
      <View style={styles.gridView}>
        <FlatGrid
          itemDimension={150}
          data={articleSpecial}
          // style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={20}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
            }}>
              <Text style={styles.itemName}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export const SpecialArticle = reduxConnect(SpecialArticleScreen);
