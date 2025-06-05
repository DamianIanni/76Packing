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
import { BigTitle } from "../../components/texts/BigTitle";
import TranslucentScreen from "../TranslucentScreen";

import { useAppDispatch } from "../../redux/customDispatch";
import { setAllData, setUserAfterLogin } from "../../redux/userSlice";
import { signInWithGoogle } from "../../utils/signIn";
import { insertUserToServer } from "../../api/apiServices/mutationServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUUID } from "../../utils/checkUUID";
import { useLocale } from "../../i18n/TranslationContext";
import TopBar from "../../components/topBars/TopBar";

import { getReduxStoreUser } from "../../redux/getReduxStore";

import {
  registerWithEmail,
  loginWithEmail,
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

export const RegisterScreen = (props: customProps): React.JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordErrorState, setPasswordErrorState] = useState<boolean>(false);
  const [emailErrorState, setEmailErrorState] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [nameError, setnameError] = useState<boolean>(false);
  const [surnameError, setsurnameError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError(t("registerScreen.mandatoryPassword"));
      setPasswordErrorState(true);
      return;
    }

    if (value.length < 8) {
      setPasswordError(t("registerScreen.eightCharactersPassword"));
      setPasswordErrorState(true);
      return;
    }

    if (!/[A-Z]/.test(value)) {
      setPasswordError(t("registerScreen.passwordCapitalLetter"));
      setPasswordErrorState(true);
      return;
    }

    if (!/[a-z]/.test(value)) {
      setPasswordError(t("registerScreen.passwordLowerCase"));
      setPasswordErrorState(true);
      return;
    }

    if (!/\d/.test(value)) {
      setPasswordError(t("registerScreen.passwordNumber"));
      setPasswordErrorState(true);
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPasswordError(t("registerScreen.passwordSpecialCharacter"));
      setPasswordErrorState(true);
      return;
    }

    // Si pasa todas las validaciones:
    setPasswordError("");
    setPasswordErrorState(false);
    setPassword(value);
  };

  //2:  Passwort muss mindestens 8 Zeichen enthalten
  //3: Passwort muss mindestens einen Großbuchstaben enthalten
  // 1: Passwort darf nicht leer sein
  //5: Passwort muss mindestens eine Nummer enthalten
  // 6: Passwort muss mindestens ein Sonderzeichen enthalten
  //8: Email nicht gültig
  //7: Passwort darf nicht leer sein
  //
  //

  async function saveIntoDB(email: string): Promise<void> {
    // route = "PersonalData";
    const userToInsert = {
      Email: email,
      Surname: surname,
      Name: name,
    };
    const userToDispatch = {
      email: email,
      photoUrl: null,
      givenName: name,
      familyName: surname,
    };
    dispatch(setUserAfterLogin(userToDispatch));
    const data = await insertUserToServer(userToInsert);
    console.log("UUID", data.insertUser.data.uuid);

    await AsyncStorage.setItem("userIdInStorage", data.insertUser.data.uuid);
    navigateToScreen("PersonalData");
  }

  async function registerCredentials(): Promise<void> {
    setLoading(true);
    const res = await registerWithEmail(email, password);
    console.log("New user", res.email);
    await loginWithEmail(email, password);
    await waitForFirebaseUser();
    saveIntoDB(res.email);
  }

  function disabledRegister() {
    // Validar que los campos no estén vacíos y cumplan longitud mínima
    if (name.trim().length <= 2) return true;
    if (surname.trim().length <= 2) return true;
    if (email.trim() === "") return true;
    if (password.trim() === "") return true;

    // Validar que no haya errores activos
    if (
      nameError ||
      surnameError ||
      emailErrorState ||
      passwordErrorState ||
      emailError !== "" ||
      passwordError !== ""
    ) {
      return true;
    }

    // Si pasó todas las validaciones, habilitar el botón
    return false;
  }

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
      <TranslucentScreen visible={loading} />
      <TopBar text="" navigation={navigation} />

      <View style={styles.inputContainer}>
        <TextInput
          maxLength={36}
          style={styles.input}
          placeholder={t("profileScreen.name")}
          onChangeText={(text) => {
            if (text.length > 2) {
              setnameError(false);
              setName(text);
              return;
            }
            if (text === "") {
              setnameError(false);
              return;
            }
            setnameError(true);
          }}
        />
      </View>

      <View
        style={styles.inputContainer}
        // onPress={() => handleGoogleSignIn()}
      >
        <TextInput
          maxLength={36}
          style={styles.input}
          placeholder={t("profileScreen.surname")}
          onChangeText={(text) => {
            if (text.length > 2) {
              setsurnameError(false);
              setSurname(text);
              return;
            }
            if (text === "") {
              setsurnameError(false);
              return;
            }
            setsurnameError(true);
          }}
        />
      </View>
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
      <View
        style={styles.inputContainer}
        // onPress={() => handleGoogleSignIn()}
      >
        <TextInput
          maxLength={36}
          style={styles.input}
          placeholder={t("loginScreen.password")}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => validatePassword(text)}
        />
      </View>
      {nameError && (
        <ContentText style={styles.errorStyle}>
          {t("registerScreen.nameShort")}
        </ContentText>
      )}
      {surnameError && (
        <ContentText style={styles.errorStyle}>
          {t("registerScreen.surnameShort")}
        </ContentText>
      )}
      {(emailError !== null || emailError !== "") && (
        <ContentText style={styles.errorStyle}>{emailError}</ContentText>
      )}
      {(passwordError !== null || passwordError !== "") && (
        <ContentText style={styles.errorStyle}>{passwordError}</ContentText>
      )}
      <TouchableOpacity
        style={[styles.itemContainer]}
        disabled={disabledRegister()}
        onPress={() => registerCredentials()}
      >
        <ContentText>{t("registerScreen.register")}</ContentText>
      </TouchableOpacity>
    </SafeAreaView>
    // {/* </KeyboardAvoidingView> */}
  );
};
