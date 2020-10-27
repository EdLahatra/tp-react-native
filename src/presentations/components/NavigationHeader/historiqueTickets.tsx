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
   goBack:() => void,
}

const HistoriqueTicketHeader : React.FunctionComponent<Props> = function (props) {
  const {  goBack } = props;

  return (
     
        <View style={styles.centeredView}>
         <TouchableOpacity style={styles.btnHome} onPress={() => goBack()} >
             <Image style= { styles.img} source = {require('../../resources/images/back.png')}  />
         </TouchableOpacity>
        <Text style={styles.txtstyle}>HISTORIQUE TICKET</Text>
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
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginLeft : 10
  },

  txtstyle:{
      flex:4,
      fontSize: 16,
      color:'#FFFFFF',
      marginLeft: 20
  },
  img:{
      width: 20,
      height: 20
  }
  
});

export default HistoriqueTicketHeader;
