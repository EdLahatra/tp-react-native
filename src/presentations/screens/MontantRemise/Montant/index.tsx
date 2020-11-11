
import { Item } from 'native-base';
import React , { useState, useEffect, useContext } from 'react';
import {
  
  View,Text,TextInput, TouchableOpacity,Image
 
} from 'react-native';
import { Props, reduxConnect } from '../../../../controllers/Montant';
import { styles } from './styles';


export const MontantScreen : React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;
  const [montantChoisi, setMontantChoisi] = useState('');
  useEffect(() => {
      
    }, []);


 

  return (
      <View style={styles.container}>
          <Text style={styles.txtStyle}>Montant</Text>
          <View style={{height:50}}>
          <Item style={styles.inputname}>
            <TextInput
                        style={styles.inputname}
                        multiline={false}
                        keyboardType='numeric'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => setMontantChoisi(text)}
                        value={montantChoisi}
                        placeholder=''/>
            <TouchableOpacity style={styles.icon} onPress={() => {}}  >
              <Image style={styles.imgIcon} source={require("../../resources/images/euro.png")} />
            </TouchableOpacity>
            </Item>
             </View>
      </View>
  );
}

export const Montant = reduxConnect(MontantScreen);