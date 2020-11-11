import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
interface Props{
    message:string | any,
    title: string,
    cancelButton:string,
    okButton:string,
    okAction:(value:string) => void;
    modalVisible: boolean,
    error:string
    
    setModalVisible:(isok:boolean) => void
}

const PopupWithTextInput : React.FunctionComponent<Props> = function (props) {
  const { message ,modalVisible,setModalVisible,cancelButton,okButton,okAction, children, title, error } = props;
  const [valueMotif,setValueMotif] = useState('');
  const [isMotif,setIsMotif] = useState(true);
 function getValueMotif(value:string){
    setIsMotif(true);
    setValueMotif(value);
 }
  return (
     
      <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>{children}</View>
            <Text style={styles.modalText}>{message}</Text>
            <Text style={{alignSelf:'flex-start',fontSize:10}}>{title}</Text>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:5}}>
            <TextInput
           style={styles.passwordinput}
            multiline={false}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='default'
            
            value={valueMotif}
            onChangeText={(text) => getValueMotif(text)}
            
            returnKeyType='go'
            placeholder=''></TextInput></View>
            {!isMotif ? <Text style={{color:'red',fontSize:11,alignSelf:'flex-start',marginBottom:10}}>{error}</Text> : null}
            <View style={{flexDirection:'row', marginTop:10}}>
            
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#FFFFFF", flex: 1, marginEnd: 8 }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    } }>
                    <Text style={styles.textStyle}>{cancelButton}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#998C7E", flex: 1, marginStart: 8 }}
                    onPress={() => { 
                        if(valueMotif != '')
                        {
                            okAction(valueMotif)
                        }else{
                            setIsMotif(false);
                        }
                       
                    } }>
                        <Text style={styles.textStyleOK}>{okButton}</Text>
                </TouchableHighlight>
            </View>
          
          
          </View>
        </View>
      </Modal>

  
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'rgba(0, 0, 0, 0.8)'
    backgroundColor: 'rgba(68, 75, 84, 0.9)',
  },
  passwordinput:{ 
    backgroundColor: '#F2F2F2' ,
    borderRadius: 5,
    height:44,flex:1
    
},
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "#E0C298",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyleOK: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:16,
    color:'#000000'
  }
});

export default PopupWithTextInput;
