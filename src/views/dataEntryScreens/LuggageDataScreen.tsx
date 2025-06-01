import React, { useState, useEffect } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";
import { getReduxStoreUser } from "../../redux/getReduxStore";
import { useAppDispatch } from "../../redux/customDispatch";
import { setSavedLuggageData } from "../../redux/userSlice";
import { Switch } from "react-native";
import { ContentText } from "../../components/texts/ContentText";
import { setLuggagePropmtData } from "../../redux/propmtDataSlice";
import {
  insertSavedLuggageToServer,
  updateSavedLuggageToServer,
} from "../../api/apiServices/mutationServices";
import { useLocale } from "../../i18n/TranslationContext";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { CardInputComponent } from "../../components/cards/CardInputComponent";

type CustomProps = {
  navigation: any;
  route: any;
};

export const LuggageDataScreen = (props: CustomProps): React.JSX.Element => {
  const { t } = useLocale();
  const { navigation, route } = props;
  const store = getReduxStoreUser();
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const luggage_1 = store.savedLuggage?.luggage1;
  const luggage_2 = store.savedLuggage?.luggage2;
  const luggage_3 = store.savedLuggage?.luggage3;
  const luggage_4 = store.savedLuggage?.luggage4;
  const [luggage1, setLuggage1] = useState<string>(luggage_1 ? luggage_1 : "");
  const [luggage2, setLuggage2] = useState<string>(luggage_2 ? luggage_2 : "");
  const [luggage3, setLuggage3] = useState<string>(luggage_3 ? luggage_3 : "");
  const [luggage4, setLuggage4] = useState<string>(luggage_4 ? luggage_4 : "");
  const [useSavedLuggage, setUseSavedLuggage] = useState<boolean>(true);

  const arrLuggage = [luggage1, luggage2, luggage3, luggage4];
  const objLuggage = {
    luggage1: luggage1,
    luggage2: luggage2,
    luggage3: luggage3,
    luggage4: luggage4,
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    container2: {
      flex: 1,
      alignItems: "flex-start",
      gap: 15,
    },
    container3: {
      flex: 1,
      alignItems: "flex-start",
      gap: 5,
      // flexDirection: "row",
      // backgroundColor: "rgba(0,0,0,0.7)",
      marginTop: 20,
      // justifyContent: "flex-start",
      borderRadius: 10,
      // padding: 4,
      // height: 30,
      // width: "100%",
      // position: "absolute",
      // bottom: "30%",
    },
    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

  useEffect(() => {
    if (route.params?.from && store.savedLuggage) {
      setLuggage1(luggage_1 || "");
      setLuggage2(luggage_2 || "");
      setLuggage3(luggage_3 || "");
      setLuggage4(luggage_4 || "");
    }
  }, []);

  useEffect(() => {
    if (useSavedLuggage && store.savedLuggage) {
      setLuggage1(luggage_1 || "");
      setLuggage2(luggage_2 || "");
      setLuggage3(luggage_3 || "");
      setLuggage4(luggage_4 || "");
    }
  }, [useSavedLuggage, store.savedLuggage]);

  function isDisabled(): boolean {
    if (route.params?.from) {
      return luggage1 ? true : false;
    }
    return !!luggage1;
  }

  async function performButtonAction() {
    if (route.params?.from) {
      dispatch(setSavedLuggageData({ savedLuggage: objLuggage }));
      // const isThereSavedLuggage = await getSavedLuggageFromServer(
      //   store.userId!
      // );
      store.savedLuggage === null
        ? await insertSavedLuggageToServer({
            luggage1: luggage1,
            luggage2: luggage2,
            luggage3: luggage3,
            luggage4: luggage4,
            userId: store.userId!,
          })
        : await updateSavedLuggageToServer({
            luggage1: luggage1,
            luggage2: luggage2,
            luggage3: luggage3,
            luggage4: luggage4,
            userId: store.userId!,
          });
      navigation.goBack();
      return;
    }
    dispatch(setLuggagePropmtData({ luggage: arrLuggage }));
    navigation.navigate("AccommodationScreen");
  }

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
          >
            <CardInputComponent
              title={t("luggageScreen.luggage1")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setLuggage1(e)}
              placeholder={t("requiredPlaceholder")}
              value={luggage1}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title={t("luggageScreen.luggage2")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setLuggage2(e)}
              placeholder={t("notRequiredPlaceholder")}
              value={luggage2}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title={t("luggageScreen.luggage3")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setLuggage3(e)}
              placeholder={t("notRequiredPlaceholder")}
              value={luggage3}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title={t("luggageScreen.luggage4")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setLuggage4(e)}
              placeholder={t("notRequiredPlaceholder")}
              value={luggage4}
            />
          </KeyboardAvoidingView>
          {!route.params?.from && store.savedLuggage && (
            <View style={style.container3}>
              <ContentText>{t("luggageScreen.useSavedLugg")}</ContentText>
              <Switch
                trackColor={{ false: "#767577", true: theme.colors.stripe3 }}
                thumbColor={"#ffff"}
                onValueChange={() => setUseSavedLuggage(!useSavedLuggage)}
                value={useSavedLuggage}
                style={{
                  transform: [
                    { scaleX: Platform.OS === "android" ? 1.3 : 1 },
                    { scaleY: Platform.OS === "android" ? 1.3 : 1 },
                  ],
                }}
              />
            </View>
          )}
          <Button76
            action={performButtonAction}
            disabled={isDisabled()}
            text={
              route.params?.from ? t("button.saveBtn") : t("button.nextBtn")
            }
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
