import React from 'react';
import PasswordController, { reduxConnect } from '../../../controllers/Password';
import { View,Text} from 'react-native';
import {styles} from './styles';
import { Header }  from '../../components';
import { Keyboard } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

class PasswordScreen extends PasswordController {
    componentDidMount() {
       
       
       
    }
    render() {
       console.log('props',this.props);
        return (
        <View style={styles.body}>
            <Header title="James Bond" nom="Mot de passe" ispass/>
            <View style={styles.autocompleteContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Acceuil')}>
                <Text>GO</Text>
            </TouchableOpacity>
            <Keyboard goto={() => this.props.navigation.navigate('Acceuil')}/>
            </View>
        </View>
        )
    }
}
export const Password = reduxConnect(PasswordScreen);