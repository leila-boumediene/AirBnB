import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import MapView from "react-native-maps";
import Information from "../components/Information";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;

export default function RoomScreen({ route }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="tomato"
      style={styles.activityIndicator}
    />
  ) : (
    <ScrollView style={styles.scrollView}>
      <View style={styles.relative}>
        <View style={styles.bgImage}>
          <Image
            source={{
              uri: data.photos[0].url,
            }}
            style={styles.bgImage}
            resizeMode="cover"
          ></Image>
        </View>
        <View style={styles.absolute} price={data.price}></View>
        <View style={styles.margin}>
          <Information
            title={data.title}
            photo={data.user.account.photo.url}
            reviews={data.reviews}
          ></Information>
        </View>
        <TouchableOpacity
          style={styles.description}
          onPress={() => {
            setDisplayAllText(!displayAllText);
          }}
        >
          <Text
            numberOfLines={displayAllText === false ? 3 : null}
            style={styles.description}
          >
            {data.description}
          </Text>
        </TouchableOpacity>

        <MapView
          style={styles.map}
          initialRegion={{
            longitude: data.location[0],
            latitude: data.location[1],
            longitudeDelta: 0.1,
            latitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate={{
              longitude: data.location[0],
              latitude: data.location[1],
            }}
            title={data.title}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  price: {
    backgroundColor: "black",
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  activityIndicator: { paddingTop: 20 },
  // scrollView: {
  //   backgroundColor: colors.bgColor,
  // },
  bgImage: {
    height: windowHeight / 3,
    width,
    backgroundColor: "red",
  },
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
    bottom: 0,
  },
  description: {
    marginHorizontal: 10,
    lineHeight: 20,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: 20,
  },
  map: {
    height: 300,
    width: "100%",
  },
});
