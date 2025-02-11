import React from "react";
import { ThemeManager } from "../classes/ThemeManager";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";

const HomeScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={theme.colors.background}>
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.colors.background}
      >
        <Text
          style={{
            fontSize: theme.fontSizes.xLarge,
          }}
        >
          Home Screen
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
