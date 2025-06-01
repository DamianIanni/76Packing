import React, { useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  Image,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { ThemeManager } from "../classes/ThemeManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReduxStoreUser } from "../redux/getReduxStore";
import { useAppDispatch } from "../redux/customDispatch";
import {
  setAllData,
  setUserProfileData,
  setUserProfilePhotoUrl,
} from "../redux/userSlice";
import {
  getAllUserDataFromServer,
  getUserIdFromServer,
} from "../api/apiServices/queryServices";
import { checkUUID } from "../utils/checkUUID";

interface CustomProps {
  navigation: any;
}

const SplashScreen = (props: CustomProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const opacity = useRef(new Animated.Value(1)).current;
  const { navigation } = props;

  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    circle: {
      width: "100%",
      height: "50%",
      borderRadius: 700,
      position: "absolute",
      justifyContent: "center",
      zIndex: 4,
      backgroundColor: theme.colors.background,
    },
    logo: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
      zIndex: 5,
    },
    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.tallStripeStyle.stripe1 as ViewStyle,
    stripe2: theme.tallStripeStyle.stripe2 as ViewStyle,
    stripe3: theme.tallStripeStyle.stripe3 as ViewStyle,
  });

  async function getItemFromAsyncStorage(): Promise<string | null> {
    return await AsyncStorage.getItem("userIdInStorage");
  }

  async function saveAllDataInReduxStore(email: string | null, photo: string) {
    if (!email) return;
    const userId = await getUserIdFromServer(email);
    const allData = await getAllUserDataFromServer(userId.getUserId.data);
    dispatch(setAllData({ ...allData.getAllUserData.data, photoUrl: photo }));
  }

  useEffect(() => {
    let isMounted = true;
    let timeoutHandler: NodeJS.Timeout;

    const navigateWithDelay = (route: string) => {
      // Esperar al menos 2 segundos antes de navegar
      timeoutHandler = setTimeout(() => {
        if (!isMounted) return;

        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: route }],
          });
        });
      }, 2000);
    };

    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      const userIdInStorage = await getItemFromAsyncStorage();
      let initialRoute: string;

      if (!user) {
        initialRoute = "LoginScreen";
      } else if (!checkUUID(userIdInStorage!)) {
        initialRoute = "PersonalData";
      } else {
        initialRoute = "MainTabs";
        await saveAllDataInReduxStore(user.email, user.photoURL ?? "");
      }

      navigateWithDelay(initialRoute);
    });

    // Timeout máximo de seguridad por si algo sale mal (30s)
    const fallbackTimeout = setTimeout(() => {
      if (isMounted) {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    }, 30000);

    return () => {
      isMounted = false;
      unsubscribe();
      clearTimeout(timeoutHandler);
      clearTimeout(fallbackTimeout);
    };
  }, [navigation]);

  return (
    <>
      <StatusBar hidden />
      <Animated.View style={[styles.mainView, { opacity }]}>
        <Animated.View style={styles.circle}>
          <Animated.Image
            source={require("../assets/logos/76_logo.png")}
            style={styles.logo}
          />
        </Animated.View>
        <Animated.View style={styles.stripeContainer}>
          <Animated.View style={styles.stripe1}></Animated.View>
          <Animated.View style={styles.stripe2}></Animated.View>
          <Animated.View style={styles.stripe3}></Animated.View>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default SplashScreen;
