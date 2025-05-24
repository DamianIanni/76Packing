import React, { useState } from "react";
import { ThemeManager } from "../classes/ThemeManager";
import TopBar from "../components/topBars/TopBar";

import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import { CardListComponent } from "../components/cards/CardListComponent";
import { useLocale } from "../i18n/TranslationContext";

type CustomProps = {
  navigation: any;
};

export const ShowLuggageScreen = (props: CustomProps): React.JSX.Element => {
  const { t } = useLocale();
  const { navigation } = props;
  const theme = new ThemeManager();
  const [dataReceived, setDataReceived] = useState();
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

  function onSaving() {
    // console.log("DATA RECIBIDIA DEL HIJO", dataReceived);
  }

  function saving(data: any) {
    console.log("DATA RECIBIDIA DEL HIJO", data);
  }

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
      <TopBar navigation={navigation} text="spain" onSaving={onSaving} />
      <CardListComponent saving={saving} />
    </SafeAreaView>
  );
};
