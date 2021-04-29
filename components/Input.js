import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, setFunction, secure }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => {
        setFunction(text);
      }}
      //   secureTextEntry={secure === true ? true : false}
      secureTextEntry={secure}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderBottomColor: "#ff385c",
    borderBottomWidth: 1.5,
    width: "90%",
    marginTop: 30,
    height: 40,
  },
});
