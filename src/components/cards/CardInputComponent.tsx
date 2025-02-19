import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  PixelRatio,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

interface customProps {
  title: string;
}

export const CardInputComponent: React.FC<customProps> = ({ title }) => {
  const theme = new ThemeManager();
  const styles = StyleSheet.create({
    principalContainer: {
      alignItems: "flex-start",
      flex: 1,
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      //   gap: 40,
      padding: Platform.OS === "ios" ? 10 : 0,
      //   paddingTop: 5,
    },
    input: {
      width: "100%",
      // backgroundColor: "red",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 200,
      // textAlignVertical: "center",
      // height: "auto",
      // height: 30,
    },
  });

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.principalContainer}>
      <Title style={{ left: 10 }}>{title}</Title>
      <View style={styles.mainCointainer}>
        <TextInput
          //   placeholderTextColor={"#2A2A2D"}
          style={styles.input}
          placeholder="the lakes"
          multiline={true}
          keyboardType="default"
        />
      </View>
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
