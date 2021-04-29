import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    const userToken = "secret-token";
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      // Ce qu'il faut faire :
      // vérifier que tous les champs soient remplis
      // vérifier que les 2 MDP sont identiques
      // on fait la requête et on teste différentes possibilités : tout est ok, l'email est déjà pris en BDD, le username est déjà pris en DBB, autre erreur

      try {
        const res = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setToken(userToken);
          alert(`Welcome ${res.data.email}`);
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Logo />
        <MainTitle text="Sign in" />

        <Input
          placeholder="email"
          setFunction={setEmail}
          keyboardType={"email-address"}
        />
        <Input placeholder="password" setFunction={setPassword} secure={true} />

        <ConnectionButton text="Sign in" submitFunction={handleSubmit} />
        <RedirectButton text="Create an account" screen="SignUp" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  scrollViewContent: {
    alignItems: "center",
  },
});
