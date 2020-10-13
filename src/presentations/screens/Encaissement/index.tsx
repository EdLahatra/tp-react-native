import React from 'react';
import { View,TouchableOpacity , Text, TextInput,Image} from 'react-native';
import EncaissementController, { reduxConnect } from '../../../controllers/Encaissement';

import {styles} from './styles';


class EncaissementScreen extends EncaissementController {
    componentDidMount() {
        
        
    }
    render(){
        return (
            <View style={styles.container}>
               
               <View style={styles.linearheader}>
                    <View style={styles.box1}>
                        <Text style={styles.txtTitle}>Numéro de ticket</Text>

                       <Text style={styles.txtValue}>0331433311</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.txtTitle}>Vendeur</Text>
                        <Text style={styles.txtValue}>John wick</Text>
                    </View>
               </View>
               
               <View style={styles.linearclientheader}>
                 <Text style={styles.txtTitle}>Client</Text>
                 <View style={styles.edtStyleCli}>
                    <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
                    
                    <TouchableOpacity style={styles.button}   >
            
                        <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
    
                     </TouchableOpacity>
                 </View>

               </View>
            </View>
        )
    }
}
export const Encaissement = reduxConnect(EncaissementScreen);