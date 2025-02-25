import React from "react";
import { ThemeManager } from "../classes/ThemeManager";
import { ContentText } from "../components/texts/ContentText";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { CardInputComponent } from "../components/cards/CardInputComponent";
import { NameText } from "../components/texts/NameText";

const SettingScreen = (): React.JSX.Element => {
  const theme = new ThemeManager();

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    principalContainer: {
      alignItems: "flex-start",
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      //   gap: 40,
      padding: 10,
      //   paddingTop: 5,
    },
    mainPhotoCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      height: 130,
      //   gap: 40,
      padding: 10,
      marginTop: 10,
    },
    divider: {
      borderColor: theme.colors.divider,
      borderWidth: 0.5,
      borderStyle: "solid",
      width: theme.standarWidth - 40,
      marginVertical: 10,
      borderRadius: 5,
    },
    elementListContainer: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      //   height: 20,
      justifyContent: "center",
      //   alignItems: "flex-start",
      //   backgroundColor: "red",
      //   marginTop: 5,
    },
    iconContainer: {
      position: "absolute",
      left: 10,
      elevation: 18,
      shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      shadowOpacity: 0.4,
      shadowRadius: 12,
      // tintColor: theme.colors.stripe3,
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    icon: {
      width: 100,
      height: 100,
      resizeMode: "cover",
      borderRadius: 50,
      // elevation: 8,
      // shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      // shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      // shadowOpacity: 0.4,
      // shadowRadius: 12,
    },
  });

  const Divider = () => <View style={styles.divider}></View>;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
          gap: 15,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <View style={styles.mainPhotoCointainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require("../assets/logos/ME.jpg")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <NameText
          style={{
            fontFamily: "Afacad-Bold",
            left: theme.standarWidth / 3,
            // backgroundColor: "red",
          }}
        >
          DAMIAN
        </NameText>
        <NameText
          style={{
            fontFamily: "Afacad-Bold",
            left: theme.standarWidth / 3,
            // backgroundColor: "red",
          }}
        >
          IANNI
        </NameText>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          alignItems: "center",
          paddingBottom: Platform.OS === "android" ? 80 : 60,
          gap: 15,
        }}
        style={{
          width: "100%",
        }}
      >
        {/* <View style={styles.principalContainer}> */}

        <View style={styles.mainCointainer}>
          <View style={styles.elementListContainer}>
            <TouchableOpacity>
              <NameText style={{ fontFamily: "Afacad-Bold" }}>PROFILE</NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity>
              <NameText style={{ fontFamily: "Afacad-Bold" }}>STYLE</NameText>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity>
              <NameText style={{ fontFamily: "Afacad-Bold" }}>
                LANGUAGE
              </NameText>
            </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
