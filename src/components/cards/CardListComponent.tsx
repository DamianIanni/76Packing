import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";
import { useLocale } from "../../i18n/TranslationContext";
import { useFocusEffect } from "@react-navigation/native";

type customProps = {
  item: any;
  index: number;
  saving: (data: Luggage | null, index: number) => void;
  previusScreen: string | number;
};
type ContentItem = {
  quantity: number;
  item: string;
  status: boolean;
};
type Luggage = {
  luggage: string;
  content: ContentItem[];
};

export const CardListComponent: React.FC<customProps> = ({
  item,
  index,
  saving,
  previusScreen,
}) => {
  const { t } = useLocale();
  const theme = new ThemeManager();
  const [refresh, setRefresh] = useState(false);
  const [modifiedLuggage] = useState<Luggage>(item);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Al salir de foco
        if (modifiedLuggage.content.length === 0) {
          saving(null, index);
        } else {
          saving(modifiedLuggage, index);
        }
      };
    }, [])
  );

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
      marginBottom: 10,
      // backgroundColor: "yellow",
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
      width: theme.standarWidth - 25,
      // paddingHorizontal: 50,
      paddingVertical: 5,
      //   height: 20,
      justifyContent: "center",
      // borderBottomWidth: 0.5,
      // borderStyle: "solid",
      // borderColor: theme.colors.divider,
      //   alignItems: "flex-start",
      // backgroundColor: "red",
      marginVertical: 2.5,
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

  // const Divider = () => <View style={styles.divider}></View>;

  const ItemRow = ({
    itemChildren,
    itemIndex,
    forceRefresh,
  }: {
    itemChildren: { quantity: number; item: string; status: boolean };
    itemIndex: number;
    forceRefresh: () => void;
  }) => {
    const [fadeAnim] = useState(new Animated.Value(1)); // opacidad
    const [scaleAnim] = useState(new Animated.Value(1)); // escala
    const [isDeleted, setIsDeleted] = useState(false); // para ocultar al final
    const [statusChecked, setStatusChecked] = useState<boolean>(
      itemChildren.status
    );

    function toggleStatus() {
      const index = modifiedLuggage.content.findIndex(
        (el) =>
          el.item === itemChildren.item && el.quantity === itemChildren.quantity
      );
      if (index !== -1) {
        modifiedLuggage.content[index] = {
          ...modifiedLuggage.content[index],
          status: !modifiedLuggage.content[index].status,
        };
      }
    }

    function onChangeStatus() {
      setStatusChecked(!statusChecked);
      toggleStatus();
    }

    // ✅ Borrado sobre modifiedData
    function onDelete() {
      setIsDeleted(true);
      modifiedLuggage.content.splice(itemIndex, 1);
      setRefresh((prev) => !prev);
    }

    const deleteItem = () => {
      Alert.alert(
        t("messages.attention"),
        `${t("messages.deleteItem")}\n
${itemChildren.item.toUpperCase()}`,
        [
          { text: t("messages.cancel"), style: "cancel" },
          {
            text: t("messages.eliminate"),
            style: "destructive",
            onPress: () => {
              Animated.parallel([
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 200,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                  toValue: 0.8,
                  duration: 200,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }),
              ]).start(() => {
                onDelete();
              });
            },
          },
        ]
      );
    };

    if (isDeleted) return null;

    return (
      <Animated.View
        style={{
          ...styles.elementListContainer,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {
          <TouchableOpacity
            style={styles.checkIconContainer}
            onPress={() => onChangeStatus()}
          >
            <Image
              source={
                previusScreen.packingType === 1
                  ? require("../../assets/icons/checked.png")
                  : statusChecked
                  ? require("../../assets/icons/checked.png")
                  : require("../../assets/icons/check_blank.png")
              }
              style={
                previusScreen.packingType === 1
                  ? styles.iconChecked
                  : statusChecked
                  ? styles.iconChecked
                  : styles.iconNonChecked
              }
            />
          </TouchableOpacity>
        }
        <View style={styles.txtContainer}>
          <ContentText>
            {modifiedLuggage.content[itemIndex].quantity} ×{" "}
            {modifiedLuggage.content[itemIndex].item}
          </ContentText>
        </View>
        {previusScreen.packingType === 0 && (
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={deleteItem}
          >
            <Image
              source={require("../../assets/icons/delete.png")}
              style={styles.iconNonChecked}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.principalContainer}>
      {!modifiedLuggage.content ||
      modifiedLuggage.content.length === 0 ? null : (
        <View>
          <Title style={{ alignSelf: "flex-start", marginTop: 10 }}>
            {item.luggage}
          </Title>
          <View style={styles.mainCointainer}>
            <FlatList
              data={modifiedLuggage.content}
              // data={item.content}
              keyExtractor={(_, i) => `${_.item}-${_.quantity}`}
              renderItem={({ item, index }) => (
                <ItemRow
                  itemChildren={item}
                  itemIndex={index}
                  forceRefresh={() => setRefresh(!refresh)}
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};
