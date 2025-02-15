import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { CardTitle } from "../texts/CardTitle";
import { ContentText } from "../texts/ContentText";

interface CustomProps {
  //   text: string;
}

export const CardComponent: React.FC<CustomProps> = ({}) => {
  const theme = new ThemeManager();
  const { width } = useWindowDimensions();

  const content = ["14 days", "Items 6/14", "Luggage done"];

  const styles = StyleSheet.create({
    mainContainer: {
      //   backgroundColor: "white",
      borderRadius: 10,
      //   alignContent: "center",
      //   justifyContent: "center",
      height: 150,
      width: width - 40,
      backgroundColor: theme.colors.backgroundCard,
      elevation: 8,
      shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
      shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
      shadowOpacity: 0.4,
      shadowRadius: 12, // Difuminado de la sombra
    },
    secondContainer: {
      backgroundColor: theme.themeMode
        ? theme.colors.stripe3
        : theme.colors.stripe1,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      height: "30%",
      width: "100%",
    },
    thirdContainer: {
      //   backgroundColor: theme.colors.stripe3,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      height: "70%",
      width: "100%",
      paddingLeft: 20,
      gap: 4,
    },
  });

  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <CardTitle>spain</CardTitle>
      </View>
      <View style={styles.thirdContainer}>
        {content.map((e, i) => {
          return <ContentText key={i}>{e}</ContentText>;
        })}
      </View>
    </TouchableOpacity>
  );
};
