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
import { LoginScreen } from "./src/views/LoginScreen";
import { ActivitiesDataScreen } from "./src/views/dataEntryScreens/ActivitiesDataScreen";
import { AccommodationDataScreen } from "./src/views/dataEntryScreens/AccommodationDataScreen";
import { TranslationProvider } from "./src/i18n/TranslationContext";
import { RegisterScreen } from "./src/views/signInScreens/RegisterScreen";
import { ResetPassword } from "./src/views/signInScreens/ResetPassword";

import firebase from "@react-native-firebase/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "TU_WEB_CLIENT_ID_DE_FIREBASE",
  offlineAccess: true,
});

import store from "./src/redux/store";
import { Provider } from "react-redux";
import { useLocale } from "./src/i18n/TranslationContext";

const os = Platform.OS;
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "TU_AUTH_DOMAIN",
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.PROJECT_ID,
  appId: os === "android" ? process.env.ANDROID_APP_ID : process.env.IOS_APP_ID,
  measurementId: process.env.MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

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

function MyTabs() {
  const theme = new ThemeManager();
  const { t } = useLocale();
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
              {t("favScreen")}
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
              {t("homeScreen")}
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
              {t("settings")}
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

export default function App(): React.JSX.Element {
  const { t } = useLocale();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TranslationProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MyTabs} />
            <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
            <Stack.Screen name="StyleData" component={StyleDataScreen} />
            <Stack.Screen name="TravelData" component={TravelDataScreen} />
            <Stack.Screen name="LuggageData" component={LuggageDataScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPassword}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ActivitiesScreen"
              component={ActivitiesDataScreen}
            />
            <Stack.Screen
              name="AccommodationScreen"
              component={AccommodationDataScreen}
            />
            <Stack.Screen name="ShowLuggage" component={ShowLuggageScreen} />
            <Stack.Screen
              name="PackingLoading"
              component={PackingLoadingScreen}
              options={{
                gestureEnabled: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </TranslationProvider>
  );
}
