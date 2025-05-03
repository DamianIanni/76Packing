import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";
import { getReduxStoreUser } from "../../redux/getReduxStore";
import { useAppDispatch } from "../../redux/customDispatch";
import { setAccommodationData } from "../../redux/propmtDataSlice";
import { ContentText } from "../../components/texts/ContentText";
import { Switch } from "react-native";
import { Title } from "../../components/texts/Title";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  PixelRatio,
} from "react-native";
import { CardInputComponent } from "../../components/cards/CardInputComponent";

type CustomProps = {
  navigation: any;
  route: any;
};

const normalizeFontSize = (size: number) => {
  const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
  return size / scale;
};

export const AccommodationDataScreen = (
  props: CustomProps
): React.JSX.Element => {
  const { navigation, route } = props;
  const store = getReduxStoreUser();
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const utilitiesList = ["Washing machine", "Dryer"];
  const [userAccommodation, setUserAccommodation] = useState<string>("");
  const [utilities, setUtilities] = useState<string[]>([]);
  const [showUtilitiesPicker, setShowUtilitiesPicker] =
    useState<boolean>(false);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    container2: {
      flex: 1,
      alignItems: "flex-start",
      gap: 15,
    },
    container3: {
      flex: 1,
      alignItems: "flex-start",
      gap: 5,
      //   backgroundColor: "rgba(0,0,0,0.7)",
      //   marginTop: 20,
      //   flexDirection: "row",
      borderRadius: 10,
    },
    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
    mainCointainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.backgroundCard,
      width: theme.standarWidth,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: Platform.OS === "ios" ? 10 : 2,
    },
    input: {
      width: "100%",
      fontFamily: "Afacad-Medium",
      fontSize: normalizeFontSize(20),
      color: theme.colors.text,
      letterSpacing: 3,
      maxHeight: 150,
      paddingRight: 0,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: theme.colors.background,
      padding: 30,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingBottom: "10%",
    },
    option: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.backgroundCard,
      // borderWidth: 1,
      marginVertical: 6,
    },
    selectedOption: {
      backgroundColor: theme.colors.stripe3,
      borderColor: theme.colors.stripe3,
    },
    optionText: {
      color: theme.colors.text,
    },
    selectedText: {
      color: "#fff",
    },
    confirmButton: {
      marginTop: 16,
      backgroundColor: theme.colors.stripe3,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    confirmText: {
      color: "#fff",
      fontWeight: "600",
    },
    cancelText: {
      textAlign: "center",
      marginTop: 12,
      color: "#666",
    },
  });

  function toggleUtilities(utilitie: string) {
    setUtilities((prev) =>
      prev.includes(utilitie)
        ? prev.filter((s) => s !== utilitie)
        : [...prev, utilitie]
    );
  }

  function performButtonAction(): void {
    dispatch(
      setAccommodationData({
        accommodation: userAccommodation,
        utilities: utilities,
      })
    );
    navigation.navigate("ActivitiesScreen");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          // backgroundColor={theme.colors.background}
          backgroundColor={"transparent"}
        />
        <TopBar navigation={navigation} text="" />
        <View
          style={[
            style.stripeContainer,
            { marginLeft: theme.standarWidth / 1.8 },
          ]}
        >
          <View style={[style.stripe1]}></View>
          <View style={[style.stripe2]}></View>
          <View style={[style.stripe3]}></View>
        </View>
        <View style={style.container2}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CardInputComponent
              title="Accommodation"
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={true}
              action={(e: string) => setUserAccommodation(e)}
              placeholder="Not required"
              value={userAccommodation}
              isLargeText={true}
            />
          </KeyboardAvoidingView>

          <Pressable
            onPress={() => {
              setShowUtilitiesPicker(true);
            }}
          >
            <Title>Utilities</Title>
            <View style={style.mainCointainer}>
              <TextInput
                style={style.input}
                placeholder="Not required"
                editable={false}
                pointerEvents="none"
                multiline={true}
                value={utilities
                  .map((e, i) => {
                    return e;
                  })
                  .join(" - ")}
              />
            </View>
          </Pressable>

          <Modal visible={showUtilitiesPicker} transparent animationType="fade">
            <Pressable
              style={[StyleSheet.absoluteFill, style.overlay]}
              onPress={() => setShowUtilitiesPicker(false)}
            >
              <TouchableWithoutFeedback>
                <View style={style.modal}>
                  <Title>Select utilities</Title>

                  {utilitiesList.map((utilitie) => {
                    const isSelected = utilities.includes(utilitie);
                    return (
                      <TouchableOpacity
                        key={utilitie}
                        style={[
                          style.option,
                          isSelected && style.selectedOption,
                        ]}
                        onPress={() => toggleUtilities(utilitie)}
                      >
                        <ContentText
                          style={
                            isSelected ? style.selectedText : style.optionText
                          }
                        >
                          {utilitie}
                        </ContentText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
          <Button76 action={performButtonAction} disabled={true} text="next" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
