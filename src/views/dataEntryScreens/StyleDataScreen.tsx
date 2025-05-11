import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";
import { useAppDispatch } from "../../redux/customDispatch";
import { getReduxStoreUser } from "../../redux/getReduxStore";
import { setUserStyleData } from "../../redux/userSlice";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { CardInputComponent } from "../../components/cards/CardInputComponent";
import { insertUserStyle } from "../../api/apiServices/mutationServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CustomProps = {
  navigation: any;
  route: any;
};

export const StyleDataScreen = (props: CustomProps): React.JSX.Element => {
  const theme = new ThemeManager();
  const store = getReduxStoreUser();
  const { navigation, route } = props;
  const btnText = route.params?.from ? "Save" : "next";
  const dispatch = useAppDispatch();
  const [userStyle, setUserStyle] = useState<string>(store.style || "");
  const [userBrands, setUserBrands] = useState<string>(store.brands || "");

  async function dispatchUser() {
    //Below is the real evaluation
    // if (!store.userId || !store.email) {
    //   throw new Error("Faltan datos obligatorios del usuario.");
    // }
    const uuid = await AsyncStorage.getItem("userIdInStorage");
    const objectDataStyle = {
      style: userStyle,
      brands: userBrands,
    };
    dispatch(setUserStyleData(objectDataStyle));
    if (userStyle === "" || userBrands === "") return;
    await insertUserStyle({ ...objectDataStyle, userId: uuid! });
  }

  function performButtonAction() {
    dispatchUser();
    if (route.params?.from) {
      navigation.goBack();
      return;
    }
    navigation.navigate("MainTabs");
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    container2: {
      flex: 1,
      alignItems: "flex-start",
      gap: 15,
    },

    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          // backgroundColor={theme.colors.background}
          backgroundColor={"transparent"}
        />
        <TopBar navigation={navigation} text="" />
        <View
          style={[
            style.stripeContainer,
            { marginLeft: theme.standarWidth / 1.8 },
          ]}
        >
          <View style={[style.stripe1]}></View>
          <View style={[style.stripe2]}></View>
          <View style={[style.stripe3]}></View>
        </View>
        <View style={style.container2}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title="brands"
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={true}
              action={(e: string) => setUserBrands(e)}
              placeholder="Not required"
              value={store.brands}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title="Style"
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={true}
              action={(e: string) => setUserStyle(e)}
              placeholder="Not required"
              value={store.style}
            />
          </KeyboardAvoidingView>

          <Button76
            action={performButtonAction}
            text={btnText}
            disabled={true}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
