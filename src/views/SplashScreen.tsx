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

interface CustomProps {
  navigation: any;
}

const SplashScreen = (props: CustomProps): React.JSX.Element => {
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

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log("USER DESDE AUTH", user);

      if (user) {
        // Usuario autenticado
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        // No autenticado
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    });

    return unsubscribe; // Limpiamos el listener al salir
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
