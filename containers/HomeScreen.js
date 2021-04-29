import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Information from "../components/Information";
// Icons
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const displayStars = (ratingValue) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<AntDesign name="star" size={20} color="#e31c5b" key={i} />);
      } else {
        tab.push(<AntDesign name="staro" size={20} color="#e31c5b" key={i} />);
      }
    }

    return tab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error.response.data.error);
        alert("An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="pink" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={
                  index === data.length - 1
                    ? styles.container
                    : [styles.container, styles.border]
                }
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <ImageBackground
                  source={{ uri: item.photos[0].url }}
                  style={styles.bgImage}
                  price={item.price}
                ></ImageBackground>

                <Information
                  title={item.title}
                  ratingValue={item.ratingValue}
                  reviews={item.reviews}
                  photo={item.user.account.photo.url}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
          style={styles.flatList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activityIndicator: { paddingTop: 20 },
  // flatList: { backgroundColor: colors.bgColor },
  container: {
    height: 300,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  border: {
    // borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    borderBottomColor: "#e31c5b",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  icon: {
    marginRight: 5,
  },
});
