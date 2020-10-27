import React, { useState } from "react";
import {
    Text,View,TextInput
  ,StyleSheet
} from "react-native";
import Button from "../Button";

interface Props{
    title:string,
    cancel: () => void,
    ok:() => void,
}

const InputCartePaiement : React.FunctionComponent<Props> = function (props) {
  const { title,cancel,ok } = props;
  
  return (
      <View style={styles.container}>
            <Text>{title}</Text>
            <View style={{ marginTop:10,height:50}}>
            <TextInput
                        style={styles.inputname}
                        multiline={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='numeric'
                        placeholder=''/>
             </View>
            <View style={{flexDirection:'row',flex:1,marginTop:20}}>
                <View style={{flex:1,height:50}}>
                    <Button message="Annuler" iscancel onPress={() => cancel()}/>
                </View>
               <View style={{flex:1,height:50,marginStart:40}}>
                    <Button message="Ok" iscancel={false} onPress={() => ok()}/>

               </View>
              
            </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1,
   flexDirection:'column'
    
  },
  txtstyle:{
      fontSize:18,
      fontStyle:'normal',
      fontWeight:'bold',
      color:'white'
      
  },
 
    inputname:{ 
        backgroundColor: '#F5F5FF' ,
        borderRadius: 5,
        flex:1,
        height:44,
       
    },
  
 
});

export default InputCartePaiement;
