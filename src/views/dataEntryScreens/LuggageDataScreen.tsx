import React from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";

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

export const LuggageDataScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
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

    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

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
        <TopBar text="" />
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
              title="accomodation"
              // customWidth={Platform.OS === "ios" ? 35 : 0}
              // z={Platform.OS === "ios" ? -1 : 6}
              multiline={true}
              // innerPad={5}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title="luggage"
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={true}
            />
          </KeyboardAvoidingView>

          <Button76 text="next" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
