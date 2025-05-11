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
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";
import { heightGenerator } from "../../utils/heightGenerators";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

const heightsGenerated = heightGenerator();

interface customProps {
  title: string;
  customWidth?: number;
  z?: number | undefined;
  multiline?: boolean;
  innerPad?: number;
  placeholder?: string;
  action: (e: Date) => void;
  valueDate: string | null | undefined;
}

export const CardInputPickerComponent: React.FC<customProps> = ({
  title,
  customWidth,
  z,
  innerPad,
  multiline,
  placeholder,
  action,
  valueDate,
}) => {
  // const initialSelectedIndex = valueHeight !== null ? heightsGenerated.findIndex(option => option.value === valueHeight) : 0;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  // const [selectedIndex, setSelectedIndex] = useState<number>(
  //   valueHeigth !== null
  //     ? heightsGenerated.findIndex((option) => option.value === valueHeigth)
  //     : 0
  // );
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    (valueDate && new Date(valueDate).toDateString()) || ""
  );
  // const [userHeight, setUserHeight] = useState<string>();
  customWidth = customWidth ? customWidth : 0;
  z = z ? z : undefined;
  const dateToString = valueDate && new Date(valueDate).toDateString();
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
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    pickerContainer: {
      backgroundColor: "#fff",
      paddingBottom: 30,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    button: {
      marginTop: 20,
      alignSelf: "center",
    },
    buttonText: {
      color: "blue",
      fontSize: 16,
    },
  });

  // function whichValueToShow(): string | undefined {
  //   if (valueDate !== null && isDate) {
  //     return valueDate;
  //   }
  //   // if (valueHeigth !== null && !isDate) {
  //   //   return heightsGenerated.find((item) => item.value === valueHeigth)!.label;
  //   // }
  //   return isDate ? dateOfBirth : userHeight;
  // }

  // const handleActionHeight = (data: {
  //   index: number;
  //   item: ItemType;
  // }): void => {
  //   setShowHeigthPicker(false);
  //   setSelectedIndex(data.index);
  //   setUserHeight(data.item.label);
  //   action(data.item.value);
  // };

  const handleActionDOB = (data: Date): void => {
    setShowDatePicker(false);
    setDateOfBirth(data.toDateString());
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
      <Pressable onPress={() => setShowDatePicker(true)}>
        <View style={styles.mainCointainer}>
          <TextInput
            // placeholderTextColor={"#2A2A2D"}
            style={styles.input}
            placeholder={placeholder ? placeholder : "the lakes"}
            multiline={multiline}
            pointerEvents="none"
            keyboardType="default"
            value={dateOfBirth}
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

      {/* <Modal visible={showHeigthPicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}> */}
      {/* <WheelPickerExpo
        height={300}
        width={150}
        initialSelectedIndex={selectedIndex}
        items={heightsGenerated}
        onChange={(item) => handleActionHeight(item)}
      /> */}
      {/* <TouchableOpacity
              onPress={() => setShowHeigthPicker(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};
