import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { ThemeManager } from "../../classes/ThemeManager";
import { AddButton } from "../button/AddButton";
import { NameText } from "../texts/NameText";
import { getReduxStoreUser } from "../../redux/getReduxStore";

interface CustomProps {
  navigation: any;
}

const TopProfileBar: React.FC<CustomProps> = ({ navigation }) => {
  // const theme = new ThemeManager();
  const store = getReduxStoreUser();

  function startProccess() {
    console.log("USER EN TOP PROFILE BAR", store);
    navigation.navigate("TravelData");
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: store.photoUrl ? store.photoUrl : "" }}
          style={styles.icon}
        />
      </View>
      <NameText style={styles.title}>{store.name}</NameText>
      <TouchableOpacity
        style={styles.addButtoncontainer}
        onPress={startProccess}
      >
        <AddButton text="+" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    //   backgroundColor: "white",
    paddingHorizontal: 10,
    width: "100%",
    // width: theme.standarWidth,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    // elevation: 8,
    // backgroundColor: theme.colors.background,
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
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  addButtoncontainer: {
    position: "absolute",
    right: 10,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
    borderRadius: 50,
    // elevation: 8,
    // shadowColor: "rgba(0, 0, 0, 0.4)", // Color de sombra (semi-transparente)
    // shadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
    // shadowOpacity: 0.4,
    // shadowRadius: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "Afacad-Medium",
    letterSpacing: 6,
    marginLeft: 55,
    maxWidth: "75%",
    // backgroundColor: "red",
  },
});

export default TopProfileBar;
