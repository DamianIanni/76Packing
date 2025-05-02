import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";
import { getReduxStore } from "../../redux/getReduxStore";
import { useAppDispatch } from "../../redux/customDispatch";
import { setSavedLuggageData } from "../../redux/userSlice";
import { setAccommodationData } from "../../redux/propmtDataSlice";
import { Switch } from "react-native";
import { ContentText } from "../../components/texts/ContentText";

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
  const { navigation, route } = props;
  const store = getReduxStore();
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const [acommodation, setAcommodation] = useState<string>("");
  const [luggage, setLuggage] = useState<string>("");
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
      // backgroundColor: "pink",
      marginTop: 20,
      // position: "absolute",
      // bottom: "30%",
    },
    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

  function isDisabled(): boolean {
    if (route.params?.from) {
      return luggage ? true : false;
    }
    return !!(acommodation && luggage);
  }

  function performButtonAction(): void {
    dispatch(setSavedLuggageData({ savedLuggage: luggage }));
    if (route.params?.from) {
      navigation.goBack();
      return;
    }
    dispatch(setAccommodationData({ accommodation: acommodation }));
    navigation.navigate("PackingLoading");
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
          {!route.params?.from && (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <CardInputComponent
                title="Acommodation"
                z={Platform.OS === "ios" ? 0 : 10}
                multiline={true}
                action={(e: string) => setAcommodation(e)}
                placeholder="Required"
                value={store.name}
              />
            </KeyboardAvoidingView>
          )}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title="luggage"
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={true}
              action={(e: string) => setLuggage(e)}
              placeholder="Required"
              value={store.name}
            />
          </KeyboardAvoidingView>

          {!route.params?.from && (
            <View style={style.container3}>
              <ContentText>Use saved luggage</ContentText>
              <Switch />
            </View>
          )}

          <Button76
            action={performButtonAction}
            disabled={isDisabled()}
            text={route.params?.from ? "save" : "next"}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
