import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface Props {
  goBack: () => void,
  msg: string
}

const BackHeader: React.FunctionComponent<Props> = function (props) {
  const { goBack, msg } = props;
  return (
    <View style={styles.centeredView}>
      <TouchableOpacity style={styles.btnHome} onPress={() => goBack()} >
        <Image style={styles.img} source={require('../../resources/images/back.png')} />
      </TouchableOpacity>
      <Text style={styles.txtstyle}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#998C7E',
    height: 56,
  },
  btnHome: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },

  txtstyle: {
    flex: 4,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 20,
    textTransform: 'uppercase'
  },
  img: {
    width: 20,
    height: 20
  }

});

export default BackHeader;
