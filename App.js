import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import { Provider } from "react-native-paper";
import Login from "./screens/Login";
import Home from "./screens/Home";

// Google account for the Firebase project
// username: b.mantulis@gmail.com
// password: projektas

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={navigatorOptions}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const navigatorOptions = {
  // title: "",
  // headerTransparent: true,
  // headerTintColor: colors.primary,
  header: () => null,
  cardStyle: { backgroundColor: "transparent" },
  cardStyleInterpolator: ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [screen.width, 0, screen.width * -0.3],
                extrapolate: "clamp",
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
};
