import React, { useEffect, useState, useRef, useCallback } from "react";
import { ThemeManager } from "../classes/ThemeManager";
import { CardComponent } from "../components/cards/CardComponent";
import { getReduxStoreUser } from "../redux/getReduxStore";
import { filterPackingTypeOne } from "../utils/filteringFavArrays";
import { BigTitle } from "../components/texts/BigTitle";
import { useLocale } from "../i18n/TranslationContext";
import { useFocusEffect } from "@react-navigation/native";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Platform,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type customProps = {
  navigation: any;
};

export const FavouriteScreen = (props: customProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  const { t } = useLocale();
  const [updateContentState, setUpdateContentState] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const userStore = getReduxStoreUser();
  const { navigation } = props;
  const theme = new ThemeManager();
  const favPacking1 = Array.isArray(userStore?.favPacking)
    ? filterPackingTypeOne(userStore.favPacking)
    : [];
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      width: "100%",
    },
    listContainer: {
      paddingTop: 10,
      paddingBottom: 70,
      alignItems: "center",
      width: "100%",
      //   backgroundColor: "red",
      gap: 15, // No funciona en FlatList, por eso lo manejamos en renderItem
    },
    itemContainer: {
      width: "100%",
      marginBottom: 10, // Espacio entre los elementos
    },
  });

  useFocusEffect(
    useCallback(() => {
      opacity.setValue(0); // Reiniciás antes de animar
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  useEffect(() => {}, [updateContentState]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
      }}
    >
      <Animated.View style={[style.container, { opacity }]}>
        <StatusBar
          barStyle={theme.themeMode ? "light-content" : "dark-content"}
          backgroundColor={"transparent"}
        />

        {favPacking1.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favPacking1}
            style={{ width: "100%" }}
            contentContainerStyle={style.listContainer}
            renderItem={({ item, index }) => (
              <View style={style.itemContainer}>
                <CardComponent
                  key={index}
                  item={item}
                  navigation={navigation}
                  updateContentState={() =>
                    setUpdateContentState(!updateContentState)
                  }
                />
              </View>
            )}
          />
        ) : (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <BigTitle style={{ textAlign: "center" }}>
              {t("emptyScreen.nothingToShow")}
            </BigTitle>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};
