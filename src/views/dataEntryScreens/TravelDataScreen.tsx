import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
// import { Title } from "../components/texts/Title";
// import { ContentText } from "../components/texts/ContentText";
// import { BigTitle } from "../components/texts/BigTitle";
import { Button76 } from "../../components/button/Button76";
// import { AddButton } from "../components/button/AddButton";
// import { CardComponent } from "../components/cards/CardComponent";
import TopBar from "../../components/topBars/TopBar";
import { Title } from "../../components/texts/Title";
import { ContentText } from "../../components/texts/ContentText";
import { useAppDispatch } from "../../redux/customDispatch";
import { useLocale } from "../../i18n/TranslationContext";

import { setTravelData } from "../../redux/propmtDataSlice";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  PixelRatio,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import TopProfileBar from "../../components/topBars/TopProfileBar";
// import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../../components/cards/CardInputComponent";

type CustomProps = {
  navigation: any;
};

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

export const TravelDataScreen = (props: CustomProps): React.JSX.Element => {
  const { t } = useLocale();
  const theme = new ThemeManager();
  const dispatch = useAppDispatch();
  const { navigation } = props;
  const arrSeason = [
    t("travelScreen.seasonsOptions.spring"),
    t("travelScreen.seasonsOptions.summer"),
    t("travelScreen.seasonsOptions.autumn"),
    t("travelScreen.seasonsOptions.winter"),
  ];
  const [durationDays, setDurationDays] = useState<number>(0);
  const [place, setPlace] = useState<string>("");
  const [seasons, SetSeasons] = useState<string[]>([]);
  const [showSeasonPickerModal, setShowSeasonPickerModal] = useState(false);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      //   width: theme.standarWidth,
      //   paddingBottom: 50,
    },
    container2: {
      flex: 1,
      //   backgroundColor: "blue",
      alignItems: "flex-start",
      gap: 15,
    },

    stripeContainer: theme.rotatedStripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,

    principalContainer: {
      alignItems: "flex-start",
      elevation: Platform.OS === "ios" ? 0 : 10,
      zIndex:
        Platform.OS === "android" ? undefined : Platform.OS === "ios" ? 0 : 10,
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: Platform.OS === "ios" ? 10 : 2,
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
      paddingRight: 0,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: theme.colors.background,
      padding: 30,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingBottom: "10%",
    },
    option: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.backgroundCard,
      // borderWidth: 1,
      marginVertical: 6,
    },
    selectedOption: {
      backgroundColor: theme.colors.stripe3,
      borderColor: theme.colors.stripe3,
    },
    optionText: {
      color: theme.colors.text,
    },
    selectedText: {
      color: "#fff",
    },
    confirmButton: {
      marginTop: 16,
      backgroundColor: theme.colors.stripe3,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    confirmText: {
      color: "#fff",
      fontWeight: "600",
    },
    cancelText: {
      textAlign: "center",
      marginTop: 12,
      color: "#666",
    },
  });

  const isDisabled = !!(place !== "" && durationDays !== 0);

  function performButtonAction(): void {
    dispatch(
      setTravelData({
        duration: durationDays,
        destination: place,
        season: seasons,
      })
    );
    navigation.navigate("LuggageData");
  }

  function toggleSeason(season: string) {
    SetSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  }

  console.log("SEASONS", seasons);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[
          style.container,
          {
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
          },
        ]}
      >
        <StatusBar
          barStyle={theme.themeMode ? "light-content" : "dark-content"}
          // backgroundColor={theme.colors.background}
          backgroundColor={"transparent"}
        />
        <TopBar navigation={navigation} text="" />
        <View
          style={[
            style.stripeContainer,
            { marginLeft: theme.standarWidth / 1.8 },
          ]}
        >
          <View style={[style.stripe1]}></View>
          <View style={[style.stripe2]}></View>
          <View style={[style.stripe3]}></View>
        </View>
        <View style={style.container2}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, gap: 15 }}
          >
            <CardInputComponent
              title={t("travelScreen.days")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) =>
                setDurationDays(Number(e.replace(/[.,]/g, "")))
              }
              placeholder={t("requiredPlaceholder")}
              keyboardType="numeric"
              // value={store.name}
            />
            <CardInputComponent
              title={t("travelScreen.destination")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setPlace(e)}
              placeholder={t("requiredPlaceholder")}
            />

            <View style={style.principalContainer}>
              <Pressable
                onPress={() => {
                  setShowSeasonPickerModal(true);
                }}
              >
                <Title>{t("travelScreen.seasons")}</Title>
                <View style={style.mainCointainer}>
                  <TextInput
                    style={style.input}
                    placeholder={t("notRequiredPlaceholder")}
                    editable={false}
                    pointerEvents="none"
                    multiline={true}
                    value={seasons
                      .map((e, i) => {
                        return e;
                      })
                      .join(" - ")}
                  />
                </View>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
          <Button76
            action={performButtonAction}
            disabled={isDisabled}
            text={t("button.nextBtn")}
          />

          <Modal
            visible={showSeasonPickerModal}
            transparent
            animationType="fade"
          >
            <Pressable
              style={[StyleSheet.absoluteFill, style.overlay]}
              onPress={() => setShowSeasonPickerModal(false)}
            >
              <TouchableWithoutFeedback>
                <View style={style.modal}>
                  <Title>{t("travelScreen.selectOptions")}</Title>

                  {arrSeason.map((season) => {
                    const isSelected = seasons.includes(season);
                    return (
                      <TouchableOpacity
                        key={season}
                        style={[
                          style.option,
                          isSelected && style.selectedOption,
                        ]}
                        onPress={() => toggleSeason(season)}
                      >
                        <ContentText
                          style={
                            isSelected ? style.selectedText : style.optionText
                          }
                        >
                          {season}
                        </ContentText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
