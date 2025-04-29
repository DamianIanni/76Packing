import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ButtonText } from "../texts/ButtonText";

interface CustomProps {
  disabled: boolean;
  text: string;
  action: () => void;
}

export const Button76: React.FC<CustomProps> = ({ text, action, disabled }) => {
  const theme = new ThemeManager();

  const styles = StyleSheet.create({
    componentStyle: {
      backgroundColor: !disabled ? "grey" : theme.colors.stripe3,
      borderRadius: 10,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      // height:
      width: theme.standarWidth,
      // marginBottom: 50,
      position: "absolute",
      bottom: 50,
    },
  });

  return (
    <TouchableOpacity
      style={styles.componentStyle}
      onPress={action}
      disabled={!disabled}
    >
      <ButtonText>{text}</ButtonText>
    </TouchableOpacity>
  );
};
