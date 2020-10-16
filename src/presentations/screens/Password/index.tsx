import React, { useEffect, useState } from 'react';
import { Props, reduxConnect } from '../../../controllers/Password';
import { View} from 'react-native';
import {styles} from './styles';
import { Header }  from '../../components';
import { Keyboard } from '../../components';


export const PasswordScreen : React.FunctionComponent<Props> = function (props) {
   
    const { navigation } = props;
    useEffect(() => {
        
    });
       
        return (
            
        <View style={styles.body}>

            
            <Header title="James Bond" nom="Mot de passe" ispass/>
            <View style={styles.autocompleteContainer}>
            
            <Keyboard goto={() => navigation.navigate('Acceuil')}/>
            </View>
           
        </View>
        )
    
}
export const Password = reduxConnect(PasswordScreen);