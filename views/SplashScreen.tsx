import React from "react";
import { ThemeManager } from "../classes/ThemeManager";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";

const SplashScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();

  const style = StyleSheet.create({
    container76: {
      justifyContent: "center",
      alignContent: "center",
    },
    mainView: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: theme.colors.background,
    },
    stripeContainer: theme.stripStyleContainer,
    stripe1: theme.stripeStyle.stripe1,
    stripe2: theme.stripeStyle.stripe2,
    stripe3: theme.stripeStyle.stripe3,
    circle: {
      display: "flex",
      width: "100%",
      height: "50%",
      borderRadius: 700,
      zIndex: 1,
      position: "absolute",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    logo: {
      height: "100%",
      width: "100%",
      zIndex: 5,
      resizeMode: "contain" as "contain",
    },
  });

  return (
    <>
      <StatusBar hidden={true} />
      <View style={style.mainView}>
        <View style={style.circle}>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Image
              source={require("../assets/logos/76_logo.png")}
              style={style.logo}
            />
          </View>
        </View>
        <View style={style.stripeContainer}>
          <View style={style.stripe1}></View>
          <View style={style.stripe2}></View>
          <View style={style.stripe3}></View>
        </View>
        {/* <View style={style.container76}></View> */}
      </View>
    </>
  );
};

export default SplashScreen;
