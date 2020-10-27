import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text} from 'react-native';
import  {  reduxConnect } from '../../../controllers/Encaissement';


import { STRING } from '../../../data/Constants'
import {styles} from './styles';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';

import {StackParams} from '../../navigation';

import InputCartePaiement from '../../components/InputCartePaiement';

type NavigationProps = StackNavigationProp<StackParams, 'PaiementAvoir'>;
type Route = RouteProp<StackParams, 'PaiementAvoir'>;

 interface Props {
    
    navigation: NavigationProps;
    route: Route;
  }
export const PaiementCadeauScreen : React.FunctionComponent<Props> = function (props) {
    
    const { navigation ,route} = props;
   
    useEffect(() => {
       
    },[]);

    function cancelButton(){

    }
    function okButton(){

    }
   
        return (
           
            <View style={styles.body}>
                <Text style={styles.txtTitle}>Veuillez scanner ci-dessous le code de la carte cadeau à utiliser : </Text>
                <View style={{marginTop:20,marginStart:10,marginEnd:10}}>
                <InputCartePaiement title="Code carte cadeau" cancel={() => cancelButton()} ok={() => okButton()} />
                </View>
            </View>
           
        )
    
}
export const PaiementCadeau = reduxConnect(PaiementCadeauScreen);
