import React, { useState } from "react";
import {
    Text,
  TouchableOpacity,StyleSheet
} from "react-native";

interface Props{
    message:string,
    onPress: () => void,
}

const Button : React.FunctionComponent<Props> = function (props) {
  const { message,onPress } = props;
  
  return (
    
    
         <TouchableOpacity style={styles.container} onPress = {() => onPress()}>
            <Text style={styles.txtstyle}>{message}</Text>
         </TouchableOpacity>
    

  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   height:50,
   borderRadius:5,
   backgroundColor:'#3928A6'
    
  },
  txtstyle:{
      fontSize:18,
      fontStyle:'normal',
      fontWeight:'bold',
      color:'white'
      
  }
 
});

export default Button;
