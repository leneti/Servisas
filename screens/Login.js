import React, { useState } from "react";
import colors from "../config/colors";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  return (
    <View style={styles.background}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: hp(100),
          width: wp(30),
          height: wp(30),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: hp(100),
            width: wp(29),
            height: wp(29),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: wp(25),
              color: colors.secondary,
            }}
          >
            P
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: colors.secondary,
          fontSize: 18,
          marginTop: hp(2),
          marginBottom: hp(5),
        }}
      >
        Projektas
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          underlineColorAndroid="transparent"
          placeholder="Vardas"
          placeholderTextColor={colors.grey}
          autoCapitalize="words"
          onChangeText={setName}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          underlineColorAndroid="transparent"
          placeholder="Pavarde"
          placeholderTextColor={colors.grey}
          autoCapitalize="words"
          onChangeText={setSurname}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            width: wp(70),
            height: hp(5.5),
            marginTop: hp(4),
          }}
        >
          <Text style={{ color: colors.secondary }}>Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: wp(70),
    height: 36,
    marginTop: 20,
  },
  text: {
    color: colors.secondary,
    paddingStart: 20,
    fontSize: 16,
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.background_transparent,
    backgroundColor: colors.background_transparent,
  },
});
