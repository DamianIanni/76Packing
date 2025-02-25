import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";

const data = [
  {
    status: false,
    txt: "2 T-shirts",
  },
  {
    status: false,
    txt: "2 Jackets",
  },
  {
    status: true,
    txt: "4 Jeans",
  },
  {
    status: true,
    txt: "7 Boxers",
  },
  {
    status: false,
    txt: "1 Scarf",
  },
];

interface customProps {
  title: string;
}

export const CardListComponent: React.FC<customProps> = ({ title }) => {
  const theme = new ThemeManager();
  const styles = StyleSheet.create({
    principalContainer: {
      alignItems: "flex-start",
    },
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      //   gap: 40,
      padding: 10,
      //   paddingTop: 5,
    },
    divider: {
      borderColor: theme.colors.divider,
      borderWidth: 0.5,
      borderStyle: "solid",
      width: theme.standarWidth - 40,
      marginVertical: 5,
      borderRadius: 5,
    },
    elementListContainer: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      //   height: 20,
      justifyContent: "center",
      //   alignItems: "flex-start",
      //   backgroundColor: "red",
      //   marginTop: 5,
    },
    txtContainer: {
      //   position: "absolute",
      left: 30,
    },
    checkIconContainer: {
      position: "absolute",
      left: 0,
    },
    deleteIconContainer: {
      position: "absolute",
      right: 0,
    },
    iconChecked: {
      height: 24,
      width: 24,
      tintColor: theme.colors.checkIcon,
      // backgroundColor: "white",
    },
    iconNonChecked: {
      height: 24,
      width: 24,
      tintColor: theme.colors.nonCheckIcon,
    },
  });

  const Divider = () => <View style={styles.divider}></View>;

  interface iconProps {
    isChecked: boolean;
  }

  const CheckedComponent: React.FC<iconProps> = ({ isChecked }) => {
    return (
      <TouchableOpacity style={styles.checkIconContainer}>
        {isChecked ? (
          <Image
            source={require("../../assets/icons/checked.png")}
            style={styles.iconChecked}
          />
        ) : (
          <Image
            source={require("../../assets/icons/check_blank.png")}
            style={styles.iconNonChecked}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.principalContainer}>
      <Title style={{ left: 10 }}>{title}</Title>
      <View style={styles.mainCointainer}>
        {data.map((e, i) => {
          return (
            <React.Fragment key={i + 2}>
              <View key={i} style={styles.elementListContainer}>
                <CheckedComponent isChecked={e.status} />
                <View style={styles.txtContainer}>
                  <ContentText>{e.txt}</ContentText>
                </View>
                <TouchableOpacity style={styles.deleteIconContainer}>
                  <Image
                    source={require("../../assets/icons/delete.png")}
                    style={styles.iconNonChecked}
                  />
                </TouchableOpacity>
              </View>
              {i !== data.length - 1 && <Divider key={i + 1} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};
