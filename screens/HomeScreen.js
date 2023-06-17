import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }})

export default HomeScreen;
