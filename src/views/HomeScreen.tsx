import React, { useState, useEffect, useRef } from "react";
import { ThemeManager } from "../classes/ThemeManager";
// import {
//   getUserFromServer,
//   getFavPackingFromServer,
//   getSavedLuggageFromServer,
//   getPromptLuggageFromServer,
//   getUserIdFromServer,
//   getAllUserDataFromServer,
// } from "../api/apiServices/queryServices";
// import {
//   insertUserToServer,
//   insertFavPackingToServer,
//   insertSavedLuggageToServer,
//   updateFavPackingToServer,
//   updateSavedLuggageToServer,
//   updateUserToServer,
//   deleteUserToServer,
// } from "../api/apiServices/mutationServices";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  Animated,
} from "react-native";
import TopProfileBar from "../components/topBars/TopProfileBar";
import { CardComponent } from "../components/cards/CardComponent";
import { BigTitle } from "../components/texts/BigTitle";
import { useLocale } from "../i18n/TranslationContext";

import { getReduxStoreUser } from "../redux/getReduxStore";
import { filterPackingTypeZero } from "../utils/filteringFavArrays";

interface customProps {
  navigation: any;
}

const HomeScreen = (props: customProps): React.JSX.Element => {
  // const dispatch = useDispatch();
  const { t } = useLocale();
  const opacity = useRef(new Animated.Value(0)).current;
  const [updateContentState, setUpdateContentState] = useState(false);
  const { navigation } = props;
  const theme = new ThemeManager();
  const userStore = getReduxStoreUser();
  const favPacking0 = Array.isArray(userStore?.favPacking)
    ? filterPackingTypeZero(userStore.favPacking)
    : [];
  const style = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      // paddingTop: insets.top,
      // opacity: isReady ? 1 : 0,
    },
    containerCard: {
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
  });

  useEffect(() => {}, [updateContentState]);

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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      // onLayout={() => setIsReady(true)}
    >
      <Animated.View style={[style.container, { opacity }]}>
        <StatusBar
          barStyle={theme.themeMode ? "light-content" : "dark-content"}
          backgroundColor={theme.colors.background}
        />
        <TopProfileBar navigation={navigation} />

        {favPacking0.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favPacking0}
            style={{ width: "100%" }}
            contentContainerStyle={style.listContainer}
            renderItem={({ item, index }) => (
              // <View style={style.containerCard}>
              <CardComponent
                key={index}
                item={item}
                navigation={navigation}
                updateContentState={() =>
                  setUpdateContentState(!updateContentState)
                }
              />
              // </View>
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

export default HomeScreen;
