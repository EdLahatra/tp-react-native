import React, { useState } from "react";
import {
  
    Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
interface Props{
   goToHome:() => void,
   goToHisto:() => void,
}

const EncaissementHeader : React.FunctionComponent<Props> = function (props) {
  const {  goToHome,goToHisto } = props;

  return (
     
        <View style={styles.centeredView}>
         <TouchableOpacity style={styles.btnHome} onPress={() => goToHome()} >
             <Image source = {require('../../resources/images/g_home_filled.png')}  />
         </TouchableOpacity>
        <Text style={styles.txtstyle}>ENCAISSEMENT</Text>
        <TouchableOpacity style={styles.btnHome} onPress={() => goToHisto()} >
             <Image source = {require('../../resources/images/g_menu.png')}  />
         </TouchableOpacity>
        </View>
    

  
  );
};

const styles = StyleSheet.create({
  centeredView: {
   flexDirection:'row',
   
    alignItems:'center',
    backgroundColor:'#998C7E',
   height:56,
  },
  btnHome:{
    width:45,height:50,justifyContent:'center',alignItems:'center'
  },
  txtstyle:{
      flex:4,
      color:'#FFFFFF',
      fontSize:16
      
  }
  
});

export default EncaissementHeader;
