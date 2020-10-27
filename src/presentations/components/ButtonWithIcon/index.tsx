import React, { useState } from "react";
import {
    Text,
  TouchableOpacity,StyleSheet, Image, ImageSourcePropType
} from "react-native";

interface Props{
    message:string,
    onPress: () => void,
    source:ImageSourcePropType,
}

const ButtonWithIcon : React.FunctionComponent<Props> = function (props) {
  const { message,onPress,source } = props;
  
  return (
    
        
         <TouchableOpacity style={styles.container} onPress = {() => onPress()}>
            <Image style={styles.img} source={source}/>
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
      color:'#3928A6',
      textAlign: 'center'
      
  },
  img:{
    width:24,
    height:24,
   
  },
 
});

export default ButtonWithIcon;
