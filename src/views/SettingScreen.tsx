import React, { useState } from "react";
import { ThemeManager } from "../classes/ThemeManager";
import { ContentText } from "../components/texts/ContentText";
import { LngSelectorComponent } from "../components/lng/LangSelectorComponent";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { CardInputComponent } from "../components/cards/CardInputComponent";
import { NameText } from "../components/texts/NameText";
import auth from "@react-native-firebase/auth";

import { useSelector } from "react-redux";
import { getReduxStoreUser } from "../redux/getReduxStore";
import { useAppDispatch } from "../redux/customDispatch";
import { clearUser } from "../redux/userSlice";

import { useLocale } from "../i18n/TranslationContext";

type CustomProps = {
  navigation: any;
};

const SettingScreen = (props: CustomProps): React.JSX.Element => {
  const { t } = useLocale();
  const theme = new ThemeManager();
  const { navigation } = props;
  const store = getReduxStoreUser();
  const dispatch = useAppDispatch();
  // console.log("Navigation prop:", navigation);

  const [showModal, setShowModal] = useState(false);

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    principalContainer: {
      alignItems: "flex-start",
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      //   gap: 40,
      padding: 10,
      //   paddingTop: 5,
    },
    mainPhotoCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: 130,
      //   gap: 40,
      padding: 10,
      marginTop: 10,
      gap: 10,
      // maxWidth: "75%",
    },
    divider: {
      borderColor: theme.colors.divider,
      borderWidth: 0.5,
      borderStyle: "solid",
      width: theme.standarWidth - 40,
      marginVertical: 10,
      borderRadius: 5,
    },
    elementListContainer: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      //   height: 20,
      justifyContent: "center",
      //   alignItems: "flex-start",
      //   backgroundColor: "red",
      //   marginTop: 5,
    },
    iconContainer: {
      position: "absolute",
      left: 10,
      elevation: 18,
      shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      shadowOpacity: 0.4,
      shadowRadius: 12,
      // tintColor: theme.colors.stripe3,
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    icon: {
      width: 100,
      height: 100,
      resizeMode: "cover",
      borderRadius: 50,
      // elevation: 8,
      // shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      // shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      // shadowOpacity: 0.4,
      // shadowRadius: 12,
    },
  });

  function onLogOut() {
    dispatch(clearUser());
    auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  }

  const Divider = () => <View style={styles.divider}></View>;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
          gap: 15,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <View style={styles.mainPhotoCointainer}>
        <Image source={{ uri: store.photoUrl || "" }} style={styles.icon} />
        <View
          style={{
            maxWidth: "65%",
          }}
        >
          <NameText
            style={{
              fontFamily: "Afacad-Bold",
            }}
          >
            {store.name?.toUpperCase()}
          </NameText>

          <NameText
            style={{
              fontFamily: "Afacad-Bold",
            }}
          >
            {store.surname?.toUpperCase()}
          </NameText>
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          alignItems: "center",
          paddingBottom: Platform.OS === "android" ? 80 : 60,
          gap: 15,
        }}
        style={{
          width: "100%",
        }}
      >
        <View style={styles.mainCointainer}>
          <View style={styles.elementListContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PersonalData", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                {t("settingsScreen.profile")}
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StyleData", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                {t("settingsScreen.style")}
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LuggageData", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                {t("settingsScreen.luggage")}
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TravelData", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>TRAVEL</NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ActivitiesScreen", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                ACTIVITIES
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AccommodationScreen", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                ACCOMMODATION
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PackingLoading", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                LOADING SCREEN
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowLuggage", {
                  from: "SettingScreen",
                })
              }
            >
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                SHOW LUGGAGE
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                {t("settingsScreen.lang")}
              </NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  t("messages.logOut.title"),
                  "",
                  [
                    {
                      text: t("messages.cancel"),
                      onPress: () => console.log("Cancelado"),
                      style: "cancel",
                    },
                    {
                      text: t("messages.accept"),
                      onPress: () => onLogOut(),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <NameText style={{ fontFamily: "Afacad-Bold", color: "red" }}>
                {t("settingsScreen.logOut")}
              </NameText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LngSelectorComponent
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;
