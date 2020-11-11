
import { Item } from 'native-base';
import React , { useState, useEffect, useContext } from 'react';
import {
  
  View,Text,TextInput,TouchableOpacity,Image
 
} from 'react-native';
import { Props, reduxConnect } from '../../../../controllers/MontantPourcent';
import { styles } from '../Pourcent/styles';



export const PourcentScreen : React.FunctionComponent<Props> = function (props) {
  const { navigation } = props;
  const [montantPourcentChoisi, setMontantPourcentChoisi] = useState('');

  useEffect(() => {
      
    }, []);


  function getValue(){

      return 'ss';
  }

  return (
    <View style={styles.container}>
    <Text style={styles.txtStyle}>Pourcent</Text>
    <View style={{height:50}}>
        <Item style={styles.inputname}>
        <TextInput
                    style={styles.inputname}
                    multiline={false}
                    keyboardType='numeric'
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={(text) => setMontantPourcentChoisi(text)}
                    value={montantPourcentChoisi}
                    placeholder=''/>
        <TouchableOpacity style={styles.icon} onPress={() => {}}  >
            <Image style={styles.imgIcon} source={require("../../resources/images/euro.png")} />
        </TouchableOpacity>
        </Item>
      
       </View>
       <View style={{marginTop:10,flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold', color:'#998C7E'}}>Soit: </Text ><Text style={{fontSize:16,fontWeight:'bold', color:'#000000'}}>{getValue()}</Text>

        </View>
</View>
  );
}

export const Pourcent = reduxConnect(PourcentScreen);