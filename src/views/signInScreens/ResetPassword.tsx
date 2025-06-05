import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert,
  PixelRatio,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../../components/texts/ContentText";

import { useAppDispatch } from "../../redux/customDispatch";
import { useLocale } from "../../i18n/TranslationContext";
import TopBar from "../../components/topBars/TopBar";

import { getReduxStoreUser } from "../../redux/getReduxStore";

import {
  registerWithEmail,
  loginWithEmail,
  sendPasswordReset,
} from "../../utils/signInWithCredentials";

import { waitForFirebaseUser } from "../../utils/signInWithCredentials";
// import auth from "@react-native-firebase/auth";

// async function waitForFirebaseUser() {
//   return new Promise((resolve) => {
//     const unsubscribe = auth().onAuthStateChanged((user) => {
//       if (user) {
//         unsubscribe();
//         resolve(user);
//       }
//     });
//   });
// }

interface customProps {
  navigation: any;
}

export const ResetPassword = (props: customProps): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [emailErrorState, setEmailErrorState] = useState<boolean>(false);
  //   const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const { navigation } = props;
  const { t } = useLocale();

  const normalizeFontSize = (size: number) => {
    const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
    return size / scale;
  };

  function navigateToScreen(route: string) {
    navigation.reset({
      index: 0,
      routes: [{ name: route }],
    });
  }

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError(t("registerScreen.mandatoryEmail"));
      setEmailErrorState(true);
      return;
    }

    if (!emailRegex.test(value)) {
      setEmailError(t("registerScreen.invalidEmail"));
      setEmailErrorState(true);
      return;
    }

    // Si pasa las validaciones:
    setEmailErrorState(false);
    setEmailError("");
    setEmail(value);
  };

  function disabledRegister() {
    // Validar que los campos no estén vacíos y cumplan longitud mínima
    if (email.trim() === "") return true;

    // Validar que no haya errores activos
    if (emailErrorState || emailError !== "") {
      return true;
    }

    // Si pasó todas las validaciones, habilitar el botón
    return false;
  }

  async function resetPasswordAction() {
    const res = await sendPasswordReset(email);
    if (res) {
      Alert.alert(
        t("messages.attention"),
        t("messages.resetPassword.succes"),
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: true, onDismiss: () => navigation.goBack() }
      );
      return;
    }
    Alert.alert(
      t("messages.attention"),
      t("messages.resetPassword.error"),
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: true, onDismiss: () => navigation.goBack() }
    );
  }
  //2:  Passwort muss mindestens 8 Zeichen enthalten
  //3: Passwort muss mindestens einen Großbuchstaben enthalten
  // 1: Passwort darf nicht leer sein
  //5: Passwort muss mindestens eine Nummer enthalten
  // 6: Passwort muss mindestens ein Sonderzeichen enthalten
  //8: Email nicht gültig
  //7: Passwort darf nicht leer sein
  //
  //

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background,
      width: "100%",
      gap: 15,
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70,
      alignItems: "center",
      width: "100%",
      gap: 15,
    },
    inputContainer: {
      height: 50,
      width: "90%",
      borderColor: theme.colors.stripe3,
      borderWidth: 2,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "flex-start",
      borderRadius: 50,
      paddingLeft: 20,
      //   gap: 1
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
      // paddingRight: innerPad ? innerPad : 0,
    },
    itemContainer: {
      height: 50,
      width: "90%",
      backgroundColor: disabledRegister() ? "gray" : theme.colors.stripe3,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      //   marginTop: 50,
      position: "absolute",
      bottom: "10%",
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
    loginContainer: {
      justifyContent: "space-between",
      width: theme.standarWidth,
      flexDirection: "row",
      alignItems: "center",
    },
    loginBtnContainer: {
      height: 40,
      // width: "40%",
      paddingHorizontal: 10,
      backgroundColor: theme.colors.stripe3,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    resetPasswordContainer: {
      height: 40,
      // width: "40%",
      paddingHorizontal: 10,
      // backgroundColor: theme.colors.stripe3,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    errorStyle: {
      color: "red",
      width: theme.standarWidth,
      textAlign: "center",
    },
  });

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1, backgroundColor: theme.colors.background }}
    // >
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
        },
      ]}
    >
      {/* <TranslucentScreen visible={loading} /> */}
      <TopBar text="" navigation={navigation} />
      <View
        style={styles.inputContainer}
        // onPress={() => handleGoogleSignIn()}
      >
        <TextInput
          maxLength={36}
          style={styles.input}
          placeholder={"Email"}
          autoCapitalize="none"
          //   secureTextEntry={true}
          keyboardType={"email-address"}
          onChangeText={(text) => validateEmail(text)}
        />
      </View>
      {(emailError !== null || emailError !== "") && (
        <ContentText style={styles.errorStyle}>{emailError}</ContentText>
      )}
      <View style={{ width: theme.standarWidth }}>
        <ContentText>{t("messages.resetPassword.resetEmailHint")}</ContentText>
      </View>
      <TouchableOpacity
        style={[styles.itemContainer]}
        disabled={disabledRegister()}
        onPress={() => resetPasswordAction()}
      >
        <ContentText>{t("messages.send")}</ContentText>
      </TouchableOpacity>
    </SafeAreaView>
    // {/* </KeyboardAvoidingView> */}
  );
};
