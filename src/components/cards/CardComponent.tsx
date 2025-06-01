import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Alert,
  Animated,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { CardTitle } from "../texts/CardTitle";
import { ContentText } from "../texts/ContentText";
import { useLocale } from "../../i18n/TranslationContext";
import { useAppDispatch } from "../../redux/customDispatch";
import { setFavPacking } from "../../redux/userSlice";
import { updateFavPackingToServer } from "../../api/apiServices/mutationServices";
import { checkTooManyPackings } from "../../utils/filteringFavArrays";
import { getReduxStoreUser } from "../../redux/getReduxStore";
interface CustomProps {
  //   text: string;
  updateContentState: () => void;
  navigation: any;
  item: any;
}

export const CardComponent: React.FC<CustomProps> = ({
  item,
  navigation,
  updateContentState,
}) => {
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const { checked, total } = getPackingStats(item);
  const { t } = useLocale();
  const userStore = getReduxStoreUser();
  const luggageDone: boolean = checked === total ? true : false;
  const deepCopy = JSON.parse(JSON.stringify(item));
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const animatePulse = (onFinish?: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) onFinish();
    });
  };

  const animateDelete = (onFinish: () => void) => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Esperá un pelín más para asegurar que la animación visual termine
      setTimeout(onFinish, 100);
    });
  };

  const styles = StyleSheet.create({
    mainContainer: {
      //   backgroundColor: "white",
      borderRadius: 10,
      //   alignContent: "center",
      //   justifyContent: "center",
      height: item.packing_type === 0 ? 120 : 60,
      width: theme.standarWidth,
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
      borderBottomRightRadius: item.packing_type === 0 ? 0 : 10,
      borderBottomLeftRadius: item.packing_type === 0 ? 0 : 10,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      height: item.packing_type === 0 ? "40%" : "100%",
      width: "100%",

      // left: 5
    },
    secondContainerV2: {
      backgroundColor: theme.themeMode
        ? theme.colors.stripe3
        : theme.colors.stripe1,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: item.packing_type === 0 ? 0 : 10,
      borderBottomLeftRadius: item.packing_type === 0 ? 0 : 10,
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
      height: item.packing_type === 0 ? "40%" : "100%",
      width: "100%",
      flexDirection: "row",
    },
    iconsContainerV2: {
      flexDirection: "row",
      // alignItems: "center",
      // justifyContent: "center",
      // backgroundColor: "red",

      height: "100%",
    },
    touchableContainer: {
      // backgroundColor: "white",
      width: 50,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      // width: "100%",
    },
    thirdContainer: {
      //   backgroundColor: theme.colors.stripe3,
      padding: 5,
      alignContent: "center",
      justifyContent: "center",
      height: "60%",
      width: "100%",
      paddingLeft: 20,
      gap: 4,
    },
    icon: {
      height: 24,
      width: 24,
      tintColor: theme.themeMode ? theme.colors.stripe1 : theme.colors.stripe2,
    },
  });

  function getPackingStats(avPacking: Record<string, any>): {
    checked: number;
    total: number;
  } {
    let total = 0;
    let checked = 0;

    Object.keys(avPacking).forEach((key) => {
      if (key.startsWith("Luggage_") && avPacking[key]) {
        try {
          const luggage = JSON.parse(avPacking[key]);
          if (Array.isArray(luggage.content)) {
            luggage.content.forEach((item: any) => {
              total += 1;
              if (item.status) {
                checked += 1;
              }
            });
          }
        } catch (e) {
          console.warn(`Error parsing luggage "${key}":`, e);
        }
      }
    });

    return { checked, total };
  }

  function goToShowLuggage() {
    navigation.navigate("ShowLuggage", {
      id: item.id,
      packingType: item.packing_type,
    });
  }

  function updatePacking() {
    updateFavPackingToServer(deepCopy);
    dispatch(setFavPacking(deepCopy));
    updateContentState();
  }

  function saveToFavourites() {
    if (userStore.favPacking && userStore.favPacking.length > 0) {
      const howManyPackings = checkTooManyPackings(userStore.favPacking, 1);
      if (howManyPackings >= 20) {
        Alert.alert(
          t("messages.attention"),
          `${t("messages.toManyFavPackings")}, ${howManyPackings}`,
          [
            {
              text: "OK",
            },
          ]
        );
        return;
      }
    }
    animatePulse(() => {
      deepCopy.packing_type = item.packing_type === 0 ? 1 : 0;
      updatePacking();
    });
  }

  function deleteLuggage() {
    deepCopy.packing_type = 2;
    updatePacking();
  }

  function deleteItem() {
    Alert.alert(
      t("messages.attention"),
      `${t("messages.deleteItem")}\n\n${deepCopy.Name.toUpperCase()}`,
      [
        { text: t("messages.cancel"), style: "cancel" },
        {
          text: t("messages.eliminate"),
          style: "destructive",
          onPress: () => {
            animateDelete(() => {
              // Esperar un poquito más por seguridad (opcional)
              setTimeout(() => {
                deepCopy.packing_type = 2;
                deleteLuggage();
              }, 100);
            });
          },
        },
      ]
    );
  }

  return (
    <View>
      {item.packing_type === 0 ? (
        <Animated.View
          style={[
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => goToShowLuggage()}
          >
            <View style={styles.secondContainerV2}>
              <CardTitle style={{ left: 5, width: "75%" }}>
                {item.Name}
              </CardTitle>
              <View style={styles.iconsContainerV2}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                    saveToFavourites();
                  }}
                >
                  <Image
                    source={require("../../assets/icons/bookmark.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                    deleteItem();
                  }}
                >
                  <Image
                    source={require("../../assets/icons/trash.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.thirdContainer}>
              <ContentText>{`${t(
                "cards.itemsPacked"
              )}: ${checked} / ${total}`}</ContentText>
              <ContentText>
                {luggageDone
                  ? t("cards.luggageDone")
                  : t("cards.luggageNotDone")}
              </ContentText>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => goToShowLuggage()}
          >
            <View style={styles.secondContainerV2}>
              <CardTitle style={{ left: 5, width: "75%" }}>
                {item.Name}
              </CardTitle>
              <View style={styles.iconsContainerV2}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                    saveToFavourites();
                  }}
                >
                  <Image
                    source={require("../../assets/icons/bookmark_filled.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() => {
                    deleteItem();
                  }}
                >
                  <Image
                    source={require("../../assets/icons/trash.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};
