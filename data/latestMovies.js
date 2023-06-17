import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://3.17.216.66:4000/latest")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const releaseDates = {
    "5ab12666f36d2879268f2902": "Mar 2, 2018",
    "5ab12612f36d2879268f284a": "Feb 16, 2018",
    "5ab12678f36d2879268f291d": " Nov 22, 2017 ",
  };
  const movieDuration = {
    "5ab12666f36d2879268f2902": "1h 47m",
    "5ab12612f36d2879268f284a": "2h 14m",
    "5ab12678f36d2879268f291d": " 1h 49m ",
  };

  const renderItem = ({ item }) => {
    const handleMoviePress = (_id) => {
      const releaseDate = releaseDates[_id];
      const movieDurations = movieDuration[_id];
      const userData = {
        Name: item.name,
        Image: item.imageUrl,
        rating: item.rate,
        releaseDate,
        movieDurations,
      };
      navigation.navigate("Movies", {userData});
    };
    return (
      <View style={styles.container}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.margin}>
          <Button title="Details" onPress={() => handleMoviePress(item._id)} />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  margin: {
    marginLeft: 20,
  },
  image: {
    borderRadius: 10,
    width: 200,
    height: 300,
  },
});

export default LatestMovies;
