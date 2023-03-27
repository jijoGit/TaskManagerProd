import React, { useEffect, useState, r } from "react";
import NetInfo from "@react-native-community/netinfo";
import RNExitApp from "react-native-exit-app";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function LoadingSceen({ navigation }) {
  const { fromStack } = route.params;
  const [internetConnected, setinternetConnected] = useState(true);

  useEffect(() => {
    if (internetConnected) {
      setTimeout(() => {
        navigation.navigate("tabs");
      }, 1500); //5000 milliseconds
    }
  }, [internetConnected]);

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (internetConnected != state.isConnected) {
      setinternetConnected(state.isConnected);
    }
  });

  const onPressContinue = () => {
    navigation.navigate("tabs");
  };

  const onPressExit = () => {
    RNExitApp.exitApp();
  };

  //safeAreaView is used
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.worggle_centre_text}>STEWARD</Text>
      <Text style={styles.worggle_centre_sub_text}>for Tasks</Text>
      {!internetConnected && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.internet_not}> Not connected to Internet </Text>
          <Text style={styles.internet_not}> Hints will not work !! </Text>
          <TouchableOpacity style={styles.button} onPress={onPressContinue}>
            <Text>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressExit}>
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //main container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  //for the text
  worggle_centre_text: {
    paddingVertical: 6,
    letterSpacing: 7,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
  //for sub text
  worggle_centre_sub_text: {
    fontSize: 18,
    textAlign: "center",
  },
  internet_not: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 12,
    borderRadius: 4,
    backgroundColor: "black",
    elevation: 3,
    color: "white",
  },
});
