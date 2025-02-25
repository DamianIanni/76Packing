import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ButtonText } from "../texts/ButtonText";

interface CustomProps {
  text: string;
}

export const Button76: React.FC<CustomProps> = ({ text }) => {
  const theme = new ThemeManager();

  const styles = StyleSheet.create({
    componentStyle: {
      backgroundColor: theme.colors.stripe3,
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
    <TouchableOpacity style={styles.componentStyle}>
      <ButtonText>{text}</ButtonText>
    </TouchableOpacity>
  );
};
