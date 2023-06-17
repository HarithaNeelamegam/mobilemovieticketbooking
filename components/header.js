import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LatestMovies from "../data/latestMovies";

const Header = () => {
  return (
    <View style={styles.container}>
      <LatestMovies/>
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }})


export default Header;
