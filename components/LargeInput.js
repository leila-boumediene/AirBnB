import React from "react";
import { TextInput, StyleSheet } from "react-native";

const LargeInput = ({ placeholder, setFunction }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      multiline={true}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderColor: "#ff385c",
    borderWidth: 1.5,
    width: "90%",
    marginTop: 30,
    height: 100,
    borderRadius: 10,
  },
});
