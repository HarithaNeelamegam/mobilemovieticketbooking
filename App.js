import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LatestMovies from "./data/latestMovies";
import Header from "./components/header";
import StackNavigator from "./stackNavigator";

export default function App() {
  return (
    <>
    <StackNavigator/>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
