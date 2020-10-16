import React from 'react';
import { View,TouchableOpacity , Text, TextInput} from 'react-native';
import FicheClientController, { reduxConnect } from '../../../controllers/FicheClient';

import {styles} from './styles';


class FicheClientScreen extends FicheClientController {
    componentDidMount() {
      const { state } = this.props.navigation;
      console.log(this.props.navigation);
    }

    render(){
        return (
            <View style={styles.container}>
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Nom et Prénom</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                 </View>
               </View>
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Téléphone</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                 </View>
               </View>
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Mail</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
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
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                 </View>
               </View>

               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Solde de point</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                 </View>
               </View>

               <View style={{flex:1 , flexDirection: 'row' , justifyContent:'space-between'}} >
               < TouchableOpacity style={styles.button} >
                   <Text adjustsFontSizeToFit={true} style={styles.inputname}>Modifier</Text>
                   
                   </TouchableOpacity>
                   < TouchableOpacity style={styles.button} >
                   <Text adjustsFontSizeToFit={true} style={styles.inputname}>Associer</Text>
                   
                   </TouchableOpacity>
                 </View>
            </View>
        )
    }
}
export const FicheClient = reduxConnect(FicheClientScreen);