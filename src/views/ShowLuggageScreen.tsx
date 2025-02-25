import React from "react";
import { ThemeManager } from "../classes/ThemeManager";
import { Title } from "../components/texts/Title";
import { ContentText } from "../components/texts/ContentText";
import { BigTitle } from "../components/texts/BigTitle";
import { Button76 } from "../components/button/Button76";
import { AddButton } from "../components/button/AddButton";
import { CardComponent } from "../components/cards/CardComponent";
import TopBar from "../components/topBars/TopBar";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from "react-native";
import TopProfileBar from "../components/topBars/TopProfileBar";
import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../components/cards/CardInputComponent";

export const ShowLuggageScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
  const style = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  });

  return (
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
        backgroundColor={theme.colors.background}
      />
      <TopBar text="spain" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          alignItems: "center",
          paddingBottom: Platform.OS === "android" ? 80 : 60,
        }}
        style={{
          width: "100%",
        }}
      >
        <CardListComponent title="carry on" />
      </ScrollView>
    </SafeAreaView>
  );
};
