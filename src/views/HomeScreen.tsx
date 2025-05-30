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

  useEffect(() => {
    console.log("LA STORE DE REDUX", userStore);
  }, [updateContentState]);

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
        {/* <Button
        color={"red"}
        title="insert favPacking"
        onPress={() =>
          insertFavPackingToServer({
            Name: "SPAIN",
            userId: "9840cca1-d935-4082-b71a-4a3f0fc8a751",
            Luggage_1: JSON.stringify({
              luggage: "Mochila 15L",
              content: [
                { quantity: 1, item: "t-shirt", status: false },
                { quantity: 1, item: "shorts", status: false },
                { quantity: 1, item: "running shoes", status: false },
              ],
            }),
            Luggage_2: "",
            Luggage_3: "",
            Luggage_4: "",
            packing_type: 1,
          })
        }
      /> */}
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

{
  /* <Button
          title="Get user"
          onPress={() =>
            getUserFromServer("ec949b67-c76f-4dbd-8084-f28ce4e61c46")
          }
        />
        <Button
          title="Get user all data"
          onPress={() =>
            getAllUserDataFromServer("ec949b67-c76f-4dbd-8084-f28ce4e61c46")
          }
        />
        <Button
          title="Get user ID"
          onPress={() => getUserIdFromServer("monetizacion@gmail.com")}
        />
        <Button
          title="Get Packing"
          onPress={() =>
            getFavPackingFromServer("ec949b67-c76f-4dbd-8084-f28ce4e61c46")
          }
        />
        <Button
          title="Get savedLuggage"
          onPress={() =>
            getSavedLuggageFromServer("9840cca1-d935-4082-b71a-4a3f0fc8a751")
          }
        />
        <Button
          title="propmt Luggage"
          onPress={() => {
            try {
              getPromptLuggageFromServer({
                destination: "Hamburg",
                duration: 7,
                activities: "walk around the city",
                luggageItems: ["small backpack"],
                // weatherSensitivity: null,
                // favoriteClothing: null,
                accommodationType: "A friend house",
                utilities: ["washing machine", "dryer"],
                gender: "male",
                // height: null,
                // nationality: null,
                // age: null,
                dressStyle: "Sporty",
              });
            } catch (error) {
              console.log("ERROR CON EL PROMPT", error);
            }
          }}
        />
        <Button
          color={"red"}
          title="insert user"
          onPress={() =>
            insertUserToServer({
              Email: "monetizacion@gmail.com",
              Surname: "Monte",
              Name: "Mont",
              //  097fc05c-586e-44db-b796-b0db2da30485
            })
          }
        />
        <Button
          color={"red"}
          title="insert favPacking"
          onPress={() =>
            insertFavPackingToServer({
              Name: "SPAIN",
              userId: "9840cca1-d935-4082-b71a-4a3f0fc8a751",
              Luggage_1: "bla bla bla",
              Luggage_2: "",
              Luggage_3: "",
              Luggage_4: "",
              packing_type: 1,
            })
          }
        />
        <Button
          color={"red"}
          title="insert savedLuggage"
          onPress={() =>
            insertSavedLuggageToServer({
              luggage1: "carry on",
              luggage2: "",
              luggage3: "Backpack",
              luggage4: "",
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
            })
          }
        /> */
}
{
  /* <Button
          color={"green"}
          title="update user"
          onPress={() =>
            updateUserToServer({
              Name: "Thor",
              Surname: "Odinson",
              Email: "monetizacion@gmail.com",
              DateOfBirth: new Date("1998-01-01"),
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
              // height: 180,
              Gender: "male",
              // email: "monetizacion@gmail.com",
            })
          }
        /> */
}
{
  /* <Button
          color={"green"}
          title="update favPacking"
          onPress={() =>
            updateFavPackingToServer({
              packing_type: 1,
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
              id: 21,
            })
          }
        />
        <Button
          color={"green"}
          title="update savedLuggage"
          onPress={() =>
            updateSavedLuggageToServer({
              luggage1: "Big suitcase",
              luggage2: "",
              luggage3: "Backpack",
              luggage4: "",
              userId: "ec949b67-c76f-4dbd-8084-f28ce4e61c46",
            })
          }
        />

        <Button
          color={"blue"}
          title="delete user"
          onPress={() =>
            deleteUserToServer("aecef0f6-726b-4fdb-b21f-b3252ad97db9")
          }
        /> */
}
