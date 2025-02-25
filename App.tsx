import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/views/HomeScreen";
import SettingScreen from "./src/views/SettingScreen";
import SplashScreen from "./src/views/SplashScreen";
import { ThemeManager } from "./src/classes/ThemeManager";
import { BlurView } from "@react-native-community/blur";
import { PersonalDataScreen } from "./src/views/dataEntryScreens/PersonalDataScreen";
import { StyleDataScreen } from "./src/views/dataEntryScreens/StyleDataScreen";
import { TravelDataScreen } from "./src/views/dataEntryScreens/TravelDataScreen";
import { LuggageDataScreen } from "./src/views/dataEntryScreens/LuggageDataScreen";
import { ShowLuggageScreen } from "./src/views/ShowLuggageScreen";
import { PackingLoadingScreen } from "./src/views/PackingLoadingScreen";
import { FavouriteScreen } from "./src/views/FavouritesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons: Record<string, ImageSourcePropType> = {
  sett: require("./src/assets/icons/settings.png"),
  fav: require("./src/assets/icons/bookmark.png"),
  default: require("./src/assets/icons/luggage.png"),
};

const ComponentIcon = ({ tintColor, icon }) => {
  return (
    <Image
      source={icons[icon] || icons.default}
      style={{ width: 24, height: 24, tintColor }}
    />
  );
};

export default function App(): React.JSX.Element {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const theme = new ThemeManager();

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            backgroundColor:
              Platform.OS === "ios" ? "transparent" : theme.colors.background, // Transparente
            borderTopWidth: 0,
            elevation: 8,
            bottom: Platform.OS === "android" ? 5 : 0,
          },
          // tabBarLabelStyle: {
          //   fontFamily: "Afacad-bold",
          //   fontSize: Platform.OS === "android" ? 12 : 16,
          // },
          tabBarActiveTintColor: "#1AA6B7",
          headerShown: false,
          tabBarBackground: () =>
            Platform.OS === "ios" ? (
              <BlurView
                blurAmount={15}
                blurType={theme.themeMode ? "dark" : "light"}
                style={{
                  width: "100%",
                  height: 90,
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 90,
                  backgroundColor: theme.colors.background,
                }}
              />
            ),
        }}
      >
        <Tab.Screen
          name="Favourites"
          component={FavouriteScreen}
          options={{
            title: "Favourites",
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  letterSpacing: 2,
                  fontFamily: "Afacad-SemiBold",
                  fontSize: Platform.OS === "android" ? 14 : 16,
                  color,
                }}
              >
                Favourites
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <ComponentIcon tintColor={color} icon={"fav"} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  letterSpacing: 2,
                  fontFamily: "Afacad-SemiBold",
                  fontSize: Platform.OS === "android" ? 14 : 16,
                  color,
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <ComponentIcon tintColor={color} icon={""} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            title: "Settings",
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  letterSpacing: 2,
                  fontFamily: "Afacad-SemiBold",
                  fontSize: Platform.OS === "android" ? 14 : 16,
                  color,
                }}
              >
                Settings
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <ComponentIcon tintColor={color} icon={"sett"} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {/* <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        > */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MyTabs} />
          </Stack.Navigator>
          {/* </SafeAreaView> */}
        </NavigationContainer>
      )}
      {/* <PersonalDataScreen /> */}
      {/* <StyleDataScreen /> */}
      {/* <TravelDataScreen /> */}
      {/* <LuggageDataScreen /> */}
      {/* <HomeScreen /> */}
      {/* <ShowLuggageScreen /> */}
      {/* <PackingLoadingScreen /> */}
      {/* <SplashScreen /> */}
    </>
  );
}
