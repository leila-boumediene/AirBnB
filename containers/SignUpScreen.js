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
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// Components
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async () => {
    // Ce qu'il faut faire :
    // vérifier que tous les champs soient remplis
    // vérifier que les 2 MDP sont identiques
    // on fait la requête et on teste différentes possibilités : tout est ok, l'email est déjà pris en BDD, le username est déjà pris en DBB, autre erreur
    setError(null);
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              password: password,
              description: description,
            }
          );
          console.log(response.data);
          if (response.data) {
            alert("Connexion réussie");
          } else {
            setError("An error occurred");
          }
        } catch (error) {
          console.log(error.response.data.error);

          const message = error.response.data.error;

          if (message === "This email already has an account.") {
            setError(message);
          } else if (message === "This username already has an account.") {
            setError(message);
          }
        }
      } else {
        setError("Les 2 MDP doivent etre identiques");
      }
    } else {
      setError("Tous les champs doivent être remplis");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Logo />
        <MainTitle text="Sign up" />

        <Input placeholder="email" setFunction={setEmail} />
        <Input placeholder="username" setFunction={setUsername} />

        <LargeInput placeholder="description" setFunction={setDescription} />

        <Input placeholder="password" setFunction={setPassword} secure={true} />
        <Input
          placeholder="confirm password"
          setFunction={setConfirmPassword}
          secure={true}
        />

        {/* <Text>{email}</Text>
        <Text>{username}</Text>
        <Text>{password}</Text>
        <Text>{confirmPassword}</Text>
        <Text>{description}</Text> */}

        {error && <Text style={{ marginTop: 20 }}>{error}</Text>}

        <ConnectionButton text="Sign up" submitFunction={submit} />

        <RedirectButton text="Aller sur écran signIn" screen="SignIn" />
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
