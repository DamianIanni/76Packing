/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeManager } from "./classes/ThemeManager";
import type { StaticParamList } from "@react-navigation/native";
import { FontProvider } from "./context";
import HomeScreen from "./views/HomeScreen";
import SettingScreen from "./views/SettingScreen";
import SplashScreen from "./views/SplashScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MyTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerStyle: { backgroundColor: "transparent" },
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Overview",
      },
    },
    Settings: SettingScreen,
  },
});

type RootStackParamList = StaticParamList<typeof MyTabs>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

function App(): React.JSX.Element {
  const theme = new ThemeManager();

  const Navigation = createStaticNavigation(MyTabs);
  // <Navigation />
  return (
    <FontProvider>
      {/* <Navigation /> */}
      <SplashScreen />;
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
