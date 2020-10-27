import React from 'react';
import {Image, View,Text,TouchableOpacity} from 'react-native';
import { ClientI } from '../../../../interfaces';
import {styles} from './styles';


interface Props {
  client:ClientI,
  onCheck:() => void,
  onInfoClicked:() => void
  }
  
 
const ItemClient : React.FunctionComponent<Props> = function (props) {
  const { client, onCheck, onInfoClicked} = props;
  
  return (
    
    <View style={styles.container}>
    <View style={styles.chp1}>
      <Text>{client.nom}</Text>
      <Text>{client.prenom}</Text>
    </View>
    <View style={styles.chp1}>
      <Text>{client.telephone}</Text>
    </View>
    <View style={styles.chp1}>
      <Text>{client.groupe}</Text>
    </View>
    <View style={styles.chp2}>
     
    <TouchableOpacity style={styles.button} onPress= {() => onCheck()}>
         <Image style={styles.img} source={require("../../resources/images/doneblue.png")}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress= {() => onInfoClicked()}>
        <Image style={styles.img} source={require("../../resources/images/group.png")}/>

    </TouchableOpacity>
</View>
 </View>
       
    
  );
};

  export default ItemClient;