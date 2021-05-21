import React, { useState } from "react";
import colors from "../config/colors";
import { db, firebase } from "../config/firebase";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Content,
  Icon,
} from "native-base";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Post({ navigation }) {
  const [vin, setVin] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fixed, setFixed] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const inputTheme = {
    colors: {
      primary: colors.primary,
      text: colors.secondary,
      background: colors.background_transparent,
      placeholder: colors.grey,
    },
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const addRepair = () => {
    const docRef = db.collection("clients").doc(vin);
    docRef.set({
      make,
      model,
    });
    docRef
      .collection("repairs")
      .add({
        fixed,
        notes,
        date,
      })
      .then((docRef) => console.log("Repair added: " + docRef.id))
      .catch(console.log);
    navigation.goBack();
  };

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
          <Button hasText transparent onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>Back</Text>
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
            Task
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
        <TextInput
          label="#VIN"
          maxLength={6}
          value={vin}
          selectionColor={colors.primary}
          underlineColor={colors.primary}
          onChangeText={setVin}
          autoCapitalize="characters"
          style={styles.input}
          theme={inputTheme}
        />
        <TextInput
          label="Make"
          value={make}
          selectionColor={colors.primary}
          underlineColor={colors.primary}
          onChangeText={setMake}
          style={styles.input}
          theme={inputTheme}
        />
        <TextInput
          label="Model"
          value={model}
          selectionColor={colors.primary}
          underlineColor={colors.primary}
          onChangeText={setModel}
          style={styles.input}
          theme={inputTheme}
        />
        <TextInput
          label="Fixed parts"
          value={fixed}
          selectionColor={colors.primary}
          underlineColor={colors.primary}
          onChangeText={setFixed}
          style={styles.input}
          theme={inputTheme}
        />
        <TextInput
          label="Notes"
          value={notes}
          selectionColor={colors.primary}
          underlineColor={colors.primary}
          onChangeText={setNotes}
          style={styles.input}
          theme={inputTheme}
        />
        <View style={{ ...styles.container, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.background_transparent,
              width: wp(60),
              height: hp(5.5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: wp(60),
              }}
            >
              <Text style={{ color: colors.secondary, marginEnd: wp(2) }}>
                {date.toDateString()}
              </Text>
              <MaterialIcons
                name="date-range"
                size={24}
                color={colors.secondary}
              />
            </View>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => addRepair()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            width: wp(70),
            height: hp(5.5),
            marginTop: 40,
          }}
        >
          <View>
            <Text style={{ color: colors.background }}>Submit</Text>
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
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
  input: {
    height: 50,
    marginTop: 20,
    width: wp(70),
  },
});
