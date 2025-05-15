import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { ThemeManager } from "../classes/ThemeManager";
import { ContentText } from "../components/texts/ContentText";
import { BigTitle } from "../components/texts/BigTitle";

import { useAppDispatch } from "../redux/customDispatch";
import { setAllData, setUserAfterLogin } from "../redux/userSlice";
import { signInWithGoogle } from "../utils/signIn";
import { insertUserToServer } from "../api/apiServices/mutationServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUUID } from "../utils/checkUUID";

import { getReduxStoreUser } from "../redux/getReduxStore";
import {
  getUserFromServer,
  getUserIdFromServer,
  getAllUserDataFromServer,
} from "../api/apiServices/queryServices";

interface customProps {
  navigation: any;
}

export const LoginScreen = (props: customProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const { navigation } = props;

  async function handleGoogleSignIn() {
    const res = await signInWithGoogle();
    if (!res || res === true || typeof res !== "object" || !("email" in res)) {
      return Alert.alert("Error", "No se pudo iniciar sesión con Google");
    }
    const userId = await getUserIdFromServer(res.email);
    const isUUID = userId !== null && checkUUID(userId.getUserId.data);
    let route: string;

    console.log("EL UUID", isUUID);

    if (isUUID) {
      await AsyncStorage.setItem("userIdInStorage", userId.getUserId.data);
      const user = await getAllUserDataFromServer(userId.getUserId.data);
      dispatch(
        setAllData({ ...user.getAllUserData.data, photoUrl: res.photoUrl })
      );
      route =
        user.getAllUserData.data.user.DateOfBirth !== null
          ? "MainTabs"
          : "PersonalData";
    } else {
      // Usuario nuevo
      route = "PersonalData";
      const userToInsert = {
        Email: res.email,
        Surname: res.familyName || "",
        Name: res.givenName || "",
      };
      dispatch(setUserAfterLogin(res));
      const data = await insertUserToServer(userToInsert);
      console.log("UUID", data.insertUser.data.uuid);

      await AsyncStorage.setItem("userIdInStorage", data.insertUser.data.uuid);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: route }],
    });
  }

  async function handleFacebookSignIn() {}

  async function handleAppleSignIn() {}

  async function handleXSignIn() {}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      width: "100%",
      gap: 20,
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70,
      alignItems: "center",
      width: "100%",
      gap: 15,
    },
    itemContainer: {
      height: "5%",
      width: "90%",
      backgroundColor: theme.colors.stripe3,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    logo: {
      height: "45%",
      width: "100%",
      resizeMode: "contain",
      zIndex: 5,
    },
    logoContainer: {
      height: 400,
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logos/76_logo.png")}
          style={styles.logo}
        />
        <BigTitle>packing</BigTitle>
      </View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleGoogleSignIn()}
      >
        <ContentText>Sing in with Google</ContentText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleAppleSignIn()}
      >
        <ContentText>Sing in with Apple</ContentText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleFacebookSignIn()}
      >
        <ContentText>Sing in with Facebook</ContentText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleXSignIn()}
      >
        <ContentText>Sing in with X</ContentText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
