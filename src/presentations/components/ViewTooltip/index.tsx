import React, { useState } from "react";
import {
    Text,
    View,TouchableOpacity
} from "react-native";

interface Props{
   txtOne:string,
   txtTwo:string,
   txtThree:string,
   txtFour:string,
   isFourButton:boolean,
   onPressMenu1:() => void,
   onPressMenu2:() => void,
   onPressMenu3:() => void,
   onPressMenu4:() => void,
}


const ViewTooltip : React.FunctionComponent<Props> = function (props) {
  const { txtOne,txtTwo,txtThree,isFourButton,txtFour,onPressMenu1,onPressMenu2,onPressMenu3,onPressMenu4 } = props;
  
  return (
     
    <View style={{height:180, width:300,backgroundColor:'white', zIndex:4,flexDirection:'column',shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,padding:10}}>
        <View style={{flex:1,justifyContent:'center',paddingStart:10,backgroundColor:'#F0F0F0',marginBottom:2}}>
            <TouchableOpacity onPress = {() => onPressMenu1()}>
            <Text>{txtOne}</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'center',paddingStart:10,backgroundColor:'#F0F0F0',marginTop:2,marginBottom:2}}>
        <TouchableOpacity onPress = {() => onPressMenu2()}>
            <Text>{txtTwo}</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'center',paddingStart:10,backgroundColor:'#F0F0F0',marginTop:2}}>
        <TouchableOpacity onPress = {() => onPressMenu3()}>
            <Text>{txtThree}</Text>
            </TouchableOpacity>
        </View>
        {isFourButton? <View style={{flex:1,justifyContent:'center',paddingStart:10,backgroundColor:'#F0F0F0',marginTop:2}}>
        <TouchableOpacity onPress = {() => onPressMenu4()}>
            <Text>{txtFour}</Text></TouchableOpacity></View> : null}
    </View>
  
  );
};



export default ViewTooltip;
