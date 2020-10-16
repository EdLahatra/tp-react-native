import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
interface Props{
    message:string,
    cancelButton:string,
    okButton:string,
    modalVisible: boolean,
    isTwoButton: boolean,
    setModalVisible:(isok:boolean) => void
}

const Popup : React.FunctionComponent<Props> = function (props) {
  const { message ,modalVisible,setModalVisible,cancelButton,okButton,isTwoButton} = props;
  
  return (
     
      <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={{flexDirection:'row'}}>
            { isTwoButton == true ?
            <><TouchableHighlight
                              style={{ ...styles.openButton, backgroundColor: "#787CC2", flex: 1, marginEnd: 8 }}
                              onPress={() => {
                                  setModalVisible(!modalVisible);
                              } }
                          >
                              <Text style={styles.textStyle}>{cancelButton}</Text>
                          </TouchableHighlight>
                              <TouchableHighlight
                                  style={{ ...styles.openButton, backgroundColor: "#3928A6", flex: 1, marginStart: 8 }}
                                  onPress={() => {
                                  } }
                              >
                                  <Text style={styles.textStyle}>{okButton}</Text>
                              </TouchableHighlight></> 
            : <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#3928A6", flex: 1, marginEnd: 8 }}
            onPress={() => {
                setModalVisible(!modalVisible);
            } }
        >
            <Text style={styles.textStyle}>{okButton}</Text>
          </TouchableHighlight> }
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
    backgroundColor:'rgba(0, 0, 0, 0.8)'
    
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Popup;
