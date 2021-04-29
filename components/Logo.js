import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={size === "small" ? styles.smallLogo : styles.largeLogo}
      resizeMode="contain"
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  largeLogo: {
    height: 120,
    width: 120,
    marginTop: 40,
  },
  smallLogo: {
    height: 30,
    width: 30,
  },
});
