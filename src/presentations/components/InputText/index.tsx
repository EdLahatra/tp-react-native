import React, { useState, useRef } from "react";
import { Text, TextInput, StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";

interface Props {
  title: string,
  value: string,
  multiline: boolean,
  onLongPress?: boolean,
  placeholder?: string,
  onEndEditing?: () => void,
  onChange: (text: string) => void,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined
}

const InputText: React.FunctionComponent<Props> = function (props) {
  const { title, onChange, value, multiline, keyboardType, onLongPress, onEndEditing, placeholder } = props;

  const [editable, setEditable] = useState(false);

  const textInput = useRef();
  if (onLongPress) {
    return (
      <View style={styles.container}>
        <Text style={styles.txtstyle}>{title}</Text>
        <TouchableOpacity onLongPress={() => {
          setEditable(true);
          textInput?.current?.focus && textInput?.current?.focus();
        }}>
          <TextInput
            ref={textInput}
            onChangeText={(text) => onChange(text)}
            value={value}
            multiline={multiline}
            style={[styles.input, { height: multiline ? 100 : 50 }]}
            keyboardType={keyboardType || 'default'}
            editable={editable}
            autoFocus={true}
            onEndEditing={async () => {
              setEditable(false);
              Keyboard.dismiss
              onEndEditing && await onEndEditing();
            }}
            placeholder={placeholder || ''}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtstyle}>{title}</Text>
        <TextInput
          onChangeText={(text) => onChange(text)}
          value={value}
          multiline={multiline}
          style={[styles.input, { height: multiline ? 100 : 50 }]}
          keyboardType={keyboardType || 'default'}
          editable={editable}
          autoFocus={true}
          onEndEditing={() => {
            Keyboard.dismiss
          }}
          placeholder={placeholder || ''}
        />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  txtstyle: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#4F4F4F',
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
    flex: 5,
  }
});

export default InputText;
