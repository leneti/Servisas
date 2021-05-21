import React, { useState } from "react";
import colors from "../config/colors";
import { db, firebase } from "../config/firebase";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
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
import { TextInput, Portal, Modal, List } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function Search({ navigation }) {
  const [vin, setVin] = useState("");
  const [documentData, setDocumentData] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const inputTheme = {
    colors: {
      primary: colors.primary,
      text: colors.secondary,
      background: colors.background_transparent,
      placeholder: colors.grey,
    },
  };

  const retrieveData = async () => {
    console.log("Retrieving data");
    const ref = db.collection("clients").doc(vin);
    ref.get().then((snap) => {
      const data = snap.data();
      setMake(data.make);
      setModel(data.model);
      console.log(data.make + " " + data.model);
    });
    ref
      .collection("repairs")
      .orderBy("date", "desc")
      .get()
      .then((docSnaps) => {
        let docData = docSnaps.docs.map((doc) => doc.data());
        console.log(docData);
        if (docData.length == 0) {
          setDocumentData([]);
          return;
        }
        setDocumentData(docData);
      })
      .catch(console.log);
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
            {documentData.length == 0 ? "Search" : vin}
          </Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
      {documentData.length == 0 && (
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
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
            <TouchableOpacity
              onPress={() => {
                retrieveData();
              }}
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
                <Text style={{ color: colors.background }}>Search VIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      )}
      {documentData.length != 0 && (
        <FlatList
          style={{ marginTop: hp(1) }}
          data={documentData}
          renderItem={({ item }) => (
            <List.Item
              style={{ marginHorizontal: wp(2), width: wp(96) }}
              title={item.fixed}
              titleStyle={{ color: colors.secondary }}
              description={item.notes}
              descriptionStyle={{ color: colors.grey }}
              onPress={() => {}}
              left={() => (
                <MaterialCommunityIcons
                  name="chart-arc"
                  size={hp(3)}
                  color={colors.primary}
                />
              )}
              right={() => (
                <Text style={{ color: colors.grey, fontSize: 12 }}>
                  {new Date(item.date.toDate()).toDateString()}
                </Text>
              )}
            />
          )}
          ListHeaderComponent={
            <View
              style={{
                alignSelf: "center",
                marginBottom: hp(1),
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 18 }}>
                Repairs done
              </Text>
              <Text style={{ color: colors.grey, fontSize: 14 }}>
                {make} {model}
              </Text>
            </View>
          }
          keyExtractor={(_, index) => String(index)}
        />
      )}
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
