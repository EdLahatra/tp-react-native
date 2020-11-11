import React from "react";
import {
  Text,
  TouchableOpacity, StyleSheet
} from "react-native";

interface Props {
  message: string,
  onPress: () => void,
  iscancel?: boolean
}

const Button: React.FunctionComponent<Props> = function (props) {
  const { message, onPress, iscancel } = props;

  return (
    <TouchableOpacity style={iscancel ? styles.container : styles.containerOk} onPress={() => onPress()}>
      <Text style={iscancel ? styles.txtstyle: styles.txtstyleOk}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
  },
  containerOk: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    backgroundColor: '#998C7E',
    marginBottom: 5,
    marginTop: 5,
  },
  txtstyle: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#E0C298'
  },
  txtstyleOk:{
    fontSize:18,
    fontStyle:'normal',
    fontWeight:'bold',
    color:'white'
    
}

});

export default Button;
