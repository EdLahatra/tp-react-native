import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

interface Props {
  title: string,
  value: string,
  multiline: boolean,
  onChange: (text: string) => void,
}

const InputText: React.FunctionComponent<Props> = function (props) {
  const { title, onChange, value, multiline } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.txtstyle}>{title}</Text>
      <TextInput
        onChangeText={(text) => onChange(text)}
        value={value}
        multiline={multiline}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtstyle: {
    fontSize: 16
  },
  input: {
    fontSize: 16,
    borderColor: '#D6D7F6',
    borderBottomWidth: 1,
  }
});

export default InputText;
