import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screen/Home";
import MoodIndex from "./screen/MoodIndex";

import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  // load the required font file
  const [loaded] = useFonts({
    "PingFang HK": require("./assets/font/PingFangHK-Regular.ttf"),
    "Nunito Regular": require("./assets/font/Nunito-Regular.ttf"),
    "Nunito Bold": require("./assets/font/Nunito-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#2D2F33",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "PingFang HK",
          },
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackImageSource: require("./assets/icon/leftArrow.png"),
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "首页",
          }}
        />
        <Stack.Screen
          name="MoodIndex"
          component={MoodIndex}
          options={{
            title: "历史心情指数",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
