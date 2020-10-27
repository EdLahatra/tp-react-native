import React from "react";
import {
    Text,
  StyleSheet, View
} from "react-native";

interface Props{
    message:string,
    result:string
}

const TextWithResult : React.FunctionComponent<Props> = function (props) {
  const { message,result } = props;
  
  return (
    
    <View style={styles.container}>
        <Text style={styles.txtstyle}>{message}</Text>
        <Text style={styles.txtResult}> {result}</Text>
    </View>

  
  );
};

const styles = StyleSheet.create({
  container: {
   flexDirection:'row'
    
  },
  txtstyle:{
      fontSize:11,
      fontStyle:'normal',
      fontWeight:'bold',
      color:'#3928A6'
      
  },
  txtResult:{
    fontSize:11,
    fontStyle:'normal',
    fontWeight:'bold',
    color:'#000000'
  }
 
});

export default TextWithResult;
