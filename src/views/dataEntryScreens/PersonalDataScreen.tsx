import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ViewStyle,
} from "react-native";
import { CardInputComponent } from "../../components/cards/CardInputComponent";
import { CardInputPickerComponent } from "../../components/cards/CardInputPickerComponent";
import { useAppDispatch } from "../../redux/customDispatch";
import { setUserProfileData } from "../../redux/userSlice";
import { UserInterface } from "../../models/dataModels";
import { getReduxStore } from "../../redux/getReduxStore";

type CustomProps = {
  navigation: any;
  route: any;
};

export const PersonalDataScreen = (props: CustomProps): React.JSX.Element => {
  const route = props.route;
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const store = getReduxStore();
  const dateStringified = store.dateOfBirth?.toString();
  // const height = store.height;
  const btnText = route.params?.from ? "Save" : "next";

  const [userName, setUserName] = useState<string>(store.name || "");
  const [userSurname, setUserSurname] = useState<string>(store.surname || "");
  const [userGender, setUserGender] = useState<string | null>("");
  const [userDayOfBrith, setUserDayOfBirth] = useState<string | null>(
    store.dateOfBirth
  );
  //I'll this here in case I need it in the future
  const [userHeight, setUserHeight] = useState<number | null>(store.height);
  //
  const isDisabled: boolean = !!(userName && userSurname && userDayOfBrith);
  const { navigation } = props;

  function dispatchUser() {
    //Below is the real evaluation
    // if (!store.userId || !store.email) {
    //   throw new Error("Faltan datos obligatorios del usuario.");
    // }

    const objectDataPrfile: UserInterface = {
      userId: "123123123123123123123123123123123123",
      email: "damiangussi@gmail.com",
      name: userName,
      surname: userSurname,
      gender: userGender,
      dateOfBirth: userDayOfBrith,
      height: userHeight,
    };
    dispatch(setUserProfileData(objectDataPrfile));
  }

  function performButtonAction() {
    dispatchUser();
    if (route.params?.from) {
      navigation.goBack();
      return;
    }
    navigation.navigate("StyleData");
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      //   width: theme.standarWidth,
      //   paddingBottom: 50,
    },
    container2: {
      flex: 1,
      //   backgroundColor: "blue",
      alignItems: "flex-start",
      gap: 15,
    },

    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
  });

  return (
    <SafeAreaView
      //
      // onPress={Keyboard.dismiss}
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
      {route.params?.from ? <TopBar navigation={navigation} text="" /> : null}
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
        <CardInputComponent
          title="name"
          z={Platform.OS === "ios" ? 0 : 10}
          multiline={false}
          action={(e: string) => setUserName(e)}
          placeholder="Required"
          value={store.name}
        />
        <CardInputComponent
          title="last name"
          z={Platform.OS === "ios" ? 0 : 10}
          placeholder="Required"
          multiline={false}
          action={(e: string) => setUserSurname(e)}
          value={store.surname}
        />
        <CardInputPickerComponent
          placeholder="Required"
          title="Date of birth"
          // customWidth={150}
          z={Platform.OS === "ios" ? 0 : 8}
          multiline={false}
          action={(date: string) => setUserDayOfBirth(date)}
          valueDate={dateStringified}
        />
        <CardInputComponent
          placeholder="Not required"
          // isEditable={true}
          title="gender"
          //   customWidth={100}
          z={Platform.OS === "ios" ? 0 : 9}
          multiline={false}
          action={(e: string) => setUserGender(e)}
          value={store.gender}
        />
        <Button76
          action={performButtonAction}
          text={btnText}
          disabled={isDisabled}
        />
      </View>
    </SafeAreaView>
  );
};
