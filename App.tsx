import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/views/HomeScreen";
import SettingScreen from "./src/views/SettingScreen";
import SplashScreen from "./src/views/SplashScreen";
import { ThemeManager } from "./src/classes/ThemeManager";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons: Record<string, ImageSourcePropType> = {
  sett: require("./src/assets/icons/settings.png"),
  fav: require("./src/assets/icons/star.png"),
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
    // Hacer que la barra de estado y la barra de navegación siempre sean transparentes
    StatusBar.setBarStyle("dark-content"); // O "light-content" dependiendo del fondo
    StatusBar.setBackgroundColor("transparent", true); // Hace que el fondo sea transparente
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0)", // Transparente
            borderTopWidth: 0,
            elevation: 0,
            bottom: Platform.OS === "android" ? 10 : 5,
          },
          // tabBarLabelStyle: {
          //   fontFamily: "Afacad-bold",
          //   fontSize: Platform.OS === "android" ? 12 : 16,
          // },
          tabBarActiveTintColor: "#1AA6B7",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Favourites"
          component={SettingScreen}
          options={{
            title: "Favourites",
            tabBarLabel: ({ color }) => (
              <Text
                style={{
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
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTabs" component={MyTabs} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      )}
    </>
  );
}
