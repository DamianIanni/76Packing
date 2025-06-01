import React, { useEffect, useCallback } from "react";
import {
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Text,
  PixelRatio,
  BackHandler,
  Platform,
} from "react-native";
import { ThemeManager } from "../classes/ThemeManager";
import { useLocale } from "../i18n/TranslationContext";
import { getReduxStorePrompt, getReduxStoreUser } from "../redux/getReduxStore";
import { getPromptLuggageFromServer } from "../api/apiServices/queryServices";
import { PackingPromptInput } from "../api/apiServices/queryServices";
import { insertFavPackingToServer } from "../api/apiServices/mutationServices";
import { useAppDispatch } from "../redux/customDispatch";
import { useFocusEffect } from "@react-navigation/native";

import { setFavPacking } from "../redux/userSlice";

type customProps = {
  navigation: any;
};

const mockData = [
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "carry on",
    content: [
      { quantity: 1, item: "jeans", status: false },
      { quantity: 1, item: "long sleeve t-shirt", status: false },
      { quantity: 1, item: "waterproof jacket", status: false },
      { quantity: 1, item: "dress shoes", status: false },
      { quantity: 1, item: "sneakers", status: false },
      { quantity: 3, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
];

export const PackingLoadingScreen: React.FC<customProps> = ({ navigation }) => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const os = Platform.OS;
  const storePrompt = getReduxStorePrompt();
  const userStore = getReduxStoreUser();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Bloquea el botón atrás
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove(); // ✅ esta es la forma correcta ahora
    }, [])
  );

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

  function stringnifyingObj(obj: any) {
    const stringyfied = JSON.stringify(obj);
    return stringyfied;
  }

  async function sendToPlaces(response: any) {
    const obj = settingFavPacking(response);
    const res = await insertFavPackingToServer(obj);

    dispatch(setFavPacking({ ...obj, id: res.insertFavPacking.data }));
    goToShowLuggage();
  }

  function settingFavPacking(data: any) {
    const result: any = {
      userId: userStore.userId,
      Name: storePrompt.destination,
      packing_type: 0,
      Luggage_1: stringnifyingObj(data[0]),
      Luggage_2: data[1] ? stringnifyingObj(data[1]) : null,
      Luggage_3: data[2] ? stringnifyingObj(data[2]) : null,
      Luggage_4: data[3] ? stringnifyingObj(data[3]) : null,
    };

    return result;
  }

  function goToShowLuggage() {
    navigation.navigate("ShowLuggage", {
      from: "LoadingScreen",
    });
  }

  function removeEmptyStrings(arr: string[]): string[] {
    return arr.filter((str) => str.trim() !== "");
  }

  function setupObjectForPrompt(): PackingPromptInput {
    const fields = storePrompt;
    const fields_1 = userStore;
    // let arrLuggage: string[]

    const result: any = {
      destination: fields.destination,
      duration: fields.duration,
      luggageItems: removeEmptyStrings(fields.luggage!),
    };

    if (!result.destination || !result.duration || !result.luggageItems) {
      throw new Error("destination, duration y luggageItems are mandatory");
    }

    if (fields.activities) result.activities = fields.activities;
    if (fields.accommodation) result.accommodationType = fields.accommodation;
    if (fields.utilities?.length) result.utilities = fields.utilities;
    if (fields_1.style) result.dressStyle = fields_1.style;

    return result as PackingPromptInput;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obj = setupObjectForPrompt();
        const data = await getPromptLuggageFromServer(obj); // 👈 Espera la respuesta

        if (data.promptLuggage.code === 200) {
          sendToPlaces(data.promptLuggage.data); // ✅ Se ejecuta sólo si hay data
        }
      } catch (error) {
        console.log("ERROR CON EL PROMPT", error);
      }
    };

    fetchData();
  }, []);

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
        <Text style={styles.text}>
          {t("loadingScreen.packForYou").toUpperCase()}
        </Text>
        <ActivityIndicator
          size="large"
          color={theme.themeMode ? theme.colors.stripe3 : theme.colors.stripe2}
        />
      </View>
    </>
  );
};
