import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { BigTitle } from "../texts/BigTitle";

interface CustomProps {
  text: string;
  navigation?: any;
  onGoingBack?: () => void;
}

const TopBar: React.FC<CustomProps> = ({ text, navigation, onGoingBack }) => {
  const theme = new ThemeManager();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      // backgroundColor: theme.colors.stripe1,
      // paddingHorizontal: 10,
      width: "100%",
      // width: theme.standarWidth,
    },
    iconContainer: {
      position: "absolute",
      left: 12,
    },
    icon: {
      width: 45,
      height: 45,
      tintColor: theme.themeMode ? "white" : theme.colors.stripe3,
    },
  });

  function goingBack() {
    if (onGoingBack) {
      onGoingBack();
      return;
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => goingBack()}
        style={styles.iconContainer}
      >
        <Image
          source={require("../../assets/icons/back_arrow.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <BigTitle>{text}</BigTitle>
    </View>
  );
};

export default TopBar;
