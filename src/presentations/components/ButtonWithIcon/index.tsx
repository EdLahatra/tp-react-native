import React, { useState } from "react";
import {
    Text,
  TouchableOpacity,StyleSheet, Image
} from "react-native";

interface Props{
    message:string,
    onPress: () => void,
}

const ButtonWithIcon : React.FunctionComponent<Props> = function (props) {
  const { message,onPress } = props;
  
  return (
    
    
         <TouchableOpacity style={styles.container} onPress = {() => onPress()}>
            <Image style={styles.img} source={require("../../resources/images/flash.png")}/>
            <Text style={styles.txtstyle}>{message}</Text>
         </TouchableOpacity>
   

  
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    marginStart:5,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    
  },
  txtstyle:{
      fontSize:12,
      fontStyle:'normal',
      fontWeight:'bold',
      color:'#000000'
      
  },
  img:{
    width:20,
    height:26,
   
  },
 
});

export default ButtonWithIcon;
