import React from "react";
import { ThemeManager } from "../classes/ThemeManager";
import { Title } from "../components/texts/Title";
import { ContentText } from "../components/texts/ContentText";
import { BigTitle } from "../components/texts/BigTitle";
import { Button76 } from "../components/button/Button76";
import { AddButton } from "../components/button/AddButton";
import { CardComponent } from "../components/cards/CardComponent";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const HomeScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
  const style = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.colors.background}
      >
      </ScrollView> */}
      <Title>where to?</Title>
      <ContentText>Place, city or country</ContentText>
      <BigTitle>SPAIN</BigTitle>
      <Button76 text="next" />
      <AddButton text="+" />
      <CardComponent />
    </SafeAreaView>
  );
};

export default HomeScreen;
