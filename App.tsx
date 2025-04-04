import React from "react";
import { View, StyleSheet } from "react-native";
import Router from "./src/navigation/Router";

export default function App() {
  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
