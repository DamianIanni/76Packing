import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  FlatList,
  Platform,
} from "react-native";
import { ThemeManager } from "../../classes/ThemeManager";
import { ContentText } from "../texts/ContentText";
import { Title } from "../texts/Title";
import { useLocale } from "../../i18n/TranslationContext";

const mockData = [
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "carry on",
    content: [
      { quantity: 1, item: "jeans", status: false },
      { quantity: 1, item: "long sleeve t-shirt", status: false },
      { quantity: 1, item: "waterproof jacket", status: false },
      { quantity: 1, item: "dress shoes", status: false },
      { quantity: 1, item: "sneakers", status: false },
      { quantity: 3, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
  {
    luggage: "small backpack",
    content: [
      { quantity: 2, item: "t-shirt", status: false },
      { quantity: 2, item: "shorts", status: true },
      { quantity: 1, item: "jacket", status: false },
      { quantity: 1, item: "hiking shoes", status: false },
      { quantity: 1, item: "swimwear", status: false },
      { quantity: 2, item: "socks", status: false },
      { quantity: 3, item: "underwear", status: false },
    ],
  },
];

type customProps = {
  saving: (data: Luggage[]) => void;
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

export const CardListComponent: React.FC<customProps> = ({ saving }) => {
  const [data, setData] = useState(mockData); // copiamos el mock para trabajar con estado
  const { t } = useLocale();
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

  function handleItemModified(modifiedLuggages: Luggage[], index: number) {
    saving(modifiedLuggages);
  }

  // const Divider = () => <View style={styles.divider}></View>;

  const ItemRow = ({
    item,
    luggageIndex,
    itemIndex,
    onItemModified,
  }: {
    item: { quantity: number; item: string; status: boolean };
    luggageIndex: number;
    itemIndex: number;
    onItemModified: (luggage: Luggage[], index: number) => void;
  }) => {
    const [fadeAnim] = useState(new Animated.Value(1)); // opacidad
    const [scaleAnim] = useState(new Animated.Value(1)); // escala
    const [isDeleted, setIsDeleted] = useState(false); // para ocultar al final
    const [statusChecked, setStatusChecked] = useState<boolean>(item.status);

    // 🔄 Único estado de referencia para las modificaciones
    // Es cada luggage, no la data entera
    const [modifiedData, setModifiedData] = useState<Luggage[]>([]);

    // ✅ Toggle de status sobre modifiedData

    function onCallItemModified(data: Luggage[]) {
      onItemModified(data, luggageIndex);
    }

    function toggleStatus() {
      const dataCopy = [...data];
      const newContent = [...dataCopy[luggageIndex].content];

      newContent[itemIndex] = {
        ...newContent[itemIndex],
        status: !newContent[itemIndex].status,
      };

      dataCopy[luggageIndex] = {
        ...dataCopy[luggageIndex],
        content: newContent,
      };
      setModifiedData(dataCopy);
      onCallItemModified(dataCopy);
    }

    function onChangeStatus() {
      setStatusChecked(!statusChecked);
      toggleStatus();
    }

    // ✅ Borrado sobre modifiedData
    function onDelete() {
      setIsDeleted(true);

      const updatedData = [...data];
      updatedData[luggageIndex].content.splice(itemIndex, 1);

      setModifiedData(updatedData);
      onCallItemModified(updatedData);
    }

    const deleteItem = () => {
      Alert.alert(
        t("messages.attention"),
        `${t("messages.deleteItem")}\n
${data[luggageIndex].content[itemIndex].item.toUpperCase()}`,
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
                // setIsDeleted(true); // lo oculta visualmente
                // const updatedData = [...data];
                // updatedData[luggageIndex].content.splice(itemIndex, 1);
                // setModiData(updatedData); // o lo que sea necesario
              });
              // modifiedChange(true);
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
        <TouchableOpacity
          style={styles.checkIconContainer}
          onPress={() => onChangeStatus()}
        >
          <Image
            source={
              statusChecked
                ? require("../../assets/icons/checked.png")
                : require("../../assets/icons/check_blank.png")
            }
            defaultSource={
              statusChecked
                ? require("../../assets/icons/checked.png")
                : require("../../assets/icons/check_blank.png")
            }
            style={statusChecked ? styles.iconChecked : styles.iconNonChecked}
          />
        </TouchableOpacity>
        <View style={styles.txtContainer}>
          <ContentText>
            {item.quantity} × {item.item}
          </ContentText>
        </View>
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={deleteItem}
        >
          <Image
            source={require("../../assets/icons/delete.png")}
            defaultSource={require("../../assets/icons/delete.png")}
            style={styles.iconNonChecked}
          />
        </TouchableOpacity>
        {/* {showDivider && <View style={styles.divider} />} */}
      </Animated.View>
    );
  };

  return (
    <View style={styles.principalContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        maxToRenderPerBatch={4}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 80 : 60, // Espacio debajo de todo
          width: "100%",
        }}
        keyExtractor={(_, i) => `luggage-${i}`}
        renderItem={({ item: luggageEntry, index: luggageIndex }) => (
          <View>
            <Title style={{ alignSelf: "flex-start", marginTop: 10 }}>
              {luggageEntry.luggage}
            </Title>
            <View style={styles.mainCointainer}>
              <FlatList
                data={luggageEntry.content}
                keyExtractor={(_, i) => `${_.item}-${_.quantity}`}
                renderItem={({ item, index }) => (
                  <ItemRow
                    item={item}
                    luggageIndex={luggageIndex}
                    itemIndex={index}
                    onItemModified={handleItemModified}
                  />
                )}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};
