import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  PixelRatio,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ViewStyle,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";

type keyboards = "default" | "numeric" | undefined;

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

interface customProps {
  title: string;
  customWidth?: number;
  z?: number | undefined;
  multiline?: boolean;
  innerPad?: number;
  placeholder?: string;
  action: (e: string) => void;
  value?: string | null;
  keyboardType?: keyboards;
  // isEditable: boolean;
}

export const CardInputComponent: React.FC<customProps> = ({
  title,
  customWidth,
  z,
  innerPad,
  multiline,
  placeholder,
  action,
  value,
  keyboardType,
  // isEditable,
}) => {
  const [stateValue, setStateValue] = useState<string>(value || "");
  customWidth = customWidth ? customWidth : 0;
  z = z ? z : undefined;
  const theme = new ThemeManager();
  const styles = StyleSheet.create({
    principalContainer: {
      alignItems: "flex-start",
      elevation: z,
      zIndex: Platform.OS === "android" ? undefined : z,
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth - customWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: Platform.OS === "ios" ? 10 : 2,
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
      paddingRight: innerPad ? innerPad : 0,
    },
  });

  const handleAction = (data: string): void => {
    setStateValue(data);
    action(data);
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.principalContainer}>
      <Title>{title}</Title>
      <View style={styles.mainCointainer}>
        <TextInput
          // placeholderTextColor={"#2A2A2D"}
          maxLength={36}
          style={styles.input}
          placeholder={placeholder ? placeholder : "the lakes"}
          multiline={multiline}
          keyboardType={keyboardType ? keyboardType : "default"}
          value={stateValue}
          onChangeText={(text) => handleAction(text)}
          // editable={isEditable}
        />
      </View>
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
