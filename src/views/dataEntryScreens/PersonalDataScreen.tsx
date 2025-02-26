import React from "react";
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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import TopProfileBar from "../../components/topBars/TopProfileBar";
// import { CardListComponent } from "../components/cards/CardListComponent";
import { CardInputComponent } from "../../components/cards/CardInputComponent";

type CustomProps = {
  navigation: any;
};

export const PersonalDataScreen = (props: CustomProps): React.JSX.Element => {
  const theme = new ThemeManager();

  const { navigation } = props;

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
          title="Date of birth"
          // customWidth={150}
          z={Platform.OS === "ios" ? 0 : 8}
          multiline={false}
        />
        <CardInputComponent
          title="height"
          // customWidth={100}
          z={Platform.OS === "ios" ? 0 : 8}
          multiline={false}
        />
        <CardInputComponent
          title="gender"
          //   customWidth={100}
          z={Platform.OS === "ios" ? 0 : 9}
          multiline={false}
        />
        <CardInputComponent
          title="name"
          z={Platform.OS === "ios" ? 0 : 10}
          multiline={false}
        />
        <CardInputComponent
          title="last name"
          z={Platform.OS === "ios" ? 0 : 10}
          multiline={false}
        />
        <Button76 text="next" />
      </View>
    </SafeAreaView>
  );
};
