import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MovieScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const { userData } = route.params;
  const navigation = useNavigation();

  const handleMovie = () => {
    navigation.navigate("Booking", { userData });
  };
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ marginTop: 5 }}
        name="arrow-back"
        size={24}
        color="black"
      />

      <View style={styles.row}>
        <Text style={styles.text}>{userData.Name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Image source={{ uri: userData.Image }} style={styles.img} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{userData.Name}</Text>

          <Text style={styles.text1}>Released Date:{userData.releaseDate}</Text>

          <Text style={styles.text1}>
            Movie Duration:
            {userData.movieDurations}
          </Text>

          <Text style={styles.text1}>Rating:{userData.rating}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="BOOK NOW" onPress={handleMovie} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 800,
    marginLeft: 5,
    textAlign: "center",
  },
  img: {
    marginTop: 10,
    width: 150,
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  text1: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
export default MovieScreen;
