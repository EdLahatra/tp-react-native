import React ,{ useEffect, useRef, useState }from 'react';
import { View,TouchableOpacity , Text} from 'react-native';
import  {  reduxConnect } from '../../../controllers/Encaissement';


import { STRING } from '../../../data/Constants'
import {styles} from './styles';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';

import {StackParams} from '../../navigation';
import Button from '../../components/Button';

type NavigationProps = StackNavigationProp<StackParams, 'PaiementCash'>;
type Route = RouteProp<StackParams, 'PaiementCash'>;

 interface Props {
    
    navigation: NavigationProps;
    route: Route;
  }
export const PaiementCashScreen : React.FunctionComponent<Props> = function (props) {
    
    const { navigation ,route} = props;
    const {montant} = route.params;
    useEffect(() => {
      
    },[]);

    function goToPaiement(){
        //let montantregle = montant.toString().split(' ');
        navigation.navigate('Paiement',{articleTotal:montant,iscodechoisi:true,montantregle:montant});
    }
   
        return (
           
             <View style={styles.container}>
                 <Text style={{textAlign:'center'}}>Reste à payer</Text>
                 <View style={{height:100,marginTop:20,elevation:4,backgroundColor:'#F5F5F5',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{textAlign:'center', fontSize:18}}>{montant.count+' '+montant.devises} </Text>
                 </View>
                 <View style={{height:50,marginTop:20}}>
                 <Button message="Payer"  iscancel={false} onPress={() => goToPaiement()}/>
                 </View>
            </View>
           
        )
    
}
export const PaiementCash = reduxConnect(PaiementCashScreen);
