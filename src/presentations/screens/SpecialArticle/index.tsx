import React, { useEffect, useState } from 'react';

import { View,Text,TouchableOpacity} from 'react-native';
import {styles} from './styles';
import  {  reduxConnect } from '../../../controllers/Encaissement';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';
import { FlatGrid } from 'react-native-super-grid';
import {StackParams} from '../../navigation';
type NavigationProps = StackNavigationProp<StackParams, 'PaiementCash'>;
type Route = RouteProp<StackParams, 'PaiementCash'>;


interface Props{
    navigation: NavigationProps;
    route: Route;
}

export const SpecialArticleScreen : React.FunctionComponent<Props> = function (props) {
   
    const { navigation } = props;
    const [articleSpecial, setArticleSpecial] = useState(['']);
    useEffect(() => {
        
        let values:string[] = ['Carte cadeau','Carte cadeau','Nouvelle carte 5e', 'Nouvelle carte 2 e'];
        setArticleSpecial(values);
    },[]);
       
        return (
            
        <View style={styles.body}>

            <Text style={styles.txtTitle}>Veuillez sélectionner l’article </Text>
            <FlatGrid
                itemDimension={130}
                data={articleSpecial}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={14}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => {
                       
                        
                    }}>
                    <Text style={styles.itemName}>{item}</Text>
                    
                    </TouchableOpacity>
                )}
                />
           
        </View>
        )
    
}
export const SpecialArticle = reduxConnect(SpecialArticleScreen);