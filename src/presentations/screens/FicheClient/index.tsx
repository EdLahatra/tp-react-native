import React , {useState, useEffect} from 'react';
import { View,TouchableOpacity , Text, TextInput} from 'react-native';
import FicheClientController, { reduxConnect } from '../../../controllers/FicheClient';

import {styles} from './styles';
import {StackNavigationProp,RouteProp} from '@react-navigation/stack';

import {StackParams} from '../../navigation';
import Button from '../../components/Button';

type NavigationProps = StackNavigationProp<StackParams, 'FicheClient'>;
type Route = RouteProp<StackParams, 'FicheClient'>;
interface Props {
    
  navigation: NavigationProps;
  route: Route;
}
export const FicheClientScreen : React.FunctionComponent<Props> = function (props) {

  const { navigation, route } = props;
  const {client} = route.params;

  useEffect(() => {
 }, []);

 function modifier(){

 }
 function associer(){
   
 }
  return (
    <View style={styles.container}>
       <View style={styles.linearclientheader}>
         <Text style={styles.txtTitle}>Nom et Prénom</Text>
         <View style={{flex:1, flexDirection:'row'}}>
            <TextInput
                value={client.nom}
                style={styles.inputname}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''/>
         </View>
       </View>
       <View style={styles.linearclientheader}>
         <Text style={styles.txtTitle}>Téléphone</Text>
         <View style={{flex:1, flexDirection:'row'}}>
            <TextInput
                value={client.telephone}
                style={styles.inputname}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''/>
         </View>
       </View>
       <View style={styles.linearclientheader}>
         <Text style={styles.txtTitle}>Mail</Text>
         <View style={{flex:1, flexDirection:'row'}}>
            <TextInput
                value = {client.email}
                style={styles.inputname}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='numeric'
                placeholder=''/>
         </View>
       </View>

       <View style={styles.linearclientheader}>
         <Text style={styles.txtTitle}>Code de carte</Text>
         <View style={{flex:1, flexDirection:'row'}}>
            <TextInput
                value={client.numero_carte}
                style={styles.inputname}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder=''/>
         </View>
       </View>

       <View style={styles.linearclientheader}>
         <Text style={styles.txtTitle}>Solde de point</Text>
         <View style={{flex:1, flexDirection:'row'}}>
            <TextInput
                value={client.solde_points}
                style={styles.inputname}
                multiline={false}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='numeric'
                placeholder=''/>
         </View>
       </View>

       <View style={{flexDirection:'row',flex:1,marginTop:20}}>
                <View style={{flex:1,height:50}}>
                    <Button message="Annuler" iscancel onPress={() => modifier()}/>
                </View>
               <View style={{flex:1,height:50,marginStart:40}}>
                    <Button message="Ok" iscancel={false} onPress={() => associer()}/>

               </View>
              
            </View>
    </View>
)
}
export const FicheClient = reduxConnect(FicheClientScreen);