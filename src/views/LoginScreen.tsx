// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Platform,
//   StatusBar,
//   Image,
//   Alert,
//   PixelRatio,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import { ThemeManager } from "../classes/ThemeManager";
// import { ContentText } from "../components/texts/ContentText";
// import { BigTitle } from "../components/texts/BigTitle";

// import { useAppDispatch } from "../redux/customDispatch";
// import { setAllData, setUserAfterLogin } from "../redux/userSlice";
// import { signInWithGoogle } from "../utils/signIn";
// import { insertUserToServer } from "../api/apiServices/mutationServices";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { checkUUID } from "../utils/checkUUID";
// import { useLocale } from "../i18n/TranslationContext";
// import TranslucentScreen from "./TranslucentScreen";

// import { getReduxStoreUser } from "../redux/getReduxStore";
// import {
//   getUserFromServer,
//   getUserIdFromServer,
//   getAllUserDataFromServer,
// } from "../api/apiServices/queryServices";

// import { loginWithEmail } from "../utils/signInWithCredentials";

// interface customProps {
//   navigation: any;
// }

// export const LoginScreen = (props: customProps): React.JSX.Element => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const dispatch = useAppDispatch();
//   const theme = new ThemeManager();
//   const { navigation } = props;
//   const { t } = useLocale();

//   const normalizeFontSize = (size: number) => {
//     const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
//     return size / scale;
//   };

//   function navigateToScreen(route: string) {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: route }],
//     });
//   }

//   async function handleGoogleSignIn() {
//     const res = await signInWithGoogle();
//     if (!res || res === true || typeof res !== "object" || !("email" in res)) {
//       return Alert.alert("Error", t("messages.errorLogin"));
//     }
//     setLoading(true);
//     const dataUUID = await evaluatingUUID(res.email);
//     // const userId = await getUserIdFromServer(res.email);
//     // const isUUID = userId !== null && checkUUID(userId.getUserId.data);
//     let route: string;

//     console.log("EL UUID", dataUUID);

//     if (dataUUID.isUUID) {
//       const user = await performingLoginExistingUser(
//         dataUUID.userId,
//         res.photoUrl
//       );
//       // await AsyncStorage.setItem("userIdInStorage", dataUUID.userId.getUserId.data);
//       // const user = await getAllUserDataFromServer(dataUUID.userId.getUserId.data);
//       // dispatch(
//       //   setAllData({ ...user.getAllUserData.data, photoUrl: res.photoUrl })
//       // );
//       route =
//         user.getAllUserData.data.user.DateOfBirth !== null
//           ? "MainTabs"
//           : "PersonalData";
//     } else {
//       // Usuario nuevo
//       route = "PersonalData";
//       const userToInsert = {
//         Email: res.email,
//         Surname: res.familyName || "",
//         Name: res.givenName || "",
//       };
//       dispatch(setUserAfterLogin(res));
//       const data = await insertUserToServer(userToInsert);
//       console.log("UUID", data.insertUser.data.uuid);

//       await AsyncStorage.setItem("userIdInStorage", data.insertUser.data.uuid);
//     }

//     navigateToScreen(route);
//   }

//   function handleResetPassword() {
//     navigation.navigate("ResetPasswordScreen");
//   }

//   async function performingLoginExistingUser(
//     userId: any,
//     photoUrl: string | null
//   ) {
//     await AsyncStorage.setItem("userIdInStorage", userId.getUserId.data);
//     const user = await getAllUserDataFromServer(userId.getUserId.data);
//     dispatch(setAllData({ ...user.getAllUserData.data, photoUrl: photoUrl }));
//     return user;
//   }

//   async function evaluatingUUID(email: string) {
//     const userId = await getUserIdFromServer(email);
//     console.log(userId.getUserId.data);
//     const isUUID = userId !== null && checkUUID(userId.getUserId.data);
//     return { isUUID, userId };
//   }

//   async function logInWithCredentials() {
//     let route: string;
//     const res = await loginWithEmail(email, password);
//     if (res === null) return Alert.alert("Error", t("messages.errorLogin"));
//     setLoading(true);
//     const dataUUID = await evaluatingUUID(res!);
//     const user = await performingLoginExistingUser(dataUUID.userId, null);
//     route =
//       user.getAllUserData.data.user.DateOfBirth !== null
//         ? "MainTabs"
//         : "PersonalData";
//     navigateToScreen(route);
//   }

