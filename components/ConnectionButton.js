import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const ConnectionButton = ({ text, submitFunction }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        submitFunction();
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ConnectionButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "white",
  },
  btn: {
    height: 50,
    width: "50%",
    borderColor: "#ff385c",
    backgroundColor: "#ff385c",
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 10,
  },
});
