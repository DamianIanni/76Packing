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
  Pressable,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  action: (e: Date | number) => void;
  value?: string | null;
  isDate: boolean;
}

export const CardInputPickerComponent: React.FC<customProps> = ({
  title,
  customWidth,
  z,
  innerPad,
  multiline,
  placeholder,
  action,
  value,
  isDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showHeigthPicker, setShowHeigthPicker] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [userHeight, setUserHeight] = useState<number>();
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

  function whichValueToShow(): string | undefined {
    return isDate ? dateOfBirth?.toDateString() : userHeight?.toString();
  }

  const handleActionHeight = (data: number): void => {
    setUserHeight(data);
    action(data);
  };

  const handleActionDOB = (data: Date): void => {
    setDateOfBirth(data);
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
      <Pressable
        onPress={() =>
          isDate ? setShowDatePicker(true) : setShowHeigthPicker(true)
        }
      >
        <View style={styles.mainCointainer}>
          <TextInput
            // placeholderTextColor={"#2A2A2D"}
            style={styles.input}
            placeholder={placeholder ? placeholder : "the lakes"}
            multiline={multiline}
            pointerEvents="none"
            keyboardType="default"
            value={value ? value : whichValueToShow()}
            editable={false}
          />
        </View>
      </Pressable>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        maximumDate={new Date()} // No permitir fechas futuras
        onConfirm={handleActionDOB}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