//   function handleCredentialsSignIn() {
//     navigation.navigate("RegisterScreen");
//     // navigation.reset({
//     //   index: 0,
//     //   routes: [{ name: route }],
//     // });
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: theme.colors.background,
//       width: "100%",
//       gap: 15,
//     },
//     listContainer: {
//       paddingTop: 10,
//       paddingBottom: 70,
//       alignItems: "center",
//       width: "100%",
//       gap: 15,
//     },
//     inputContainer: {
//       height: 50,
//       width: "90%",
//       borderColor: theme.colors.stripe3,
//       borderWidth: 2,
//       marginVertical: 5,
//       justifyContent: "center",
//       alignItems: "flex-start",
//       borderRadius: 50,
//       paddingLeft: 20,
//     },
//     input: {
//       width: "100%",
//       fontFamily: "Afacad-Medium",
//       fontSize: normalizeFontSize(20),
//       color: theme.colors.text,
//       letterSpacing: 3,
//       maxHeight: 150,
//       // paddingRight: innerPad ? innerPad : 0,
//     },
//     itemContainer: {
//       height: 50,
//       width: "90%",
//       backgroundColor: theme.colors.stripe3,
//       marginVertical: 5,
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: 50,
//     },
//     logo: {
//       height: "45%",
//       width: "100%",
//       resizeMode: "contain",
//       zIndex: 5,
//     },
//     logoContainer: {
//       height: 350,
//       flexDirection: "column",
//       width: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     loginContainer: {
//       justifyContent: "space-between",
//       width: theme.standarWidth,
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     loginBtnContainer: {
//       height: 40,
//       // width: "40%",
//       paddingHorizontal: 10,
//       backgroundColor: theme.colors.stripe3,
//       marginVertical: 5,
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: 50,
//     },
//     signInContainer: {
//       justifyContent: "flex-end",
//       width: theme.standarWidth,
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     resetPasswordContainer: {
//       height: 30,
//       // width: "40%",
//       paddingHorizontal: 10,
//       // backgroundColor: theme.colors.stripe3,
//       marginVertical: 5,
//       justifyContent: "center",
//       alignItems: "center",
//       // borderRadius: 50,
//     },
//   });

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <TranslucentScreen visible={loading} />
//       <SafeAreaView
//         style={[
//           styles.container,
//           {
//             paddingTop:
//               Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
//           },
//         ]}
//       >
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../assets/logos/76_logo.png")}
//             style={styles.logo}
//           />
//           <BigTitle>packing</BigTitle>
//         </View>

//         <View style={styles.inputContainer}>
//           <TextInput
//             // placeholderTextColor={"#2A2A2D"}
//             maxLength={36}
//             style={styles.input}
//             placeholder={"Email"}
//             // multiline={multiline}
//             autoCapitalize="none"
//             keyboardType={"email-address"}
//             // value={stateValue}
//             onChangeText={(text) => setEmail(text)}
//             // editable={isEditable}
//           />
//         </View>

//         <View
//           style={styles.inputContainer}
//           // onPress={() => handleGoogleSignIn()}
//         >
//           <TextInput
//             // placeholderTextColor={"#2A2A2D"}
//             maxLength={36}
//             style={styles.input}
//             placeholder={"Password"}
//             // multiline={multiline}
//             autoCapitalize="none"
//             secureTextEntry={true}
//             // keyboardType={"email-address"}
//             // value={stateValue}
//             onChangeText={(text) => setPassword(text)}
//             // editable={isEditable}
//           />
//         </View>
//         <View style={styles.loginContainer}>
//           <TouchableOpacity
//             style={styles.loginBtnContainer}
//             onPress={() => logInWithCredentials()}
//           >
//             <ContentText>Login</ContentText>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.resetPasswordContainer}
//             onPress={() => handleResetPassword()}
//           >
//             <ContentText style={{ textDecorationLine: "underline" }}>
//               Reset password
//             </ContentText>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.signInContainer}>
//           <TouchableOpacity
//             style={styles.resetPasswordContainer}
//             onPress={() => handleCredentialsSignIn()}
//           >
//             <ContentText style={{ textDecorationLine: "underline" }}>
//               Sign in
//             </ContentText>
//           </TouchableOpacity>
//         </View>
//         <ContentText>or</ContentText>
//         <TouchableOpacity
//           style={styles.itemContainer}
//           onPress={() => handleGoogleSignIn()}
//         >
//           <ContentText>{t("loginScreen.google")}</ContentText>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

import React, { useState, useEffect } from "react"; // Importar useEffect
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
  Keyboard, // Importar Keyboard
  KeyboardEvent, // Importar KeyboardEvent
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
import { useLocale } from "../i18n/TranslationContext";
import TranslucentScreen from "./TranslucentScreen";

import { getReduxStoreUser } from "../redux/getReduxStore";
import {
  getUserFromServer,
  getUserIdFromServer,
  getAllUserDataFromServer,
} from "../api/apiServices/queryServices";

import { loginWithEmail } from "../utils/signInWithCredentials";

interface customProps {
  navigation: any;
}

export const LoginScreen = (props: customProps): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0); // Estado para la altura del teclado
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

  async function handleGoogleSignIn() {
    const res = await signInWithGoogle();
    if (!res || res === true || typeof res !== "object" || !("email" in res)) {
      return Alert.alert("Error", t("messages.errorLogin"));
    }
    setLoading(true);
    const dataUUID = await evaluatingUUID(res.email);
    let route: string;

    console.log("EL UUID", dataUUID);

    if (dataUUID.isUUID) {
      const user = await performingLoginExistingUser(
        dataUUID.userId,
        res.photoUrl
      );
      route =
        user.getAllUserData.data.user.DateOfBirth !== null
          ? "MainTabs"
          : "PersonalData";
    } else {
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

    navigateToScreen(route);
  }

  function handleResetPassword() {
    navigation.navigate("ResetPasswordScreen");
  }

  async function performingLoginExistingUser(
    userId: any,
    photoUrl: string | null
  ) {
    await AsyncStorage.setItem("userIdInStorage", userId.getUserId.data);
    const user = await getAllUserDataFromServer(userId.getUserId.data);
    dispatch(setAllData({ ...user.getAllUserData.data, photoUrl: photoUrl }));
    return user;
  }

  async function evaluatingUUID(email: string) {
    const userId = await getUserIdFromServer(email);
    console.log(userId.getUserId.data);
    const isUUID = userId !== null && checkUUID(userId.getUserId.data);
    return { isUUID, userId };
  }

  async function logInWithCredentials() {
    let route: string;
    const res = await loginWithEmail(email, password);
    if (res === null) return Alert.alert("Error", t("messages.errorLogin"));
    setLoading(true);
    const dataUUID = await evaluatingUUID(res!);
    const user = await performingLoginExistingUser(dataUUID.userId, null);
    route =
      user.getAllUserData.data.user.DateOfBirth !== null
        ? "MainTabs"
        : "PersonalData";
    navigateToScreen(route);
  }

  function handleCredentialsSignIn() {
    navigation.navigate("RegisterScreen");
  }

  // Efecto para escuchar los eventos del teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height); // Obtener la altura del teclado
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0); // Resetear la altura cuando el teclado se oculta
      }
    );

    // Limpiar los listeners al desmontar el componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar y desmontar

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      width: "100%",
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70, // Padding inferior original
      alignItems: "center",
      width: "100%",
      gap: 15,
      flexGrow: 1,
      justifyContent: "center",
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
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
    },
    itemContainer: {
      height: 50,
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
      height: 350,
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
      paddingHorizontal: 10,
      backgroundColor: theme.colors.stripe3,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    signInContainer: {
      justifyContent: "flex-end",
      width: theme.standarWidth,
      flexDirection: "row",
      alignItems: "center",
    },
    resetPasswordContainer: {
      height: 30,
      paddingHorizontal: 10,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    // Eliminamos KeyboardAvoidingView
    // <KeyboardAvoidingView
    //   behavior={"padding"}
    //   style={{ flex: 1 }}
    // >
    <>
      {/* Usamos un Fragment o View simple en su lugar */}
      <TranslucentScreen visible={loading} />
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={[
            styles.listContainer,
            {
              paddingBottom:
                styles.listContainer.paddingBottom + keyboardHeight,
            }, // Añadir padding extra cuando el teclado está visible
          ]}
          style={{ flex: 1 }}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logos/76_logo.png")}
              style={styles.logo}
            />
            <BigTitle>packing</BigTitle>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              maxLength={36}
              style={styles.input}
              placeholder={"Email"}
              autoCapitalize="none"
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              maxLength={36}
              style={styles.input}
              placeholder={t("loginScreen.password")}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.loginContainer}>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={() => logInWithCredentials()}
            >
              <ContentText>{t("loginScreen.login")}</ContentText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetPasswordContainer}
              onPress={() => handleCredentialsSignIn()}
            >
              <ContentText style={{ textDecorationLine: "underline" }}>
                {t("loginScreen.signIn")}
              </ContentText>
            </TouchableOpacity>
          </View>
          <View style={styles.signInContainer}>
            <TouchableOpacity
              style={styles.resetPasswordContainer}
              onPress={() => handleResetPassword()}
            >
              <ContentText style={{ textDecorationLine: "underline" }}>
                {t("loginScreen.reset")}
              </ContentText>
            </TouchableOpacity>
          </View>
          <ContentText>{t("loginScreen.or")}</ContentText>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleGoogleSignIn()}
          >
            <ContentText>{t("loginScreen.google")}</ContentText>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </> // Cerramos el Fragment o View simple
    // </KeyboardAvoidingView>
  );
};
