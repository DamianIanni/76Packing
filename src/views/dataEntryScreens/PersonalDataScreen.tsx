import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
// import { Title } from "../components/texts/Title";
// import { ContentText } from "../components/texts/ContentText";
// import { BigTitle } from "../components/texts/BigTitle";
import { Button76 } from "../../components/button/Button76";
// import { AddButton } from "../components/button/AddButton";
// import { CardComponent } from "../components/cards/CardComponent";
import TopBar from "../../components/topBars/TopBar";

import {
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  // useColorScheme,
  View,
  Platform,
  ViewStyle,
  // TouchableWithoutFeedback,
  // Keyboard,
  // TouchableOpacity,
} from "react-native";
// import TopProfileBar from "../../components/topBars/TopProfileBar";
// import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../../components/cards/CardInputComponent";
import { CardInputPickerComponent } from "../../components/cards/CardInputPickerComponent";
import { useAppDispatch } from "../../redux/customDispatch";
import { setUserProfileData } from "../../redux/userSlice";
import { UserInterface } from "../../models/dataModels";
import { getReduxStore } from "../../redux/getReduxStore";

type CustomProps = {
  navigation: any;
};

export const PersonalDataScreen = (props: CustomProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const store = getReduxStore();
  const dateStringified = store.dateOfBirth?.toString();
  const height = store.height
    ? `${store.height}cm (${cmToFeet(store.height)})`
    : null;

  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [userGender, setUserGender] = useState<string | null>("");
  const [userDayOfBrith, setUserDayOfBirth] = useState<string | null>(
    store.dateOfBirth
  );
  const [userHeight, setUserHeight] = useState<number | null>(store.height);
  const isDisabled: boolean = !!(userName && userSurname && userDayOfBrith);
  const { navigation } = props;

  function cmToFeet(value: number) {
    var realFeet = (value * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + inches;
  }

  function dispatchUser() {
    //t=Below is the real evaluation
    // if (!store.userId || !store.email) {
    //   throw new Error("Faltan datos obligatorios del usuario.");
    // }

    const objectDatapofile: UserInterface = {
      userId: "123123123123123123123123123123123123",
      email: "damiangussi@gmail.com",
      name: userName,
      surname: userSurname,
      gender: userGender,
      dateOfBirth: userDayOfBrith,
      height: userHeight,
    };
    dispatch(setUserProfileData(objectDatapofile));
  }

  function goToStyleDataScreen() {
    dispatchUser();
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
        <CardInputComponent
          title="name"
          z={Platform.OS === "ios" ? 0 : 10}
          multiline={false}
          action={(e: string) => setUserName(e)}
          // isEditable={true}
          placeholder="Required"
          value={store.name}
        />
        <CardInputComponent
          title="last name"
          z={Platform.OS === "ios" ? 0 : 10}
          placeholder="Required"
          multiline={false}
          // isEditable={true}
          action={(e: string) => setUserSurname(e)}
          value={store.surname}
        />
        <CardInputPickerComponent
          placeholder="Required"
          title="Date of birth"
          // customWidth={150}
          isDate={true}
          z={Platform.OS === "ios" ? 0 : 8}
          multiline={false}
          action={(date: string | number) =>
            setUserDayOfBirth(typeof date === "string" ? date : null)
          }
          value={dateStringified}
        />
        <CardInputPickerComponent
          placeholder="Not required"
          title="height"
          // customWidth={100}
          z={Platform.OS === "ios" ? 0 : 8}
          multiline={false}
          isDate={false}
          action={(e: number | string) =>
            setUserHeight(typeof e === "number" ? e : null)
          }
          value={height}
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
          action={goToStyleDataScreen}
          text="next"
          disabled={isDisabled}
        />
      </View>
    </SafeAreaView>
  );
};
