import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";

interface CustomProps {
  text: string;
}

export const AddButton: React.FC<CustomProps> = ({ text }) => {
  const theme = new ThemeManager();

  const styles = StyleSheet.create({
    componentStyle: {
      backgroundColor: theme.colors.stripe3,
      borderRadius: 50,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      height: 40,
      width: 40,
    },
  });

  return (
    <View style={styles.componentStyle}>
      <Image
        source={require("../../assets/icons/add_icon.png")}
        style={{
          resizeMode: "contain",
          height: 40,
          width: "100%",
        }}
      />
    </View>
  );
};
