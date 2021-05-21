import React, { useEffect } from "react";
import colors from "../config/colors";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  LogBox,
  Animated,
} from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Content,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "./Post";
import Search from "./Search";

LogBox.ignoreLogs(["Setting"]);

let nav = null;

function Main({ navigation }) {
  return (
    <Container style={styles.background}>
      <Header
        iosBarStyle="light-content"
        transparent
        androidStatusBarColor={colors.background}
        style={{
          backgroundColor: colors.background,
          elevation: 0,
        }}
      >
        <Left style={{ flex: 1 }}>
          <Button
            hasText
            transparent
            onPress={() =>
              nav.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          >
            <Text style={{ color: colors.primary, fontSize: 16 }}>Log out</Text>
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 18,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Projektas
          </Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Post");
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary,
              width: wp(70),
              height: hp(5.5),
            }}
          >
            <Text style={{ color: colors.background }}>Add new task</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.background_transparent,
              width: wp(70),
              height: hp(5.5),
              marginTop: hp(1),
            }}
          >
            <Text style={{ color: colors.secondary }}>Search by VIN</Text>
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export default function Home({ navigation }) {
  const Stack = createStackNavigator();
  useEffect(() => {
    nav = navigation;
  }, []);

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={navigatorOptions}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

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
