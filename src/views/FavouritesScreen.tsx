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
  FlatList,
  Platform,
} from "react-native";
import TopProfileBar from "../components/topBars/TopProfileBar";
import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../components/cards/CardInputComponent";

export const FavouriteScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      width: "100%",
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70,
      alignItems: "center",
      width: "100%",
      //   backgroundColor: "red",
      gap: 15, // No funciona en FlatList, por eso lo manejamos en renderItem
    },
    itemContainer: {
      width: "100%",
      marginBottom: 10, // Espacio entre los elementos
    },
  });

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
        backgroundColor={"transparent"}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{ width: "100%" }}
        contentContainerStyle={style.listContainer}
        renderItem={({ item }) => (
          <View style={style.itemContainer}>
            <CardComponent key={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};
