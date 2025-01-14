import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MainApp } from "./components/MainApp";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./global.css";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <MainApp />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});
