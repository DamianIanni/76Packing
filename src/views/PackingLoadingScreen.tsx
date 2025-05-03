import React, { useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Text,
  PixelRatio,
  Platform,
} from "react-native";
import { ThemeManager } from "../classes/ThemeManager";
import { ButtonText } from "../components/texts/ButtonText";
import { getReduxStorePrompt } from "../redux/getReduxStore";

export const PackingLoadingScreen = () => {
  const theme = new ThemeManager();
  const os = Platform.OS;
  const storePrompt = getReduxStorePrompt();

  console.log("STORE PROMPT", storePrompt);

  const normalizeFontSize = (size: number) => {
    const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
    return size / scale;
  };

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      gap: 20,
    },
    circle: {
      width: "100%",
      height: "50%",
      borderRadius: 700,
      position: "absolute",
      justifyContent: "center",
      zIndex: 4,
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: normalizeFontSize(26),
      fontStyle: os === "ios" ? "italic" : "normal",
      letterSpacing: 12,
      fontFamily: "Afacad-BoldItalic",
      color: theme.themeMode ? theme.colors.stripe3 : theme.colors.stripe2,
      textAlign: "center",
      // textShadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      // textShadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      // textShadowRadius: os === "ios" ? 4 : 8, // Difuminado de la sombra
    },
    logo: {
      height: "40%",
      width: "100%",
      resizeMode: "contain",
      zIndex: 5,
      //   backgroundColor: "red",
    },
    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

  //   useEffect(() => {
  //     setTimeout(() => {
  //       Animated.timing(opacity, {
  //         toValue: 0,
  //         duration: 800,
  //         useNativeDriver: true,
  //       }).start();
  //     }, 2200);
  //   }, []);

  const whichLogo = () => {
    return theme.themeMode
      ? require("../assets/logos/76_logo_light.png")
      : require("../assets/logos/76_logo.png");
  };

  return (
    <>
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <View style={styles.mainView}>
        <Image source={whichLogo()} style={styles.logo} />
        <Text style={styles.text}>PACKING FOR YOU</Text>
        <ActivityIndicator
          size="large"
          color={theme.themeMode ? theme.colors.stripe3 : theme.colors.stripe2}
        />
      </View>
    </>
  );
};
