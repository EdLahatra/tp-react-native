import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string,
  checked: boolean,
  setChecked: () => void,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerTitle: {
  },
  containerCheckBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 15
  },
  title: {
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#4F4F4F'
  },
  CheckBox1: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    right: -5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowColor: 'rgba(0, 0, 0, 0.19)',
    shadowRadius: 5,
    elevation: 5,
  },
  CheckBox2: {
    width: 20,
    height: 14,
    backgroundColor: '#998C7E',
    borderRadius: 7,
    marginTop: 3,
    opacity: 0.5,
  },
  CheckBox1Checked: {
    width: 20,
    height: 14,
    backgroundColor: '#998C7E',
    borderRadius: 7,
    marginTop: 3,
    opacity: 0.5,
    right: -5,
  },
  CheckBox2Checked: {
    width: 20, height: 20, backgroundColor: '#998C7E', borderRadius: 50
  }
});

const CheckBox: React.FunctionComponent<Props> = function ({ title, checked, setChecked }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => setChecked()}>
        <View style={styles.containerCheckBox}>
          <View style={checked ? styles.CheckBox1Checked : styles.CheckBox1 } />
          <View style={checked ? styles.CheckBox2Checked : styles.CheckBox2 } />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;
