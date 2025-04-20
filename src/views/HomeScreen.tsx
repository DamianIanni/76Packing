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
  Button,
} from "react-native";
import TopProfileBar from "../components/topBars/TopProfileBar";
import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../components/cards/CardInputComponent";

import { useDispatch } from "react-redux";

import { signInWithGoogle } from "../utils/signIn";

const HomeScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
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
      <TopProfileBar text="Damian" />

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
        <Button
          title="iniciar sesion google"
          onPress={() => signInWithGoogle(dispatch)}
        />
        {/* <Button
          title="iniciar sesion facebook"
          onPress={() => signInWithGoogle(dispatch)}
        />
        <Button title="iniciar sesion X" onPress={() => signInWithGoogle(dispatch)} />
        {Platform.OS === "ios" && (
          <Button
            title="iniciar sesion Apple"
            onPress={() => signInWithGoogle(dispatch)}
          />
        )} */}
        {/* <Title>where to?</Title>
        <ContentText>Place, city or country</ContentText>
        <BigTitle>SPAIN</BigTitle>
        <Button76 text="next" />
        <AddButton text="+" />
        <CardComponent />
        <TopBar text="malaga" />
        <CardListComponent title="carry on" />
        <CardInputComponent title="55l backpack" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
