import React, { useState } from "react";
import { ThemeManager } from "../../classes/ThemeManager";
import { Button76 } from "../../components/button/Button76";
import TopBar from "../../components/topBars/TopBar";

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
import { CardInputPickerComponent } from "../../components/cards/CardInputPickerComponent";
import { useAppDispatch } from "../../redux/customDispatch";
import { setUserProfileData } from "../../redux/userSlice";
// import { UserInterface } from "../../models/dataModels";
import { getReduxStoreUser } from "../../redux/getReduxStore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserToServer } from "../../api/apiServices/mutationServices";
import { Title } from "../../components/texts/Title";
import { ContentText } from "../../components/texts/ContentText";
import { useLocale } from "../../i18n/TranslationContext";

type CustomProps = {
  navigation: any;
  route: any;
};

export const PersonalDataScreen = (props: CustomProps): React.JSX.Element => {
  const { t } = useLocale();
  const route = props.route;
  const dispatch = useAppDispatch();
  const theme = new ThemeManager();
  const store = getReduxStoreUser();
  const dateStringified = store.dateOfBirth?.toString();
  // const height = store.height;
  const btnText = route.params?.from
    ? t("button.saveBtn")
    : t("button.nextBtn");
  const arrGender = [
    t("profileScreen.genderOptions.male"),
    t("profileScreen.genderOptions.famale"),
    t("profileScreen.genderOptions.noToSay"),
  ];
  console.log("LA STORE EN EL PERSONAL DATA", store);

  const normalizeFontSize = (size: number) => {
    const scale = PixelRatio.getFontScale(); // Obtiene el factor de escala de la fuente del sistema
    return size / scale;
  };

  const [userName, setUserName] = useState<string>(store.name || "");
  const [userSurname, setUserSurname] = useState<string>(store.surname || "");
  const [userGender, setUserGender] = useState<string>(store.gender || "");
  const [userDayOfBrith, setUserDayOfBirth] = useState<Date | null>(() => {
    const dob = store.dateOfBirth;
    if (!dob) return null;

    const parsed = new Date(dob);
    return isNaN(parsed.getTime()) ? null : parsed;
  });
  //I'll this here in case I need it in the future
  const [userHeight, setUserHeight] = useState<number | null>(store.height);
  const [showGenderPickerModal, setShowGenderPickerModal] = useState(false);
  //
  const isDisabled: boolean = !!(userName && userSurname && userDayOfBrith);
  const { navigation } = props;
  const formattedDate =
    userDayOfBrith instanceof Date
      ? userDayOfBrith.toISOString().split("T")[0]
      : null;
  const objectDataPrfile = {
    email: store.email!,
    name: userName,
    surname: userSurname,
    gender: userGender,
    dateOfBirth: userDayOfBrith?.toISOString(),
    height: userHeight,
  };

  async function dispatchUser() {
    const uuid = store.userId;
    dispatch(setUserProfileData(objectDataPrfile));
    await updateUserToServer({
      Email: store.email!,
      userId: uuid!,
      Name: userName,
      Surname: userSurname,
      DateOfBirth: formattedDate,
      // Height: userHeight,
      Gender: userGender,
    });
  }

  function performButtonAction() {
    dispatchUser();
    if (route.params?.from) {
      navigation.goBack();
      return;
    }
    navigation.navigate("StyleData");
  }

  function toggleGender(gender: string) {
    setUserGender(gender);
    setShowGenderPickerModal(false);
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      //   width: theme.standarWidth,
      //   paddingBottom: 50,
    },
    container2: {
      flex: 1,
      //   backgroundColor: "blue",
      alignItems: "flex-start",
      gap: 15,
    },

    stripeContainer: theme.stripStyleContainer as ViewStyle,
    stripe1: theme.stripeStyle.stripe1 as ViewStyle,
    stripe2: theme.stripeStyle.stripe2 as ViewStyle,
    stripe3: theme.stripeStyle.stripe3 as ViewStyle,
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
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        //
        // onPress={Keyboard.dismiss}
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
        {route.params?.from ? <TopBar navigation={navigation} text="" /> : null}
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
          <KeyboardAvoidingView>
            <CardInputComponent
              title={t("profileScreen.name")}
              z={Platform.OS === "ios" ? 0 : 10}
              multiline={false}
              action={(e: string) => setUserName(e)}
              placeholder={t("requiredPlaceholder")}
              value={store.name}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <CardInputComponent
              title={t("profileScreen.surname")}
              z={Platform.OS === "ios" ? 0 : 10}
              placeholder={t("requiredPlaceholder")}
              multiline={false}
              action={(e: string) => setUserSurname(e)}
              value={store.surname}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <CardInputPickerComponent
              placeholder={t("requiredPlaceholder")}
              title={t("profileScreen.dateOfBirth")}
              // customWidth={150}
              z={Platform.OS === "ios" ? 0 : 8}
              multiline={false}
              action={(date: Date) => setUserDayOfBirth(date)}
              valueDate={dateStringified}
            />
          </KeyboardAvoidingView>
          {/* <KeyboardAvoidingView>
            <CardInputComponent
              placeholder="Not required"
              // isEditable={true}
              title="gender"
              //   customWidth={100}
              z={Platform.OS === "ios" ? 0 : 9}
              multiline={false}
              action={(e: string) => setUserGender(e)}
              value={store.gender}
            />
          </KeyboardAvoidingView> */}
          <Pressable
            onPress={() => {
              setShowGenderPickerModal(true);
            }}
          >
            <Title>{t("profileScreen.gender")}</Title>
            <View style={style.mainCointainer}>
              <TextInput
                style={style.input}
                placeholder={t("notRequiredPlaceholder")}
                editable={false}
                pointerEvents="none"
                multiline={true}
                value={userGender}
              />
            </View>
          </Pressable>
          <Button76
            action={performButtonAction}
            text={btnText}
            disabled={isDisabled}
          />
          <Modal
            visible={showGenderPickerModal}
            transparent
            animationType="fade"
          >
            <Pressable
              style={[StyleSheet.absoluteFill, style.overlay]}
              onPress={() => setShowGenderPickerModal(false)}
            >
              <TouchableWithoutFeedback>
                <View style={style.modal}>
                  <Title>{t("profileScreen.selectGender")}</Title>

                  {arrGender.map((gender) => {
                    const isSelected = userGender === gender;
                    return (
                      <TouchableOpacity
                        key={gender}
                        style={[
                          style.option,
                          isSelected && style.selectedOption,
                        ]}
                        onPress={() => toggleGender(gender)}
                      >
                        <ContentText
                          style={
                            isSelected ? style.selectedText : style.optionText
                          }
                        >
                          {gender}
                        </ContentText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
