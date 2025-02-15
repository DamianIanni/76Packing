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

import { Colors } from "react-native/Libraries/NewAppScreen";

const SettingScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();
  //   const isDarkMode = useColorScheme() === "dark";

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <Text
        style={{
          fontSize: theme.fontSizes.xLarge,
        }}
      >
        Settings
      </Text>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.colors.background}
      >
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default SettingScreen;
