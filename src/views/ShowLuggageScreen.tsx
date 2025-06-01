import React, { useState } from "react";
import { ThemeManager } from "../classes/ThemeManager";
import TopBar from "../components/topBars/TopBar";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CardListComponent } from "../components/cards/CardListComponent";
import { useLocale } from "../i18n/TranslationContext";
import { getReduxStoreUser } from "../redux/getReduxStore";
import { getReduxStorePrompt } from "../redux/getReduxStore";
import { updateFavPackingToServer } from "../api/apiServices/mutationServices";
import { useAppDispatch } from "../redux/customDispatch";
import { setFavPacking } from "../redux/userSlice";

type CustomProps = {
  navigation: any;
  route: any;
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

export const ShowLuggageScreen = (props: CustomProps): React.JSX.Element => {
  const theme = new ThemeManager();
  const dispatch = useAppDispatch();
  const style = StyleSheet.create({
    text: {
      fontFamily: "Afacad-BoldItalic",
      fontSize: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  });

  const { t } = useLocale();
  const userStore = getReduxStoreUser();
  const promptstore = getReduxStorePrompt();
  const { navigation, route } = props;

  const travelName = route.params?.from
    ? promptstore.destination
    : userStore.favPacking!.find((item) => item.id === route.params?.id)?.Name;

  const dataToUseBefore =
    route.params?.from === "LoadingScreen"
      ? userStore.favPacking![userStore.favPacking!.length - 1]
      : userStore.favPacking!.filter((item) => item.id === route.params?.id)[0];
  const parsed = parseLuggageData(dataToUseBefore);
  const [data] = useState(parsed);
  const [modifiedLuggages, setModifiedLuggages] = useState<Luggage[]>(parsed);

  function parseLuggageData(data: any): Luggage[] {
    const parsedLuggage: Luggage[] = [];
    for (let i = 1; i <= 4; i++) {
      const key = `Luggage_${i}`;
      if (data[key]) {
        try {
          const parsed = JSON.parse(data[key]);
          parsedLuggage.push(parsed);
        } catch (error) {
          console.warn(`Error parsing ${key}:`, error);
        }
      }
    }
    return parsedLuggage;
  }

  function onGoingBack() {
    "NAVIGATION STATE", navigation.getState();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",
          params: {
            screen: route.params?.packingType === 1 ? "Favourites" : "Home",
          },
        },
      ],
    });
  }

  function deepEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  function savingOnDBandRedux() {
    const packingToSend: {
      Name: string;
      id: number;
      userId: string;
      packing_type: 0 | 1 | 2;
      Luggage_1: string;
      Luggage_2: string | null;
      Luggage_3: string | null;
      Luggage_4: string | null;
    } = {
      Name: travelName!,
      id: route.params?.id,
      userId: userStore.userId!,
      packing_type: route.params?.packingType,
      Luggage_1: JSON.stringify(modifiedLuggages[0] || {}),
      Luggage_2: modifiedLuggages[1]
        ? JSON.stringify(modifiedLuggages[1])
        : null,
      Luggage_3: modifiedLuggages[2]
        ? JSON.stringify(modifiedLuggages[2])
        : null,
      Luggage_4: modifiedLuggages[3]
        ? JSON.stringify(modifiedLuggages[3])
        : null,
    };

    const existingPacking = userStore.favPacking?.find(
      (p) => p.id === packingToSend.id
    );

    // 🔒 Verificar si ya existe uno igual (profundamente)
    if (existingPacking && deepEqual(packingToSend, existingPacking)) {
      console.log("No hay cambios. No se envía nada.");
      return;
    }

    updateFavPackingToServer(packingToSend);
    dispatch(setFavPacking(packingToSend));
  }

  function saving(updated: any, index: number) {
    const updatedArray = [...modifiedLuggages];

    if (updated === null) {
      const filtered = updatedArray.filter((_, i) => i !== index);
      setModifiedLuggages(filtered);
      console.log("Tarjeta eliminada, nuevo estado:", filtered);
    } else {
      updatedArray[index] = updated;
      const cleaned = updatedArray.filter((item) => item.content?.length > 0);
      setModifiedLuggages(cleaned);
      console.log("Tarjeta modificada:", cleaned);
    }

    if (route.params?.from === "LoadingScreen") return;

    savingOnDBandRedux();
  }

  return (
    <SafeAreaView
      style={[
        style.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.themeMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <TopBar
        navigation={navigation}
        text={travelName}
        onGoingBack={onGoingBack}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(_, i) => `${_.luggage}-${i}`}
        renderItem={({ item, index }) => (
          <CardListComponent
            previusScreen={route.params}
            item={item}
            index={index}
            saving={(updatedItem, idx) => saving(updatedItem, idx)}
          />
        )}
      />
    </SafeAreaView>
  );
};
